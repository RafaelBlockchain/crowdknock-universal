import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DashboardScreen } from '../../../src/features/dashboard/DashboardScreen';

describe('DashboardScreen Tests', () => {
  test('Se renderiza el título correcto en el encabezado', () => {
    const { getByText } = render(<DashboardScreen />);
    expect(getByText('Dashboard')).toBeTruthy();
  });

  test('Renderiza contenido principal (FlatList, tarjetas, etc.)', () => {
    const { getByTestId, getAllByTestId } = render(<DashboardScreen />);
    
    expect(getByTestId('dashboard-list')).toBeTruthy();
    expect(getAllByTestId('dashboard-card').length).toBeGreaterThan(0);
  });

  test('Contiene al menos un botón funcional', () => {
    const mockCallback = jest.fn();

    const { getByTestId } = render(<DashboardScreen onAction={mockCallback} />);
    const button = getByTestId('dashboard-button');
    fireEvent.press(button);

    expect(mockCallback).toHaveBeenCalled();
  });

  test('Muestra métricas o textos clave', () => {
    const { getByText } = render(<DashboardScreen />);
    expect(getByText(/Total/i)).toBeTruthy();    // ej: "Total de casos"
    expect(getByText(/Usuarios/i)).toBeTruthy(); // ej: "Usuarios activos"
  });
});
