import { Config } from 'jest';

const config: Config = {
  displayName: 'enterprise-mobile',
  preset: 'jest-expo',
  resolver: '@nx/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  moduleNameMapping: {
    '\\.svg$': '@nx/expo/plugins/jest/svg-mock',
  },
  transform: {
    '\\.[jt]sx?$': [
      'babel-jest',
      {
        presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }]],
        plugins: ['nativewind/babel'],
      },
    ],
    '^.+\\.(js|ts|tsx)$': [
      '@swc/jest',
      {
        jsc: {
          parser: { syntax: 'typescript', tsx: true },
          transform: { react: { runtime: 'automatic' } },
        },
      },
    ],
  },
  coverageDirectory: '../../coverage/apps/enterprise-mobile',
  passWithNoTests: true,
};

export default config;