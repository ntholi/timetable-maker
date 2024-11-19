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
import { Faculty } from '@/entities/Faculty';
import { classRepository } from '@/repositories/StudentClassRepository';
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { StudentClass } from './schema';
import { useFacultyStore } from '@/stores/facultyStore';

type Props = {
  onEdit: (studentClass: StudentClass) => void;
  className?: string;
};

export function ClassesTable({ onEdit, className }: Props) {
  const [classes, setClasses] = useState<StudentClass[]>([]);
  const { faculty: selectedFaculty } = useFacultyStore();

  useEffect(() => {
    if (!selectedFaculty) {
      setClasses([]);
      return;
    }

    const unsubscribe = classRepository.listen(selectedFaculty, (items) => {
      setClasses(items);
    });

    return () => unsubscribe();
  }, [selectedFaculty]);

  const handleDelete = async (id: string) => {
    try {
      await classRepository.delete(id);
      toast.success('Class deleted successfully');
    } catch (error) {
      toast.error('An error occurred while deleting');
      console.error(error);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <h2 className='text-lg font-medium'>Classes</h2>
      </CardHeader>
      <CardContent>
        {selectedFaculty ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((it) => (
                <TableRow key={it.id}>
                  <TableCell>{it.name}</TableCell>
                  <TableCell>{it.faculty}</TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() => onEdit(it)}
                      >
                        <Pencil className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='destructive'
                        size='icon'
                        onClick={() => handleDelete(it.id ?? '')}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className='text-center py-8 text-muted-foreground'>
            Please select a faculty to view classes
          </div>
        )}
      </CardContent>
    </Card>
  );
}
