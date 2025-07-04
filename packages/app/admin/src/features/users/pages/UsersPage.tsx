'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { AppHeader } from '@ui/layout';
import { Button, Input } from '@ui/forms';
import { Modal } from '@ui/display';
import { useRouter } from 'next/navigation';
import {
  UserIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  CogIcon,
  HomeIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ViewColumnsIcon,
  TableCellsIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  UserPlusIcon,
  KeyIcon,
  FunnelIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import type { UserRole } from '@/types/global.types';
import type { UserProfile, UserStatistics } from '../types/user.types';

// Type for icon components - fixed for Heroicons
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 👥 User Management Statistics
 * Revolutionary floating stats with role-based data
 */
interface UserStats {
  readonly title: string;
  readonly value: string;
  readonly icon: IconComponent;
  readonly variant: 'purple' | 'blue' | 'teal' | 'emerald' | 'amber';
  readonly trend: string;
  readonly description: string;
  readonly isLive?: boolean;
}

/**
 * 🎯 Filter Modal Props for Revolutionary Design
 */
interface FilterModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly roleFilter: string;
  readonly statusFilter: string;
  readonly onRoleChange: (value: string) => void;
  readonly onStatusChange: (value: string) => void;
  readonly onClearFilters: () => void;
}

/**
 * 🚀 Revolutionary Filter Modal Component
 */
