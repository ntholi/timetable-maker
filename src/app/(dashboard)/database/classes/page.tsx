'use client';

import React from 'react';
import { StudentClass } from './StudentClass';
import { ClassForm } from './ClassForm';
import { ClassesTable } from './ClassesTable';

export default function ClassesPage() {
  const [selectedClass, setSelectedClass] = React.useState<StudentClass | null>(
    null
  );

  return (
    <div className='grid grid-cols-12 gap-6'>
      <ClassForm
        className='col-span-4 max-h-fit'
        selected={selectedClass}
        onReset={() => setSelectedClass(null)}
      />
      <ClassesTable
        className='col-span-8 h-[80vh] overflow-auto'
        onEdit={setSelectedClass}
      />
    </div>
  );
}
