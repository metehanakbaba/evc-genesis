import type React from 'react';
import { memo, useState, useEffect } from 'react';
import { Button, Input } from '@/shared/ui';

interface LoginFormProps {
  readonly email: string;
  readonly password: string;
  readonly isLoading: boolean;
  readonly onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly onForgotPassword: () => void;
}

/**
 * Revolutionary login form with ultra-sophisticated staged animations
 */
const LoginForm: React.FC<LoginFormProps> = memo(
  ({
    email,
    password,
    isLoading,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    onForgotPassword,
  }) => {
    // Revolutionary staged animation states
    const [animationStage, setAnimationStage] = useState(0);

    useEffect(() => {
      // Stage 1: Header appears (handled in LoginPage - this stage is for email)
      const timer1 = setTimeout(() => setAnimationStage(1), 600);

      // Stage 2: Password input smooth expansion
      const timer2 = setTimeout(() => setAnimationStage(2), 1200);

      // Stage 3: Button and footer elements (final stage)
      const timer3 = setTimeout(() => setAnimationStage(3), 1800);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }, []);

    return (
      <>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Stage 1: Email Input - Appears after header */}
          <div
            className={`transform transition-all duration-700 ease-out ${
              animationStage >= 1
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-4 opacity-0 scale-95'
            }`}
          >
            <Input
              type="email"
              label="Email Address"
              value={email}
              onChange={onEmailChange}
              placeholder="admin@example.com"
              disabled={isLoading}
              required
            />
          </div>

          {/* Stage 2: Password Input - Smooth expansion with height animation */}
          <div
            className={`transition-all duration-1000 ease-out ${
              animationStage >= 2
                ? 'max-h-32 opacity-100 translate-y-0'
                : 'max-h-0 opacity-0 translate-y-4'
            }`}
            style={{
              transitionProperty: 'max-height, opacity, transform',
            }}
          >
            <div
              className={`transform transition-all duration-700 ease-out delay-200 ${
                animationStage >= 2
                  ? 'translate-y-0 scale-100'
                  : 'translate-y-4 scale-95'
              }`}
            >
              <Input
                type="password"
                label="Password"
                value={password}
                onChange={onPasswordChange}
                placeholder="••••••••"
                disabled={isLoading}
                required
                showPasswordToggle
              />
            </div>
          </div>

          {/* Stage 3: Submit Button - Revolutionary full width with floating effects */}
          <div
            className={`transition-all duration-1000 ease-out ${
              animationStage >= 3
                ? 'max-h-32 opacity-100 translate-y-0'
                : 'max-h-0 opacity-0 translate-y-6'
            }`}
            style={{
              transitionProperty: 'max-height, opacity, transform',
            }}
          >
            <div
              className={`pt-2 transform transition-all duration-700 ease-out delay-300 relative z-20 ${
                animationStage >= 3
                  ? 'translate-y-0 scale-100'
                  : 'translate-y-6 scale-95'
              }`}
            >
              <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                variant="primary"
                className="w-full relative group overflow-hidden z-30"
              >
                <span className="relative z-10 font-semibold tracking-wide">
                  Sign In
                </span>
              </Button>
            </div>
          </div>
        </form>

        {/* Stage 3: Footer - Smooth appearance with extra delay */}
        <div
          className={`transition-all duration-1000 ease-out ${
            animationStage >= 3
              ? 'max-h-24 opacity-100 translate-y-0'
              : 'max-h-0 opacity-0 translate-y-8'
          }`}
          style={{
            transitionProperty: 'max-height, opacity, transform',
          }}
        >
          <div
            className={`mt-8 text-center transform transition-all duration-700 ease-out delay-500 ${
              animationStage >= 3
                ? 'translate-y-0 scale-100'
                : 'translate-y-8 scale-95'
            }`}
          >
            <button
              type="button"
              className="text-sm text-gray-400 hover:text-gray-300 transition-all duration-300 group relative inline-block"
              onClick={onForgotPassword}
            >
              {/* Revolutionary floating underline effect */}
              <span className="relative transition-colors duration-300">
                Forgot your password?
                {/* Animated underline */}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 hover:w-full transition-all duration-500 ease-out" />
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-blue-400/10 rounded opacity-0 hover:opacity-100 transition-opacity duration-300 -m-1" />
              </span>
            </button>
          </div>
        </div>
      </>
    );
  },
);

LoginForm.displayName = 'LoginForm';

export default LoginForm;
