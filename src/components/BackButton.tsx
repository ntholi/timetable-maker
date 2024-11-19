import { ArrowLeftIcon } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <Button variant='outline' className='mb-5' onClick={() => router.push('/')}>
      <ArrowLeftIcon className='size-4' />
      Back
    </Button>
  );
}
