'use client';

import { Container } from '@/components/ui/container';
import { AllocationDialog } from './AllocationDialog';
import { AllocationsTable } from './AllocationsTable';
import BackButton from '@/components/BackButton';

export default function AllocationsPage() {
  return (
    <Container className='mt-5'>
      <div className='flex justify-between'>
        <BackButton />
        <h1 className='font-medium'>Allocations</h1>
        <AllocationDialog />
      </div>
      <AllocationsTable className='h-[80vh] overflow-auto' />
    </Container>
  );
}
