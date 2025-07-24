'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { MainLayout, PageContainer, PageHeader } from '@ui/layout'
import { Breadcrumb } from '@/shared/ui/components/Navigation'
import {Button} from '@/shared/ui'
import { Input, Checkbox } from '@/components/ui/Forms'
import { ShieldCheckIcon, WrenchScrewdriverIcon, UserIcon } from '@heroicons/react/20/solid'
import type { UserRole } from '../types/components.types'
import { useToast } from '@/shared/ui'
import {useCreateUserMutation} from "./../api/usersApi";
import { getFieldValidationState, validateEmail, validatePassword, validatePhone} from '@evc/shared-business-logic'

interface UserFormData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: UserRole,
    isActive: boolean;
}

const ROLE_OPTIONS: Array<{
  value: UserRole;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  description: string;
}> = [
  {
    value: 'ADMIN',
    label: 'Administrator',
    icon: ShieldCheckIcon,
    color: 'blue',
    description: 'Full access to all settings',
  },
  {
    value: 'FIELD_WORKER',
    label: 'Field Worker',
    icon: WrenchScrewdriverIcon,
    color: 'emerald',
    description: 'Manage on‑site operations',
  },
  {
    value: 'CUSTOMER',
    label: 'Customer',
    icon: UserIcon,
    color: 'purple',
    description: 'Limited access for self‑service',
  },
];

export const CreateUserPage: React.FC = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [createUser, { isLoading }] = useCreateUserMutation();

  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: 'CUSTOMER',
    isActive: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (
    field: keyof UserFormData,
    value: string
  ): { isValid: boolean; error?: string } => {
    switch (field) {
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      case 'firstName':
        return value.trim()
          ? { isValid: true }
          : { isValid: false, error: 'First name is required' };
      case 'lastName':
        return value.trim()
          ? { isValid: true }
          : { isValid: false, error: 'Last name is required' };
      case 'phoneNumber':
        return validatePhone(value);
      default:
        return { isValid: true };
    }
  };

  const handleChange = useCallback(
    (
      field: keyof UserFormData,
      value: string | boolean | UserRole
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (typeof value === 'string') {
        const result = validateField(field, value);
        setErrors((prev) => {
          const next = { ...prev };
          if (!result.isValid && result.error) next[field] = result.error;
          else delete next[field];
          return next;
        });
      }
    },
    []
  );

  const emailState = getFieldValidationState('email', errors);
  const passState = getFieldValidationState('password', errors);
  const fnState = getFieldValidationState('firstName', errors);
  const lnState = getFieldValidationState('lastName', errors);
  const phoneState = getFieldValidationState('phoneNumber', errors);

  const handleSubmit = useCallback(async () => {
    if (
      isLoading ||
      Object.keys(errors).length > 0 ||
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.phoneNumber
    ) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fix all errors before submitting',
      });
      return;
    }
    try {
      await createUser(formData).unwrap();
      showToast({
        type: 'success',
        title: 'User Created',
        message: `${formData.firstName} ${formData.lastName} was created.`,
      });
      router.push('/users');
    } catch (err: any) {
      showToast({
        type: 'error',
        title: 'Creation Failed',
        message: err?.data?.message || 'Could not create user',
      });
    }
  }, [createUser, errors, formData, isLoading, router, showToast]);

  const renderOption = (
    opt: typeof ROLE_OPTIONS[0],
    selected: boolean,
    onClick: () => void
  ) => {
    const colors = {
      blue: 'border-blue-400 text-blue-300',
      emerald: 'border-emerald-400 text-emerald-300',
      gray: 'border-gray-400 text-gray-300',
    }[opt.color];
    return (
      <button
        key={opt.value}
        onClick={onClick}
        className={`group flex items-center gap-3 p-4 border rounded-xl transition ${
          selected
            ? `bg-gradient-to-r from-${opt.color}-500/20 to-${opt.color}-400/20 ${colors}`
            : 'bg-gray-800/30 border-gray-600/30 text-gray-300 hover:bg-gray-700/40'
        }`}
      >
        <opt.icon className="w-6 h-6" />
        <div className="text-left">
          <div className="font-medium">{opt.label}</div>
          <div className="text-xs opacity-75">{opt.description}</div>
        </div>
      </button>
    );
  };

  return (
    <MainLayout showNotifications notificationCount={0} headerVariant="default">
      <PageContainer paddingY="md">
        <Breadcrumb
          items={[{ label: 'Users', href: '/users' }]}
          currentPageLabel="Create User"
          variant="purple"
        />
        <PageHeader
          title="Create New User"
          description="Add a new user to the system"
          variant="purple"
          actionButton={{
            label: 'Back to Users',
            onClick: () => router.push('/users'),
            icon: () => null,
          }}
        />
      </PageContainer>

      <PageContainer paddingY="sm" className="space-y-8 pt-0">
        {/* User Info */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              error={emailState.errorMessage}
            />
            <Input
              label="Password"
              type="password"
              showPasswordToggle
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required
              error={passState.errorMessage}
            />
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              required
              error={fnState.errorMessage}
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              required
              error={lnState.errorMessage}
            />
          </div>
        </section>

        {/* Contact & Role */}
        <section className="space-y-4 mb-2">
          <h2 className="text-xl font-bold text-white">Contact & Role</h2>
          <div>
            <Input
              label="Phone Number"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              required
              error={phoneState.errorMessage}
            />

            <div className="space-y-2 pt-4">
              <div className="text-sm font-medium text-gray-300 mb-2">
                Role & Status
              </div>
              {/* role panels */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {ROLE_OPTIONS.map((opt) =>
                  renderOption(
                    opt,
                    formData.role === opt.value,
                    () => handleChange('role', opt.value)
                  )
                )}
              </div>
              {/* active checkbox */}
              <Checkbox
                checked={formData.isActive}
                onChange={(ch) => handleChange('isActive', ch)}
                label="Active"
                description="User can log in immediately"
                className="pt-4"
              />
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="flex justify-end gap-4">
          <Button variant="secondary" onClick={() => router.push('/users')}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={isLoading}
            disabled={
              isLoading ||
              Object.keys(errors).length > 0 ||
              !formData.email ||
              !formData.password ||
              !formData.firstName ||
              !formData.lastName ||
              !formData.phoneNumber
            }
          >
            Create User
          </Button>
        </section>
      </PageContainer>
    </MainLayout>
  );
};

export default CreateUserPage;
