import { HttpClient } from '@angular/common/http';
import { StravaAthlete } from '@peba-run/ws/src/model/athlete';
import { lastValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { LocalStorageRepo } from '../repository/local-storage-repo';
import {
  ILogService,
  makeLogService,
} from '../../../../ws/src/service/log-service';
import { environment } from 'src/environments/environment';
import { ErrorCode } from '../../../../ws/src/error/error-code';
import { FrontError } from '../error/front-error';

export class LoginOnWSUseCase {
  constructor(
    private logService: ILogService,
    private http: HttpClient,
    private localStorageRepo: LocalStorageRepo
  ) {}
  async execute(code: string) {
    const response = await lastValueFrom(
      this.http
        .post<{
          athlete: StravaAthlete;
          token: string;
        }>(environment.apiUrl + '/auth-user', { code: code })
        .pipe(
          catchError((err) => {
            if (err.error.code == ErrorCode.AuthenticationOnStrava) {
              return throwError(
                () =>
                  new FrontError(
                    ErrorCode.AuthenticationOnStrava,
                    'Authentication on Strava failed'
                  )
              );
            }
            return throwError(
              () =>
                new FrontError(
                  ErrorCode.Authentication,
                  'Something bad happened; please try again later.'
                )
            );
          })
        )
    );
    this.logService.info(
      'LoginOnWSUseCase => execute => clear all on local storage'
    );
    this.localStorageRepo.clearAll();
    this.localStorageRepo.insert('token', response.token);

    return response.athlete;
  }
}

export function makeLoginOnWSUseCase(
  httpClient: HttpClient,
  localStorageRepo: LocalStorageRepo
) {
  const logService = makeLogService();
  return new LoginOnWSUseCase(logService, httpClient, localStorageRepo);
}
