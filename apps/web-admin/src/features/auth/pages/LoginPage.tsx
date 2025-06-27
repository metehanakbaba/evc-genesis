import type React from 'react';
import { memo, useState, useEffect } from 'react';
import { useAuthForm, useAnimatedEntrance } from '../hooks';
import { AnimatedBackground, LoginHeader, LoginForm } from '../components';

/**
 * Revolutionary login page with ultra-sophisticated floating card design
 */
const LoginPage: React.FC = () => {
  const isVisible = useAnimatedEntrance(100);
  const [headerAnimationStage, setHeaderAnimationStage] = useState(0);

  const {
    formData,
    isLoading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleForgotPassword,
  } = useAuthForm();

  useEffect(() => {
    if (isVisible) {
      // Stage 1: Icon container and header appear first
      const timer1 = setTimeout(() => setHeaderAnimationStage(1), 200);

      return () => {
        clearTimeout(timer1);
      };
    }
  }, [isVisible]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <AnimatedBackground isVisible={isVisible} />

      {/* Revolutionary Floating Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Concentric Circles */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border border-blue-500/10 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-500/10 rounded-full animate-pulse delay-1000" />
        </div>

        {/* Floating Gradient Orbs */}
        <div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-bounce"
          style={{ animationDelay: '0s', animationDuration: '6s' }}
        />
        <div
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-bounce"
          style={{ animationDelay: '2s', animationDuration: '8s' }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-indigo-600/20 to-blue-600/20 rounded-full blur-2xl animate-ping"
          style={{ animationDelay: '4s' }}
        />

        {/* Random Floating Dots */}
        <div
          className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400/30 rounded-full animate-ping"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-cyan-400/25 rounded-full animate-pulse"
          style={{ animationDelay: '3s' }}
        />
        <div
          className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-ping"
          style={{ animationDelay: '5s' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div
          className={`w-full max-w-md transform transition-all duration-1000 ease-out relative group ${
            isVisible
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-12 opacity-0 scale-90'
          }`}
        >
          {/* Revolutionary Floating Card Container */}
          <div className="relative hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out">
            {/* Enhanced Backdrop Blur Card with Floating Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 via-gray-700/30 to-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-3xl border border-gray-600/40 hover:border-gray-500/60 transition-all duration-500" />

            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Revolutionary Floating Accent Dots */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50" />
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping" />
            <div
              className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: '1s' }}
            />

            {/* Content */}
            <div className="relative p-8 z-10">
              {/* Stage 1: Icon Container - Appears first */}
              <div
                className={`flex justify-center mb-6 transform transition-all duration-700 ease-out ${
                  headerAnimationStage >= 1
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-4 opacity-0 scale-95'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center transform hover:rotate-6 transition-transform duration-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg shadow-lg shadow-blue-500/30" />
                </div>
              </div>

              {/* Stage 1: LoginHeader - Appears with icon */}
              <div
                className={`transform transition-all duration-700 ease-out delay-200 ${
                  headerAnimationStage >= 1
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-4 opacity-0 scale-95'
                }`}
              >
                <LoginHeader
                  title="EV Charging Admin"
                  subtitle="Revolutionary access to your dashboard"
                />
              </div>

              {/* LoginForm with its own staged animations starting after header */}
              <LoginForm
                email={formData.email}
                password={formData.password}
                isLoading={isLoading}
                onEmailChange={handleEmailChange}
                onPasswordChange={handlePasswordChange}
                onSubmit={handleSubmit}
                onForgotPassword={handleForgotPassword}
              />

              {/* Hidden Description Revealed on Hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-4 text-center">
                <p className="text-xs text-gray-400">
                  Experience the future of admin interfaces
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Floating Elements with Staggered Animations */}
          <div
            className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-sm animate-bounce shadow-lg shadow-blue-500/20"
            style={{ animationDelay: '0s', animationDuration: '3s' }}
          />
          <div
            className="absolute -bottom-6 -right-6 w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-sm animate-bounce shadow-lg shadow-purple-500/20"
            style={{ animationDelay: '1s', animationDuration: '4s' }}
          />
          <div
            className="absolute top-1/4 -right-8 w-6 h-6 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full blur-sm animate-ping shadow-lg shadow-indigo-500/20"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute bottom-1/3 -left-4 w-4 h-4 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full blur-sm animate-pulse shadow-lg shadow-cyan-500/20"
            style={{ animationDelay: '3s' }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(LoginPage);
