import { z } from 'zod';

/**
 * Schema for validating Trip objects
 */
export const tripSchema = z.object({
  /**
   * The unique identifier for the trip
   * @example "gale-reef"
   */
  id: z
    .string({
      required_error: 'ID is required',
      invalid_type_error: 'ID must be a string',
    })
    .min(1, 'ID cannot be empty')
    .regex(/^[\w-]+$/, 'Invalid ID format'),
  /**
   * The name of the trip
   * @example "Summer Vacation 2023"
   */
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(1, 'Name cannot be empty')
    .max(100, 'Name cannot be longer than 100 characters'),

  /**
   * Path to the trip's main image
   * @example "/images/trips/summer-2023.jpg"
   */
  image: z
    .string({
      required_error: 'Image path is required',
      invalid_type_error: 'Image path must be a string',
    })
    .min(1, 'Image path cannot be empty')
    .regex(/^[\w\-\.\/]+$/, 'Invalid image path format'),

  /**
   * HTML formatted description of the trip
   * @example "<p>An amazing summer getaway!</p>"
   */
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(1, 'Description cannot be empty'),
});

/**
 * TypeScript type for a Trip object
 */
export type Trip = z.infer<typeof tripSchema>;

/**
 * Validates a Trip object against the schema
 * @param data The data to validate
 * @returns The validated trip data or throws an error if invalid
 */
export function validateTrip(data: unknown): Trip {
  return tripSchema.parse(data);
}

/**
 * Safely validates a Trip object without throwing
 * @param data The data to validate
 * @returns A validation result object
 */
export function safeValidateTrip(data: unknown): {
  success: boolean;
  data?: Trip;
  error?: z.ZodError;
} {
  const result = tripSchema.safeParse(data);
  return {
    success: result.success,
    data: result.success ? result.data : undefined,
    error: result.success ? undefined : result.error,
  };
}
