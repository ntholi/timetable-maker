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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFacultyStore } from '@/stores/facultyStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Lecturer, lecturerSchema, lecturerTitles } from './Lecturer';
import { lecturerRepository } from './repository';

type Props = {
  selected: Lecturer | null;
  onReset: () => void;
  className?: string;
};

export function LecturerForm({ selected, onReset, className }: Props) {
  const { faculty } = useFacultyStore();

  const form = useForm<Lecturer>({
    resolver: zodResolver(lecturerSchema),
    defaultValues: {
      title: undefined,
      name: '',
      faculty: faculty,
    },
  });

  useEffect(() => {
    if (selected) {
      form.reset({
        title: selected.title,
        name: selected.name,
        faculty: faculty,
      });
    } else {
      form.reset({
        title: undefined,
        name: '',
        faculty: faculty,
      });
    }
  }, [selected, form, faculty]);

  const onSubmit = async (data: Lecturer) => {
    try {
      if (selected) {
        await lecturerRepository.update(selected.id ?? '', data);
        toast.success('Lecturer updated successfully');
      } else {
        await lecturerRepository.create(data);
        toast.success('Lecturer created successfully');
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
      title: undefined,
      name: '',
      faculty: faculty,
    });
    onReset();
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{selected ? 'Edit Lecturer' : 'New Lecturer'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a title' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lecturerTitles.map((title) => (
                        <SelectItem key={title} value={title}>
                          {title}
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
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter lecturer name' {...field} />
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
