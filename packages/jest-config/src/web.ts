import type { Config } from 'jest';
import baseConfig from './base.js';

const webConfig: Config = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  // Web-specific settings
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Setup files for browser environment
  setupFilesAfterEnv: [],
  // Transform for handling CSS, images, etc.
  transform: {
    ...baseConfig.transform,
    '^.+\\.css$': '<rootDir>/node_modules/jest-transform-stub',
    '^.+\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/node_modules/jest-transform-stub',
  },
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^.+\\.css$': 'identity-obj-proxy',
    '^.+\\.(png|jpg|jpeg|gif|svg)$': 'identity-obj-proxy',
  },
  // Customize as needed for web projects
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default webConfig;
