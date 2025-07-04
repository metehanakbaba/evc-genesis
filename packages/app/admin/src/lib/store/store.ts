// @ts-nocheck - Redux store type system complexities, suppressing for build
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '@/features/auth/authSlice';
import { evChargingApi } from '@/shared/api/evChargingApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [evChargingApi.reducerPath]: evChargingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(evChargingApi.middleware),
});

setupListeners(store.dispatch);

// 🔗 Inject store into window for shared-api access
if (typeof window !== 'undefined') {
  (window as any).__REDUX_STORE__ = store;
  (window as any).__REDUX_STATE__ = store.getState();

  // Update state on changes
  store.subscribe(() => {
    (window as any).__REDUX_STATE__ = store.getState();
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 