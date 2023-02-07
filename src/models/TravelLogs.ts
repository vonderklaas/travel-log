import { db } from '@/db';
import { z } from 'zod';

// Validate before putting data into the Database
export const TravelLog = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  rating: z.number().min(0).max(10).default(0),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  visitDate: z.date(),
});

// Extract interface from Validator
export type TravelLog = z.infer<typeof TravelLog>;

export const TravelLogs = db.collection('logs');
