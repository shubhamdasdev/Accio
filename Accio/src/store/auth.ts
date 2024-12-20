import { create } from 'zustand';
import { auth } from '@/lib/api';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email, password) => {
    const data = await auth.login(email, password);
    set({ user: data.user, isAuthenticated: true });
  },
  register: async (name, email, password) => {
    const data = await auth.register(name, email, password);
    set({ user: data.user, isAuthenticated: true });
  },
  logout: () => {
    auth.logout();
    set({ user: null, isAuthenticated: false });
  },
}));