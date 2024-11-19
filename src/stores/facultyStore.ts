import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Faculty } from '@/entities/Faculty';

interface FacultyState {
  faculty?: Faculty;
  setFaculty: (faculty: Faculty) => void;
}

export const useFacultyStore = create<FacultyState>()(
  persist(
    (set) => ({
      faculty: undefined,
      setFaculty: (faculty) => set({ faculty: faculty }),
    }),
    {
      name: 'faculty-storage',
    }
  )
);
