import { BaseFirebaseRepository } from './BaseRepository';
import { StudentClass } from '@/entities/StudentClass';

class StudentClassRepository extends BaseFirebaseRepository<StudentClass> {
  constructor() {
    super('studentClasses');
  }
}

export const classRepository = new StudentClassRepository();
