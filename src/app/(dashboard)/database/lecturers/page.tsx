'use client';

import { LecturerForm } from './LecturerForm';
import { LecturersTable } from './LecturersTable';
import React from 'react';
import { Lecturer } from './Lecturer';

export default function LecturersPage() {
  const [selectedLecturer, setSelectedLecturer] =
    React.useState<Lecturer | null>(null);

  return (
    <div className='grid grid-cols-12 gap-6'>
      <LecturerForm
        className='col-span-4 max-h-fit'
        selected={selectedLecturer}
        onReset={() => setSelectedLecturer(null)}
      />
      <LecturersTable
        className='col-span-8 h-[80vh] overflow-auto'
        onEdit={setSelectedLecturer}
      />
    </div>
  );
}
