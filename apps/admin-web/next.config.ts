import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Advanced image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  experimental: {
    // Enable React Compiler for automatic optimizations (if available)
    reactCompiler: false, // Disabled for stable build
    // Optimize package imports
    optimizePackageImports: [
      '@heroicons/react',
      'lucide-react',
      '@headlessui/react',
      'clsx',
      'tailwind-merge'
    ],
  },
  
  eslint: { ignoreDuringBuilds: true },
  
  transpilePackages: [
    '@evc/shared-api',
    '@evc/shared-types', 
    '@evc/design-tokens',
    '@evc/shared-store',
    '@evc/shared-utils',
    '@evc/shared-business-logic'
  ],
  
  webpack: (config, { dev, isServer }) => {
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', ...config.resolve.extensions];
    
    // Production optimizations
    if (!dev) {
      // Tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Bundle splitting optimization
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          heroicons: {
            test: /[\\/]node_modules[\\/]@heroicons[\\/]/,
            name: 'heroicons',
            chunks: 'all',
            priority: 20,
          },
          headless: {
            test: /[\\/]node_modules[\\/]@headlessui[\\/]/,
            name: 'headless',
            chunks: 'all',
            priority: 20,
          },
          shared: {
            test: /[\\/]packages[\\/]shared[\\/]/,
            name: 'shared',
            chunks: 'all',
            priority: 15,
          },
        },
      };
    }
    
    return config;
  },
};

export default nextConfig;
