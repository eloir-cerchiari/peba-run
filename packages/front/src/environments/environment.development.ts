export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  strava: {
    clientId: '99930',
    redirectUri: 'http://localhost:4200/logged	',
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
