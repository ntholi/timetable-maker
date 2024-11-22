'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../../../components/logo';
import { cn } from '@/lib/utils';

const navItems = [
  {
    href: '/timetable',
    label: 'Timetable',
  },
  {
    href: '/allocations',
    label: 'Allocations',
  },
  {
    href: '/database',
    label: 'Database',
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='border-b'>
      <div className='flex h-16 items-center px-4 container'>
        <Link href='/' className='mr-8'>
          <Logo size='xs' />
        </Link>
        <div className='flex gap-6'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm transition-colors hover:text-primary',
                pathname.startsWith(item.href)
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
