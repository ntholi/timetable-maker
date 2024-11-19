'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const faculties = [
  { id: 'FABE', name: 'Faculty of Architecture and Built Environment' },
  { id: 'FBMG', name: 'Faculty of Business Management' },
  { id: 'FCTH', name: 'Faculty of Chemical Technology' },
  { id: 'FCMB', name: 'Faculty of Computing and Media' },
  { id: 'FDI', name: 'Faculty of Design and Innovation' },
  { id: 'FICT', name: 'Faculty of Information and Communication Technology' },
];

export function FacultySelector() {
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  return (
    <div className='fixed bottom-6 right-6 z-50'>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            size='lg'
            className={cn(
              selectedFaculty ? 'w-auto px-4' : 'w-14',
              'h-14 rounded-full shadow-lg',
              'bg-primary hover:bg-primary/90',
              'transition-all duration-300 ease-in-out',
              'hover:scale-105 active:scale-95',
              'flex items-center gap-2'
            )}
          >
            <GraduationCap className='h-6 w-6 flex-shrink-0' />
            {selectedFaculty && (
              <span className='font-medium text-base animate-in fade-in slide-in-from-left-3'>
                {selectedFaculty}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          side='top'
          className='w-[280px] mb-2'
          sideOffset={16}
        >
          {faculties.map((faculty) => (
            <DropdownMenuItem
              key={faculty.id}
              className={cn(
                'flex items-center py-3 px-4 cursor-pointer',
                'hover:bg-muted transition-colors',
                selectedFaculty === faculty.id && 'bg-muted'
              )}
              onClick={() => setSelectedFaculty(faculty.id)}
            >
              <div>
                <div className='font-medium'>{faculty.id}</div>
                <div className='text-sm text-muted-foreground'>
                  {faculty.name}
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
