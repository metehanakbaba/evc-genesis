'use client';

import {
  BoltIcon,
  CheckCircleIcon,
  ClockIcon,
  FireIcon,
  PlayIcon,
  ViewColumnsIcon,
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
 * 🎯 Session Filter Modal Props
 */
export interface SessionFilterModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly statusFilter: string;
  readonly connectorTypeFilter: string;
  readonly powerOutputFilter: string;
  readonly onStatusChange: (value: string) => void;
  readonly onConnectorTypeChange: (value: string) => void;
  readonly onPowerOutputChange: (value: string) => void;
  readonly onClearFilters: () => void;
  readonly customStatusOptions?: FilterOption[];
  readonly customConnectorOptions?: FilterOption[];
  readonly customPowerOptions?: FilterOption[];
}

/**
 * 🚀 Revolutionary Session Filter Modal Component
 * Reusable filter modal for session filtering
 */
export const SessionFilterModal: React.FC<SessionFilterModalProps> = ({
  isOpen,
  onClose,
  statusFilter,
  connectorTypeFilter,
  powerOutputFilter,
  onStatusChange,
  onConnectorTypeChange,
  onPowerOutputChange,
  onClearFilters,
  customStatusOptions,
  customConnectorOptions,
  customPowerOptions,
}) => {
  // Default session status options
  const defaultStatusOptions: FilterOption[] = [
    { id: 'all', label: 'All Status', icon: ViewColumnsIcon, color: 'gray' },
    { id: 'charging', label: 'Charging', icon: BoltIcon, color: 'emerald' },
    { id: 'starting', label: 'Starting', icon: PlayIcon, color: 'blue' },
    { id: 'completed', label: 'Completed', icon: CheckCircleIcon, color: 'emerald' },
    { id: 'failed', label: 'Failed', icon: XCircleIcon, color: 'red' },
    { id: 'cancelled', label: 'Cancelled', icon: XMarkIcon, color: 'red' },
  ];

  // Default connector type options
  const defaultConnectorOptions: FilterOption[] = [
    { id: 'all', label: 'All Connectors', icon: ViewColumnsIcon, color: 'gray' },
    { id: 'CCS', label: 'CCS', icon: BoltIcon, color: 'blue' },
    { id: 'CHAdeMO', label: 'CHAdeMO', icon: BoltIcon, color: 'purple' },
    { id: 'Type2', label: 'Type 2', icon: BoltIcon, color: 'green' },
    { id: 'CCS_CHAdeMO', label: 'CCS + CHAdeMO', icon: BoltIcon, color: 'amber' },
  ];

  // Default power output options
  const defaultPowerOptions: FilterOption[] = [
    { id: 'all', label: 'All Power Levels', icon: ViewColumnsIcon, color: 'gray' },
    { id: 'fast', label: 'Fast (50kW+)', icon: FireIcon, color: 'red' },
    { id: 'slow', label: 'Standard (<50kW)', icon: BoltIcon, color: 'blue' },
  ];

  // Use custom options if provided, otherwise use defaults
  const statusOptions = customStatusOptions || defaultStatusOptions;
  const connectorOptions = customConnectorOptions || defaultConnectorOptions;
  const powerOptions = customPowerOptions || defaultPowerOptions;

  /**
   * 🎨 Render Filter Option Button
   */
  const renderFilterOption = (
    option: FilterOption,
    isSelected: boolean,
    onClick: () => void
  ) => {
    const IconComponent = option.icon;
    
    return (
      <button
        key={option.id}
        onClick={onClick}
        className={`
          group relative p-4 rounded-xl border transition-all duration-300 ease-out
          ${isSelected
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
              ${isSelected
                ? `bg-${option.color}-500/20 border border-${option.color}-400/30`
                : `bg-gray-600/30 border border-gray-500/30 group-hover:bg-gray-500/40`
              }
            `}
          >
            <IconComponent 
              className={`
                w-5 h-5 transition-transform duration-300
                ${isSelected 
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Session Filters"
      description="Filter sessions by status, connector type, and power output"
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
              <span className="font-medium">Clear All</span>
            </div>
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
            className="
              relative overflow-hidden group/apply
              bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600
              hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-500
              text-white font-semibold
              shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-400/30
              border border-emerald-400/20 hover:border-emerald-300/40
              transition-all duration-300 ease-out
              hover:scale-[1.02] active:scale-[0.98]
              flex items-center
              before:absolute before:inset-0 before:bg-gradient-to-r 
              before:from-transparent before:via-white/20 before:to-transparent
              before:translate-x-[-100%] hover:before:translate-x-[100%]
              before:transition-transform before:duration-700
            "
          >
            <span className="relative z-10 font-medium">Apply Filters</span>
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Revolutionary Session Status Selection */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Session Status</h3>
          <div className="grid grid-cols-2 gap-3">
            {statusOptions.map((status) =>
              renderFilterOption(
                status,
                statusFilter === status.id,
                () => onStatusChange(status.id)
              )
            )}
          </div>
        </div>

        {/* Revolutionary Connector Type Selection */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Connector Type</h3>
          <div className="grid grid-cols-2 gap-3">
            {connectorOptions.map((connector) =>
              renderFilterOption(
                connector,
                connectorTypeFilter === connector.id,
                () => onConnectorTypeChange(connector.id)
              )
            )}
          </div>
        </div>

        {/* Revolutionary Power Output Selection */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Power Output</h3>
          <div className="grid grid-cols-2 gap-3">
            {powerOptions.map((power) =>
              renderFilterOption(
                power,
                powerOutputFilter === power.id,
                () => onPowerOutputChange(power.id)
              )
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SessionFilterModal; 