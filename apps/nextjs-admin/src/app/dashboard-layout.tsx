import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* EV Charging Admin Dashboard Layout */}
      <header className="glass-card border-b border-gray-700/50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="revolutionary-loader w-8 h-8 rounded-lg"></div>
            <h1 className="text-xl font-bold text-white">EV Charging Admin</h1>
          </div>
          <div className="text-sm text-gray-400">
            React 19 + Next.js 15 + Turbopack
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
} 