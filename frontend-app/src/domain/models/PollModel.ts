// src/domain/models/PollModel.ts

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollModel {
  id: string;
  question: string;
  options: PollOption[];
  author: string;
  createdAt: Date;
  expiresAt?: Date;
}

export const PollModelMapper = {
  fromJson(json: any): PollModel {
    return {
      id: json.id,
      question: json.question,
      author: json.author,
      createdAt: new Date(json.createdAt),
      expiresAt: json.expiresAt ? new Date(json.expiresAt) : undefined,
      options: (json.options || []).map((opt: any) => ({
        id: opt.id,
        text: opt.text,
        votes: opt.votes ?? 0,
      })),
    };
  },

  toJson(model: PollModel): any {
    return {
      id: model.id,
      question: model.question,
      author: model.author,
      createdAt: model.createdAt.toISOString(),
      expiresAt: model.expiresAt?.toISOString(),
      options: model.options.map(opt => ({
        id: opt.id,
        text: opt.text,
        votes: opt.votes,
      })),
    };
  },
};
