'use client';

import React from 'react';
import { 
  BulkActionBar, 
  useBulkSelection,
  type BulkAction 
} from '../BulkActionBar';
import {
  TrashIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  TagIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';

// Mock data for demonstration
const MOCK_USERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'moderator' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'user' },
  { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'admin' },
];

/**
 * 🎨 BulkActionBar Example Component
 * 
 * Demonstrates different configurations and usage patterns:
 * - Basic bulk actions (delete, activate, export)
 * - Conditional actions based on selection count
 * - Different visual variants
 * - Confirmation dialogs for dangerous actions
 */
export const BulkActionBarExample: React.FC = () => {
  const {
    selectedIds,
    selectedItems,
    selectedCount,
    isSelected,
    toggleItem,
    clearSelection,
  } = useBulkSelection(MOCK_USERS);

  // Example bulk actions with different variants and conditions
  const bulkActions: BulkAction[] = [
    {
      id: 'activate',
      label: 'Activate',
      icon: CheckCircleIcon,
      variant: 'success',
      onClick: async (ids) => {
        console.log('✅ Activating users:', ids);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        clearSelection();
      },
      show: (count) => count > 0,
      confirmMessage: 'Activate {count} selected users?',
    },
    {
      id: 'deactivate', 
      label: 'Deactivate',
      icon: ShieldExclamationIcon,
      variant: 'secondary',
      onClick: async (ids) => {
        console.log('⏸️ Deactivating users:', ids);
        await new Promise(resolve => setTimeout(resolve, 1000));
        clearSelection();
      },
      show: (count) => count > 0,
      confirmMessage: 'Deactivate {count} selected users?',
    },
    {
      id: 'export',
      label: 'Export',
      icon: ArrowDownTrayIcon,
      variant: 'primary',
      onClick: async (ids) => {
        console.log('📦 Exporting users:', ids);
        // Simulate export
        await new Promise(resolve => setTimeout(resolve, 500));
        alert(`Exported ${ids.length} users successfully!`);
      },
      show: (count) => count > 0,
      disabled: (count) => count > 50, // Don't allow export of too many items
      tooltip: 'Export selected users to CSV',
    },
    {
      id: 'tag',
      label: 'Add Tag',
      icon: TagIcon,
      variant: 'secondary',
      onClick: async (ids) => {
        const tag = prompt('Enter tag name:');
        if (tag) {
          console.log('🏷️ Adding tag to users:', { tag, ids });
          clearSelection();
        }
      },
      show: (count) => count > 0 && count <= 10, // Only show for small selections
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: TrashIcon,
      variant: 'danger',
      onClick: async (ids) => {
        console.log('🗑️ Deleting users:', ids);
        await new Promise(resolve => setTimeout(resolve, 1000));
        clearSelection();
      },
      show: (count) => count > 0,
      disabled: (count) => count > 5, // Prevent accidental bulk delete
      confirmMessage: '⚠️ PERMANENTLY DELETE {count} users? This cannot be undone!',
    },
  ];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          BulkActionBar Example
        </h2>
        <p className="text-gray-400">
          Select users below to see the BulkActionBar in action
        </p>
      </div>

      {/* Mock User List for Selection Demo */}
      <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-700/50">
          <h3 className="text-lg font-semibold text-white">
            Users ({MOCK_USERS.length})
          </h3>
          <p className="text-gray-400 text-sm">
            Click on users to select them for bulk operations
          </p>
        </div>
        
        <div className="divide-y divide-gray-700/30">
          {MOCK_USERS.map((user) => (
            <div
              key={user.id}
              onClick={() => toggleItem(user.id)}
              className={`
                p-4 cursor-pointer transition-all duration-200
                hover:bg-gradient-to-r hover:from-blue-500/5 hover:via-blue-400/3 hover:to-transparent
                ${isSelected(user.id) 
                  ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-blue-500/10 border-l-4 border-blue-400' 
                  : 'hover:border-l-4 hover:border-blue-400/50'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Selection Indicator */}
                  <div className={`
                    w-5 h-5 rounded-lg border-2 transition-all duration-200
                    flex items-center justify-center
                    ${isSelected(user.id)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400'
                      : 'border-gray-600 hover:border-blue-400'
                    }
                  `}>
                    {isSelected(user.id) && (
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                    )}
                  </div>
                  
                  <div>
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-gray-400 text-sm">{user.email}</div>
                  </div>
                </div>
                
                <div className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${user.role === 'admin' 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                    : user.role === 'moderator'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                  }
                `}>
                  {user.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selection Summary */}
      {selectedCount > 0 && (
        <div className="bg-blue-500/10 border border-blue-400/25 rounded-xl p-4">
          <h4 className="text-blue-300 font-semibold mb-2">
            Selected Items ({selectedCount})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedItems.map((user) => (
              <div
                key={user.id}
                className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
              >
                {user.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BulkActionBar Component Demo */}
      <BulkActionBar
        selectedCount={selectedCount}
        totalCount={MOCK_USERS.length}
        selectedIds={selectedIds}
        actions={bulkActions}
        onClearSelection={clearSelection}
        entityName="users"
        variant="blue"
      />

      {/* Different Variants Demo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-white font-semibold mb-3">Purple Variant</h4>
          <BulkActionBar
            selectedCount={2}
            selectedIds={['1', '2']}
            actions={bulkActions.slice(0, 2)}
            onClearSelection={() => {}}
            entityName="items"
            variant="purple"
          />
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-3">Emerald Variant</h4>
          <BulkActionBar
            selectedCount={3}
            selectedIds={['1', '2', '3']}
            actions={bulkActions.slice(2, 4)}
            onClearSelection={() => {}}
            entityName="records"
            variant="emerald"
          />
        </div>
      </div>

      {/* Usage Documentation */}
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4">
          🚀 Implementation Example
        </h4>
        <pre className="bg-gray-900/60 border border-gray-700/50 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto">
{`// 1. Import components
import { BulkActionBar, useBulkSelection } from '@/shared/ui';

// 2. Set up bulk selection
const {
  selectedIds,
  selectedCount,
  toggleItem,
  clearSelection,
} = useBulkSelection(items);

// 3. Define bulk actions
const bulkActions: BulkAction[] = [
  {
    id: 'delete',
    label: 'Delete',
    icon: TrashIcon,
    variant: 'danger',
    onClick: async (ids) => {
      // Handle bulk delete
      await deleteItems(ids);
      clearSelection();
    },
    confirmMessage: 'Delete {count} items?',
  },
];

// 4. Render the component
<BulkActionBar
  selectedCount={selectedCount}
  selectedIds={selectedIds}
  actions={bulkActions}
  onClearSelection={clearSelection}
  entityName="users"
  variant="blue"
/>`}
        </pre>
      </div>
    </div>
  );
};

export default BulkActionBarExample; 