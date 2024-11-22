'use client';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Allocation } from './Allocation';
import { AllocationDialog } from './AllocationDialog';
import { AllocationsTable } from './AllocationsTable';

export default function AllocationsPage() {
  const [selectedAllocation, setSelectedAllocation] =
    useState<Allocation | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Container className='mt-4'>
      <div className='mb-4'>
        <Button onClick={() => setOpen(true)}>
          <Plus className='mr-2 h-4 w-4' />
          New
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
    </Container>
  );
}
