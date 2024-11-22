import { Faculty } from '@/lib/Faculty';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { BaseRepository } from '@/lib/BaseRepository';
import { Lecturer } from './Lecturer';

class LecturerRepository extends BaseRepository<Lecturer> {
  constructor() {
    super('lecturers');
  }

  listen(faculty: Faculty, onNext: (lecturers: Lecturer[]) => void) {
    return this.listenToCollection(onNext, [
      orderBy('name'),
      where('faculty', '==', faculty),
    ]);
  }

  async create(data: Omit<Lecturer, 'id'>): Promise<Lecturer> {
    if (!data.faculty) {
      throw new Error('Faculty is required');
    }
    data.name = data.name.trim();
    const existing = await this.getByName(data.name);
    if (existing) {
      throw new Error(
        `Lecturer with name ${data.name} already exists in ${existing.faculty}`
      );
    }
    return super.create(data);
  }

  async update(id: string, data: Omit<Lecturer, 'id'>): Promise<void> {
    if (!data.faculty) {
      throw new Error('Faculty is required');
    }
    data.name = data.name.trim();
    const existing = await this.getByName(data.name);
    if (existing && existing.id !== id) {
      throw new Error(
        `Lecturer with name ${data.name} already exists in ${existing.faculty}`
      );
    }
    return super.update(id, data);
  }

  async getByName(name: string): Promise<Lecturer | null> {
    const q = query(
      collection(this.db, this.collectionName),
      where('name', '==', name)
    );
    return await this.getDoc(q);
  }
}

export const lecturerRepository = new LecturerRepository();
