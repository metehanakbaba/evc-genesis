'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ScrollToTop component - automatically scrolls to top on route changes
 * Ensures consistent user experience across page navigation
 */
export const ScrollToTop: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top immediately when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // Smooth scroll animation
    });
  }, [pathname]);

  return null; // This component doesn't render anything
};
