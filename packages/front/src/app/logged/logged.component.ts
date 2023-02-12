import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Athlete, StravaAthlete } from '@peba-run/ws/src/model/athlete';
import { catchError, throwError } from 'rxjs';
import { FrontError } from 'src/kernel/error/front-error';
import { makeLocalStorageRepo } from 'src/kernel/repository/local-storage-repo';
import { makeLoginOnWSUseCase } from 'src/kernel/usecase/login-on-ws-usecase';
import { ErrorCode } from '../../../../ws/src/error/error-code';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss'],
})
export class LoggedComponent implements OnInit {
  public queryStringParams: Params = {};
  public athlete: StravaAthlete = {} as StravaAthlete;
  public loading = 0;
  private localStorageRepo = makeLocalStorageRepo();
  public error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.readQueryStringParams();
  }

  get queryStringParams$() {
    return JSON.stringify(this.queryStringParams);
  }

  public readQueryStringParams() {
    this.route.queryParams.subscribe((params) => {
      this.queryStringParams = params;

      if (params?.['error'] && params?.['error'] === 'access_denied') {
        return this.accessDenied();
      }
      this.loginOnWS(params['code']);
    });
  }

  private async loginOnWS(code: string) {
    this.loading++;
    const loginUseCase = makeLoginOnWSUseCase(this.http, this.localStorageRepo);

    try {
      const athlete = await loginUseCase.execute(code);
      this.accessOK();
    } catch (error) {
      if (
        error instanceof FrontError &&
        error.code === ErrorCode.AuthenticationOnStrava
      ) {
        this.error = true;
        this.accessDenied();
      }
    }
    this.loading--;
  }

  // redirect to route access-denied
  public accessDenied() {
    this.router.navigate(['/login/access-denied']);
  }

  public accessOK() {
    this.router.navigate(['/profile']);
  }
}
