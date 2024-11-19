import { Entity } from '@/lib/Entity';
import { facultyKeys } from '@/lib/Faculty';
import { z } from 'zod';

export const allocationSchema = z.object({
  lecturer: z.object({
    id: z.string(),
    name: z.string(),
    title: z.string().optional(),
  }),
  class: z.object({
    id: z.string(),
    name: z.string(),
  }),
  room: z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
  }),
  faculty: z
    .enum(facultyKeys, {
      required_error: 'Please select a faculty',
    })
    .or(z.null()),
});

export type Allocation = z.infer<typeof allocationSchema> & Entity;
