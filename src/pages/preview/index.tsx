import { Fragment, useCallback, useEffect } from 'react';
import { GetStaticProps, type NextPage } from 'next';
import { useMessageStore } from '../../contexts/message-contexts';
import { useNoAuthStore } from '../../contexts/spotify-noauth-contexts';
import { SpotifyPlaylist, SpotifyTracks } from '../../types/spotify-types';
import { getNoAuthPlaylist } from '../../utils/spotify-noauth-utils';
import Head from 'next/head';
import Message from '../../components/Message';
import NoAuthPlaylist from '../../components/NoAuthPlaylist';
import NoAuthPlayer from '../../components/NoAuthPlayer';
import getMessage from '../../utils/message-utils';

interface NoAuthHomeProps {
  playlist: SpotifyPlaylist;
  tracks: SpotifyTracks;
}

const NoAuthHome: NextPage<NoAuthHomeProps> = ({ playlist, tracks }) => {
  const { setMessage, setIsMessageOpen } = useMessageStore();
  const { isTrackPlaying, setPlaylist, setTracks } = useNoAuthStore();

  useEffect(() => {
    setPlaylist(playlist);
    setTracks(tracks);
  }, []);

  useEffect(
    useCallback(() => {
      const description = `Welcome! Note that this is only a preview! For the full experience, login to your Spotify 
        account by following the instructions in the GitHub page.`;
      const message = getMessage(
        description,
        'info',
        'https://github.com/ntonioibarrola/spotify-music-player',
      );

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
              <NoAuthPlaylist />
            </div>
            <div className='col-start-1 col-end-4 row-start-2 row-end-3 min-w-[20rem]'>
              <NoAuthPlayer />
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<NoAuthHomeProps> = async () => {
  const { playlist, tracks } = await getNoAuthPlaylist('13WYhzJvxrVuFtIFW2J45o');

  return {
    props: {
      playlist,
      tracks,
    },
  };
};

export default NoAuthHome;
