import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Faculty } from '@/lib/Faculty';

interface FacultyState {
  faculty: Faculty | null;
  setFaculty: (faculty: Faculty) => void;
}

export const useFacultyStore = create<FacultyState>()(
  persist(
    (set) => ({
      faculty: null,
      setFaculty: (faculty) => set({ faculty: faculty }),
    }),
    {
      name: 'faculty-storage',
    }
  )
);
