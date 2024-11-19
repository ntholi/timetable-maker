'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useRouter, usePathname } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import BackButton from '@/components/BackButton';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { value: 'rooms', label: 'Rooms', path: '/database/rooms' },
    { value: 'classes', label: 'Classes', path: '/database/classes' },
    { value: 'lecturers', label: 'Lecturers', path: '/database/lecturers' },
  ];

  const getCurrentTab = () => {
    const path = pathname.split('/').pop();
    return path || 'rooms';
  };

  return (
    <Container className='mt-10' width='xl'>
      <div className='flex items-baseline gap-2'>
        <BackButton />
        <h1 className='text-center w-full font-semibold'>Database</h1>
      </div>
      <Tabs
        defaultValue={getCurrentTab()}
        onValueChange={(value) => {
          const tab = tabs.find((tab) => tab.value === value);
          if (tab) router.push(tab.path);
        }}
        className='w-full'
      >
        <TabsList className='w-full grid grid-cols-3'>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className='mt-4'>{children}</div>
    </Container>
  );
}
