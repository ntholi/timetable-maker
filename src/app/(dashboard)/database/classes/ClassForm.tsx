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
import { Label } from '@/components/ui/label';
import { useFacultyStore } from '@/stores/facultyStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { StudentClass, classSchema } from './StudentClass';
import { classRepository } from './repository';
import { AutoComplete, type Option } from '@/components/ui/autocomplete';
import { programs } from '@/data/programs';
import { Input } from '@/components/ui/input';

type Props = {
  selected: StudentClass | null;
  onReset: () => void;
  className?: string;
};

export function ClassForm({ selected, onReset, className }: Props) {
  const { faculty } = useFacultyStore();

  const courseOptions: Option[] = programs
    .filter((program) => program.faculty === faculty)
    .map((program) => ({
      value: program.code,
      label: program.code,
    }));

  const form = useForm<StudentClass>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: '',
      faculty: faculty,
    },
  });

  useEffect(() => {
    if (selected) {
      form.reset({
        name: selected.name,
        faculty: faculty,
        year: selected.year,
      });
    } else {
      form.reset({
        name: '',
        faculty: faculty,
        year: 1,
      });
    }
  }, [selected, form, faculty]);

  const onSubmit = async (data: StudentClass) => {
    try {
      if (selected) {
        await classRepository.update(selected.id ?? '', data);
        toast.success('Class updated successfully', {});
      } else {
        await classRepository.create(data);
        toast.success('Class created successfully');
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
      faculty: faculty,
    });
    onReset();
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{selected ? 'Edit Class' : 'New Class'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-12 gap-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='col-span-10'>
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <AutoComplete
                        options={courseOptions}
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        placeholder='Select a course'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='year'
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
