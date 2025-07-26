'use client';

import React, { useState } from 'react';
import { Modal, Button, Input, Textarea } from '@/shared/ui';

interface WalletUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onAdjustBalance: (args: { userId: string; data: { amount: number; reason: string; reference: string } }) => Promise<any>;
  isLoading: boolean;
}

/**
 * Wallet Update Modal
 * Allows adjusting wallet balance with reason and reference
 */
export const WalletUpdateModal: React.FC<WalletUpdateModalProps> = ({
  isOpen,
  onClose,
  userId,
  onAdjustBalance,
  isLoading,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [reason, setReason] = useState<string>('');
  const [reference, setReference] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    if (amount === 0) {
      setError('Amount must be non-zero');
      return;
    }
    if (!reason.trim()) {
      setError('Reason is required');
      return;
    }
    if (!reference.trim()) {
      setError('Reference is required');
      return;
    }
    try {
      await onAdjustBalance({
        userId,
        data: {
          amount,
          reason,
          reference,
        },
      });
      onClose();
      // Reset form
      setAmount(0);
      setReason('');
      setReference('');
    } catch (e) {
      setError('Failed to adjust balance');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Wallet Balance" size="md">
      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-200">
            Amount (positive or negative)
          </label>

          <Input
            type="number"
            value={amount.toString()}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Enter amount"
            disabled={isLoading}
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-200">
            Reason
          </label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for adjustment"
            disabled={isLoading}
            rows={3}
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-200">
            Reference
          </label>
          <Input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Enter reference"
            disabled={isLoading}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-end space-x-2 pt-4">
          <Button onClick={handleSubmit} variant="primary" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Balance'}
          </Button>
          <Button onClick={onClose} variant="outline" disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
