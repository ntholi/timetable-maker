import { Database, Calendar, Users, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';

export default function Home() {
  const navItems = [
    {
      href: '/timetable',
      icon: Calendar,
      title: 'Timetable',
      description: 'Timetable scheduling',
    },
    {
      href: '/allocations',
      icon: Users,
      title: 'Allocations',
      description: 'Manage lecture allocations',
    },
    {
      href: '/database',
      icon: Database,
      title: 'Database',
      description: 'Rooms, students, and faculty data',
    },
  ];

  return (
    <main className='min-h-screen p-8'>
      <Logo className='text-center mb-12' />

      <div className='max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
        {navItems.map((item) => (
          <NavCard key={item.href} {...item} />
        ))}
      </div>
    </main>
  );
}

interface NavCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function NavCard({
  href,
  icon: Icon,
  title,
  description,
}: NavCardProps) {
  return (
    <Link href={href}>
      <div className='group transition-transform duration-200 cursor-pointer'>
        <div className='border rounded-lg p-6 hover:border-primary/40 hover:shadow-lg'>
          <div className='flex flex-col items-center space-y-4'>
            <Icon className='h-12 w-12 text-muted-foreground group-hover:text-primary' />
            <h2 className='text-xl font-semibold text-muted-foreground'>
              {title}
            </h2>
            <p className='text-sm text-center text-muted-foreground'>
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
