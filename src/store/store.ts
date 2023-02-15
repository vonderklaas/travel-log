import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Location = {
  lat: number;
  lng: number;
};

type LocationStore = {
  location: Location | null;
  setLocation: (newValue: Location) => void;
};

type SidebarStore = {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
  location: null,
  setLocation: (newValue: Location) => set(() => ({ location: newValue })),
}));

export const useSidebarStateStore = create<SidebarStore>((set) => ({
  isOpened: false,
  setIsOpened: (isOpened: boolean) => set(() => ({ isOpened: isOpened })),
}));
