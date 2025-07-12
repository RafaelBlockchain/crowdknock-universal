// src/services/poll.service.ts

import { ApiService } from '@/core/services/api.service';
import { PollModel } from '@/models/poll';

export class PollService {
  private api = new ApiService();

  async fetchPolls(): Promise<PollModel[]> {
    const response = await this.api.get('/polls');
    return (response.data as any[]).map(item => PollModel.fromJson(item));
  }

  async fetchPollById(id: string): Promise<PollModel> {
    const response = await this.api.get(`/polls/${id}`);
    return PollModel.fromJson(response.data);
  }

  async vote(pollId: string, optionId: string): Promise<void> {
    await this.api.post(`/polls/${pollId}/vote`, {
      optionId: optionId,
    });
  }
}
