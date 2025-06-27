import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Route,
  Routes,
  BrowserRouter,
  Outlet,
} from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import {
  RevolutionaryLoader,
  RouteTransition,
  type RevolutionaryLoaderProps,
} from '../../shared/ui/components/Display';
import { ScrollToTop } from '../../shared/ui/components/Layout';

// Debug mode for testing animations
const DEBUG_MODE = false;
const DEBUG_DELAY = 2000; // 2 seconds to see animations

// Helper function to add debug delay
const withDebugDelay = <T,>(importPromise: Promise<T>): Promise<T> => {
  if (!DEBUG_MODE) return importPromise;

  return new Promise((resolve) => {
    setTimeout(() => {
      importPromise.then(resolve);
    }, DEBUG_DELAY);
  });
};

// Lazy load pages
const LoginPageLazy = React.lazy(() =>
  withDebugDelay(import('@/features/auth/pages/LoginPage')),
);
const DashboardPageLazy = React.lazy(() =>
  withDebugDelay(import('@/features/admin/pages/DashboardPage')),
);
const StationsPageLazy = React.lazy(() =>
  withDebugDelay(import('@/features/stations/pages/StationsPage')),
);
const SessionsPageLazy = React.lazy(() =>
  withDebugDelay(import('@/features/sessions/pages/SessionsPage')),
);
const UsersPageLazy = React.lazy(() =>
  withDebugDelay(import('@/features/users/pages/UsersPage')),
);
const WalletsPageLazy = React.lazy(() =>
  withDebugDelay(import('@/features/wallets/pages/WalletsPage')),
);
const ComponentShowcaseLazy = React.lazy(() =>
  withDebugDelay(import('@/features/admin/pages/ComponentShowcase')),
);
const DesignSystemDocsLazy = React.lazy(() =>
  withDebugDelay(import('@/features/admin/pages/DesignSystemDocs')),
);
const LayoutExamplePageLazy = React.lazy(() =>
  withDebugDelay(import('@/features/admin/pages/LayoutExamplePage')),
);

/**
 * Protected route wrapper component
 */
const ProtectedRoute: React.FC = () => {
  // const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <RouteTransition debugMode={DEBUG_MODE}>
      <Outlet />
    </RouteTransition>
  );
};

/**
 * Main app router component with revolutionary transitions and debug features
 */
export const AppRouter: React.FC = () => {
  useEffect(() => {
    if (DEBUG_MODE) {
      console.log('🚀 Revolutionary Router Initialized with Debug Mode');
      console.log('🎭 Animation Debug Features:');
      console.log('   • Revolutionary Loader with 4-phase progression');
      console.log('   • Route transitions with exit/enter animations');
      console.log('   • Floating background elements with staggered delays');
      console.log('   • Console logging for transition phases');
      console.log(`   • Debug delay: ${DEBUG_DELAY}ms for visual testing`);
    }
  }, []);

  const loaderProps: RevolutionaryLoaderProps = {
    debugMode: DEBUG_MODE,
    debugDelay: DEBUG_DELAY,
    animationSpeed: 1,
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <React.Suspense fallback={<RevolutionaryLoader {...loaderProps} />}>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={
              <RouteTransition debugMode={DEBUG_MODE}>
                <LoginPageLazy />
              </RouteTransition>
            }
          />
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPageLazy />} />
            <Route path="/stations" element={<StationsPageLazy />} />
            <Route path="/sessions" element={<SessionsPageLazy />} />
            <Route path="/users" element={<UsersPageLazy />} />
            <Route path="/wallets" element={<WalletsPageLazy />} />
            <Route path="/showcase" element={<ComponentShowcaseLazy />} />
            <Route path="/design-system" element={<DesignSystemDocsLazy />} />
            <Route
              path="/layout-examples"
              element={<LayoutExamplePageLazy />}
            />
          </Route>
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};
