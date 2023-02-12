import { StravaAthlete } from '@peba-run/ws/src/model/athlete';
import { ErrorCode } from '../../../../ws/src/error/error-code';
import { FrontError } from '../error/front-error';
import {
  LocalStorageRepo,
  makeLocalStorageRepo,
} from '../repository/local-storage-repo';

export class GetLoggedAthleteUseCase {
  constructor(private localStorageRepo: LocalStorageRepo) {}

  execute(): StravaAthlete {
    const athlete = this.localStorageRepo.get('athlete');
    if (!athlete) {
      throw new FrontError(
        ErrorCode.DatabaseRegistryNotFound,
        'No athlete in local storage'
      );
    }
    return JSON.parse(athlete);
  }
}

export function makeGetLoggedAthleteUseCase(): GetLoggedAthleteUseCase {
  return new GetLoggedAthleteUseCase(makeLocalStorageRepo());
}
