import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}

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
