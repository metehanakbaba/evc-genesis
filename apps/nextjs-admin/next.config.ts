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
  transpilePackages: [
    '@evc-unified/shared-api',
    '@evc-unified/shared-types', 
    '@evc-unified/design-tokens',
    '@evc-unified/shared-store',
    '@evc-unified/shared-utils'
  ],
  webpack: (config, { dev, isServer }) => {
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', ...config.resolve.extensions];
    return config;
  },
};

export default nextConfig;
