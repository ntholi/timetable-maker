import { Entity } from '@/lib/Entity';
import { facultyKeys } from '@/lib/Faculty';
import { z } from 'zod';

export const lecturerTitles = ['Dr', 'Mr', 'Mrs', 'Ms'] as const;

export const lecturerSchema = z.object({
  title: z.enum(lecturerTitles).optional(),
  name: z.string().min(1, 'Name is required'),
  faculty: z
    .enum(facultyKeys, {
      required_error: 'Please select a faculty',
    })
    .or(z.null()),
});

export type Lecturer = z.infer<typeof lecturerSchema> & Entity;
