import axios from 'axios';
require('dotenv').config()

export async function handle(event) {
  const body = JSON.parse(event.body);

  if(!body.code) return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'no code',
    })
  }
  
  try{
    const tokenData = await authUser(body.code);

    return {
      statusCode:201,
      body:JSON.stringify(
        {
          message: `hello, i get the token ${tokenData}`
        }
      )
    };
  }catch(e){
    console.log(e.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'error',
        stack: e.stack,
      })
    }
  }
}

const authUser = async (code) => {
  const url = 'https://www.strava.com/api/v3/oauth/token';
  const data = {
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    code: code ,
    grant_type: 'authorization_code',
  };

  const result = await axios.post(url, data);
  

  return result;
}
