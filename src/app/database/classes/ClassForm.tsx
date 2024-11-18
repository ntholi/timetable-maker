'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { classRepository } from '@/repositories/StudentClassRepository';
import { faculties } from '@/entities/Faculty';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StudentClass, classSchema } from './schema';

export function ClassForm() {
  const [selected, setSelected] = React.useState<StudentClass | null>(null);

  const form = useForm<StudentClass>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: '',
      faculty: undefined,
    },
  });

  useEffect(() => {
    if (selected) {
      form.reset({
        name: selected.name,
        faculty: selected.faculty,
      });
    }
  }, [selected, form]);

  const onSubmit = async (data: StudentClass) => {
    try {
      if (selected) {
        await classRepository.update(selected.id ?? '', data);
        toast.success('Class updated successfully');
      } else {
        await classRepository.create(data);
        toast.success('Class created successfully');
      }
      resetForm();
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    }
  };

  const resetForm = () => {
    setSelected(null);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{selected ? 'Edit Class' : 'Add New Class'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter class name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='faculty'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faculty</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select faculty' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {faculties.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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