import NextAuth, { CallbacksOptions, type NextAuthOptions } from 'next-auth';
import { ExtendedToken, TokenError } from '../../../types/authentication-types';
import { scopes, spotifyApi } from '../../../utils/spotify-utils';
import { env } from '../../../env/server.mjs';
import SpotifyProvider from 'next-auth/providers/spotify';

const refreshAccessToken = async (token: ExtendedToken): Promise<ExtendedToken> => {
  try {
    spotifyApi.setAccessToken(token.accessToken as string);
    spotifyApi.setRefreshToken(token.refreshToken as string);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log('REFRESHED TOKEN IS: ', refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token || token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: TokenError.RefreshAccessTokenError,
    };
  }
};

const jwtCallback: CallbacksOptions['jwt'] = async ({ token, account, user }) => {
  let extendedToken: ExtendedToken;

  // Initial login
  if (account && user) {
    extendedToken = {
      ...token,
      user,
      accessToken: account.access_token as string,
      refreshToken: account.refresh_token as string,
      accessTokenExpiresAt: (account.expires_at as number) * 1000,
    };

    console.log('FIRST TIME LOGIN, EXTENDED TOKEN: ', extendedToken);
    return extendedToken;
  }

  // Return previous token if the access token has not expired yet
  if (Date.now() + 5000 < (token as ExtendedToken).accessTokenExpiresAt) {
    console.log('ACCESS TOKEN STILL VALID, RETURNING EXTENDED TOKEN: ', token);
    return token;
  }

  // Access token has expired, so we need to refresh it...
  console.log('ACCESS TOKEN EXPIRED, REFRESHING...');
  return await refreshAccessToken(token as ExtendedToken);
};

const sessionCallback: CallbacksOptions['session'] = async ({ session, token }) => {
  session.accessToken = (token as ExtendedToken).accessToken;
  session.error = (token as ExtendedToken).error;

  return session;
};

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        url: 'https://accounts.spotify.com/authorize',
        params: {
          scope: scopes,
          show_dialog: true,
        },
      },
    }),
  ],
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
  },
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);
