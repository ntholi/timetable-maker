'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Allocation } from './Allocation';
import { allocationRepository } from './repository';
import { useFacultyStore } from '@/stores/facultyStore';

type Props = {
  onEdit: (allocation: Allocation) => void;
};

export function AllocationsTable({ onEdit }: Props) {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const { faculty } = useFacultyStore();

  useEffect(() => {
    if (!faculty) {
      setAllocations([]);
      return;
    }

    const unsubscribe = allocationRepository.listen(faculty, (items) => {
      setAllocations(items);
    });

    return () => unsubscribe();
  }, [faculty]);

  const handleDelete = async (id: string) => {
    try {
      await allocationRepository.delete(id);
      toast.success('Allocation deleted successfully');
    } catch (error) {
      toast.error('An error occurred while deleting');
      console.error(error);
    }
  };

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lecturer</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Room</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allocations.map((allocation) => (
            <TableRow key={allocation.id}>
              <TableCell>
                {allocation.lecturer.title} {allocation.lecturer.name}
              </TableCell>
              <TableCell>{allocation.class.name}</TableCell>
              <TableCell>{allocation.course.name}</TableCell>
              <TableCell>{allocation.type}</TableCell>
              <TableCell>{allocation.room}</TableCell>
              <TableCell className='text-right'>
                <div className='flex justify-end gap-2'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => onEdit(allocation)}
                  >
                    <Pencil className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='destructive'
                    size='icon'
                    onClick={() => handleDelete(allocation.id!)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
