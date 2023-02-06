import { HttpClient } from '@angular/common/http';
import { StravaAthlete } from '@peba-run/ws/src/model/athlete';
import { lastValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { LocalStorageRepo } from '../repository/local-storage-repo';
import {
  ILogService,
  makeLogService,
} from '@peba-run/ws/src/service/log-service';
import { environment } from 'src/environments/environment';

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
        }>(environment.apiUrl, { code: code })
        .pipe(
          catchError((err) => {
            return throwError(
              () => new Error('Something bad happened; please try again later.')
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