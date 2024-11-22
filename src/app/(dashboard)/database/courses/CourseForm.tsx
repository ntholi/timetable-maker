'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFacultyStore } from '@/stores/facultyStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Course, courseSchema } from './Course';
import { courseRepository } from './repository';

type Props = {
  selected: Course | null;
  onReset: () => void;
  className?: string;
};

export function CourseForm({ selected, onReset, className }: Props) {
  const { faculty } = useFacultyStore();

  const form = useForm<Course>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: '',
      code: '',
      faculty: faculty,
    },
  });

  useEffect(() => {
    if (selected) {
      form.reset({
        name: selected.name,
        code: selected.code,
        faculty: faculty,
      });
    } else {
      form.reset({
        name: '',
        code: '',
        faculty: faculty,
      });
    }
  }, [selected, form, faculty]);

  const onSubmit = async (data: Course) => {
    try {
      if (selected) {
        await courseRepository.update(selected.id ?? '', data);
        toast.success('Course updated successfully');
      } else {
        await courseRepository.create(data);
        toast.success('Course created successfully');
      }
      resetForm();
    } catch (error) {
      toast.error('An error occurred', {
        description: (error as Error).message,
      });
      console.error(error);
    }
  };

  const resetForm = () => {
    form.reset({
      name: '',
      code: '',
      faculty: faculty,
    });
    onReset();
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{selected ? 'Edit Course' : 'New Course'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Code</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter course code' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter course name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-col gap-2'>
              <Label htmlFor='faculty'>Faculty</Label>
              <Input
                type='text'
                name='faculty'
                value={faculty ?? ''}
                disabled
              />
              <span className='text-sm text-destructive'>
                {form.formState.errors.faculty?.message}
              </span>
            </div>

            <div className='flex gap-2'>
              <Button type='submit'>{selected ? 'Update' : 'Create'}</Button>
              {selected && (
                <Button type='button' variant='outline' onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
