'use client';

import { Container } from '@/components/ui/container';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { value: 'rooms', label: 'Rooms', path: '/database/rooms' },
    { value: 'classes', label: 'Classes', path: '/database/classes' },
    { value: 'courses', label: 'Courses', path: '/database/courses' },
    { value: 'lecturers', label: 'Lecturers', path: '/database/lecturers' },
  ];

  const getCurrentTab = () => {
    const path = pathname.split('/').pop();
    return path || 'rooms';
  };

  return (
    <Container className='mt-4' width='xl'>
      <Tabs
        defaultValue={getCurrentTab()}
        onValueChange={(value) => {
          const tab = tabs.find((tab) => tab.value === value);
          if (tab) router.push(tab.path);
        }}
        className='w-full'
      >
        <TabsList className='w-full grid grid-cols-4'>
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
