'use client';

import { AllocationDialog } from './AllocationDialog';
import { AllocationsTable } from './AllocationsTable';

export default function AllocationsPage() {
  return (
    <div className='space-y-4'>
      <div className='flex justify-end'>
        <AllocationDialog />
      </div>
      <AllocationsTable className='h-[80vh] overflow-auto' />
    </div>
  );
}
