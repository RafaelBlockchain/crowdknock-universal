// src/data/repositories/PollRepository.ts

import { PollModel } from '@/domain/models/PollModel';
import { PollService } from '@/domain/services/PollService';

export class PollRepository {
  private service: PollService;

  constructor() {
    this.service = new PollService();
  }

  // Obtener todas las encuestas disponibles
  async fetchAllPolls(): Promise<PollModel[]> {
    return await this.service.getAll();
  }

  // Obtener una encuesta específica por su ID
  async fetchPollById(pollId: string): Promise<PollModel> {
    return await this.service.getById(pollId);
  }

  // Enviar un voto a una opción específica de una encuesta
  async vote(pollId: string, optionId: string): Promise<PollModel> {
    return await this.service.vote({ pollId, optionId });
  }

  // Crear una nueva encuesta
  async createPoll(poll: PollModel): Promise<PollModel> {
    return await this.service.create(poll);
  }

  // Cerrar una encuesta
  async closePoll(pollId: string): Promise<void> {
    return await this.service.closePoll(pollId);
  }
}
