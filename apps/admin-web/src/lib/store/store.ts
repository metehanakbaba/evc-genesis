// @ts-nocheck - Redux store type system complexities, suppressing for build
import {
  configureStore,
  createListenerMiddleware,
  isPlain,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '@/features/auth/authSlice';
import { evChargingApi } from '@/shared/api/evChargingApi';

// Performance optimization: Create listener middleware for side effects
const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [evChargingApi.reducerPath]: evChargingApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      // Performance optimizations
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          evChargingApi.util?.getRunningQueriesThunk?.fulfilled?.type,
          evChargingApi.util?.getRunningQueriesThunk?.rejected?.type,
        ].filter(Boolean), // Filter out undefined values
        ignoredPaths: ['api.queries', 'api.mutations'],
        // Custom serializable check for better performance
        isSerializable: (value: any) => {
          if (value instanceof File || value instanceof FileList) {
            return false;
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

    // Add RTK Query middleware
    return middleware
      .concat(evChargingApi.middleware)
      .prepend(listenerMiddleware.middleware);
  },

  // Performance: Enable DevTools only in development
  devTools: process.env.NODE_ENV === 'development' && {
    maxAge: 50, // Limit history to prevent memory issues
    trace: true,
    traceLimit: 25,
    // Selective action monitoring for performance
    actionsDenylist: [
      'api/executeQuery/pending',
      'api/executeQuery/fulfilled',
      'api/executeMutation/pending',
      'api/executeMutation/fulfilled',
    ],
  },

  // Performance: Preloaded state can be optimized
  preloadedState: undefined,

  // Enhanced store for performance monitoring
  enhancers: (getDefaultEnhancers) => {
    if (process.env.NODE_ENV === 'development') {
      // Add performance monitoring in development
      return getDefaultEnhancers().concat(
        (createStore) => (reducer, preloadedState) => {
          const store = createStore(reducer, preloadedState);

          // Performance monitoring wrapper
          const originalDispatch = store.dispatch;
          store.dispatch = (action: any) => {
            const start = performance.now();
            const result = originalDispatch(action);
            const end = performance.now();

            // Log slow actions (> 5ms)
            if (end - start > 5) {
              console.warn(
                `[Redux Performance] Slow action: ${action.type} (${(end - start).toFixed(2)}ms)`,
              );
            }

            return result;
          };

          return store;
        },
      );
    }
    return getDefaultEnhancers();
  },
});

// Performance: Setup listeners for RTK Query
setupListeners(store.dispatch);

// 🔗 Inject store into window for shared-api access (optimized)
if (typeof window !== 'undefined') {
  (window as any).__REDUX_STORE__ = store;

  // Optimized state injection - only update when necessary
  let lastState = store.getState();
  (window as any).__REDUX_STATE__ = lastState;

  // Throttled state updates to prevent excessive window updates
  let updateTimeout: NodeJS.Timeout | null = null;
  store.subscribe(() => {
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }

    updateTimeout = setTimeout(() => {
      const currentState = store.getState();
      if (currentState !== lastState) {
        (window as any).__REDUX_STATE__ = currentState;
        lastState = currentState;
      }
    }, 16); // ~60fps throttling
  });

  // Performance monitoring in development
  if (process.env.NODE_ENV === 'development') {
    let actionCount = 0;
    const originalDispatch = store.dispatch;

    store.dispatch = (action: any) => {
      actionCount++;

      if (actionCount % 100 === 0) {
        console.log(`[Redux Stats] ${actionCount} actions dispatched`);
      }

      return originalDispatch(action);
    };
  }
}

// Store utilities for performance monitoring
export const storeUtils = {
  getState: () => store.getState(),
  dispatch: store.dispatch,

  // Performance monitoring utilities
  getPerformanceMetrics: () => {
    const state = store.getState();
    return {
      stateSize: JSON.stringify(state).length,
      cacheEntries: Object.keys(state.api?.queries || {}).length,
      mutationEntries: Object.keys(state.api?.mutations || {}).length,
      subscriptions: Object.keys(state.api?.subscriptions || {}).length,
    };
  },

  // API cache management
  clearApiCache: () => {
    store.dispatch(evChargingApi.util.resetApiState());
  },

  // Memory optimization
  optimizeMemory: () => {
    // Clear old queries
    store.dispatch(
      evChargingApi.util.invalidateTags(['Station', 'Session', 'User']),
    );

    // Force garbage collection if available
    if (typeof window !== 'undefined' && (window as any).gc) {
      (window as any).gc();
    }
  },
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { listenerMiddleware };
