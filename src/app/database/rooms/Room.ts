import { Entity } from '@/lib/Entity';
import { facultyKeys } from '@/lib/Faculty';
import { z } from 'zod';

export const roomTypes = [
  'Multimedia Lab',
  'Mac Lab',
  'Classroom',
  'Lecture Hall',
  'Network Lab',
  'Photo Lab',
  'Computer Workshop',
] as const;

export const roomSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(roomTypes),
  capacity: z.number().min(1).optional(),
  faculty: z
    .enum(facultyKeys, {
      required_error: 'Please select a faculty',
    })
    .or(z.null()),
});

export type Room = z.infer<typeof roomSchema> & Entity;
