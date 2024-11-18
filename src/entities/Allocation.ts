import { Entity } from '@/entities/Entity';
import { Faculty } from './Faculty';

export interface Allocation extends Entity {
  lecturer: {
    id: string;
    title: string;
    name: string;
  };
  studentClass: {
    id: string;
    name: string;
  };
}
