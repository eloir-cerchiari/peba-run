import { ErrorCode } from "../error/error-code";
import { UseCaseError } from "../error/usecase-error";
import { JwtService, makeJwtService } from "../service/jw-service";
import { ILogService, makeLogService } from "../service/log-service";
import { GenericUseCase } from "./generic-usecase";

class ValidateJwtUseCase extends GenericUseCase{
  constructor(private readonly jwtService: JwtService, protected readonly logService: ILogService) {
	  super(logService);
  }

  async execute(jwt: string): Promise<JwtPayload> {
	this.logService.trace(`Validating jwt ${jwt}`);
	try{
		const payload = await this.jwtService.verify(jwt);
		this.logService.debug(`Validated jwt ${jwt} with payload ${JSON.stringify(payload)}`);
		return this.jwtService.verify(jwt);
	}catch(e){
		if(e instanceof UseCaseError) throw e;
		
		throw this.error({
			userMessage: 'Error validating jwt',
			code: ErrorCode.AuthenticationOnValidateJwt,
			status: 500,
			stack: e.stack,
			technicalMessage: [e.message],
		});
	}
  }
}

export function makeValidateJwtUseCase(): ValidateJwtUseCase {
	  return new ValidateJwtUseCase(makeJwtService(), makeLogService());
}