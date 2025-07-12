export class UserModel {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: string;

  constructor({
    id,
    name,
    email,
    role = 'user',
  }: {
    id: string;
    name: string;
    email: string;
    role?: string;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  static fromJson(json: Record<string, any>): UserModel {
    return new UserModel({
      id: json.id,
      name: json.name,
      email: json.email,
      role: json.role ?? 'user',
    });
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
    };
  }
}
