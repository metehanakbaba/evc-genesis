'use client';

import React from 'react';
import Link from 'next/link';

export default function WalletsPage() {
  return (
      <div className="space-y-8">
      {/* Wallets Hero Section */}
      <div className="glass-card p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          💳 Digital Wallets
        </h1>
        <p className="text-gray-300 text-lg">
          Payment system management & financial operations
        </p>
                  </div>

      {/* Wallets Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">₺1.2M</div>
          <div className="text-gray-300">Total Balance</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">1,247</div>
          <div className="text-gray-300">Active Wallets</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">342</div>
          <div className="text-gray-300">Daily Transactions</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-amber-400 mb-2">98.7%</div>
          <div className="text-gray-300">Success Rate</div>
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
