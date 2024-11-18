'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StudentClass } from '@/entities/StudentClass';
import { classRepository } from '@/repositories/StudentClassRepository';
import { faculties, Faculty } from '@/entities/Faculty';
import { toast } from 'sonner';

export function ClassForm() {
  const [selected, setSelected] = useState<StudentClass | null>(null);
  const [name, setName] = useState('');
  const [faculty, setFaculty] = useState<Faculty>();

  useEffect(() => {
    if (selected) {
      setName(selected.name);
      setFaculty(selected.faculty);
    }
  }, [selected]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const classData: Partial<StudentClass> = {
        name,
        faculty,
      };

      if (selected) {
        await classRepository.update(selected.id ?? '', classData);
        toast.success('Class updated successfully');
      } else {
        if (name && faculty) {
          await classRepository.create({
            name,
            faculty,
          });
          toast.success('Class created successfully');
        }
      }

      resetForm();
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    }
  };

  const resetForm = () => {
    setSelected(null);
    setName('');
    setFaculty(undefined);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{selected ? 'Edit Class' : 'Add New Class'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Class Name</Label>
            <Input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter class name'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='faculty'>Faculty</Label>
            <Select
              value={faculty}
              onValueChange={(value) => setFaculty(value as Faculty)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select faculty' />
              </SelectTrigger>
              <SelectContent>
                {faculties.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
      </CardContent>
    </Card>
  );
}
