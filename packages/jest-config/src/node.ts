import type { Config } from 'jest';
import baseConfig from './base.js';

const nodeConfig: Config = {
  ...baseConfig,
  testEnvironment: 'node',
  // Node-specific settings
  moduleFileExtensions: ['js', 'json', 'ts'],
  // Additional settings for Node.js testing
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  // Customize as needed for Node.js projects
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default nodeConfig;
