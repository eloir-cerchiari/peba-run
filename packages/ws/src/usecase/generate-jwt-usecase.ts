import { ErrorCode } from '../error/error-code';
import { UseCaseError } from '../error/usecase-error';
import { JwtService, makeJwtService } from '../service/jwt-service';
import { ILogService, makeLogService } from '../service/log-service';
import { GenericUseCase } from './generic-usecase';

export class GenerateJwtUseCase extends GenericUseCase {
  constructor(
    private readonly jwtService: JwtService,
    protected readonly logService: ILogService
  ) {
    super(logService);
  }

  async execute(userId: string): Promise<string> {
    this.logService.trace(`Generating jwt for user ${userId}`);
    try {
      const token = this.jwtService.generate(userId);
      this.logService.debug(`Generated jwt for user ${userId}: ${token}`);
      return token;
    } catch (e) {
      if (e instanceof UseCaseError) throw e;
      throw this.error({
        userMessage: 'Error generating auth token',
        code: ErrorCode.AuthenticationOnGenerateJwt,
        status: 500,
        stack: e.stack,
        technicalMessage: [e.message],
      });
    }
  }
}

export function makeGenerateJwtUseCase(): GenerateJwtUseCase {
  return new GenerateJwtUseCase(makeJwtService(), makeLogService());
}
