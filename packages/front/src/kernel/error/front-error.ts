import { ErrorCode } from '../../../../ws/src/error/error-code';

export class FrontError extends Error {
  public code: ErrorCode;
  constructor(code: ErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}
