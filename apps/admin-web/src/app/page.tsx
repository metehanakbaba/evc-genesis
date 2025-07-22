'use client';

import DashboardPage from './(dashboard)/admin/DashboardPage';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function HomePage() {
  return (
    <AuthGuard>
      <DashboardPage />
    </AuthGuard>
  );
}
