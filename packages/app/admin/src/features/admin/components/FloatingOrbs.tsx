'use client';

import React from 'react';

/**
 * Revolutionary floating orbs background animation
 */
export const FloatingOrbs: React.FC = React.memo(() => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
    {/* Primary orb */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl animate-revolutionary-float" />
    
    {/* Secondary orb */}
    <div 
      className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-revolutionary-float"
      style={{ animationDelay: '2s' }}
    />
    
    {/* Tertiary orb */}
    <div 
      className="absolute top-1/2 left-3/4 w-64 h-64 bg-gradient-to-r from-emerald-500/10 via-green-500/5 to-transparent rounded-full blur-3xl animate-revolutionary-float"
      style={{ animationDelay: '4s' }}
    />
    
    {/* Accent orbs */}
    <div 
      className="absolute top-1/6 right-1/3 w-48 h-48 bg-gradient-to-r from-violet-500/8 via-pink-500/4 to-transparent rounded-full blur-2xl animate-revolutionary-pulse"
      style={{ animationDelay: '1s' }}
    />
    
    <div 
      className="absolute bottom-1/4 left-1/6 w-40 h-40 bg-gradient-to-r from-amber-500/8 via-orange-500/4 to-transparent rounded-full blur-2xl animate-revolutionary-pulse"
      style={{ animationDelay: '3s' }}
    />
  </div>
));

FloatingOrbs.displayName = 'FloatingOrbs';
