// src/__tests__/DashboardScreen.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { DashboardScreen } from '../features/dashboard/screens/DashboardScreen';

describe('DashboardScreen Tests', () => {
  it('renderiza AppBar con título "Dashboard"', () => {
    const { getByText } = render(<DashboardScreen />);
    expect(getByText('Dashboard')).toBeTruthy();
  });

  it('renderiza lista de tarjetas o contenido', () => {
    const { getAllByTestId } = render(<DashboardScreen />);
    const cards = getAllByTestId('dashboard-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('botón funcional está presente y responde al tap', async () => {
    let accionEjecutada = false;

    const { getByTestId } = render(
      <DashboardScreen onActionPressed={() => (accionEjecutada = true)} />
    );

    fireEvent.press(getByTestId('action-button'));

    await waitFor(() => {
      expect(accionEjecutada).toBe(true);
    });
  });

  it('muestra métricas clave como "Total", "Usuarios", etc.', () => {
    const { getByText } = render(<DashboardScreen />);
    expect(getByText(/Total/i)).toBeTruthy();
    expect(getByText(/Usuarios/i)).toBeTruthy();
  });
});
