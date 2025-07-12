// src/domain/models/ContentModel.ts

export interface ContentModel {
  id: string;
  title: string;
  body: string;
  type: string; // 'announcement', 'post', etc.
  imageUrl?: string;
  author: string;
  createdAt: Date;
  updatedAt?: Date;
}

export const ContentModelMapper = {
  fromJson(json: any): ContentModel {
    return {
      id: json.id,
      title: json.title,
      body: json.body,
      type: json.type,
      author: json.author,
      imageUrl: json.imageUrl ?? undefined,
      createdAt: new Date(json.createdAt),
      updatedAt: json.updatedAt ? new Date(json.updatedAt) : undefined,
    };
  },

  toJson(model: ContentModel): any {
    return {
      id: model.id,
      title: model.title,
      body: model.body,
      type: model.type,
      imageUrl: model.imageUrl,
      author: model.author,
      createdAt: model.createdAt.toISOString(),
      updatedAt: model.updatedAt?.toISOString(),
    };
  },
};
