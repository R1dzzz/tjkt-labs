import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, fullName: string, role: 'teacher' | 'student') => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

// Mock users for demo
const mockUsers: Record<string, { password: string; user: User }> = {
  'teacher@tjkt.labs': {
    password: 'teacher123',
    user: {
      id: '1',
      email: 'teacher@tjkt.labs',
      full_name: 'Fajar Wibowo S.Kom',
      role: 'teacher',
      created_at: new Date().toISOString(),
    },
  },
  'student@tjkt.labs': {
    password: 'student123',
    user: {
      id: '2',
      email: 'student@tjkt.labs',
      full_name: 'Siswa TJKT',
      role: 'student',
      created_at: new Date().toISOString(),
    },
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const mockUser = mockUsers[email.toLowerCase()];
        if (mockUser && mockUser.password === password) {
          set({ user: mockUser.user, isAuthenticated: true, isLoading: false });
          return true;
        }
        
        // Allow any login for demo
        if (email && password) {
          const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            full_name: email.split('@')[0],
            role: 'student',
            created_at: new Date().toISOString(),
          };
          set({ user: newUser, isAuthenticated: true, isLoading: false });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      register: async (email: string, _password: string, fullName: string, role: 'teacher' | 'student') => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          full_name: fullName,
          role,
          created_at: new Date().toISOString(),
        };
        
        set({ user: newUser, isAuthenticated: true, isLoading: false });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },
    }),
    {
      name: 'tjkt-auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
