import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Request, Response } from 'express';
import type { z } from 'zod';
import { tripSchema } from '../schema/trips.js';

// Robust path resolution for ES modules/tsx
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TRIPS_FILE = path.resolve(__dirname, '../../data/trips.json');
console.log('Resolved trips file path:', TRIPS_FILE);

// Verify the file exists
const verifyTripsFile = async () => {
  try {
    await fs.access(TRIPS_FILE);
    console.log('Trips file exists and is accessible');
  } catch (error) {
    console.error('Error accessing trips file:', error);
    throw new Error(`Could not access trips file at: ${TRIPS_FILE}`);
  }
};

// Verify the file exists when the module loads
await verifyTripsFile();

/**
 * Get all trips
 */
export const getTrips = async (_req: Request, res: Response) => {
  try {
    console.log('Attempting to read trips from:', TRIPS_FILE);

    // Read and parse the trips data
    const data = await fs.readFile(TRIPS_FILE, 'utf-8');
    const trips = JSON.parse(data);

    console.log('Raw trips data:', JSON.stringify(trips, null, 2));

    // Validate each trip against the schema
    const validatedTrips = trips
      .map((trip: unknown) => {
        try {
          const validated = tripSchema.parse(trip);
          console.log('Successfully validated trip:', validated.id);
          return validated;
        } catch (error) {
          console.error('Invalid trip data:', error);
          return null;
        }
      })
      .filter(Boolean); // Remove any invalid trips

    console.log(`Validated ${validatedTrips.length} trips out of ${trips.length}`);

    // Render the travel view with the validated trips
    res.render('travel', {
      title: 'Travel',
      trips: validatedTrips,
    });
  } catch (error) {
    console.error('Error loading trips:', error);
    res.status(500).render('error', {
      message: 'Failed to load trips',
      error: { status: 500 },
    });
  }
};

/**
 * Get a single trip by ID
 */
export const getTripById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Read and parse the trips data
    const data = await fs.readFile(TRIPS_FILE, 'utf-8');
    const trips = JSON.parse(data);

    // Find the trip by ID
    const trip = trips.find((t: z.infer<typeof tripSchema>) => t.id === id);

    if (!trip) {
      return res.status(404).render('error', {
        message: 'Trip not found',
        error: { status: 404 },
      });
    }

    // Validate the trip data
    try {
      const validatedTrip = tripSchema.parse(trip);
      res.render('trip', {
        title: validatedTrip.name,
        trip: validatedTrip,
      });
    } catch (error) {
      console.error('Invalid trip data:', error);
      throw new Error('Invalid trip data');
    }
  } catch (error) {
    console.error('Error loading trip:', error);
    res.status(500).render('error', {
      message: 'Failed to load trip',
      error: { status: 500 },
    });
  }
};
