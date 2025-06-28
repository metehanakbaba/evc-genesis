import type React from 'react';
import { memo } from 'react';
import { BoltIcon } from '@heroicons/react/24/outline';
import { RevolutionaryStationIcon } from '@/features/admin/components';
import type { LoginHeaderProps } from '../types/auth.types';

/**
 * Login page header with animated logo and title
 */
const LoginHeader: React.FC<LoginHeaderProps> = memo(({ title, subtitle }) => (
  <div className="text-center mb-8">
    <div className="flex justify-center mb-4">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-lg animate-pulse" />
        <RevolutionaryStationIcon className="w-10 h-10 text-white" />
      </div>
    </div>
    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
      {title}
    </h1>
    <p className="text-gray-400 text-sm">{subtitle}</p>
  </div>
));

LoginHeader.displayName = 'LoginHeader';

export default LoginHeader;
