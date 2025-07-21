'use client';

// ✅ Import shared business logic
import { getRoleOptions, getStatusOptions } from '@evc/shared-business-logic';
import {
  CheckCircleIcon,
  CogIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  UserIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Modal } from '@ui/display';
import { Button } from '@ui/forms';
import type React from 'react';

// Type for icon components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 🎯 Filter Option Interface
 */
interface FilterOption {
  readonly id: string;
  readonly label: string;
  readonly icon: IconComponent;
  readonly color: string;
}

/**
 * 🎯 User Filter Modal Props
 */
export interface UserFilterModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly roleFilter: string;
  readonly statusFilter: string;
  readonly onRoleChange: (value: string) => void;
  readonly onStatusChange: (value: string) => void;
  readonly onClearFilters: () => void;
  readonly customRoleOptions?: FilterOption[];
  readonly customStatusOptions?: FilterOption[];
  readonly variant?: 'default' | 'teal' | 'blue' | 'purple' | 'emerald';
}

/**
 * 🚀 Revolutionary User Filter Modal Component
 * Reusable filter modal for user filtering with role and status options
 */
export const UserFilterModal: React.FC<UserFilterModalProps> = ({
  isOpen,
  onClose,
  roleFilter,
  statusFilter,
  onRoleChange,
  onStatusChange,
  onClearFilters,
  customRoleOptions,
  customStatusOptions,
  variant = 'purple',
}) => {
  // ✅ Use shared business logic for filter options
  const defaultRoleOptions: FilterOption[] = getRoleOptions().map((option) => ({
    ...option,
    icon:
      option.icon === 'UserGroupIcon'
        ? UserGroupIcon
        : option.icon === 'ShieldCheckIcon'
          ? ShieldCheckIcon
          : option.icon === 'CogIcon'
            ? CogIcon
            : UserIcon,
  }));

  const defaultStatusOptions: FilterOption[] = getStatusOptions().map(
    (option) => ({
      ...option,
      icon:
        option.icon === 'CheckCircleIcon'
          ? CheckCircleIcon
          : option.icon === 'XCircleIcon'
            ? XCircleIcon
            : UserIcon,
    }),
  );

  // Use custom options if provided, otherwise use defaults
  const roleOptions = customRoleOptions || defaultRoleOptions;
  const statusOptions = customStatusOptions || defaultStatusOptions;

  /**
   * 🎨 Render Filter Option Button
   */
  const renderFilterOption = (
    option: FilterOption,
    isSelected: boolean,
    onClick: () => void,
  ) => {
    const IconComponent = option.icon;

    return (
      <button
        key={option.id}
        onClick={onClick}
        className={`
          group relative p-4 rounded-xl border transition-all duration-300 ease-out
          ${
            isSelected
              ? `bg-gradient-to-r from-${option.color}-500/20 via-${option.color}-400/15 to-${option.color}-500/20 
               border-${option.color}-400/50 text-${option.color}-300 shadow-lg shadow-${option.color}-500/20
               scale-[1.02]`
              : `bg-gradient-to-r from-gray-700/30 via-gray-600/20 to-gray-700/30
               border-gray-600/30 text-gray-300 hover:bg-gray-600/40 hover:border-gray-500/50
               hover:scale-[1.01]`
          }
          overflow-hidden
          before:absolute before:inset-0 before:bg-gradient-to-r 
          before:from-transparent before:via-white/5 before:to-transparent
          before:translate-x-[-100%] hover:before:translate-x-[100%]
          before:transition-transform before:duration-700
        `}
      >
        {/* Background shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl ${
              isSelected
                ? `bg-${option.color}-500/20 border border-${option.color}-400/30`
                : 'bg-gray-600/30 border border-gray-500/30'
            } flex items-center justify-center transition-all duration-300`}
          >
            <IconComponent
              className={`w-5 h-5 ${
                isSelected
                  ? `text-${option.color}-400`
                  : 'text-gray-400 group-hover:text-gray-300'
              } transition-colors duration-300`}
            />
          </div>
          <div className="text-left">
            <span
              className={`font-medium text-sm ${
                isSelected ? `text-${option.color}-300` : 'text-gray-300'
              }`}
            >
              {option.label}
            </span>
          </div>
        </div>
      </button>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Identity Access Control Filters"
      description="Configure role-based access criteria and account status parameters"
      size="lg"
      variant="default"
      footer={
        <div className="flex gap-3 justify-end">
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="
              relative overflow-hidden group/clear
              bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40
              hover:from-gray-600/50 hover:via-gray-500/40 hover:to-gray-600/50
              text-gray-300 hover:text-white
              border border-gray-600/30 hover:border-gray-500/50
              transition-all duration-300 ease-out
              hover:scale-[1.02] active:scale-[0.98]
              flex items-center
              before:absolute before:inset-0 before:bg-gradient-to-r 
              before:from-transparent before:via-white/10 before:to-transparent
              before:translate-x-[-100%] hover:before:translate-x-[100%]
              before:transition-transform before:duration-500
            "
          >
            <div className="flex items-center gap-2 relative z-10">
              <XMarkIcon className="w-4 h-4 group-hover/clear:rotate-90 transition-transform duration-300" />
              <span className="font-medium">Reset Criteria</span>
            </div>
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
            className={`
              relative overflow-hidden group/apply
              bg-gradient-to-r from-${variant}-600 via-${variant}-500 to-${variant}-600
              hover:from-${variant}-500 hover:via-${variant}-400 hover:to-${variant}-500
              text-white font-semibold
              shadow-lg shadow-${variant}-500/25 hover:shadow-xl hover:shadow-${variant}-400/30
              border border-${variant}-400/20 hover:border-${variant}-300/40
              transition-all duration-300 ease-out
              hover:scale-[1.02] active:scale-[0.98]
              flex items-center
              before:absolute before:inset-0 before:bg-gradient-to-r 
              before:from-transparent before:via-white/20 before:to-transparent
              before:translate-x-[-100%] hover:before:translate-x-[100%]
              before:transition-transform before:duration-700
            `}
          >
            <span className="relative z-10 font-medium">
              Apply Configuration
            </span>
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Revolutionary User Role Selection */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <UserGroupIcon className={`w-5 h-5 text-${variant}-400`} />
            Organizational Role Classification
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roleOptions.map((role) =>
              renderFilterOption(role, roleFilter === role.id, () =>
                onRoleChange(role.id),
              ),
            )}
          </div>
        </div>

        {/* Revolutionary Account Status Selection */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircleIcon className={`w-5 h-5 text-${variant}-400`} />
            Authentication Status Classification
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {statusOptions.map((status) =>
              renderFilterOption(status, statusFilter === status.id, () =>
                onStatusChange(status.id),
              ),
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserFilterModal;
