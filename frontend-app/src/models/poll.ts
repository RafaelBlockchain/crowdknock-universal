// src/models/poll.ts

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export class PollOptionModel implements PollOption {
  id: string;
  text: string;
  votes: number;

  constructor(data: PollOption) {
    this.id = data.id;
    this.text = data.text;
    this.votes = data.votes ?? 0;
  }

  static fromJson(json: any): PollOptionModel {
    return new PollOptionModel({
      id: json.id,
      text: json.text,
      votes: json.votes ?? 0,
    });
  }
}

export interface PollModelProps {
  id: string;
  question: string;
  options: PollOptionModel[];
  isClosed: boolean;
  createdAt: Date;
}

export class PollModel implements PollModelProps {
  id: string;
  question: string;
  options: PollOptionModel[];
  isClosed: boolean;
  createdAt: Date;

  constructor(data: PollModelProps) {
    this.id = data.id;
    this.question = data.question;
    this.options = data.options;
    this.isClosed = data.isClosed;
    this.createdAt = data.createdAt;
  }

  static fromJson(json: any): PollModel {
    return new PollModel({
      id: json.id,
      question: json.question,
      isClosed: json.isClosed,
      createdAt: new Date(json.createdAt),
      options: (json.options ?? []).map((opt: any) => PollOptionModel.fromJson(opt)),
    });
  }
}
