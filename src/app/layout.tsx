import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
