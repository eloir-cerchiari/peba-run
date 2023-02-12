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
import { makeWSService, WSService } from '../service/ws-service';

export class LoginOnWSUseCase {
  constructor(
    private logService: ILogService,
    private http: HttpClient,
    private localStorageRepo: LocalStorageRepo,
    private wsService: WSService
  ) {}
  async execute(code: string) {
    const response = await this.wsService.login(code);
    this.logService.info(
      'LoginOnWSUseCase => execute => clear all on local storage'
    );
    this.localStorageRepo.clearAll();
    this.localStorageRepo.insert('token', response.token);
    this.localStorageRepo.insert('athlete', JSON.stringify(response.athlete));

    return response.athlete;
  }
}

export function makeLoginOnWSUseCase(
  httpClient: HttpClient,
  localStorageRepo: LocalStorageRepo
) {
  const logService = makeLogService();
  return new LoginOnWSUseCase(
    logService,
    httpClient,
    localStorageRepo,
    makeWSService(httpClient)
  );
}
