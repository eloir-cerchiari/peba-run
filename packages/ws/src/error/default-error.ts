import { APIGatewayProxyResult } from "aws-lambda";
import { ErrorCode } from "./error-code";

export class DefaultError extends Error {
  constructor(
	public userMessage: string,
	public code: ErrorCode,
	public status: number,
	public stack?: string,
	public technicalMessage?: string[]
  ) {
	super(userMessage);
  }
  response(): APIGatewayProxyResult {
	return {
		statusCode: this.status,
		body: JSON.stringify({
			message: this.userMessage,
			code: this.code,
		}),
	}
  }

}	