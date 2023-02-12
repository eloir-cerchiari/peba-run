import { HttpClient } from '@angular/common/http';
import { StravaAthlete } from '@peba-run/ws/src/model/athlete';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorCode } from '../../../../ws/src/error/error-code';
import {
  ILogService,
  makeLogService,
} from '../../../../ws/src/service/log-service';
import { FrontError } from '../error/front-error';
import { LocalStorageRepo } from '../repository/local-storage-repo';

export class WSService {
  constructor(private logService: ILogService, private http: HttpClient) {}

  async login(code: string): Promise<{
    athlete: StravaAthlete;
    token: string;
  }> {
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

    return response;
  }
}

export function makeWSService(httpClient: HttpClient) {
  const logService = makeLogService();
  return new WSService(logService, httpClient);
}
