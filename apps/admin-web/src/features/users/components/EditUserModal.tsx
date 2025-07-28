'use client'

import React, { useState, useEffect} from 'react';
import { UpdateUserRequest } from "../types/user.types";
import { UserProfile, validatePhone } from '@evc/shared-business-logic';
import { UserIcon, ShieldCheckIcon, CogIcon } from '@heroicons/react/20/solid';
import { Button, Input } from '@/shared/ui';
import { formatApiError, isApiError } from '@/shared/api/apiHelpers';
import { Modal } from '@/components/ui/Display';
import { useToast } from '@/shared/ui';
import { useUserActions } from '../hooks';
import { Checkbox } from '@/components/ui/Forms';

interface EditUserModalProps {
  user: UserProfile,
  isOpen: boolean,
  onClose: () => void,
  refresh?: () => void;
}

const ROLE_OPTIONS = [
  {
    value: 'CUSTOMER',
    label: 'Customer',
    description: 'Standard user account',
    icon: UserIcon,
    color: 'blue',
  },
  {
    value: 'ADMIN',
    label: 'Administrator',
    description: 'Full system access',
    icon: ShieldCheckIcon,
    color: 'emerald',
  },
  {
    value: 'FIELD_WORKER',
    label: 'Field Worker',
    description: 'Limited access for field operations',
    icon: CogIcon,
    color: 'gray',
  },
];

export const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  isOpen,
  onClose,
  refresh
}) => {
  const { editUser } = useUserActions();
  const { showToast } = useToast();
  const [formData, setFormData] = useState<UpdateUserRequest>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: 'CUSTOMER',
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phoneNumber: user.phoneNumber || '',
        role: user.role || 'CUSTOMER',
        isActive: user.isActive ?? true,
      });
    }
  }, [user]);

  const handleChange = (field: keyof UpdateUserRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof UpdateUserRequest, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate phone number if provided
    if (formData.phoneNumber) {
      const phoneValidation = validatePhone(formData.phoneNumber);
      if (!phoneValidation.isValid) {
        setIsSubmitting(false);
        return { success: false, error: 'Invalid phone number' };
      }
    }

    try {
      await editUser(user.id, formData);
      if (refresh){
        refresh();
      }
      onClose();
      return { success: true };
    } catch (error) {
      const errorMessage = isApiError(error) 
        ? formatApiError(error).message 
        : error instanceof Error 
          ? error.message 
          : 'Failed to update user';
          showToast({
            type: 'error',
            message: errorMessage,
            title: 'Failed to update user'
          });
          return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRoleOption = (
    opt: typeof ROLE_OPTIONS[0],
    selected: boolean,
    onClick: () => void
  ) => {
    return (
      <Button
        key={opt.value}
        variant={selected ? 'secondary' : 'outline'}
        className="w-full h-full p-4 flex-col items-start gap-2"
        onClick={onClick}
        disabled={isSubmitting}
      >
        <div className="flex items-center gap-3 w-full">
          <opt.icon className="w-5 h-5" />
          <div className="text-left">
            <div className="font-medium">{opt.label}</div>
          </div>
        </div>
      </Button>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit User Profile"
      description="Update user details below"
      size="xl"
      variant="default"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter first name"
            disabled={isSubmitting}
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter last name"
            disabled={isSubmitting}
          />
        </div>

        <Input
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="+1234567890"
          type="tel"
          disabled={isSubmitting}
        />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            User Role
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ROLE_OPTIONS.map((opt) =>
              renderRoleOption(
                opt,
                formData.role === opt.value,
                () => handleChange('role', opt.value)
              )
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Checkbox 
            label='Active Account'
            checked={formData.isActive}
            onChange={(e) => handleChange('isActive', e)}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};