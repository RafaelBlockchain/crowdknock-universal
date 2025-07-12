// src/presentation/providers/userStore.ts

import { create } from 'zustand';
import { UserModel } from '@/domain/models/UserModel';
import { UserService } from '@/domain/services/UserService';

interface UserState {
  currentUser: UserModel | null;
  isLoading: boolean;
  error: string | null;

  loadUserProfile: () => Promise<void>;
  updateUserProfile: (updatedUser: UserModel) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isLoading: false,
  error: null,

  loadUserProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await UserService.getCurrentUser();
      set({ currentUser: user });
    } catch (e) {
      set({
        error: 'Error al cargar el perfil del usuario',
        currentUser: null,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updateUserProfile: async (updatedUser: UserModel) => {
    try {
      const user = await UserService.updateUser(updatedUser);
      set({ currentUser: user });
    } catch (e) {
      set({ error: 'Error al actualizar el perfil' });
    }
  },

  logout: () => {
    set({ currentUser: null });
  },
}));
