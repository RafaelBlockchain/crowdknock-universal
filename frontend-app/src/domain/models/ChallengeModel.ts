// src/domain/models/ChallengeModel.ts

export interface ChallengeModel {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  author: string;
}

export const ChallengeModelMapper = {
  fromJson(json: any): ChallengeModel {
    return {
      id: json.id,
      title: json.title,
      description: json.description,
      createdAt: new Date(json.createdAt),
      author: json.author,
    };
  },

  toJson(model: ChallengeModel): any {
    return {
      id: model.id,
      title: model.title,
      description: model.description,
      createdAt: model.createdAt.toISOString(),
      author: model.author,
    };
  },
};
