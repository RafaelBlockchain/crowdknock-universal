// src/domain/models/UserModel.ts

export interface UserModel {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  avatarUrl?: string | null;
  createdAt: Date;
}

export const UserModelMapper = {
  fromJson(json: any): UserModel {
    return {
      id: json.id ?? '',
      name: json.name ?? '',
      email: json.email ?? '',
      role: json.role ?? 'user',
      isActive: json.is_active ?? true,
      avatarUrl: json.avatarUrl ?? null,
      createdAt: json.createdAt ? new Date(json.createdAt) : new Date(),
    };
  },

  toJson(user: UserModel): any {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      is_active: user.isActive,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt.toISOString(),
    };
  }
};
