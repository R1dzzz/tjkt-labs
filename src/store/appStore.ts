import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  language: 'id' | 'en';
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  setLanguage: (lang: 'id' | 'en') => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'id',
      theme: 'system',
      sidebarOpen: true,

      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
    }),
    {
      name: 'tjkt-app-storage',
    }
  )
);
