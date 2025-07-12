// src/domain/models/MetricModel.ts

export interface MetricModel {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
}

export const MetricModelMapper = {
  fromJson(json: any): MetricModel {
    return {
      id: json.id,
      name: json.name,
      value: json.value,
      unit: json.unit ?? '',
      timestamp: new Date(json.timestamp),
    };
  },

  toJson(model: MetricModel): any {
    return {
      id: model.id,
      name: model.name,
      value: model.value,
      unit: model.unit,
      timestamp: model.timestamp.toISOString(),
    };
  },
};
