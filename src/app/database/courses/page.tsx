'use client';

import { CourseForm } from './CourseForm';
import { CoursesTable } from './CoursesTable';
import React from 'react';
import { Course } from './Course';

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(
    null
  );

  return (
    <div className='grid grid-cols-12 gap-6'>
      <CourseForm
        className='col-span-4 max-h-fit'
        selected={selectedCourse}
        onReset={() => setSelectedCourse(null)}
      />
      <CoursesTable
        className='col-span-8 h-[80vh] overflow-auto'
        onEdit={setSelectedCourse}
      />
    </div>
  );
}
