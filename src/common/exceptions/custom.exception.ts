export class CustomException extends Error {
  public readonly errorCode: number;
  public readonly errorCodeName: string;
  constructor(
    errorCodeName: string,
    errorCode: number,
    message: string = null,
  ) {
    super(message);
    this.errorCodeName = errorCodeName;
    this.errorCode = errorCode;
  }
}
