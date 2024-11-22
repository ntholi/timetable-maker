import { Entity } from '@/lib/Entity';
import { facultyKeys } from '@/lib/Faculty';
import { z } from 'zod';
import { roomTypes } from '../database/rooms/Room';

export const allocationTypes = ['Lecture', 'Tutorial', 'Lab'] as const;

export const allocationSchema = z.object({
  lecturer: z
    .object({
      id: z.string(),
      name: z.string(),
      title: z.string(),
    })
    .required(),
  class: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .required(),
  course: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .required(),
  type: z.enum(allocationTypes),
  room: z.enum(roomTypes),
  faculty: z.enum(facultyKeys).or(z.null()),
});

export type Allocation = z.infer<typeof allocationSchema> & Entity;
