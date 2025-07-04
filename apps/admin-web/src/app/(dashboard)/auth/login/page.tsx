import Link from 'next/link';
import React from 'react';
import { redirect } from 'next/navigation';

// React 19 Server Action for form handling
async function loginAction(formData: FormData) {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Server-side validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // Simulate authentication
  console.log('Login attempt:', { email, password });

  // For demo purposes - in real app, authenticate with backend
  if (email === 'admin@evc.com' && password === 'admin123') {
    redirect('/');
  } else {
    throw new Error('Invalid credentials');
  }
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="revolutionary-loader w-12 h-12 rounded-lg mx-auto mb-4"></div>
          <h2 className="text-3xl font-bold text-white">EV Charging Admin</h2>
          <p className="mt-2 text-gray-400">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form action={loginAction} className="glass-card p-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@evc.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-300"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Sign in
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Demo credentials: admin@evc.com / admin123
            </p>
          </div>
        </form>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/auth"
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            ← Back to Auth Options
          </Link>
        </div>
      </div>
    </div>
  );
}
