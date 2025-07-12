// src/presentation/providers/pollStore.ts

import { create } from 'zustand';
import { PollModel } from '@/domain/models/PollModel';
import { PollService } from '@/domain/services/PollService';

interface PollState {
  polls: PollModel[];
  isLoading: boolean;
  error: string | null;
  loadPolls: () => Promise<void>;
  vote: (pollId: string, optionId: string) => Promise<void>;
  getPollById: (id: string) => PollModel | undefined;
}

export const usePollStore = create<PollState>((set, get) => ({
  polls: [],
  isLoading: false,
  error: null,

  loadPolls: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await PollService.getAll();
      set({ polls: data });
    } catch (e) {
      set({ error: 'Error al cargar encuestas' });
    } finally {
      set({ isLoading: false });
    }
  },

  vote: async (pollId, optionId) => {
    try {
      const updatedPoll = await PollService.vote(pollId, optionId);
      const updatedPolls = get().polls.map((p) =>
        p.id === pollId ? updatedPoll : p
      );
      set({ polls: updatedPolls });
    } catch (e) {
      set({ error: 'Error al enviar voto' });
    }
  },

  getPollById: (id: string) => {
    return get().polls.find((p) => p.id === id);
  },
}));
