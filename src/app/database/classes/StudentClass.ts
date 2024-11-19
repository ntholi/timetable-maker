import { Entity } from '@/lib/Entity';
import { facultyKeys } from '@/lib/Faculty';
import { z } from 'zod';

export const classSchema = z.object({
  name: z
    .string()
    .min(1, 'Class name is required')
    .max(6, 'Class name too long')
    .regex(/^[^0-9]+$/, 'Class name cannot contain numbers'),
  faculty: z
    .enum(facultyKeys, {
      required_error: 'Please select a faculty',
    })
    .or(z.null()),
});

export type StudentClass = z.infer<typeof classSchema> & Entity;
