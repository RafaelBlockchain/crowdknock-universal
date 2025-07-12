// src/data/repositories/ChallengeRepository.ts

import { ChallengeModel } from '@/domain/models/ChallengeModel';
import { ChallengeService } from '@/domain/services/ChallengeService';

export class ChallengeRepository {
  private service: ChallengeService;

  constructor() {
    this.service = new ChallengeService();
  }

  async fetchAllChallenges(): Promise<ChallengeModel[]> {
    return await this.service.getAllChallenges();
  }

  async getChallengeById(id: string): Promise<ChallengeModel> {
    return await this.service.getById(id);
  }

  async submitChallenge(params: {
    challengeId: string;
    comment: string;
    filePath: string;
  }): Promise<void> {
    const { challengeId, comment, filePath } = params;
    await this.service.submitEvidence({
      challengeId,
      comment,
      filePath,
    });
  }
}
