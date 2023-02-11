import { APIGatewayProxyResult } from 'aws-lambda';
import { ErrorCode } from './error-code';

export class DbError extends Error {
  constructor(
    public userMessage: string,
    public code: ErrorCode,
    public stack?: string,
    public technicalMessage?: string[]
  ) {
    super(userMessage);
  }
}
