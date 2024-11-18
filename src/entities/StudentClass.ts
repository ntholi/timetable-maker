import { Entity } from '@/entities/Entity';
import { Faculty } from './Faculty';

export interface StudentClass extends Entity {
  name: string;
  faculty: Faculty;
}
