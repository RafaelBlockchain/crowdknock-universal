// src/data/repositories/ContentRepository.ts

import { ContentModel } from '@/domain/models/ContentModel';
import { ContentService } from '@/domain/services/ContentService';

export class ContentRepository {
  private service: ContentService;

  constructor() {
    this.service = new ContentService();
  }

  // Obtener todos los contenidos
  async fetchAll(): Promise<ContentModel[]> {
    return await this.service.getAll();
  }

  // Crear nuevo contenido
  async create(content: ContentModel): Promise<ContentModel> {
    return await this.service.createContent(content);
  }

  // Actualizar contenido
  async update(content: ContentModel): Promise<ContentModel> {
    return await this.service.updateContent(content);
  }

  // Eliminar contenido
  async delete(id: string): Promise<void> {
    await this.service.deleteContent(id);
  }

  // Obtener por ID
  async fetchById(id: string): Promise<ContentModel> {
    return await this.service.getById(id);
  }
}
