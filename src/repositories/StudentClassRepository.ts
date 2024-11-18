import { BaseFirebaseRepository } from './BaseRepository';
import { StudentClass } from '@/entities/StudentClass';
import { onSnapshot, QuerySnapshot } from 'firebase/firestore';

class StudentClassRepository extends BaseFirebaseRepository<StudentClass> {
  constructor() {
    super('studentClasses');
  }
}

export const classRepository = new StudentClassRepository();
