import { create } from 'zustand';

interface SuperSaverState {
  isSuperSaver: boolean;
  toggleSuperSaver: () => void;
  setSuperSaver: (value: boolean) => void;
}

export const useSuperSaverStore = create<SuperSaverState>((set) => ({
  isSuperSaver: false, // Default state is off
  toggleSuperSaver: () => set((state) => ({ isSuperSaver: !state.isSuperSaver })),
  setSuperSaver: (value) => set({ isSuperSaver: value }),
}));
