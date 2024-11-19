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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Allocation, allocationSchema, allocationTypes } from './Allocation';
import { allocationRepository } from './repository';
import { useFacultyStore } from '@/stores/facultyStore';
import { Lecturer } from '../database/lecturers/Lecturer';
import { StudentClass } from '../database/classes/StudentClass';
import { Room, RoomType, roomTypes } from '../database/rooms/Room';
import { lecturerRepository } from '../database/lecturers/repository';
import { classRepository } from '../database/classes/repository';
import { roomRepository } from '../database/rooms/repository';

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

    return () => {
      unsubLecturers();
      unsubClasses();
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
                  <Select
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
                    value={field.value.id}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select lecturer' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lecturers.map((lecturer) => (
                        <SelectItem key={lecturer.id} value={lecturer.id ?? ''}>
                          {lecturer.title} {lecturer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='class'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const cls = classes.find((c) => c.id === value);
                      if (cls) {
                        field.onChange({
                          id: cls.id,
                          name: cls.name,
                        });
                      }
                    }}
                    value={field.value.id}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select class' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id ?? ''}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allocationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select room' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roomTypes.map((room) => (
                        <SelectItem key={room} value={room}>
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
