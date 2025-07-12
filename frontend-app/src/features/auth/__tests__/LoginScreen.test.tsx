// src/features/auth/__tests__/LoginScreen.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginScreen } from '../screens/LoginScreen';

describe('LoginScreen Tests', () => {
  it('renderiza campos de correo y contraseña', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    expect(getByPlaceholderText('Correo electrónico')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
  });

  it('muestra errores si los campos están vacíos', async () => {
    const { getByTestId, getByText } = render(<LoginScreen />);
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(getByText('El correo es obligatorio')).toBeTruthy();
      expect(getByText('La contraseña es obligatoria')).toBeTruthy();
    });
  });

  it('valida formato incorrecto de correo', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(<LoginScreen />);
    fireEvent.changeText(getByPlaceholderText('Correo electrónico'), 'invalido');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), '123456');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(getByText('Correo inválido')).toBeTruthy();
    });
  });

  it('formulario válido dispara onLogin', async () => {
    let loginCalled = false;

    const { getByPlaceholderText, getByTestId } = render(
      <LoginScreen onLogin={() => { loginCalled = true; }} />
    );

    fireEvent.changeText(getByPlaceholderText('Correo electrónico'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), '123456');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(loginCalled).toBe(true);
    });
  });
});
