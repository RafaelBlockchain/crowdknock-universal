import { AuthProvider } from '../../../src/core/providers/authProvider';

describe('AuthProvider Tests', () => {
  let authProvider: AuthProvider;

  beforeEach(() => {
    authProvider = new AuthProvider();
  });

  test('Estado inicial debe ser no autenticado', () => {
    expect(authProvider.isAuthenticated()).toBe(false);
    expect(authProvider.getToken()).toBeNull();
  });

  test('setToken establece el token y cambia estado', () => {
    authProvider.setToken('test123');
    expect(authProvider.getToken()).toBe('test123');
    expect(authProvider.isAuthenticated()).toBe(true);
  });

  test('logout borra token y cambia estado', () => {
    authProvider.setToken('test123');
    authProvider.logout();
    expect(authProvider.getToken()).toBeNull();
    expect(authProvider.isAuthenticated()).toBe(false);
  });

  test('Simular login exitoso con setToken (async)', async () => {
    await new Promise((r) => setTimeout(r, 300)); // Simula retardo
    authProvider.setToken('jwt_token');
    expect(authProvider.isAuthenticated()).toBe(true);
  });
});
