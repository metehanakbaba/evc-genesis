import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const features = [
    {
      title: 'Admin Dashboard',
      description: 'Complete admin dashboard with analytics',
      href: '/admin',
      icon: '⚡',
      color: 'from-primary-500 to-primary-600'
    },
    {
      title: 'Charging Stations',
      description: 'Manage EV charging stations',
      href: '/stations',
      icon: '🔌',
      color: 'from-electric-500 to-electric-600'
    },
    {
      title: 'User Sessions',
      description: 'Monitor charging sessions',
      href: '/sessions',
      icon: '📊',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'User Management',
      description: 'Manage platform users',
      href: '/users',
      icon: '👥',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Wallet System',
      description: 'Payment and wallet management',
      href: '/wallets',
      icon: '💳',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Authentication',
      description: 'Login and security',
      href: '/auth',
      icon: '🔐',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="glass-card p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          ⚡ EV Charging Admin Panel
        </h1>
        <p className="text-gray-300 text-lg">
          React 19 + Next.js 15 + Turbopack + Tailwind v4
        </p>
        <div className="mt-6 text-sm text-gray-400">
          Production Ready | Server Components | React Compiler Ready
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group glass-card p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-400">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Stations', value: '1,247', change: '+12%' },
          { label: 'Active Sessions', value: '342', change: '+8%' },
          { label: 'Revenue Today', value: '$12,450', change: '+24%' },
          { label: 'System Health', value: '99.8%', change: '+0.2%' }
        ].map((stat, index) => (
          <div key={index} className="glass-card p-4">
            <div className="text-sm text-gray-400">{stat.label}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-green-400">{stat.change}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 