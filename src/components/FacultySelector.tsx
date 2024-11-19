'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { faculties } from '@/entities/Faculty';
import { cn } from '@/lib/utils';
import { useFacultyStore } from '@/stores/facultyStore';
import { GraduationCap } from 'lucide-react';

export function FacultySelector() {
  const { faculty, setFaculty } = useFacultyStore();

  return (
    <div className='fixed bottom-6 right-6 z-50'>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            size='lg'
            className={cn(
              faculty ? 'w-auto px-4' : 'w-14',
              'h-14 rounded-full shadow-lg',
              'bg-primary hover:bg-primary/90',
              'transition-all duration-300 ease-in-out',
              'hover:scale-105 active:scale-95',
              'flex items-center gap-2'
            )}
          >
            <GraduationCap className='h-6 w-6 flex-shrink-0' />
            {faculty && (
              <span className='font-medium text-base animate-in fade-in slide-in-from-left-3'>
                {faculty}
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
          {faculties.map((it) => (
            <DropdownMenuItem
              key={it.id}
              className={cn(
                'flex items-center py-3 px-4 cursor-pointer',
                'hover:bg-muted transition-colors',
                it?.id === faculty && 'bg-muted'
              )}
              onClick={() => setFaculty(it.id)}
            >
              <div>
                <div className='font-medium'>{it.id}</div>
                <div className='text-sm text-muted-foreground'>{it.name}</div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
