'use client';

import React from 'react';
import { Container } from '@/components/ui/container';
import { ClassForm } from '@/app/database/classes/ClassForm';
import { ClassesTable } from '@/app/database/classes/ClassesTable';

export default function ClassesPage() {
  return (
    <Container>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <ClassForm />
        <ClassesTable />
      </div>
    </Container>
  );
}
