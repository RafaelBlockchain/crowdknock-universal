// src/presentation/providers/challengeProvider.ts

import { create } from 'zustand';
import { ChallengeModel } from '@/domain/models/ChallengeModel';
import { ChallengeService } from '@/domain/services/ChallengeService';

interface ChallengeState {
  challenges: ChallengeModel[];
  isLoading: boolean;
  loadChallenges: () => Promise<void>;
}

export const useChallengeStore = create<ChallengeState>((set) => ({
  challenges: [],
  isLoading: false,

  loadChallenges: async () => {
    set({ isLoading: true });
    try {
      const data = await ChallengeService.getAllChallenges();
      set({ challenges: data });
    } catch (error) {
      set({ challenges: [] });
    } finally {
      set({ isLoading: false });
    }
  }
}));
