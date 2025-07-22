import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserRole } from '@/types/global.types';

export interface User {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber?: string;
  readonly role: UserRole;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly name?: string; // Keep for backward compatibility
}

export interface AuthState {
  readonly user: User | null;
  readonly token: string | null;
  readonly isAuthenticated: boolean;
  readonly expiresIn?: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  expiresIn: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string; expiresIn?: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.expiresIn = action.payload.expiresIn;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.expiresIn = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
