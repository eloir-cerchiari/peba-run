import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  public hasError = false;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      if (params['error']) this.hasError = true;
    });
  }

  loginStrava() {
    const url =
      `${environment.strava.authorizationUrl}` +
      `?client_id=${environment.strava.clientId}` +
      `&redirect_uri=${environment.strava.redirectUri}` +
      `&response_type=${environment.strava.authorizationUrlParams.response_type}` +
      `&scope=${environment.strava.authorizationUrlParams.scope}` +
      `&approval_prompt=${environment.strava.authorizationUrlParams.approval_prompt}`;

    window.location.href = url;
  }
}
