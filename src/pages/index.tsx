import { Fragment, useCallback, useEffect } from 'react';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useMessageStore } from '../contexts/message-contexts';
import { usePlaylistStore, useTrackStore } from '../contexts/spotify-contexts';
import { SpotifyPlaylists } from '../types/spotify-types';
import Head from 'next/head';
import Message from '../components/Message';
import Playlist from '../components/Playlist';
import Player from '../components/Player';
import useSpotify from '../hooks/useSpotify';
import getMessage from '../utils/message-utils';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { setMessage, setIsMessageOpen } = useMessageStore();
  const { isTrackPlaying } = useTrackStore();
  const { getPlaylists, setPlaylists } = usePlaylistStore();
  const spotifyApi = useSpotify();

  const handleError = (error: string) => {
    let message = null;

    if (error.includes('NO_ACTIVE_DEVICE')) {
      message = getMessage(error, 'warning');
    } else {
      message = getMessage(error, 'error');
    }

    setMessage(message);
    setIsMessageOpen(true);
  };

  const fetchPlaylists = useCallback(async () => {
    const playlists = await getPlaylists(spotifyApi).catch((error) => handleError(error.message));

    setPlaylists(playlists as SpotifyPlaylists);
  }, []);

  useEffect(() => {
    if (!spotifyApi.getAccessToken()) return;

    fetchPlaylists();
  }, [session, spotifyApi]);

  useEffect(
    useCallback(() => {
      const description = `Welcome! To get started, please have a Spotify app (desktop or browser) running 
        in the background, and interact with it at least once (e.g. click the play button).`;
      const message = getMessage(description, 'info');

      setMessage(message);
      setIsMessageOpen(true);
    }, []),
    [],
  );

  return (
    <Fragment>
      <Head>
        <title>Bounce - Themed Spotify</title>
        <link rel='icon' href='/spotify.svg' />
      </Head>
      <main className='grid h-screen bg-spotify-100 [@media(min-width:950px)]:grid-cols-[1fr_minmax(950px,_1250px)_1fr]'>
        <Message />
        <div
          className='flex flex-col justify-center overflow-y-hidden [@media(min-width:950px)]:col-start-2
          [@media(min-width:950px)]:col-end-3 [@media(min-width:950px)]:px-10'
        >
          <div
            className={`${
              isTrackPlaying ? 'grid-rows-[1fr_calc(8rem+4rem)]' : 'grid-rows-[1fr_8rem]'
            } grid h-full overflow-x-hidden bg-offwhite shadow-lg shadow-spotify-200 [@media(min-width:950px)]:h-[85%]
            [@media(min-width:950px)]:grid-cols-[1fr_32rem_1fr] [@media(min-width:950px)]:grid-rows-[1fr_8rem] [@media(min-width:950px)]:rounded-lg`}
          >
            <div className='col-start-1 col-end-4 row-start-1 row-end-2 overflow-x-hidden overflow-y-scroll py-10'>
              <Playlist />
            </div>
            <div className='col-start-1 col-end-4 row-start-2 row-end-3 min-w-[20rem]'>
              <Player />
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
