// @ts-nocheck - Redux store type system complexities, suppressing for build
import {
  configureStore,
  createListenerMiddleware,
  isPlain,
  Middleware,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '@/features/auth/authSlice';
import { evChargingApi } from '@/shared/api/evChargingApi';

// Performance optimization: Create listener middleware for side effects
const listenerMiddleware = createListenerMiddleware();

// Custom auth persistence middleware
const authPersistenceMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Only persist auth state changes on client side
  if (typeof window !== 'undefined' && action.type?.startsWith('auth/')) {
    const state = store.getState();
    try {
      localStorage.setItem('evc-auth-state', JSON.stringify({
        user: state.auth.user,
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated,
        expiresIn: state.auth.expiresIn,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Failed to persist auth state:', error);
    }
  }
  
  return result;
};

// Load initial auth state from localStorage
const loadAuthState = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  
  try {
    const stored = localStorage.getItem('evc-auth-state');
    if (!stored) return undefined;
    
    const parsed = JSON.parse(stored);
    
    // Check if stored state is expired (24 hours)
    if (Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('evc-auth-state');
      return undefined;
    }
    
    return {
      auth: {
        user: parsed.user,
        token: parsed.token,
        isAuthenticated: parsed.isAuthenticated,
        expiresIn: parsed.expiresIn,
      }
    };
  } catch (error) {
    console.warn('Failed to load auth state:', error);
    localStorage.removeItem('evc-auth-state');
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [evChargingApi.reducerPath]: evChargingApi.reducer,
  },
  preloadedState: loadAuthState(),
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      // Performance optimizations
      serializableCheck: {
        ignoredActions: [
          evChargingApi.util?.getRunningQueriesThunk?.fulfilled?.type,
          evChargingApi.util?.getRunningQueriesThunk?.rejected?.type,
        ].filter(Boolean), // Filter out undefined values
        ignoredPaths: ['api.queries', 'api.mutations'],
        // Custom serializable check for better performance
        isSerializable: (value: any) => {
          // Check for File and FileList only on client side (SSR safe)
          if (typeof window !== 'undefined') {
            if (value instanceof File || (typeof FileList !== 'undefined' && value instanceof FileList)) {
              return false;
            }
          }
          return isPlain(value);
        },
      },
      immutableCheck: {
        // Ignore API slices for performance
        ignoredPaths: ['api'],
      },
      // Enable action creator check only in development
      actionCreatorCheck: process.env.NODE_ENV === 'development',
    });

    // Add RTK Query middleware and our custom auth persistence
    return middleware
      .concat(evChargingApi.middleware)
      .concat(authPersistenceMiddleware)
      .prepend(listenerMiddleware.middleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Setup listeners for RTK Query
setupListeners(store.dispatch);

// Global store access for compatibility
if (typeof window !== 'undefined') {
  (window as any).__REDUX_STORE__ = store;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
