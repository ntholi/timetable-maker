import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  xs: 'text-base',
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
};

export function Logo({ size = 'lg', className = '' }: LogoProps) {
  return (
    <h1 className={cn('font-bold', sizeClasses[size], className)}>
      <span className='text-blue-600'>The</span>Timetable
    </h1>
  );
}
