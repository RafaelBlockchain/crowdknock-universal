// src/data/repositories/UserRepository.ts

import { UserModel } from '@/domain/models/UserModel';
import { UserService } from '@/domain/services/UserService';

export class UserRepository {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  /**
   * Obtener el perfil del usuario autenticado
   */
  async fetchCurrentUser(): Promise<UserModel> {
    return await this.service.getCurrentUser();
  }

  /**
   * Actualizar perfil del usuario (nombre, avatar, etc.)
   */
  async updateUser(user: UserModel): Promise<UserModel> {
    return await this.service.updateUser(user);
  }

  /**
   * Cambiar la contraseña del usuario
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.service.changePassword(currentPassword, newPassword);
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    await this.service.logout();
  }
}
