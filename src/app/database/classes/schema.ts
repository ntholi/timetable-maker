import { z } from 'zod';
import { Faculty, faculties } from '@/entities/Faculty';
import { Entity } from '@/entities/Entity';

const facultyKeys = faculties.map((it) => it.id) as [Faculty, ...Faculty[]];
export const classSchema = z.object({
  name: z
    .string()
    .min(1, 'Class name is required')
    .max(6, 'Class name too long')
    .regex(/^[^0-9]+$/, 'Class name cannot contain numbers'),
  faculty: z.enum(facultyKeys, {
    required_error: 'Please select a faculty',
  }),
});

export type StudentClass = z.infer<typeof classSchema> & Entity;
