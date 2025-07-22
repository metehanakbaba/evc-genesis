'use client';

import { LockClosedIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import type React from 'react';
import { useState, useRef } from 'react';
import { useAuthForm } from '../hooks/useAuthForm';
import { Button } from '@/shared/ui/components/Forms/Button/Button';

export const LoginForm: React.FC = () => {
  const { submitAction, isLoading, error, handleForgotPassword } = useAuthForm();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle input changes to preserve form state
  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (isLoading) return; // Prevent changes during submission
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError(null);
    }
  };

  // Enhanced form submission with error handling
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return; // Prevent double submission
    
    const form = event.currentTarget;
    const formDataObj = new FormData(form);
    
    // Clear previous submit error
    setSubmitError(null);
    
    try {
      // Call the action with form data
      await submitAction(formDataObj);
      
      // Success - clear form
      setFormData({ email: '', password: '' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setSubmitError(errorMessage);
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
            
            <fieldset className="space-y-5" disabled={isLoading}>
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
                      isLoading ? 'text-slate-500' : 'text-slate-400'
                    }`} />
                  </div>
                  
                  {/* Enhanced Input */}
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    aria-describedby={submitError ? 'form-error' : undefined}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 transition-all duration-200 ${
                      isLoading 
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
                  {/* Lock Icon */}
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10" aria-hidden="true">
                    <LockClosedIcon className={`w-4 h-4 transition-colors duration-200 ${
                      isLoading ? 'text-slate-500' : 'text-slate-400'
                    }`} />
                  </div>
                  
                  {/* Enhanced Password Input */}
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    aria-describedby={showPassword ? 'password-visible' : 'password-hidden'}
                    className={`w-full pl-10 pr-12 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 transition-all duration-200 ${
                      isLoading 
                        ? 'cursor-not-allowed opacity-60' 
                        : 'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-slate-500/50'
                    }`}
                  />
                  
                  {/* Eye Icon Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-describedby="password-visibility-toggle"
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-md transition-all duration-200 ${
                      isLoading 
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
            {submitError && !isLoading && (
              <aside className="relative" role="alert" aria-live="polite">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <div id="form-error" className="flex items-center space-x-3">
                    <ExclamationTriangleIcon className="w-4 h-4 text-red-400 flex-shrink-0" aria-hidden="true" />
                    <p className="text-red-300 text-sm font-medium">{submitError}</p>
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
                loading={isLoading}
                disabled={!formData.email || !formData.password || isLoading}
                aria-describedby="submit-button-description"
                className="w-full"
              >
                <div className="flex items-center justify-center space-x-2">
                  <LockClosedIcon className="w-4 h-4" aria-hidden="true" />
                  <span className="font-semibold">
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </span>
                </div>
              </Button>
              <span id="submit-button-description" className="sr-only">
                Submit the login form to access your admin dashboard
              </span>
            </div>

            {/* �� Forgot Password */}
            <nav className="text-center pt-2">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isLoading}
                aria-describedby="forgot-password-description"
                className={`text-sm transition-colors duration-200 ${
                  isLoading 
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
