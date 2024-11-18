import { Entity } from './Entity';

export const RoomTypes = ['Lecture Room', 'Hall', 'Multimedia Room'] as const;
export type RoomType = (typeof RoomTypes)[number];

export interface Room extends Entity {
  name: string;
  capacity: number;
  type: RoomType;
}