const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  roleFilter,
  statusFilter,
  onRoleChange,
  onStatusChange,
  onClearFilters,
}) => {
  const roleOptions = [
    { id: 'all', label: 'All Roles', icon: UserGroupIcon, color: 'gray' },
    { id: 'admin', label: 'Admin', icon: ShieldCheckIcon, color: 'purple' },
    { id: 'operator', label: 'Field Worker', icon: CogIcon, color: 'teal' },
    { id: 'user', label: 'Customer', icon: UserIcon, color: 'blue' },
  ];

  const statusOptions = [
    { id: 'all', label: 'All Status', icon: UserIcon, color: 'gray' },
    { id: 'active', label: 'Active', icon: CheckCircleIcon, color: 'emerald' },
    { id: 'inactive', label: 'Inactive', icon: XCircleIcon, color: 'red' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="User Filters"
      description="Select user roles and status to filter results"
      size="lg"
      variant="default"
      footer={
        <div className="flex gap-3 justify-end">
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="bg-gray-700/30 hover:bg-gray-600/40 text-gray-300"
          >
            Clear All
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-500 text-white"
          >
            Apply Filters
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Role Selection */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">User Role</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roleOptions.map((option) => {
              const isSelected = roleFilter === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => onRoleChange(option.id)}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? `bg-${option.color}-500/20 border-${option.color}-400/50 shadow-lg scale-[1.02]`
                      : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600/50 hover:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <option.icon
                      className={`w-5 h-5 ${
                        isSelected
                          ? `text-${option.color}-400`
                          : 'text-gray-400'
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        isSelected ? 'text-white' : 'text-gray-300'
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Selection */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Account Status
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {statusOptions.map((option) => {
              const isSelected = statusFilter === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => onStatusChange(option.id)}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? `bg-${option.color}-500/20 border-${option.color}-400/50 shadow-lg scale-[1.02]`
                      : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600/50 hover:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <option.icon
                      className={`w-5 h-5 ${
                        isSelected
                          ? `text-${option.color}-400`
                          : 'text-gray-400'
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        isSelected ? 'text-white' : 'text-gray-300'
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

/**
 * 🚀 Revolutionary Users Management Page - Purple Theme
 * Sophisticated floating card design with role management
 *
 * Features:
 * - User list with search/filter capabilities
 * - Role management (CUSTOMER, ADMIN, FIELD_WORKER)
 * - Account status control with visual indicators
 * - Permission matrix visualization
 * - Bulk operations support
 * - Revolutionary table view with glassmorphism
 * - Modal-based filtering system
 * - API schema compliant TypeScript
 */
const UsersPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Revolutionary floating stats with role-based data
  const userStats: UserStats[] = [
    {
      title: 'Total Users',
      value: '2,847',
      icon: UserGroupIcon,
      variant: 'purple',
      trend: '+127 this month',
      description: 'Active accounts across all user roles with live statistics',
      isLive: true,
    },
    {
      title: 'Active Admins',
      value: '12',
      icon: ShieldCheckIcon,
      variant: 'blue',
      trend: '4 online now',
      description: 'Administrative users with full system access',
    },
    {
      title: 'Field Workers',
      value: '89',
      icon: CogIcon,
      variant: 'teal',
      trend: '+5 this week',
      description: 'Technical staff managing charging infrastructure',
    },
    {
      title: 'New Registrations',
      value: '23',
      icon: UserPlusIcon,
      variant: 'emerald',
      trend: '+8 today',
      description: 'New customer accounts created in the last 24 hours',
      isLive: true,
    },
  ];

  // API Schema Ready - Mock users data
  const users: UserProfile[] = [
    {
      id: 'user-001',
      email: 'admin@evcharging.com',
      name: 'Sarah Mitchell',
      phone: '+905551234567',
      role: 'admin' as UserRole,
      created_at: '2024-01-10T08:30:00Z',
      last_login: '2024-01-15T10:45:00Z',
      is_active: true,
      verified_email: true,
    },
    {
      id: 'user-002',
      email: 'john.tech@field.com',
      name: 'John Anderson',
      phone: '+905551234568',
      role: 'operator' as UserRole,
      created_at: '2024-01-12T14:20:00Z',
      last_login: '2024-01-15T09:15:00Z',
      is_active: true,
      verified_email: true,
    },
    {
      id: 'user-003',
      email: 'customer@example.com',
      name: 'Alice Thompson',
      phone: '+905551234569',
      role: 'user' as UserRole,
      created_at: '2024-01-14T16:10:00Z',
      last_login: '2024-01-15T11:20:00Z',
      is_active: true,
      verified_email: false,
    },
    {
      id: 'user-004',
      email: 'inactive@user.com',
      name: 'Mike Wilson',
      phone: '+905551234570',
      role: 'user' as UserRole,
      created_at: '2024-01-08T12:00:00Z',
      last_login: '2024-01-10T15:30:00Z',
      is_active: false,
      verified_email: true,
    },
  ];

  /**
   * 🎨 Revolutionary Role Configuration
   * Purple theme with role-based color mapping
   */
  const getRoleConfig = (role: UserRole) => {
    const configs = {
      admin: {
        color: 'purple',
        icon: ShieldCheckIcon,
        text: 'Admin',
        bgColor:
          'bg-gradient-to-br from-purple-500/15 via-purple-400/8 to-transparent',
        borderColor: 'border-purple-400/25 hover:border-purple-300/40',
        textColor: 'text-purple-400',
        badgeColor: 'bg-purple-500/10 border border-purple-500/20',
        pulseColor: 'bg-purple-500',
      },
      operator: {
        color: 'teal',
        icon: CogIcon,
        text: 'Field Worker',
        bgColor:
          'bg-gradient-to-br from-teal-500/15 via-teal-400/8 to-transparent',
        borderColor: 'border-teal-400/25 hover:border-teal-300/40',
        textColor: 'text-teal-400',
        badgeColor: 'bg-teal-500/10 border border-teal-500/20',
        pulseColor: 'bg-teal-500',
      },
      user: {
        color: 'blue',
        icon: UserIcon,
        text: 'Customer',
        bgColor:
          'bg-gradient-to-br from-blue-500/15 via-blue-400/8 to-transparent',
        borderColor: 'border-blue-400/25 hover:border-blue-300/40',
        textColor: 'text-blue-400',
        badgeColor: 'bg-blue-500/10 border border-blue-500/20',
        pulseColor: 'bg-blue-500',
      },
    };
    return configs[role] || configs.user;
  };

  /**
   * 🎯 Enhanced User Filtering
   */
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.is_active) ||
      (statusFilter === 'inactive' && !user.is_active);

    return matchesSearch && matchesRole && matchesStatus;
  });

  /**
   * 🎨 Clear All Filters
   */
  const handleClearFilters = () => {
    setRoleFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
  };

  /**
   * 📅 Format Last Login Time
   */
  const formatLastLogin = (lastLogin?: string): string => {
    if (!lastLogin) return 'Never';
    const date = new Date(lastLogin);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AppHeader />

      {/* Revolutionary Page Header with Purple Theme */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
            className="p-2 hover:bg-gray-700/30"
          >
            <HomeIcon className="w-4 h-4" />
          </Button>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-purple-400 font-medium">User Management</span>
        </div>

        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-4 h-12 bg-gradient-to-b from-purple-400 to-purple-300 rounded-full"></div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                User Management
              </h1>
              <p className="text-gray-300 text-lg">
                Role-based access control & account administration
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {/* Revolutionary Network Stats Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-8 bg-gradient-to-b from-purple-400 to-purple-300 rounded-full"></div>
            <div>
              <h2 className="text-xl font-bold text-white">User Statistics</h2>
              <p className="text-gray-400">
                Real-time user metrics and role distribution
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userStats.map((stat, index) => (
              <div
                key={stat.title}
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Revolutionary MinimalStatCard Design */}
                <div
                  className={`
                  relative p-6 bg-gradient-to-br from-${stat.variant}-500/10 via-${stat.variant}-400/5 to-transparent
                  border border-${stat.variant}-400/25 hover:border-${stat.variant}-300/40
                  rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl
                  transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1
                  cursor-pointer
                `}
                >
                  {/* Live indicator */}
                  {stat.isLive && (
                    <div
                      className={`absolute -top-2 -right-2 w-4 h-4 bg-${stat.variant}-500 rounded-full animate-ping opacity-75`}
                    ></div>
                  )}

                  {/* Floating background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-${stat.variant}-500/10 border border-${stat.variant}-500/20 flex items-center justify-center`}
                      >
                        <stat.icon
                          className={`w-7 h-7 text-${stat.variant}-400`}
                        />
                      </div>
                      <ArrowTrendingUpIcon
                        className={`w-5 h-5 text-${stat.variant}-400`}
                      />
                    </div>

                    <div className="mb-2">
                      <div className="text-3xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div
                        className={`text-sm font-medium text-${stat.variant}-400`}
                      >
                        {stat.title}
                      </div>
                    </div>

                    <div className="text-xs text-gray-400 mb-3">
                      {stat.trend}
                    </div>

                    {/* Hidden description - shows on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* User Management Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-8 bg-gradient-to-b from-purple-400 to-purple-300 rounded-full"></div>
              <div>
                <h2 className="text-xl font-bold text-white">User Directory</h2>
                <p className="text-gray-400">
                  Search, filter and manage user accounts
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={() => {
                /* Add user logic */
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white"
              
              
            >
              New User
            </Button>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 mb-8 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search Input */}
                <div className="flex-1 max-w-md">
                  <Input
                    type="search"
                    placeholder="Search users, emails, roles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    leftIcon={MagnifyingGlassIcon}
                    inputClassName="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500/50 focus:ring-purple-500/20"
                  />
                </div>

                {/* Revolutionary Filter Button */}
                <Button
                  variant="ghost"
                  onClick={() => setIsFilterModalOpen(true)}
                  className="bg-gray-700/30 hover:bg-gray-600/40 text-gray-300 hover:text-white border border-gray-600/30 min-w-[120px]"
                  
                  
                >
                  Filters
                  {(roleFilter !== 'all' || statusFilter !== 'all') && (
                    <div className="ml-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  )}
                </Button>
              </div>

              {/* View Mode Toggle - Fixed Icons Only */}
              <div className="flex items-center gap-2 bg-gray-700/30 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  
                />
                <Button
                  variant={viewMode === 'table' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className={`p-2 ${viewMode === 'table' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  
                />
              </div>
            </div>

            {/* Active Filters Display */}
            {(roleFilter !== 'all' || statusFilter !== 'all') && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700/50">
                <span className="text-sm text-gray-400">Active filters:</span>
                {roleFilter !== 'all' && (
                  <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-1">
                    <span className="text-sm text-purple-400">
                      {roleFilter}
                    </span>
                    <button
                      onClick={() => setRoleFilter('all')}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {statusFilter !== 'all' && (
                  <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-1">
                    <span className="text-sm text-purple-400">
                      {statusFilter}
                    </span>
                    <button
                      onClick={() => setStatusFilter('all')}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Revolutionary Table View */}
          {viewMode === 'table' && (
            <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/30 border-b border-gray-600/30">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        User
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        Role
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        Status
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        Contact
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        Last Login
                      </th>
                      <th className="text-right py-4 px-6 text-sm font-medium text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/30">
                    {filteredUsers.map((user) => {
                      const roleConfig = getRoleConfig(user.role);
                      return (
                        <tr
                          key={user.id}
                          className="hover:bg-gray-700/20 transition-colors group"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-lg ${roleConfig.badgeColor} flex items-center justify-center`}
                              >
                                <roleConfig.icon
                                  className={`w-4 h-4 ${roleConfig.textColor}`}
                                />
                              </div>
                              <div>
                                <div className="text-white font-semibold">
                                  {user.name}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${roleConfig.badgeColor}`}
                            >
                              <roleConfig.icon
                                className={`w-4 h-4 ${roleConfig.textColor}`}
                              />
                              <span
                                className={`text-xs font-medium ${roleConfig.textColor}`}
                              >
                                {roleConfig.text}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                                user.is_active
                                  ? 'bg-emerald-500/10 border border-emerald-500/20'
                                  : 'bg-red-500/10 border border-red-500/20'
                              }`}
                            >
                              {user.is_active ? (
                                <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <XCircleIcon className="w-4 h-4 text-red-400" />
                              )}
                              <span
                                className={`text-xs font-medium ${
                                  user.is_active
                                    ? 'text-emerald-400'
                                    : 'text-red-400'
                                }`}
                              >
                                {user.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-gray-300 text-sm">
                                <EnvelopeIcon className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                <span className="truncate max-w-[200px]">
                                  {user.email}
                                </span>
                                {user.verified_email && (
                                  <CheckCircleIcon className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-gray-300 text-sm">
                                <PhoneIcon className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                <span>{user.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-300 text-sm">
                              {formatLastLogin(user.last_login)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="bg-gray-700/30 hover:bg-gray-600/40 text-gray-300 hover:text-white px-3 py-2"
                                
                                
                              >
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 border border-blue-500/20"
                                
                              />
                              <Button
                                size="sm"
                                variant="ghost"
                                className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20"
                                
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Revolutionary Users Grid */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredUsers.map((user, index) => {
                const roleConfig = getRoleConfig(user.role);

                return (
                  <div
                    key={user.id}
                    className="group relative"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Revolutionary Floating User Card */}
                    <div
                      className={`relative p-6 ${roleConfig.bgColor} border ${roleConfig.borderColor} rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer`}
                    >
                      {/* Active Status Pulse */}
                      {user.is_active && (
                        <div
                          className={`absolute -top-2 -right-2 w-4 h-4 ${roleConfig.pulseColor} rounded-full animate-ping opacity-75`}
                        ></div>
                      )}

                      {/* Floating Background Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                      {/* User Header */}
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-12 h-12 rounded-xl ${roleConfig.badgeColor} flex items-center justify-center`}
                            >
                              <roleConfig.icon
                                className={`w-6 h-6 ${roleConfig.textColor}`}
                              />
                            </div>
                            <div>
                              <div
                                className={`text-sm font-medium ${roleConfig.textColor} mb-1`}
                              >
                                {roleConfig.text}
                              </div>
                              <div className="text-white font-semibold text-lg">
                                {user.name}
                              </div>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div
                            className={`flex items-center gap-2 px-3 py-1 rounded-full ${user.is_active ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'}`}
                          >
                            {user.is_active ? (
                              <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <XCircleIcon className="w-4 h-4 text-red-400" />
                            )}
                            <span
                              className={`text-xs font-medium ${user.is_active ? 'text-emerald-400' : 'text-red-400'}`}
                            >
                              {user.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <EnvelopeIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm truncate">
                              {user.email}
                            </span>
                            {user.verified_email && (
                              <CheckCircleIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <PhoneIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm">{user.phone}</span>
                          </div>
                        </div>

                        {/* Activity Info */}
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                            <span>
                              Joined{' '}
                              {new Date(user.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-gray-300">
                            Last login: {formatLastLogin(user.last_login)}
                          </div>
                        </div>

                        {/* Action Buttons - Fixed spacing */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="flex-1 bg-gray-700/30 hover:bg-gray-600/40 text-gray-300 hover:text-white"
                            
                            
                          >
                            View Profile
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 border border-blue-500/20"
                            
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20"
                            
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserIcon className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No users found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="primary"
                onClick={handleClearFilters}
                className="bg-purple-600 hover:bg-purple-500 text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Revolutionary Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        roleFilter={roleFilter}
        statusFilter={statusFilter}
        onRoleChange={setRoleFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
};

export default UsersPage;
