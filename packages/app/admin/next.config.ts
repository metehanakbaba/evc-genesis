import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  transpilePackages: [
    '@evc/shared-api',
    '@evc/shared-types', 
    '@evc/design-tokens',
    '@evc/shared-store',
    '@evc/shared-utils'
  ],
  webpack: (config, { dev, isServer }) => {
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', ...config.resolve.extensions];
    return config;
  },
};

export default nextConfig;
