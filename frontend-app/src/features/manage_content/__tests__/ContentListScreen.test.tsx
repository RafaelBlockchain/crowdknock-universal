// src/features/manage_content/__tests__/ContentListScreen.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ContentListScreen } from '../screens/ContentListScreen';

describe('ContentListScreen Tests', () => {
  it('renderiza elementos principales correctamente', () => {
    const { getByText } = render(<ContentListScreen />);
    expect(getByText('Gestión de Contenidos')).toBeTruthy();
  });

  it('muestra mensaje cuando no hay contenido', async () => {
    const { findByText } = render(<ContentListScreen />);
    const emptyMessage = await findByText(/No hay contenidos disponibles/i);
    expect(emptyMessage).toBeTruthy();
  });

  it('renderiza lista de contenidos si hay datos simulados', () => {
    const mockData = [
      { id: '1', title: 'Contenido 0', description: '' },
      { id: '2', title: 'Contenido 1', description: '' },
      { id: '3', title: 'Contenido 2', description: '' },
    ];

    const { getByText } = render(
      <ContentListScreen initialData={mockData} />
    );

    mockData.forEach(item => {
      expect(getByText(item.title)).toBeTruthy();
    });
  });

  it('el botón flotante "Agregar" dispara acción', async () => {
    let accionDisparada = false;

    const { getByTestId } = render(
      <ContentListScreen onAdd={() => (accionDisparada = true)} />
    );

    fireEvent.press(getByTestId('fab-add'));

    await waitFor(() => {
      expect(accionDisparada).toBe(true);
    });
  });
});
