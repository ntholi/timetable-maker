import { StudentClass } from '@/app/database/classes/schema';
import { BaseFirebaseRepository } from './BaseRepository';
import { orderBy } from 'firebase/firestore';

class StudentClassRepository extends BaseFirebaseRepository<StudentClass> {
  constructor() {
    super('studentClasses');
  }

  listen(onNext: (classes: StudentClass[]) => void) {
    return this.listenToCollection(onNext, [orderBy('name')]);
  }
}

export const classRepository = new StudentClassRepository();
