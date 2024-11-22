import { Faculty } from '@/lib/Faculty';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { BaseRepository } from '../../../lib/BaseRepository';
import { Course } from './Course';

class CourseRepository extends BaseRepository<Course> {
  constructor() {
    super('courses');
  }

  listen(faculty: Faculty, onNext: (courses: Course[]) => void) {
    return this.listenToCollection(onNext, [
      orderBy('name'),
      where('faculty', '==', faculty),
    ]);
  }

  async create(data: Omit<Course, 'id'>): Promise<Course> {
    if (!data.faculty) {
      throw new Error('Faculty is required');
    }
    data.code = data.code.trim().toUpperCase();
    data.name = data.name.trim();
    const existing = await this.getByCode(data.code);
    if (existing) {
      throw new Error(
        `Course with code ${data.code} already exists in ${existing.faculty}`
      );
    }
    return super.create(data);
  }

  async update(id: string, data: Omit<Course, 'id'>): Promise<void> {
    if (!data.faculty) {
      throw new Error('Faculty is required');
    }
    data.code = data.code.trim().toUpperCase();
    data.name = data.name.trim();
    const existing = await this.getByCode(data.code);
    if (existing && existing.id !== id) {
      throw new Error(
        `Course with code ${data.code} already exists in ${existing.faculty}`
      );
    }
    return super.update(id, data);
  }

  async getByCode(code: string): Promise<Course | null> {
    const q = query(
      collection(this.db, this.collectionName),
      where('code', '==', code)
    );
    return await this.getDoc(q);
  }
}

export const courseRepository = new CourseRepository();
