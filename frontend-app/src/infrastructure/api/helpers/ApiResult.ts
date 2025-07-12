export class ApiResult<T> {
  readonly data: T | null;
  readonly error: string | null;

  private constructor(data: T | null, error: string | null) {
    this.data = data;
    this.error = error;
  }

  static success<T>(data: T): ApiResult<T> {
    return new ApiResult(data, null);
  }

  static failure<T>(error: string): ApiResult<T> {
    return new ApiResult<T>(null, error);
  }

  get isSuccess(): boolean {
    return this.data !== null;
  }

  get isFailure(): boolean {
    return this.error !== null;
  }
}
