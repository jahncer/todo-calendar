import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  login: (tokenResponse: any) => void;
  logout: () => void;
  updateUser: (userData: any) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (tokenResponse) => set({ user: tokenResponse, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (userData) => set((state) => ({ user: { ...state.user, ...userData } })),
    }),
    {
      name: 'auth-storage',
    }
  )
);