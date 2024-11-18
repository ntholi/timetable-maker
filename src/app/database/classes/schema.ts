import { z } from 'zod';
import { Faculty, faculties } from '@/entities/Faculty';
import { Entity } from '@/entities/Entity';

export const classSchema = z.object({
  name: z.string().min(1, 'Class name is required'),
  faculty: z.enum(faculties as [Faculty, ...Faculty[]], {
    required_error: 'Please select a faculty',
  }),
});

export type StudentClass = z.infer<typeof classSchema> & Entity;
