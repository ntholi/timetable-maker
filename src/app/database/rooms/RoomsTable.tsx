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
import { Room } from './Room';
import { useFacultyStore } from '@/stores/facultyStore';
import { roomRepository } from './repository';

type Props = {
  onEdit: (room: Room) => void;
  className?: string;
};

export function RoomsTable({ onEdit, className }: Props) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { faculty: selectedFaculty } = useFacultyStore();

  useEffect(() => {
    if (!selectedFaculty) {
      setRooms([]);
      return;
    }

    const unsubscribe = roomRepository.listen(selectedFaculty, (items) => {
      setRooms(items);
    });

    return () => unsubscribe();
  }, [selectedFaculty]);

  const handleDelete = async (id: string) => {
    try {
      await roomRepository.delete(id);
      toast.success('Room deleted successfully');
    } catch (error) {
      toast.error('An error occurred while deleting');
      console.error(error);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <h2 className='text-lg font-medium'>Rooms</h2>
      </CardHeader>
      <CardContent>
        {selectedFaculty ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((it) => (
                <TableRow key={it.id}>
                  <TableCell>{it.name}</TableCell>
                  <TableCell>{it.type}</TableCell>
                  <TableCell>{it.capacity}</TableCell>
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
            Please select a faculty to view rooms
          </div>
        )}
      </CardContent>
    </Card>
  );
}
