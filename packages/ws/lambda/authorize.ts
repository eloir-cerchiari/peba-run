import axios from 'axios';
import { Athlete } from '../src/model/athlete';
import { AthleteRepository } from '../src/repo/athelete-repo';
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from 'aws-lambda';

require('dotenv').config();

export async function handle(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const body = JSON.parse(event.body || '{}');

  if (!body?.code)
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'no code',
      }),
    };

  try {
    const tokenData = await authUser(body.code);

    const athleteRepo = new AthleteRepository();
    const athlete = await athleteRepo.get(tokenData.data.athlete.id);
    const response: Athlete[] = [];

    if (!athlete || !athlete.id) {
      const newAthlete = {
        id: tokenData.data.athlete.id,
        name:
          tokenData.data.athlete.firstname +
          ' ' +
          tokenData.data.athlete.lastname,
        strava: tokenData.data,
      };

      response.push(await athleteRepo.insert(newAthlete));
    }

    return {
      statusCode: 201,
      body:  JSON.stringify({
        att: athlete?.strava?.athlete,
        created: athlete,
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'error',
        stack: e.stack,
      }),
    };
  }
}

const authUser = async (code) => {
  const url = 'https://www.strava.com/api/v3/oauth/token';

  const data = {
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    code: code,
    grant_type: 'authorization_code',
  };

  const result = await axios.post(url, data);

  return result;
};
