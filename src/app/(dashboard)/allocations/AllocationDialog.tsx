'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AutoComplete } from '@/components/ui/autocomplete';
import { useFacultyStore } from '@/stores/facultyStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { classRepository } from '../database/classes/repository';
import { StudentClass } from '../database/classes/StudentClass';
import { Course } from '../database/courses/Course';
import { courseRepository } from '../database/courses/repository';
import { Lecturer } from '../database/lecturers/Lecturer';
import { lecturerRepository } from '../database/lecturers/repository';
import { roomTypes } from '../database/rooms/Room';
import { Allocation, allocationSchema, allocationTypes } from './Allocation';
import { allocationRepository } from './repository';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: Allocation | null;
  onClose: () => void;
};

export function AllocationDialog({
  open,
  onOpenChange,
  selected,
  onClose,
}: Props) {
  const { faculty } = useFacultyStore();
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [classes, setClasses] = useState<StudentClass[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const form = useForm<Allocation>({
    resolver: zodResolver(allocationSchema),
    defaultValues: {
      lecturer: { id: '', name: '', title: '' },
      class: { id: '', name: '' },
      course: { id: '', name: '' },
      type: allocationTypes[0],
      room: roomTypes[0],
      faculty: faculty,
    },
  });

  useEffect(() => {
    if (!faculty) return;

    const unsubLecturers = lecturerRepository.listen(faculty, setLecturers);
    const unsubClasses = classRepository.listenToCollection(setClasses);
    const unsubCourses = courseRepository.listen(faculty, setCourses);

    return () => {
      unsubLecturers();
      unsubClasses();
      unsubCourses();
    };
  }, [faculty]);

  useEffect(() => {
    if (selected) {
      form.reset(selected);
    } else {
      form.reset({
        lecturer: { id: '', name: '', title: '' },
        class: { id: '', name: '' },
        course: { id: '', name: '' },
        type: allocationTypes[0],
        room: roomTypes[0],
        faculty: faculty,
      });
    }
  }, [selected, form, faculty]);

  const onSubmit = async (data: Allocation) => {
    try {
      if (selected) {
        if (!selected.id) throw new Error('Allocation ID is required');
        await allocationRepository.update(selected.id, data);
        toast.success('Allocation updated successfully');
      } else {
        await allocationRepository.create(data);
        toast.success('Allocation created successfully');
      }
      handleClose();
    } catch (error) {
      toast.error('An error occurred', {
        description: (error as Error).message,
      });
    }
  };

  const handleClose = () => {
    onClose();
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selected ? 'Edit Allocation' : 'New Allocation'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='lecturer'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lecturer</FormLabel>
                  <FormControl>
                    <AutoComplete
                      options={lecturers.map((lecturer) => ({
                        value: lecturer.id ?? '',
                        label: `${lecturer.title} ${lecturer.name}`,
                      }))}
                      value={field.value.id}
                      onValueChange={(value) => {
                        const lecturer = lecturers.find((l) => l.id === value);
                        if (lecturer) {
                          field.onChange({
                            id: lecturer.id,
                            name: lecturer.name,
                            title: lecturer.title,
                          });
                        }
                      }}
                      placeholder='Select lecturer'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-2'>
              <FormField
                control={form.control}
                name='class'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <AutoComplete
                        options={classes.map((cls) => ({
                          value: cls.id ?? '',
                          label: cls.name,
                        }))}
                        value={field.value.id}
                        onValueChange={(value) => {
                          const cls = classes.find((c) => c.id === value);
                          if (cls) {
                            field.onChange({
                              id: cls.id,
                              name: cls.name,
                            });
                          }
                        }}
                        placeholder='Select class'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='course'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <FormControl>
                      <AutoComplete
                        options={courses.map((course) => ({
                          value: course.id ?? '',
                          label: course.name,
                        }))}
                        value={field.value.id}
                        onValueChange={(value) => {
                          const course = courses.find((c) => c.id === value);
                          if (course) {
                            field.onChange({
                              id: course.id,
                              name: course.name,
                            });
                          }
                        }}
                        placeholder='Select course'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <AutoComplete
                      options={allocationTypes.map((type) => ({
                        value: type,
                        label: type,
                      }))}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select type'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='room'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Room</FormLabel>
                  <FormControl>
                    <AutoComplete
                      options={roomTypes.map((room) => ({
                        value: room,
                        label: room,
                      }))}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select room'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-2'>
              <Button type='button' variant='outline' onClick={handleClose}>
                Cancel
              </Button>
              <Button type='submit'>{selected ? 'Update' : 'Create'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
