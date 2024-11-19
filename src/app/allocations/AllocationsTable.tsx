'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Allocation } from './Allocation';
import { useFacultyStore } from '@/stores/facultyStore';
import { allocationRepository } from './repository';

type Props = {
  className?: string;
};

export function AllocationsTable({ className }: Props) {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const { faculty: selectedFaculty } = useFacultyStore();

  useEffect(() => {
    if (!selectedFaculty) {
      setAllocations([]);
      return;
    }

    const unsubscribe = allocationRepository.listen(
      selectedFaculty,
      (items) => {
        setAllocations(items);
      }
    );

    return () => unsubscribe();
  }, [selectedFaculty]);

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
    <Card className={className}>
      <CardHeader>
        <h2 className='font-medium'>Allocations</h2>
      </CardHeader>
      <CardContent>
        {selectedFaculty ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lecturer</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Room</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations.map((it) => (
                <TableRow key={it.id}>
                  <TableCell>
                    {it.lecturer.title} {it.lecturer.name}
                  </TableCell>
                  <TableCell>{it.class.name}</TableCell>
                  <TableCell>
                    {it.room.name} ({it.room.type})
                  </TableCell>
                  <TableCell className='text-right'>
                    <Button
                      variant='destructive'
                      size='icon'
                      onClick={() => handleDelete(it.id ?? '')}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className='text-center py-8 text-muted-foreground'>
            Please select a faculty to view allocations
          </div>
        )}
      </CardContent>
    </Card>
  );
}
