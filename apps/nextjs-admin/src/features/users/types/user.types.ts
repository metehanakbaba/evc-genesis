import type { UserRole } from '@/types/global.types';

export interface UserProfile {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly phone: string;
  readonly role: UserRole;
  readonly created_at: string;
  readonly last_login?: string;
  readonly is_active: boolean;
  readonly verified_email: boolean;
  readonly payment_methods?: ReadonlyArray<PaymentMethod>;
}

export interface PaymentMethod {
  readonly id: string;
  readonly type: 'credit_card' | 'debit_card' | 'wallet';
  readonly last_four?: string;
  readonly brand?: string;
  readonly is_default: boolean;
  readonly created_at: string;
}

export interface UpdateProfileRequest {
  readonly name?: string;
  readonly phone?: string;
  readonly password?: string;
  readonly current_password?: string;
}

export interface UsersQueryParams {
  readonly page?: number;
  readonly limit?: number;
  readonly role?: UserRole;
  readonly search?: string;
  readonly is_active?: boolean;
  readonly sort_by?: 'created_at' | 'last_login' | 'name';
  readonly sort_order?: 'asc' | 'desc';
}

export interface CreateUserRequest {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly phone: string;
  readonly role: UserRole;
}

export interface UpdateUserRequest {
  readonly name?: string;
  readonly phone?: string;
  readonly role?: UserRole;
  readonly is_active?: boolean;
}

export interface UserStatistics {
  readonly total_users: number;
  readonly active_users: number;
  readonly new_users_today: number;
  readonly new_users_this_week: number;
  readonly new_users_this_month: number;
  readonly users_by_role: Record<UserRole, number>;
}
