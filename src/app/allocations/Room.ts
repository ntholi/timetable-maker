import { Entity } from '@/lib/Entity';
import { z } from 'zod';

import { roomTypes } from '../database/rooms/Room';
export const roomSchema = z.object({
  lecture: z.object({
    id: z.string(),
    name: z.string(),
  }),
  course: z.object({
    id: z.string(),
    name: z.string(),
  }),
  room: z.enum(roomTypes),
});

export type Room = z.infer<typeof roomSchema> & Entity;
