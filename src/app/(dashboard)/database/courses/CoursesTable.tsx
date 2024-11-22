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
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Course } from './Course';
import { useFacultyStore } from '@/stores/facultyStore';
import { courseRepository } from './repository';

type Props = {
  onEdit: (course: Course) => void;
  className?: string;
};

export function CoursesTable({ onEdit, className }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const { faculty: selectedFaculty } = useFacultyStore();

  useEffect(() => {
    if (!selectedFaculty) {
      setCourses([]);
      return;
    }

    const unsubscribe = courseRepository.listen(selectedFaculty, (items) => {
      setCourses(items);
    });

    return () => unsubscribe();
  }, [selectedFaculty]);

  const handleDelete = async (id: string) => {
    try {
      await courseRepository.delete(id);
      toast.success('Course deleted successfully');
    } catch (error) {
      toast.error('An error occurred while deleting');
      console.error(error);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <h2 className='text-lg font-medium'>Courses</h2>
      </CardHeader>
      <CardContent>
        {selectedFaculty ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((it) => (
                <TableRow key={it.id}>
                  <TableCell>{it.code}</TableCell>
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
            Please select a faculty to view courses
          </div>
        )}
      </CardContent>
    </Card>
  );
}
