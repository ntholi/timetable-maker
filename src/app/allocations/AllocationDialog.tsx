'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useFacultyStore } from '@/stores/facultyStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Lecturer } from '../database/lecturers/Lecturer';
import { lecturerRepository } from '../database/lecturers/repository';
import { Room, RoomType, roomTypes } from '../database/rooms/Room';
import { roomRepository } from '../database/rooms/repository';
import { StudentClass } from '../database/classes/StudentClass';
import { classRepository } from '../database/classes/repository';
import { Allocation, allocationSchema } from './Allocation';
import { allocationRepository } from './repository';
import { Plus } from 'lucide-react';

type Props = {
  onSuccess?: () => void;
};

export function AllocationDialog({ onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const { faculty } = useFacultyStore();
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [classes, setClasses] = useState<StudentClass[]>([]);

  const form = useForm<Allocation>({
    resolver: zodResolver(allocationSchema),
    defaultValues: {
      faculty: faculty,
    },
  });

  useEffect(() => {
    if (!faculty || !open) return;

    const unsubLecturers = lecturerRepository.listenToCollection(setLecturers);
    const unsubClasses = classRepository.listenToCollection(setClasses);

    return () => {
      unsubLecturers();
      unsubClasses();
    };
  }, [faculty, open]);

  const onSubmit = async (data: Allocation) => {
    try {
      await allocationRepository.create(data);
      toast.success('Allocation created successfully');
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      toast.error('An error occurred', {
        description: (error as Error).message,
      });
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='h-4 w-4 mr-2' />
          Add Allocation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Allocation</DialogTitle>
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
                          id: lecturer.id!,
                          name: lecturer.name,
                          title: lecturer.title,
                        });
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a lecturer' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lecturers.map((lecturer) => (
                        <SelectItem key={lecturer.id} value={lecturer.id!}>
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
                      const selectedClass = classes.find((c) => c.id === value);
                      if (selectedClass) {
                        field.onChange({
                          id: selectedClass.id!,
                          name: selectedClass.name,
                        });
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a class' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id!}>
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
              name='room'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const room = roomTypes.find((r) => r === value);
                      if (room) {
                        field.onChange(room);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a room' />
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

            <Button type='submit'>Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
