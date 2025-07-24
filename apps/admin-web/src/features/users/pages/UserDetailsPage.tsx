'use client';

import {
  ArrowLeftIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  PencilIcon,
  PhoneIcon,
  ShieldCheckIcon,
  TrashIcon,
  UserIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import { MainLayout, PageContainer, PageHeader } from '@ui/layout';
import type React from 'react';
import { useMemo, useState, useCallback } from 'react';
import { UserDetailsPageProps } from '.';

// Import shared components
import { Card, Modal, Spinner, StatCard, Badge } from '@/shared/ui/components/Display';
import { Breadcrumb } from '@/shared/ui/components/Navigation';
import { EditUserModal } from '../components/EditUserModal';

// Import business logic and types
import { formatLastLogin, getRoleConfig } from '@evc/shared-business-logic';
import type { IconComponent } from '../types/components.types';

// Import API hooks
import { useGetUserQuery, useDeleteUserMutation, useUpdateUserMutation } from '../api/usersApi';
import { useRouter } from 'next/navigation';
import {UserProfile} from "../../../../../../packages/shared/business-logic/src/users/index"

/**
 * Activity item interface
 * 
 * @interface ActivityItem
 */
interface ActivityItem {
  readonly id: string;
  readonly type: 'login' | 'profile_update' | 'role_change' | 'status_change';
  readonly description: string;
  readonly timestamp: string;
  readonly icon: IconComponent;
  readonly iconColor: string;
}

const UserDetailsPage: React.FC<UserDetailsPageProps> = ({ userId }) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  // API hooks
  const { data: userResponse, isLoading, error, refetch } = useGetUserQuery(userId);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const user: UserProfile = userResponse?.data;

  /**
   * Handle user deletion
   */
  const handleDeleteUser = useCallback(async () => {
    // if (!user) return;
    // try {
    //   await deleteUser(user.id);
    //   router.push('/users');
    // } catch (error) {
    //   console.error('Failed to delete user:', error);
    // }
    // TODO uncomment 
    console.log("Delete user")
  }, [user, deleteUser]);

  /**
   * Handle user status toggle
   * */
   const handleToggleStatus = useCallback(async (): Promise<void> => {
    if (!userResponse?.data) return;

    // TODO toggling status and refetch 
    try {
      await updateUser({
        id: userResponse.data.id,
        data: { is_active: !userResponse.data.is_active }
      });
      refetch();
    } catch (error) {
      console.error('Failed to update user status:', error);
    } 
    // finally {
    //   statusModal.onClose();
    // }
  }, [userResponse?.data, updateUser, refetch
    // statusModal
  ]);

  /**
   * Handle resend verification email
   */
  // const handleResendVerification = async (): Promise<void> => {
  //   if (!user) return;

  //   const result = await resendVerificationEmail(user);
  //   if (result.success) {
  //     // Show success message
  //     console.log('Verification email sent successfully');
  //   } else {
  //     console.error('Failed to send verification email:', result.error);
  //   }
  // };

  /**
   * Generate mock activity data
   */
  const activityItems = useMemo((): ActivityItem[] => {
    if (!user) return [];  

    return [
      {
        id: '1',
        type: 'login',
        description: 'Last login from Chrome on Windows',
        timestamp: user.lastLogin || user.createdAt,
        icon: UserIcon,
        iconColor: 'text-blue-400',
      },
      {
        id: '2',
        type: 'profile_update',
        description: 'Profile information updated',
        timestamp: user.createdAt,
        icon: PencilIcon,
        iconColor: 'text-emerald-400',
      },
      {
        id: '3',
        type: 'role_change',
        description: `Role assigned: ${user.role}`,
        timestamp: user.createdAt,
        icon: ShieldCheckIcon,
        iconColor: 'text-purple-400',
      },
    ];
  }, [user]);

  // Loading state
  if (isLoading) {
    return (
      <MainLayout>
        <PageContainer paddingY="lg" className="flex items-center justify-center min-h-[400px]">
          <Spinner size="lg" />
        </PageContainer>
      </MainLayout>
    );
  }

  // Error state
  if (error || !user) {
    return (
      <MainLayout>
        <PageContainer paddingY="lg">
          <div className="text-center py-12">
            <XCircleIcon className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">User Not Found</h3>
            <p className="text-gray-400 mb-4">
              The requested user could not be found or you don't have permission to view it.
            </p>
            <Button onClick={() => router.push('/users')} variant="primary">
              Back to Users
            </Button>
          </div>
        </PageContainer>
      </MainLayout>
    );
  }

  const roleConfig = getRoleConfig(user.role);

  return (
    <MainLayout>
      <PageContainer paddingY="md">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Users', href: '/users' },
          ]}
          currentPageLabel="User Details"
          variant="purple"
        />

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => router.push('/users')}
            variant="ghost"
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Users
          </Button>
        </div>
        
        <PageHeader
          title={user.firstName}
          description={`${roleConfig.text} • ${user.email}`}
          variant="purple"
          actionButton={{
              label: 'Back to users',
              onClick: () => {
                router.push('/users');
              },
              icon: UserIcon
            }}
        />
      </PageContainer>

      <PageContainer paddingY="lg" className="space-y-8">
        {/* User Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card variant="secondary">
              <Card.Header
                title="Profile Information"
                description="User account details and contact information"
              />
              <Card.Body>
                <div className="space-y-6">
                {/* User Avatar and Basic Info */}
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl ${roleConfig.badgeColor} flex items-center justify-center`}>
                    <UserIcon className={`w-8 h-8 ${roleConfig.textColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{user.firstName} {user.lastName}</h3>
                      <Badge
                        variant={user.isActive ? 'success' : 'danger'}
                        size="sm"
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${roleConfig.badgeColor}`}>
                      <ShieldCheckIcon className={`w-4 h-4 ${roleConfig.textColor}`} />
                      <span className={`text-sm font-medium ${roleConfig.textColor}`}>
                        {roleConfig.text}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                    <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-400">Email</div>
                      <div className="text-white font-medium">{user.email}</div>
                      {user.verified_email && (
                        <div className="flex items-center gap-1 mt-1">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs text-emerald-400">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                    <PhoneIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-400">Phone</div>
                      <div className="text-white font-medium">{user.phoneNumber}</div>
                    </div>
                  </div>
                </div>

                {/* Account Timestamps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                    <div className="text-sm text-gray-400 mb-1">Member Since</div>
                    <div className="text-white font-medium">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                    <div className="text-sm text-gray-400 mb-1">Last Login</div>
                    <div className="text-white font-medium">
                      {formatLastLogin(user.lastLogin)}
                    </div>
                  </div>
                </div>
              </div>
              </Card.Body>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Account Status */}
            <StatCard
              title="Account Status"
              value={user.isActive ? 'Active' : 'Inactive'}
              icon={user.isActive ? CheckCircleIcon : XCircleIcon}
              // trend={user.is_active ? 'Account is active' : 'Account is disabled'}
              variant={user.isActive ? 'emerald' : 'blue'}
            />

            {/* Quick Actions */}
              <Card variant="secondary">
                <Card.Header title="Quick Actions" />
                <Card.Body>
                  <div className="space-y-2">
                    {/* Activate/Deactivate */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                        {user.isActive ? (
                          <XCircleIcon className="w-6 h-6 text-red-400" />
                        ) : (
                          <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
                        )}
                      </div>
                      <Button
                        onClick={() => setIsStatusModalOpen(true)}
                        className="w-[95%] justify-start"
                        variant="primary"
                      >
                        {user.isActive ? 'Deactivate Account' : 'Activate Account'}
                      </Button>
                    </div>

                    {/* Resend Verification */}
                    {!user.verified_email && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                          <EnvelopeIcon className="w-6 h-6 text-blue-400" />
                        </div>
                        <Button
                          // onClick={handleResendVerification}
                          className="w-[95%] justify-start"
                          variant="ghost"
                        >
                          Resend Verification Email
                        </Button>
                      </div>
                    )}

                    {/* Delete User */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                        <TrashIcon className="w-6 h-6 text-red-400" />
                      </div>
                      <Button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="w-[95%] justify-end text-red-400 hover:text-red-300"
                        variant="destructive"
                      >
                        Delete User Account
                      </Button>
                    </div>

                    {/* Edit User */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                        <PencilIcon className="w-6 h-6 text-blue-400" />
                      </div>
                      <Button
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenEditModal(true);
                        }}
                        className="w-[95%] justify-start"
                        variant="secondary"
                      >
                        Edit User Profile
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
          </div>
        </div>

        {/* Activity History */}
        <Card variant="secondary">
          <Card.Header
            title="Recent Activity"
            description="User account activity and system interactions"
          />
          <Card.Body>
          <div className="space-y-4">
            {activityItems.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center">
                  <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium mb-1">{activity.description}</div>
                  <div className="text-sm text-gray-400">
                    {new Date(activity.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </Card.Body>
        </Card>
      </PageContainer>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete User Account"
        variant="danger"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Are you sure you want to permanently delete <strong>{user.firstName}</strong>'s account?
            This action cannot be undone and will remove all associated data.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              variant="ghost"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteUser}
              variant="destructive"
              loading={isDeleting}
            >
              Delete User
            </Button>
          </div>
        </div>
      </Modal>

      {/* Status Change Confirmation Modal */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title={`${user.isActive ? 'Deactivate' : 'Activate'} User Account`}
        variant={user.isActive ? 'warning' : 'success'}
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Are you sure you want to {user.isActive ? 'deactivate' : 'activate'}{' '}
            <strong>{user.firstName}</strong>'s account?
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              onClick={() => setIsStatusModalOpen(false)}
              variant="ghost"
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleToggleStatus}
              variant={user.isActive ? 'secondary' : 'primary'}
              loading={isUpdating}
            >
              {user.isActive ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        </div>
      </Modal>
      {/* Edit User Modal */}
      {selectedUser && (
        <EditUserModal
          user={user}
          isOpen={openEditModal}
          onClose={() => setOpenEditModal(false)}
        />
      )}
    </MainLayout>
  );
};


export default UserDetailsPage
