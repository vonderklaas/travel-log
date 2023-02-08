// This code can be used both on client and server

import { z } from 'zod';

const errors = {
  title: 'Title cannot be empty!',
  description: 'Description cannot be empty!',
  image: 'Image must be a valid URL',
};

// Zod Validator
export const TravelLog = z.object({
  title: z.string().trim().min(1, errors.title),
  description: z.string().min(1, errors.description),
  image: z.string().url(errors.image),
  rating: z.coerce.number().min(0).max(10).default(0),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  visitDate: z.coerce.date(),
});

export const TravelLogKeys = TravelLog.keyof().Enum;

export type TravelLogKeyType = keyof typeof TravelLogKeys;

export type TravelLog = z.infer<typeof TravelLog>;
