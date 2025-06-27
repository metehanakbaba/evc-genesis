import type React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from '@/app/router/AppRouter';
import { store } from '@/app/store/store';
import { ErrorBoundary, ToastProvider } from '@/shared/ui';
import '@/app/styles/global.css';

/**
 * Root application component
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
