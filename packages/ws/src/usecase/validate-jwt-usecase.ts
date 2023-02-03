import { JwtService, makeJwtService } from "../service/jw-service";

class ValidateJwtUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(jwt: string): Promise<JwtPayload> {
	return this.jwtService.verify(jwt);
  }
}

export function makeValidateJwtUseCase(): ValidateJwtUseCase {
	  return new ValidateJwtUseCase(makeJwtService());
}