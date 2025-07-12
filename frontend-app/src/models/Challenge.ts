// src/models/Challenge.ts

export interface Challenge {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string; // ISO string
}

export class ChallengeModel implements Challenge {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;

  constructor({
    id,
    title,
    description,
    status,
    createdAt,
  }: Challenge) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
  }

  static fromJson(json: any): ChallengeModel {
    return new ChallengeModel({
      id: json.id,
      title: json.title,
      description: json.description,
      status: json.status,
      createdAt: json.createdAt,
    });
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}
