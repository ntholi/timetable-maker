import { Entity } from '@/entities/Entity';
import { Faculty } from './Faculty';

export interface Lecturer extends Entity {
  title: string;
  name: string;
  faculty: Faculty;
}
