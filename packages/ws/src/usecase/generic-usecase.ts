
import { UseCaseError } from '../error/usecase-error';
import { ILogService } from '../service/log-service';

export class GenericUseCase {
  constructor(protected logService: ILogService) {}

  async error(error: {
    userMessage: string;
    code: number;
    status: number;
    stack?: string;
    technicalMessage?: string[];
  }): Promise<void> {
    this.logService.error(
      `Code: ${error.code}
Message: ${error.userMessage}
Status: ${error.status}
Stack: ${error.stack}
TechnicalMessage: ${JSON.stringify(error.technicalMessage)}`
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
