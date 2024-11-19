'use client';

import { RoomForm } from './RoomForm';
import { RoomsTable } from './RoomsTable';
import React from 'react';
import { Room } from './Room';

export default function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(null);

  return (
    <div className='grid grid-cols-12 gap-6'>
      <RoomForm
        className='col-span-4 max-h-fit'
        selected={selectedRoom}
        onReset={() => setSelectedRoom(null)}
      />
      <RoomsTable
        className='col-span-8 h-[80vh] overflow-auto'
        onEdit={setSelectedRoom}
      />
    </div>
  );
}
