import { ErrorCode } from '../error/error-code';
import {
  AthleteRepository,
  makeAthleteRepository,
} from '../repo/athelete-repo';
import {
  makeStravaAuthService,
  StravaAuthService as StravaAuthService,
} from '../service/strava-auth-service';
import { ILogService, makeLogService } from '../service/log-service';
import {
  GenerateJwtUseCase,
  makeGenerateJwtUseCase,
} from './generate-jwt-usecase';
import { GenericUseCase } from './generic-usecase';
import { UseCaseError } from '../error/usecase-error';
import { StravaAthlete } from '../model/athlete';

export class LoginUserOnStravaUseCase extends GenericUseCase {
  constructor(
    private readonly stravaService: StravaAuthService,
    private readonly generateJwtUseCase: GenerateJwtUseCase,
    private readonly athleteRepo: AthleteRepository,
    protected readonly logService: ILogService
  ) {
    super(logService);
  }

  async execute(userCode: string): Promise<
  {
    
    athlete: StravaAthlete,
    token: string,
  }
  > {
    this.logService.trace(`Logging user with code ${userCode} on Strava`);
    
    try {
      
      const stravaAuthResult = await this.stravaService.authUser(userCode);

      this.logService.debug(`Logged user with code ${userCode} on Strava`);

      const athlete = await this.athleteRepo.get(
        `${stravaAuthResult.athlete.id}`
      );

      if (!athlete || !athlete.id) {
        const newAthlete = {
          id: `${stravaAuthResult.athlete.id}`,
          name:
            stravaAuthResult.athlete.firstname +
            ' ' +
            stravaAuthResult.athlete.lastname,
          strava: stravaAuthResult,
        };
        this.logService.debug(`Creating new athlete ${newAthlete.id}`);
        await this.athleteRepo.insert(newAthlete);
      }

      const token = await this.generateJwtUseCase.execute(
        `${stravaAuthResult.athlete.id}`
      );

      return {
        athlete:  stravaAuthResult.athlete,
        token: token,
      }

    } catch (e) {
      if (e instanceof UseCaseError) throw e;
      throw this.error({
        userMessage: 'Error logging user on Strava',
        code: ErrorCode.LoginUserOnStrava,
        status: 500,
        stack: e.stack,
        technicalMessage: [e.message],
      });
    }
  }
}

export function makeLoginUserOnStravaUseCase(): LoginUserOnStravaUseCase {
  const stravaAuthService = makeStravaAuthService();
  const generateJwtUseCase = makeGenerateJwtUseCase();
  const athleteRepo = makeAthleteRepository();
  const logService = makeLogService();

  return new LoginUserOnStravaUseCase(
    stravaAuthService,
    generateJwtUseCase,
    athleteRepo,
    logService
  );
}
