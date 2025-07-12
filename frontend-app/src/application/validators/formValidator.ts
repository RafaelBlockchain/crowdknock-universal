export class FormValidator {
  static required(value: string | null | undefined): string | null {
    if (!value || value.trim().length === 0) {
      return 'Este campo es obligatorio';
    }
    return null;
  }

  static email(value: string | null | undefined): string | null {
    const pattern = /^[^@]+@[^@]+\.[^@]+$/;
    if (!pattern.test(value ?? '')) {
      return 'Correo inválido';
    }
    return null;
  }

  static password(value: string | null | undefined): string | null {
    if (!value || value.length < 6) {
      return 'Mínimo 6 caracteres';
    }
    return null;
  }
}
