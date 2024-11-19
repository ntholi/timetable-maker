import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { FacultySelector } from '@/components/FacultySelector';

export const metadata: Metadata = {
  title: 'Timetable Maker',
  description: 'Limkokwing Lesotho Student Timetable Maker',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        {children}
        <Toaster />
        <FacultySelector />
      </body>
    </html>
  );
}
