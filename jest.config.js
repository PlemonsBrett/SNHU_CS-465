/**
 * Jest configuration for the monorepo
 * @type {import('jest').Config}
 */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@config$': '<rootDir>/src/config/index.ts',
    '^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^@middleware$': '<rootDir>/src/middleware/index.ts',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@routes$': '<rootDir>/src/routes/index.ts',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@utils$': '<rootDir>/src/utils/index.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  projects: [
    {
      displayName: 'server',
      testMatch: ['<rootDir>/server/**/*.test.ts'],
      rootDir: './',
    },
    // Future Angular client tests can be added here
  ],
};
