'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { StudentClass } from './schema';
import { classRepository } from '@/repositories/StudentClassRepository';
import { toast } from 'sonner';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Faculty, faculties } from '@/entities/Faculty';

type Props = {
  onEdit: (studentClass: StudentClass) => void;
  className?: string;
};

export function ClassesTable({ onEdit, className }: Props) {
  const [classes, setClasses] = useState<StudentClass[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty>();

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
        <ToggleGroup
          type='single'
          value={selectedFaculty}
          onValueChange={(value: Faculty) => setSelectedFaculty(value)}
          className='flex flex-wrap gap-2'
        >
          {faculties.map((faculty) => (
            <ToggleGroupItem
              key={faculty}
              value={faculty}
              size='sm'
              variant='outline'
            >
              {faculty}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
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
