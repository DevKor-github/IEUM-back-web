export class CustomException extends Error {
  public readonly errorCode: number;
  constructor(message: string, errorCode: number) {
    super(message);
    this.errorCode = errorCode;
  }
}
