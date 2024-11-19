import { StudentClass } from '@/app/database/classes/schema';
import { BaseFirebaseRepository } from './BaseRepository';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { Faculty } from '@/entities/Faculty';

class StudentClassRepository extends BaseFirebaseRepository<StudentClass> {
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
    if (await this.exists(data.name)) {
      throw new Error(`Class with name ${data.name} already exists`);
    }
    return super.create(data);
  }

  async update(id: string, data: Omit<StudentClass, 'id'>): Promise<void> {
    if (await this.exists(data.name)) {
      throw new Error(`Class with name ${data.name} already exists`);
    }
    return super.update(id, data);
  }

  async exists(name: string): Promise<boolean> {
    const q = query(
      collection(this.db, this.collectionName),
      where('name', '==', name)
    );
    return getDocs(q).then((it) => it.docs.length > 0);
  }
}

export const classRepository = new StudentClassRepository();
