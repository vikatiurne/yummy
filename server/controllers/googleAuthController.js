import axios from 'axios';

import { googleOAuthService } from '../service/google-oauth-service.js';
import { tokenService } from '../service/token-service.js';

class GoogleAuthController {
  getGoogleOAuthUrl() {
    const oAuthServerEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    const queryParams = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `${process.env.API_URL}/api/user/auth/google`,
      response_type: 'code',
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
      prompt: 'consent',
    };
    const qs = new URLSearchParams(queryParams);
    return `${oAuthServerEndpoint}?${qs.toString()}`;
  }

  async getGoogleUser(req, res) {
    const { code } = req.query;

    const { id_token, access_token } = await googleOAuthService.getGoogleTokens(
      {
        code,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: `${process.env.API_URL}/api/user/auth/google`,
      }
    );
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Не вдалося отримати данні користувача`);
        throw new Error(error.message);
      });
    const tokens = tokenService.generateTokens(googleUser);
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });
    res.redirect(process.env.CLIENT_URL);
  }

  async getCurentGoogleUser(req, res) {
    const refreshToken = await req.cookies['refreshToken'];
    if (refreshToken) {
      const userData = tokenService.validateRefreshToken(refreshToken);
      const email = await userData.email;
      const name = await userData.name;
      const user = await googleOAuthService.registration(email, name,refreshToken);
      return await res.json(user);
    }
  }
}

export const googleAuthController = new GoogleAuthController();
