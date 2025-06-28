import React, { Suspense, use } from 'react'; // React 19: use hook!
import { LoginForm } from '../components/LoginForm';
import { MainLayout } from '@ui/layout';

// React 19: Example of use() hook with promise
const themePromise = Promise.resolve({
  name: 'EV Charging Admin',
  version: '2.0',
  theme: 'Revolutionary Dark',
});

const ThemeInfo: React.FC = () => {
  // React 19: use() hook can consume promises directly!
  const themeData = use(themePromise);
  
  return (
    <div className="text-xs text-gray-500/60 text-center">
      {themeData.name} v{themeData.version} • {themeData.theme}
    </div>
  );
};

export const LoginPage: React.FC = () => {
  return (
    <MainLayout 
      showHeader={false}
      showFooter={false}
      showFloatingOrbs={false}
      className="min-h-screen"
    >
      {/* Main content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl mx-auto flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg" />
            </div>
            <h1 className="text-2xl font-bold text-white">EV Charging Admin</h1>
            <p className="text-gray-400">Revolutionary access to your dashboard</p>
          </div>
          
          {/* Login Form using React 19 features */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
            <LoginForm />
          </div>
          
          {/* React 19: use() hook example with Suspense */}
          <Suspense fallback={
            <div className="text-xs text-gray-500/40 text-center animate-pulse">
              Loading theme info...
            </div>
          }>
            <ThemeInfo />
          </Suspense>
          
          {/* Footer info */}
          <div className="text-center text-xs text-gray-500/40">
            React 19.1.0 • useActionState • use() hook • Direct refs
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
