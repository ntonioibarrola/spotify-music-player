import { useCallback, useEffect } from 'react';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useMessageStore } from '../contexts/message-contexts';
import { usePlaylistStore } from '../contexts/spotify-contexts';
import { SpotifyPlaylists } from '../types/spotify-types';
import Head from 'next/head';
import Image from 'next/image';
import Center from '../components/Center';
import Sidebar from '../components/Sidebar';
import Message from '../components/Message';
import Playlist from '../components/Playlist';
import Player from '../components/Player';
import useSpotify from '../hooks/useSpotify';
import getMessage from '../utils/message-utils';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { setMessage, setIsMessageOpen } = useMessageStore();
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
    <>
      <Head>
        <title>Bounce - Themed Spotify</title>
        <link rel='icon' href='/spotify.svg' />
      </Head>
      {/* <main className='grid h-screen grid-cols-[minmax(300px,_380px)_1fr] grid-rows-[1fr_8rem]'>
        <div className='col-start-1 col-end-2'>
          <Sidebar />
        </div>
        <div className='col-start-2 col-end-3 overflow-y-scroll'>
          <Center />
        </div>
        <div className='col-start-1 col-end-3'>
          <Player />
        </div>
      </main> */}
      <main className='grid h-screen grid-cols-[1fr_minmax(950px,_1500px)_1fr] bg-spotify-100'>
        <Message />
        <div className='col-start-2 col-end-3 flex flex-col justify-center overflow-y-hidden px-10'>
          <div className='grid h-[85%] grid-cols-[1fr_32rem_1fr] grid-rows-[1fr_8rem] overflow-x-hidden rounded-lg bg-offwhite'>
            <div className='col-start-1 col-end-4 row-start-1 row-end-2 overflow-x-hidden overflow-y-scroll py-10'>
              <Playlist />
            </div>
            <div className='col-start-1 col-end-4 row-start-2 row-end-3'>
              <Player />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
