import { Entity } from '@/lib/Entity';
import { facultyKeys } from '@/lib/Faculty';
import { z } from 'zod';

export const courseSchema = z.object({
  name: z.string().min(1, 'Course name is required'),
  code: z
    .string()
    .min(1, 'Course code is required')
    .max(10, 'Course code too long'),
  faculty: z
    .enum(facultyKeys, {
      required_error: 'Please select a faculty',
    })
    .or(z.null()),
});

export type Course = z.infer<typeof courseSchema> & Entity;
