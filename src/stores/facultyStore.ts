import { create } from 'zustand';
import { Faculty } from '@/entities/Faculty';

interface FacultyState {
  faculty?: Faculty;
  setFaculty: (faculty: Faculty) => void;
}

export const useFacultyStore = create<FacultyState>((set) => ({
  faculty: undefined,
  setFaculty: (faculty) => set({ faculty: faculty }),
}));
