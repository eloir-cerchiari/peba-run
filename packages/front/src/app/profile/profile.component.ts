import { Component, OnInit } from '@angular/core';
import { StravaAthlete } from '@peba-run/ws/src/model/athlete';
import {
  GetLoggedAthleteUseCase,
  makeGetLoggedAthleteUseCase,
} from 'src/kernel/usecase/get-logged-athelete-use-case';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public athlete: StravaAthlete = {} as StravaAthlete;
  private getLoggedAthleteUseCase: GetLoggedAthleteUseCase =
    makeGetLoggedAthleteUseCase();
  ngOnInit(): void {
    this.athlete = this.getLoggedAthleteUseCase.execute();
  }
}
