// src/__tests__/contentService.test.ts
import { ContentServiceMock } from '../test/mocks/ContentServiceMock';
import { ContentModel } from '../features/manage_content/models/ContentModel';

describe('ContentService Tests (mock)', () => {
  let contentService: ContentServiceMock;

  beforeEach(() => {
    contentService = new ContentServiceMock();
  });

  test('Obtener todos los contenidos', async () => {
    const contents = await contentService.getAll();
    expect(contents.length).toBe(2);
    expect(contents[0].title).toBe('Título 1');
  });

  test('Crear nuevo contenido', async () => {
    const nuevo: ContentModel = {
      id: '',
      title: 'Nuevo',
      description: 'Contenido creado desde test',
    };

    const creado = await contentService.create(nuevo);
    expect(creado.id).not.toBe('');
    expect(creado.title).toBe('Nuevo');

    const all = await contentService.getAll();
    expect(all.length).toBe(3);
  });

  test('Eliminar contenido existente', async () => {
    const initial = await contentService.getAll();
    expect(initial.length).toBe(2);

    await contentService.delete('1');
    const updated = await contentService.getAll();
    expect(updated.length).toBe(1);
    expect(updated.some(c => c.id === '1')).toBe(false);
  });
});
