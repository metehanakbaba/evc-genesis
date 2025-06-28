'use client';

import React from 'react';
import Link from 'next/link';

export default function SessionsPage() {
  return (
    <div className="space-y-8">
      {/* Sessions Hero Section */}
      <div className="glass-card p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🔋 Live Charging Sessions
        </h1>
        <p className="text-gray-300 text-lg">
          Real-time monitoring & session management
        </p>
      </div>

      {/* Sessions Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-emerald-400 mb-2">23</div>
          <div className="text-gray-300">Active Sessions</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">187</div>
          <div className="text-gray-300">Completed Today</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">3.2 MW</div>
          <div className="text-gray-300">Power Output</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-amber-400 mb-2">₺8,524</div>
          <div className="text-gray-300">Revenue Flow</div>
        </div>
      </div>
      
      <div className="text-center">
        <Link href="/" className="text-blue-400 hover:text-blue-300">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
