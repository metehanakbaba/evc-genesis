'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Textarea, useToast } from '@/shared/ui';
import type { Wallet, AdjustBalanceData } from '../../../../../../../packages/shared/api/src/lib/types/wallet.types';
import { useAdjustBalanceMutation } from '../../api/walletApi';
import { isApiError } from '@/shared/api/apiHelpers';

interface AdjustBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: Wallet | null;
  onRefresh: () => void
}

export const AdjustBalanceModal: React.FC<AdjustBalanceModalProps> = ({
  isOpen,
  onClose,
  wallet,
  onRefresh
}) => {
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [data, setData] = useState<AdjustBalanceData>({
        amount: 0,
        reason: '',
        reference: ''
    });
    const [adjustBalance] = useAdjustBalanceMutation();

    useEffect(() => {
        if (isOpen) {
            setData((prev) => ({
                ...prev,
                reason: '',
                amount: 0,
                reference: ''
            }));
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (!wallet) return;
        if (data.amount === 0) {
            alert('Amount must be non-zero');
            return;
        }
        if (!data.reason.trim()) {
            alert('Reason is required');
            return;
        }
        setIsSubmitting(true);
        try {
            await adjustBalance({ userId: wallet.userId, data: data });
            showToast({
                title: 'Adjustment applied',
                message: 'Wallet balance was updated successfully',
                type: 'success'
            });
            onRefresh();
            onClose();
        } catch (error) {
            const errorMessage = isApiError(error) ? error.data.error.message : 'An error occurred';
            showToast({
                title: 'Error adjusting balance',
                message: errorMessage,
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    
    const handleClose = () => {
        setData({ amount: 0, reason: '', reference: '' });
        onClose();
    };

    const isValid = data.amount != 0 && data.reason.trim().length >= 5;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Adjust Balance for ${wallet?.userEmail || ''}`}
            size="lg"
        >
            <div className="space-y-6">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
                        Amount (use negative for deduction)
                    </label>
                    <Input
                        type="number"
                        value={data.amount.toString()}
                        onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                amount: Number(e.target.value)
                            }));
                        }}
                        disabled={isSubmitting}
                    />
                </div>
                <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-300">
                        Reason
                    </label>
                    <Textarea
                        value={data.reason}
                        onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                reason: e.target.value 
                            }));
                        }}
                        disabled={isSubmitting}
                        rows={2}
                    />
                </div>
                <div>
                    <label htmlFor="reference" className="block text-sm font-medium text-gray-300">
                        Reference
                    </label>
                    <Input
                        type="text"
                        value={data.reference}
                        onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                reference: e.target.value
                            }));
                        }}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="flex justify-end gap-2">
                    
                    <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
                    Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="secondary" disabled={!isValid || isSubmitting}>
                    {isSubmitting ? 'Adjusting...' : 'Adjust'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
