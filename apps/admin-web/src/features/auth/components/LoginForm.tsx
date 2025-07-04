import { Button, Input } from '@ui/forms';
import type React from 'react';
import { useAuthForm } from '../hooks/useAuthForm';

export const LoginForm: React.FC = () => {
  const { submitAction, isPending, error, handleForgotPassword } =
    useAuthForm();

  return (
    <div className="space-y-8">
      {/* Form using React 19 Server Actions pattern */}
      <form action={submitAction} className="space-y-6">
        {/* Email Input */}
        <div>
          <Input
            name="email" // React 19: name attribute for FormData
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            required
            disabled={isPending}
            autoComplete="email"
            className="w-full"
          />
        </div>

        {/* Password Input */}
        <div>
          <Input
            name="password" // React 19: name attribute for FormData
            type="password"
            label="Password"
            placeholder="Enter your password"
            required
            disabled={isPending}
            showPasswordToggle
            autoComplete="current-password"
            className="w-full"
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
            <div className="flex items-center">
              <div className="text-red-400 text-sm font-medium">{error}</div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isPending}
          disabled={isPending}
          className="w-full"
        >
          {isPending ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      {/* Forgot Password */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          disabled={isPending}
        >
          Forgot your password?
        </button>
      </div>
    </div>
  );
};
