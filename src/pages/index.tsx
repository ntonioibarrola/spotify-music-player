import { useEffect } from 'react';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { usePlaylistStore } from '../contexts/spotify-contexts';
import Head from 'next/head';
import Center from '../components/Center';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import useSpotify from '../hooks/useSpotify';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { playlistId, getPlaylistContexts } = usePlaylistStore();
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      getPlaylistContexts(spotifyApi, playlistId);
    }
  }, [session, spotifyApi]);

  return (
    <>
      <Head>
        <title>Bounce</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='grid h-screen grid-cols-[minmax(300px,_380px)_1fr] grid-rows-[1fr_8rem]'>
        <div className='col-start-1 col-end-2'>
          <Sidebar />
        </div>
        <div className='col-start-2 col-end-3 overflow-y-scroll'>
          <Center />
        </div>
        <div className='col-start-1 col-end-3'>
          <Player />
        </div>
      </main>
    </>
  );
};

export default Home;
