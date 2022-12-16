import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { spotifyApi } from '../utils/spotify';
import { ExtendedSession, TokenError } from '../types/authentication';

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    // If refresh token fails, redirect to login
    if ((session as ExtendedSession).error === TokenError.RefreshAccessTokenError) {
      signIn();
    }

    spotifyApi.setAccessToken((session as ExtendedSession).accessToken);
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
