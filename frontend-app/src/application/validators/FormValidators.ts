export class FormValidators {
  static validateEmail(value: string | null | undefined): string | null {
    if (!value || value.trim() === '') return 'El correo es obligatorio';

    const emailRegex = /^[\w.\-]+@[\w.\-]+\.\w{2,4}$/;
    if (!emailRegex.test(value)) return 'Correo inválido';

    return null;
  }

  static validatePassword(value: string | null | undefined): string | null {
    if (!value || value.trim() === '') return 'La contraseña es obligatoria';
    if (value.length < 6) return 'Debe tener al menos 6 caracteres';
    return null;
  }

  static validateNotEmpty(value: string | null | undefined, field: string): string | null {
    if (!value || value.trim() === '') return `${field} es obligatorio`;
    return null;
  }
}
