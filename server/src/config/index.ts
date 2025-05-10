import path from 'node:path';
/**
 * Application configuration settings
 */
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Default configuration values
const defaults = {
  port: 3000,
  nodeEnv: 'development',
  logLevel: 'dev',
};

// Configuration object
export const config = {
  port: process.env.PORT ? Number.parseInt(process.env.PORT, 10) : defaults.port,
  nodeEnv: process.env.NODE_ENV || defaults.nodeEnv,
  logLevel: process.env.LOG_LEVEL || defaults.logLevel,

  // Computed properties
  isDevelopment: (process.env.NODE_ENV || defaults.nodeEnv) === 'development',
  isProduction: (process.env.NODE_ENV || defaults.nodeEnv) === 'production',
  isTest: (process.env.NODE_ENV || defaults.nodeEnv) === 'test',
};
