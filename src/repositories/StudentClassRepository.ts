import { StudentClass } from '@/app/database/classes/schema';
import { BaseFirebaseRepository } from './BaseRepository';
import { orderBy, where } from 'firebase/firestore';
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
}

export const classRepository = new StudentClassRepository();
