export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000',
  strava: {
    clientId: '12345',
    redirectUri: 'http://localhost:4200/logged',
    authorizationUrl: 'https://www.strava.com/oauth/authorize',
    tokenUrl: 'https://www.strava.com/oauth/token',
    authorizationUrlParams: {
      response_type: 'code',
      scope: 'read,activity:read_all',
      approval_prompt: 'auto',
      // state: 'state',
    },
  },
};
