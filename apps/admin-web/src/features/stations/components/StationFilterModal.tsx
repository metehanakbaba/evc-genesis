'use client';

import {
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import type React from 'react';
import { useEffect } from 'react';

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

interface StationFilterModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly statusFilter: string;
  readonly connectorTypeFilter: string;
  readonly onStatusChange: (status: string) => void;
  readonly onConnectorTypeChange: (type: string) => void;
  readonly onClearFilters: () => void;
}

export const StationFilterModal: React.FC<StationFilterModalProps> = ({
  isOpen,
  onClose,
  statusFilter,
  connectorTypeFilter,
  onStatusChange,
  onConnectorTypeChange,
  onClearFilters,
}) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Enterprise operational status options
  const statusOptions: FilterOption[] = [
    {
      id: 'all',
      label: 'All Classifications',
      icon: MagnifyingGlassIcon,
      color: 'gray',
    },
    { id: 'active', label: 'Operational', icon: FunnelIcon, color: 'emerald' },
    { id: 'offline', label: 'Non-Operational', icon: XMarkIcon, color: 'red' },
    {
      id: 'maintenance',
      label: 'Service Mode',
      icon: FunnelIcon,
      color: 'amber',
    },
  ];

  // Enterprise connector technology standards
  const connectorTypeOptions: FilterOption[] = [
    {
      id: 'all',
      label: 'All Standards',
      icon: MagnifyingGlassIcon,
      color: 'gray',
    },
    {
      id: 'CCS2',
      label: 'CCS2 Standard',
      icon: MagnifyingGlassIcon,
      color: 'blue',
    },
    {
      id: 'CHAdeMO',
      label: 'CHAdeMO Protocol',
      icon: MagnifyingGlassIcon,
      color: 'purple',
    },
    {
      id: 'Type2',
      label: 'Type 2 (IEC 62196)',
      icon: MagnifyingGlassIcon,
      color: 'green',
    },
    { id: 'AC', label: 'AC Current', icon: MagnifyingGlassIcon, color: 'cyan' },
    { id: 'DC', label: 'DC Current', icon: MagnifyingGlassIcon, color: 'pink' },
  ];

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
        <div className="flex items-center gap-3 relative z-10">
          <div
            className={`
              w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
              ${
                isSelected
                  ? `bg-${option.color}-500/20 border border-${option.color}-400/30`
                  : `bg-gray-600/30 border border-gray-500/30 group-hover:bg-gray-500/40`
              }
            `}
          >
            <IconComponent
              className={`
                w-5 h-5 transition-transform duration-300
                ${
                  isSelected
                    ? `text-${option.color}-400 scale-110`
                    : `text-gray-400 group-hover:text-gray-300 group-hover:scale-105`
                }
              `}
            />
          </div>
          <span className="font-medium text-sm">{option.label}</span>
        </div>
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-blue-400/25 rounded-2xl shadow-2xl backdrop-blur-xl transform transition-all duration-300 scale-100 opacity-100">
        {/* Floating Background Effects */}
        <div className="absolute inset-0 rounded-2xl">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between p-6 border-b border-blue-400/10">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <FunnelIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Infrastructure Asset Filters
              </h3>
              <p className="text-gray-400 text-sm">
                Configure operational status and connector standard criteria
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="
              flex-shrink-0 w-8 h-8 rounded-lg 
              bg-gray-500/10 border border-gray-500/20 
              hover:bg-gray-400/15 hover:border-gray-400/30 
              text-gray-400 hover:text-white 
              transition-all duration-300 ease-out
              hover:scale-105 active:scale-95
              flex items-center justify-center
              focus:outline-none focus:ring-2 focus:ring-blue-400/30
            "
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 space-y-8">
          {/* Revolutionary Station Status Selection */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Operational Status Classification
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {statusOptions.map((status) =>
                renderFilterOption(status, statusFilter === status.id, () =>
                  onStatusChange(status.id),
                ),
              )}
            </div>
          </div>

          {/* Revolutionary Connector Type Selection */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Connector Technology Standards
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {connectorTypeOptions.map((type) =>
                renderFilterOption(type, connectorTypeFilter === type.id, () =>
                  onConnectorTypeChange(type.id),
                ),
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex gap-3 justify-end p-6 border-t border-blue-400/10">
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
            className="
              relative overflow-hidden group/apply
              bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600
              hover:from-blue-500 hover:via-blue-400 hover:to-blue-500
              text-white font-semibold
              shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-400/30
              border border-blue-400/20 hover:border-blue-300/40
              transition-all duration-300 ease-out
              hover:scale-[1.02] active:scale-[0.98]
              flex items-center
              before:absolute before:inset-0 before:bg-gradient-to-r 
              before:from-transparent before:via-white/20 before:to-transparent
              before:translate-x-[-100%] hover:before:translate-x-[100%]
              before:transition-transform before:duration-700
            "
          >
            <span className="relative z-10 font-medium">
              Apply Configuration
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
