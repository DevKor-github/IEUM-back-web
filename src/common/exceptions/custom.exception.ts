export class CustomException extends Error {
  public readonly errorCode: number;
  constructor(errorCode: number, message: string = null) {
    super(message);
    this.errorCode = errorCode;
  }
}
