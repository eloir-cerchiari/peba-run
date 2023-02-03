import { JwtService, makeJwtService } from "../service/jw-service";
import { LogService, makeLogService } from "../service/log-service";

class ValidateJwtUseCase {
  constructor(private readonly jwtService: JwtService, private readonly logService: LogService) {}

  async execute(jwt: string): Promise<JwtPayload> {
	try{
		return this.jwtService.verify(jwt);
	}catch(e){
		this.logService.error(e);
		return new JwtPayload('', '', []);
	}
  }
}

export function makeValidateJwtUseCase(): ValidateJwtUseCase {
	  return new ValidateJwtUseCase(makeJwtService(), makeLogService());
}