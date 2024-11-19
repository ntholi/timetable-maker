import { BaseRepository } from '@/lib/BaseRepository';
import { Faculty } from '@/lib/Faculty';
import { collection, orderBy, query, where } from 'firebase/firestore';
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
    return super.create(data);
  }

  async update(id: string, data: Omit<Allocation, 'id'>): Promise<void> {
    if (!data.faculty) {
      throw new Error('Faculty is required');
    }
    return super.update(id, data);
  }
}

export const allocationRepository = new AllocationRepository();
