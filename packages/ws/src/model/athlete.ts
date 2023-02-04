export type StravaAthlete = {
  id: number;
  username: null;
  resource_state: number;
  firstname: string;
  lastname: string;
  bio: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: true;
  summit: true;
  created_at: string;
  updated_at: string;
  badge_type_id: number;
  weight: number;
  profile_medium: string;
  profile: string;
  friend: null;
  follower: null;
}
export type StravaAuthAthlete = {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: StravaAthlete;
}
export type Athlete = {
  id: string;
  name: string;
  strava: StravaAuthAthlete;
};
