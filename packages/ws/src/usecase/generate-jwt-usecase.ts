import { JwtService, makeJwtService } from "../service/jw-service";

class GenerateJwtUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(userId: string): Promise<string> {
	return this.jwtService.generate(userId);
  }
}

export function makeGenerateJwtUseCase(): GenerateJwtUseCase {
  return new GenerateJwtUseCase(makeJwtService());
}