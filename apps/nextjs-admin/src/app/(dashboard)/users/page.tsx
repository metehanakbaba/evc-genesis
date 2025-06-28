'use client';

import React from 'react';
import Link from 'next/link';

export default function UsersPage() {
  return (
      <div className="space-y-8">
      {/* Users Hero Section */}
      <div className="glass-card p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          👥 User Management
              </h1>
              <p className="text-gray-300 text-lg">
                Role-based access control & account administration
              </p>
            </div>

      {/* Users Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">2,847</div>
          <div className="text-gray-300">Total Users</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">12</div>
          <div className="text-gray-300">Active Admins</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-teal-400 mb-2">89</div>
          <div className="text-gray-300">Field Workers</div>
          </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-emerald-400 mb-2">23</div>
          <div className="text-gray-300">New Registrations</div>
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
