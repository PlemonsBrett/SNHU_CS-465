import type { NextFunction, Request, Response } from 'express';

/**
 * Interface for custom application errors
 */
export interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

/**
 * Creates a custom application error
 * @param message Error message
 * @param statusCode HTTP status code
 * @returns AppError
 */
export const createError = (message: string, statusCode: number): AppError => {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  error.isOperational = true;

  return error;
};

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Different error responses based on environment
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).render('error', {
      title: 'Error',
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    // Production mode - don't leak error details
    const error = { ...err };
    error.message = err.isOperational ? err.message : 'Something went wrong!';

    res.status(err.statusCode).render('error', {
      title: 'Error',
      message: error.message,
      error: {},
    });
  }
};
