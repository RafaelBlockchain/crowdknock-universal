// src/features/settings/__tests__/SettingsTile.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SettingsTile } from '../components/SettingsTile';
import { Text } from 'react-native';

describe('SettingsTile', () => {
  it('muestra el título y subtítulo y responde al tap', () => {
    let tapped = false;

    const { getByText, getByTestId } = render(
      <SettingsTile
        iconName="language"
        title="Idioma"
        subtitle="Español"
        onPress={() => { tapped = true; }}
        testID="settings-tile"
      />
    );

    // Verifica textos
    expect(getByText('Idioma')).toBeTruthy();
    expect(getByText('Español')).toBeTruthy();

    // Simula tap
    fireEvent.press(getByTestId('settings-tile'));
    expect(tapped).toBe(true);
  });
});
