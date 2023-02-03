import { JwtService, makeJwtService } from '../service/jw-service';
import { LogService, makeLogService } from '../service/log-service';

class GenerateJwtUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logService: LogService
  ) {}

  async execute(userId: string): Promise<string> {
    try {
      return this.jwtService.generate(userId);
    } catch (e) {
      this.logService.error(e);
	  return '';
    }
  }
}

export function makeGenerateJwtUseCase(): GenerateJwtUseCase {
  return new GenerateJwtUseCase(makeJwtService(), makeLogService());
}
