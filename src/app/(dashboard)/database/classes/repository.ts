import { Faculty } from '@/lib/Faculty';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { BaseRepository } from '../../../lib/BaseRepository';
import { StudentClass } from './StudentClass';

class StudentClassRepository extends BaseRepository<StudentClass> {
  constructor() {
    super('studentClasses');
  }

  listen(faculty: Faculty, onNext: (classes: StudentClass[]) => void) {
    return this.listenToCollection(onNext, [
      orderBy('name'),
      where('faculty', '==', faculty),
    ]);
  }

  async create(data: Omit<StudentClass, 'id'>): Promise<StudentClass> {
    if (!data.faculty) {
      throw new Error('Faculty is required');
    }
    data.name = data.name.trim().toUpperCase();
    const existing = await this.getByName(data.name);
    if (existing) {
      throw new Error(
        `Class with name ${data.name} already exists in ${existing.faculty}`
      );
    }
    return super.create(data);
  }

  async update(id: string, data: Omit<StudentClass, 'id'>): Promise<void> {
    if (!data.faculty) {
      throw new Error('Faculty is required');
    }
    data.name = data.name.trim().toUpperCase();
    const existing = await this.getByName(data.name);
    if (existing && existing.id !== id) {
      throw new Error(
        `Class with name ${data.name} already exists in ${existing.faculty}`
      );
    }
    return super.update(id, data);
  }

  async getByName(name: string): Promise<StudentClass | null> {
    const q = query(
      collection(this.db, this.collectionName),
      where('name', '==', name)
    );
    return await this.getDoc(q);
  }
}

export const classRepository = new StudentClassRepository();
