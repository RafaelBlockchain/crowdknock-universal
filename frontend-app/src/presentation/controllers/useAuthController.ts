// src/presentation/controllers/useAuthController.ts

import { useAuthStore } from '@/state/authStore';
import { AuthRepository } from '@/infrastructure/services/AuthRepository';

const repository = new AuthRepository();

export function useAuthController() {
  const { setToken } = useAuthStore();

  const login = async (email: string, password: string): Promise<void> => {
    const token = await repository.login({ email, password });

    if (token) {
      setToken(token); // Guarda token en Zustand
    } else {
      throw new Error('Credenciales inválidas');
    }
  };

  return { login };
}
