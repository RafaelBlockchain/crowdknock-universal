export class BaseResponse<T> {
  readonly success: boolean;
  readonly data: T | null;
  readonly message: string | null;

  constructor({
    success,
    data = null,
    message = null,
  }: {
    success: boolean;
    data?: T | null;
    message?: string | null;
  }) {
    this.success = success;
    this.data = data ?? null;
    this.message = message ?? null;
  }

  static fromJson<T>(
    json: Record<string, any>,
    fromJsonT: (data: any) => T
  ): BaseResponse<T> {
    return new BaseResponse<T>({
      success: json.success,
      data: json.data ? fromJsonT(json.data) : null,
      message: json.message ?? null,
    });
  }
}
