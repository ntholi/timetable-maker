'use client';

import React from 'react';
import { Container } from '@/components/ui/container';
import { ClassForm } from '@/app/database/classes/ClassForm';
import { ClassesTable } from '@/app/database/classes/ClassesTable';
import { StudentClass } from './schema';

export default function ClassesPage() {
  const [selectedClass, setSelectedClass] = React.useState<StudentClass | null>(
    null
  );

  return (
    <Container>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <ClassForm
          selected={selectedClass}
          onReset={() => setSelectedClass(null)}
        />
        <ClassesTable onEdit={setSelectedClass} />
      </div>
    </Container>
  );
}
