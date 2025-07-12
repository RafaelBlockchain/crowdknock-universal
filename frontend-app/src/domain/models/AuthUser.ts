export class AuthUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: string;

  constructor({
    id,
    name,
    email,
    role,
  }: {
    id: string;
    name: string;
    email: string;
    role: string;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  static fromJson(json: Record<string, any>): AuthUser {
    return new AuthUser({
      id: json.id,
      name: json.name,
      email: json.email,
      role: json.role,
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
