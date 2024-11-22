import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-4xl',
  xl: 'text-5xl',
};

export function Logo({ size = 'lg', className = '' }: LogoProps) {
  return (
    <h1 className={cn('font-bold', sizeClasses[size], className)}>
      <span className='text-blue-600'>The</span>Timetable
    </h1>
  );
}
