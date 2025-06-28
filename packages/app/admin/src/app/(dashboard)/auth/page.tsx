import React from 'react';
import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className="space-y-8">
      {/* Auth Hero Section */}
      <div className="glass-card p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🔐 Authentication & Security
        </h1>
        <p className="text-gray-300 text-lg">
          Login, Registration & User Security Management
        </p>
      </div>

      {/* Auth Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/auth/login"
          className="group glass-card p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            🚪
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Login Portal
          </h3>
          <p className="text-gray-400">
            Secure admin login with React 19 forms
          </p>
        </Link>

        <Link
          href="/auth/register"
          className="group glass-card p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            📝
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Registration
          </h3>
          <p className="text-gray-400">
            Create new admin accounts
          </p>
        </Link>

        <Link
          href="/auth/security"
          className="group glass-card p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            🛡️
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Security Settings
          </h3>
          <p className="text-gray-400">
            2FA, password policies, sessions
          </p>
        </Link>
      </div>

      {/* Auth Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Sessions', value: '23', change: '+3' },
          { label: 'Failed Logins', value: '0', change: '0%' },
          { label: 'Admin Users', value: '5', change: '+1' },
          { label: 'Security Score', value: '98%', change: '+2%' }
        ].map((stat, index) => (
          <div key={index} className="glass-card p-4">
            <div className="text-sm text-gray-400">{stat.label}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-green-400">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Back to Dashboard */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 glass-card px-6 py-3 text-white hover:scale-105 transition-all"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
} 