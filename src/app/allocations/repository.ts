import { Faculty } from '@/lib/Faculty';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { BaseRepository } from '../../lib/BaseRepository';
import { Allocation } from './Allocation';

class AllocationRepository extends BaseRepository<Allocation> {
  constructor() {
    super('allocations');
  }

  listen(faculty: Faculty, onNext: (allocations: Allocation[]) => void) {
    return this.listenToCollection(onNext, [
      orderBy('lecturer.name'),
      where('faculty', '==', faculty),
    ]);
  }

  async create(data: Omit<Allocation, 'id'>): Promise<Allocation> {
    if (!data.faculty) {
      throw new Error('Faculty is required');
    }
    const existing = await this.checkExisting(data);
    if (existing) {
      throw new Error(
        `${data.lecturer.name} is already allocated to ${data.class.name} in ${data.room.name}`
      );
    }
    return super.create(data);
  }

  async update(id: string, data: Omit<Allocation, 'id'>): Promise<void> {
    if (!data.faculty) {
      throw new Error('Faculty is required');
    }
    const existing = await this.checkExisting(data);
    if (existing && existing.id !== id) {
      throw new Error(
        `${data.lecturer.name} is already allocated to ${data.class.name} in ${data.room.name}`
      );
    }
    return super.update(id, data);
  }

  private async checkExisting(
    data: Omit<Allocation, 'id'>
  ): Promise<Allocation | null> {
    const q = query(
      collection(this.db, this.collectionName),
      where('lecturer.id', '==', data.lecturer.id),
      where('class.id', '==', data.class.id)
    );
    return await this.getDoc(q);
  }
}

export const allocationRepository = new AllocationRepository();
