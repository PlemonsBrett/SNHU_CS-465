import type { Config } from 'jest';
import webConfig from './web.js';

const angularConfig: Config = {
  ...webConfig,
  // Angular-specific settings
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
      useESM: true,
    },
  },
  moduleNameMapper: {
    ...webConfig.moduleNameMapper,
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!@angular|rxjs)'],
  // Angular test setup
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default angularConfig;
