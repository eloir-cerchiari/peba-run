import { UseCaseError } from '../error/usecase-error';
import { ILogService } from '../service/log-service';

export class GenericUseCase {
  constructor(protected logService: ILogService) {}

  error(error: {
    userMessage: string;
    code: number;
    status: number;
    stack?: string;
    technicalMessage?: string[];
  }): void {
    this.logService.error(
      `- Code: ${error.code}\n` +
        `- Message: ${error.userMessage}` +
        `\n- Status: ${error.status}` +
        `\n- Stack: ${error.stack}` +
        `\n- TechnicalMessage: ${JSON.stringify(error.technicalMessage)}`
    );

    throw new UseCaseError(
      error.userMessage,
      error.code,
      error.status,
      error.stack,
      error.technicalMessage
    );
  }
}
