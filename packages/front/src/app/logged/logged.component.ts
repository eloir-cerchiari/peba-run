import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent implements OnInit {

  public queryStringParams: Params = {};

  constructor(

    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.readQueryStringParams();
  }

  get queryStringParams$() {
    return JSON.stringify(this.queryStringParams);
  }

  public readQueryStringParams() {
    this.route.queryParams.subscribe(params => {
      this.queryStringParams = params;
    
      if (params?.['error'] && params?.['error'] === 'access_denied') {
        return this.accessDenied();
      }
    });
  }

  // redirect to route access-denied
  public accessDenied() {
    this.router.navigate(['/access-denied']);
  }

}