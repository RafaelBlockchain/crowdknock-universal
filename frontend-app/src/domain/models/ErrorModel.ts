export class ErrorModel {
  readonly message: string;
  readonly statusCode: number | null;

  constructor({
    message,
    statusCode = null,
  }: {
    message: string;
    statusCode?: number | null;
  }) {
    this.message = message;
    this.statusCode = statusCode;
  }

  static fromJson(json: Record<string, any>): ErrorModel {
    return new ErrorModel({
      message: json.message ?? 'Error desconocido',
      statusCode: json.statusCode ?? null,
    });
  }

  toJson(): Record<string, any> {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
