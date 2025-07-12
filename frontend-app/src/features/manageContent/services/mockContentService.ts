import { ContentModel } from '../models/contentModel';

export class MockContentService {
  private mockContents: ContentModel[] = [
    { id: '1', title: 'Título 1', description: 'Desc 1' },
    { id: '2', title: 'Título 2', description: 'Desc 2' },
  ];

  async getAll(): Promise<ContentModel[]> {
    await this.delay(300); // Simula delay como Future.delayed
    return this.mockContents;
  }

  async create(content: Omit<ContentModel, 'id'>): Promise<ContentModel> {
    const newContent: ContentModel = {
      ...content,
      id: Date.now().toString(),
    };
    this.mockContents.push(newContent);
    return newContent;
  }

  async delete(id: string): Promise<void> {
    this.mockContents = this.mockContents.filter(item => item.id !== id);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
