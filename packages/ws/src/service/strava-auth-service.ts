import axios from "axios";
import { ILogService, makeLogService } from "./log-service";
import { Athlete, StravaAuthAthlete } from "../model/athlete";

	
export class StravaAuthService{
	constructor(

		private readonly logService: ILogService
	){}

	async authUser(userCode: string): Promise<StravaAuthAthlete>{
		this.logService.trace("Authenticating user with Strava");
		const url = 'https://www.strava.com/api/v3/oauth/token';

		const data = {
		  client_id: process.env.STRAVA_CLIENT_ID,
		  client_secret: process.env.STRAVA_CLIENT_SECRET,
		  code: userCode,
		  grant_type: 'authorization_code',
		};
	  
		const result = await axios.post(url, data);
	  
		return result.data;
	}
}

export function makeStravaAuthService(): StravaAuthService{
	return new StravaAuthService(makeLogService());
}