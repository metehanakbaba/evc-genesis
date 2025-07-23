'use client';

import { LockClosedIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useAuthForm } from '../hooks/useAuthForm';
import { Button } from '@/shared/ui/components/Forms/Button/Button';

export const LoginForm: React.FC = () => {
  const { submitAction, isLoading, handleForgotPassword } = useAuthForm();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const submitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) {
        clearTimeout(submitTimeoutRef.current);
      }
    };
  }, []);

  // Combined loading state for better UX
  const isFormDisabled = isLoading || isSubmitting;

  // Handle input changes to preserve form state
  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (isFormDisabled) return; // Prevent changes during submission
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError(null);
    }
    
    // Reset success state when user starts typing again
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  // Enhanced form submission with error handling and deduplication
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent form submission and page reload
    event.preventDefault();
    event.stopPropagation();
    
    // Prevent double submission - check both loading states
    if (isLoading || isSubmitting) {
      console.warn('🛑 Form submission prevented - already in progress');
      return;
    }

    // Clear any existing timeout to prevent race conditions
    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
    }
    
    // Basic validation before API call
    if (!formData.email.trim() || !formData.password.trim()) {
      setSubmitError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const form = event.currentTarget;
      const formDataObj = new FormData(form);
      
      // Clear previous states
      setSubmitError(null);
      setIsSuccess(false);
      
      // Call the action with form data
      await submitAction(formDataObj);
      
      // Success - show success state briefly before redirect
      setIsSuccess(true);
      setFormData({ email: '', password: '' });
    } catch (error) {
      console.log('🔴 Form level error caught:', error);
      // Extract error message - handle both API errors and regular errors
      let errorMessage = 'An unexpected error occurred';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      setSubmitError(errorMessage);
      setIsSuccess(false);
    } finally {
      // Add a minimum delay to prevent rapid resubmission
      submitTimeoutRef.current = setTimeout(() => {
        setIsSubmitting(false);
      }, 1000); // 1 second minimum between submissions
    }
  };

  return (
    <section className="space-y-6" aria-labelledby="login-form-heading">
      {/* 🎨 Professional Login Card */}
      <article className="relative">
        {/* Simplified background */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 lg:p-8 shadow-xl">
          
          {/* 🔒 Header Section */}
          <header className="text-center space-y-4 mb-6">
            <div className="relative">
              {/* Icon Background - Simplified */}
              <div className="w-12 h-12 mx-auto bg-slate-700/50 border border-slate-600/50 rounded-xl flex items-center justify-center" role="img" aria-label="Security icon">
                <LockClosedIcon className="w-6 h-6 text-blue-400" aria-hidden="true" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 id="login-form-heading" className="text-xl font-bold text-white">
                Welcome Back
              </h2>
              <p className="text-slate-400 text-sm">
                Sign in to your admin dashboard
              </p>
            </div>
          </header>

          {/* 📝 Enhanced Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate aria-labelledby="login-form-heading">
            
            <fieldset className="space-y-5" disabled={isFormDisabled}>
              <legend className="sr-only">Login credentials</legend>
              
              {/* 📧 Email Input - Simplified */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  {/* Icon Container */}
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10" aria-hidden="true">
                    <EnvelopeIcon className={`w-4 h-4 transition-colors duration-200 ${
                      isFormDisabled ? 'text-slate-500' : 'text-slate-400'
                    }`} />
                  </div>
                  
                  {/* Enhanced Input */}
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    disabled={isFormDisabled}
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    aria-describedby={submitError ? 'form-error' : undefined}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 transition-all duration-200 ${
                      isFormDisabled 
                        ? 'cursor-not-allowed opacity-60' 
                        : 'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-slate-500/50'
                    }`}
                  />
                </div>
              </div>

              {/* 🔐 Password Input - Simplified */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <div className="relative">
                  {/* Icon Container */}
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10" aria-hidden="true">
                    <LockClosedIcon className={`w-4 h-4 transition-colors duration-200 ${
                      isFormDisabled ? 'text-slate-500' : 'text-slate-400'
                    }`} />
                  </div>
                  
                  {/* Enhanced Input */}
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                    disabled={isFormDisabled}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    aria-describedby={submitError ? 'form-error' : 'password-visibility-toggle'}
                    className={`w-full pl-10 pr-12 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 transition-all duration-200 ${
                      isFormDisabled 
                        ? 'cursor-not-allowed opacity-60' 
                        : 'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-slate-500/50'
                    }`}
                  />
                  
                  {/* Enhanced Password Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isFormDisabled}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-describedby="password-visibility-toggle"
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-md transition-all duration-200 ${
                      isFormDisabled 
                        ? 'text-slate-500 cursor-not-allowed' 
                        : 'text-slate-400 hover:text-blue-400 hover:bg-slate-600/50'
                    }`}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                  {/* Screen reader helper */}
                  <span id="password-visibility-toggle" className="sr-only">
                    {showPassword ? 'Password is visible' : 'Password is hidden'}
                  </span>
                </div>
              </div>
            </fieldset>

            {/* 🚨 Enhanced Error Display */}
            {submitError && !isFormDisabled && !isSuccess && (
              <aside className="relative" role="alert" aria-live="polite">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <div id="form-error" className="flex items-center space-x-3">
                    <ExclamationTriangleIcon className="w-4 h-4 text-red-400 flex-shrink-0" aria-hidden="true" />
                    <p className="text-red-300 text-sm font-medium">{submitError}</p>
                  </div>
                </div>
              </aside>
            )}



            {/* ✅ Success Display */}
            {isSuccess && !isFormDisabled && (
              <aside className="relative" role="status" aria-live="polite">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                    <p className="text-emerald-300 text-sm font-medium">Successfully signed in! Redirecting...</p>
                  </div>
                </div>
              </aside>
            )}

            {/* 🎯 Enhanced Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isFormDisabled}
                disabled={!formData.email || !formData.password || isFormDisabled}
                aria-describedby="submit-button-description"
                className="w-full"
              >
                <div className="flex items-center justify-center space-x-2">
                  <LockClosedIcon className="w-4 h-4" aria-hidden="true" />
                  <span className="font-semibold">
                    {isFormDisabled ? 'Signing In...' : 'Sign In'}
                  </span>
                </div>
              </Button>
              <span id="submit-button-description" className="sr-only">
                Submit the login form to access your admin dashboard
              </span>
            </div>

            {/* 🔐 Forgot Password */}
            <nav className="text-center pt-2">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isFormDisabled}
                aria-describedby="forgot-password-description"
                className={`text-sm transition-colors duration-200 ${
                  isFormDisabled 
                    ? 'text-slate-500 cursor-not-allowed' 
                    : 'text-slate-400 hover:text-blue-400 focus:outline-none focus:text-blue-400'
                }`}
              >
                Forgot your password?
              </button>
              <span id="forgot-password-description" className="sr-only">
                Navigate to password recovery page
              </span>
            </nav>
            
          </form>
        </div>
      </article>

      {/* 🔒 Security Notice - Simplified */}
      <aside className="relative" role="complementary" aria-labelledby="security-notice-heading">
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-6 h-6 bg-slate-700/50 border border-slate-600/50 rounded-lg flex items-center justify-center" aria-hidden="true">
              <LockClosedIcon className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="text-center">
              <h3 id="security-notice-heading" className="text-slate-300 font-medium text-sm">Enterprise Security</h3>
              <p className="text-slate-500 text-xs">End-to-end encryption • SOC 2 compliant</p>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
};
