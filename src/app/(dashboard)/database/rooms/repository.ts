import { Faculty } from '@/lib/Faculty';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { BaseRepository } from '@/lib/BaseRepository';
import { Room } from './Room';

class RoomRepository extends BaseRepository<Room> {
  constructor() {
    super('rooms');
  }

  listen(faculty: Faculty, onNext: (rooms: Room[]) => void) {
    return this.listenToCollection(onNext, [
      orderBy('name'),
      where('faculty', '==', faculty),
    ]);
  }

  async create(data: Omit<Room, 'id'>): Promise<Room> {
    if (!data.faculty) {
      throw new Error('Faculty is required');
    }
    data.name = data.name.trim().toUpperCase();
    const existing = await this.getByName(data.name);
    if (existing) {
      throw new Error(
        `Room with name ${data.name} already exists in ${existing.faculty}`
      );
    }
    return super.create(data);
  }

  async update(id: string, data: Omit<Room, 'id'>): Promise<void> {
    if (!data.faculty) {
      throw new Error('Faculty is required');
    }
    data.name = data.name.trim().toUpperCase();
    const existing = await this.getByName(data.name);
    if (existing && existing.id !== id) {
      throw new Error(
        `Room with name ${data.name} already exists in ${existing.faculty}`
      );
    }
    return super.update(id, data);
  }

  async getByName(name: string): Promise<Room | null> {
    const q = query(
      collection(this.db, this.collectionName),
      where('name', '==', name)
    );
    return await this.getDoc(q);
  }
}

export const roomRepository = new RoomRepository();
