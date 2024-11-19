'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Allocation } from './Allocation';
import { AllocationsTable } from './AllocationsTable';
import { AllocationDialog } from './AllocationDialog';

export default function AllocationsPage() {
  const [selectedAllocation, setSelectedAllocation] =
    useState<Allocation | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className='container mx-auto py-10'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Allocations</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className='mr-2 h-4 w-4' />
          New Allocation
        </Button>
      </div>

      <AllocationsTable
        onEdit={(allocation) => {
          setSelectedAllocation(allocation);
          setOpen(true);
        }}
      />

      <AllocationDialog
        open={open}
        onOpenChange={setOpen}
        selected={selectedAllocation}
        onClose={() => setSelectedAllocation(null)}
      />
    </div>
  );
}
