// src/presentation/providers/contentStore.ts

import { create } from 'zustand';
import { ContentModel } from '@/domain/models/ContentModel';
import { ContentService } from '@/domain/services/ContentService';

interface ContentState {
  contents: ContentModel[];
  isLoading: boolean;
  error: string | null;
  loadContents: () => Promise<void>;
  addContent: (content: ContentModel) => void;
  removeContent: (id: string) => void;
  updateContent: (updated: ContentModel) => void;
}

export const useContentStore = create<ContentState>((set, get) => ({
  contents: [],
  isLoading: false,
  error: null,

  loadContents: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await ContentService.getAll();
      set({ contents: result });
    } catch (e) {
      set({ error: 'Error al cargar contenidos' });
    } finally {
      set({ isLoading: false });
    }
  },

  addContent: (content) => {
    const current = get().contents;
    set({ contents: [content, ...current] });
  },

  removeContent: (id) => {
    const updated = get().contents.filter((item) => item.id !== id);
    set({ contents: updated });
  },

  updateContent: (updated) => {
    const contents = get().contents.map((item) =>
      item.id === updated.id ? updated : item
    );
    set({ contents });
  }
}));
