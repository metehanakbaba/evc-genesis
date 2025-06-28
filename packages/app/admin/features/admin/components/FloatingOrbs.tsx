import React from 'react';

/**
 * Revolutionary floating background elements with glassmorphism effects
 */
export const FloatingOrbs: React.FC = React.memo(() => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {/* Primary floating orbs */}
    <div
      className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 via-cyan-500/15 to-teal-500/10 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: '0s', animationDuration: '8s' }}
    />
    <div
      className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-600/12 via-pink-500/8 to-emerald-500/10 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: '2s', animationDuration: '10s' }}
    />
    <div
      className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-600/8 via-teal-500/12 to-cyan-500/8 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: '4s', animationDuration: '12s' }}
    />

    {/* Floating geometric shapes */}
    <div
      className="absolute top-1/2 left-1/5 w-4 h-4 border border-blue-400/30 rounded-full animate-ping"
      style={{ animationDelay: '1s', animationDuration: '6s' }}
    />
    <div
      className="absolute top-3/4 right-1/3 w-6 h-6 border border-purple-400/25 rounded-lg animate-ping"
      style={{ animationDelay: '3s', animationDuration: '8s' }}
    />
    <div
      className="absolute top-1/4 right-1/5 w-3 h-3 border border-teal-400/35 rounded-full animate-ping"
      style={{ animationDelay: '5s', animationDuration: '7s' }}
    />

    {/* Concentric circles */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div
        className="w-[800px] h-[800px] border border-white/5 rounded-full animate-pulse"
        style={{ animationDelay: '0s', animationDuration: '15s' }}
      />
      <div
        className="absolute inset-20 border border-white/3 rounded-full animate-pulse"
        style={{ animationDelay: '2s', animationDuration: '12s' }}
      />
      <div
        className="absolute inset-40 border border-white/2 rounded-full animate-pulse"
        style={{ animationDelay: '4s', animationDuration: '18s' }}
      />
    </div>
  </div>
));

FloatingOrbs.displayName = 'FloatingOrbs';
