'use client';

import React, { useState } from 'react';
import { Modal, Button, Input, Textarea, Checkbox } from '@/shared/ui';

interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId: string;
  onRefundSuccess: () => void;
}

export const TransactionRefundModal: React.FC<RefundModalProps> = ({
  isOpen,
  onClose,
  transactionId,
  onRefundSuccess,
}) => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [reason, setReason] = useState<string>('');
  const [notifyUser, setNotifyUser] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      alert('Reason is required');
      return;
    }
    setIsSubmitting(true);
    try {
      // Here you would call the refund API mutation
      // For example:
      // await processRefund({ transactionId, data: { amount, reason, notifyUser } }).unwrap();
      onRefundSuccess();
      onClose();
    } catch (error) {
      // Handle error, show toast or alert
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Refund Transaction"
      size="sm"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
            Amount (optional)
          </label>
          <Input
            type="number"
            value={amount !== undefined ? amount.toString() : ''}
            onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : undefined)}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Reason
          </label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={isSubmitting}
            rows={3}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={notifyUser}
            onChange={(checked) => setNotifyUser(checked)}
            disabled={isSubmitting}
          />
          <label className="text-sm text-gray-300 select-none">
            Notify User
          </label>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Refund'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
