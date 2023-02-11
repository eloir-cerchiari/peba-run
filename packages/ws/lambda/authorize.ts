import axios from 'axios';
import { Athlete } from '../src/model/athlete';
import { AthleteRepository } from '../src/repo/athelete-repo';
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { makeGenerateJwtUseCase } from '../src/usecase/generate-jwt-usecase';
import { DefaultError } from '../src/error/default-error';
import { makeLoginUserOnStravaUseCase } from '../src/usecase/login-user-on-strava-usecase';
import { ErrorCode } from '../src/error/error-code';

require('dotenv').config();

export async function handle(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const body = JSON.parse(event.body || '{}');

    if (!body?.code) {
      throw new DefaultError(
        'Missing code',
        ErrorCode.InvalidInput,
        400,
        undefined,
        ['Missing code for login']
      );
    }

    const loginUserOnStrava = makeLoginUserOnStravaUseCase();
    const loginResponse = await loginUserOnStrava.execute(body.code);

    const response = {
      statusCode: 201,
      body: JSON.stringify(loginResponse),
    };
    return response;
  } catch (e) {
    if (e instanceof DefaultError) {
      return e.response();
    }
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'error',
      }),
    };
  }
}
