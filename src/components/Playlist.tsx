import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useMessageStore } from '../contexts/message-contexts';
import { usePlaylistStore } from '../contexts/spotify-contexts';
import { SpotifyPlaylist, SpotifyTrack } from '../types/spotify-types';
import { getPlaylistDuration } from '../utils/helper-utils';
import Image from 'next/image';
import Track from './Track';
import Dropdown from './Dropdown';
import useSpotify from '../hooks/useSpotify';
import getMessage from '../utils/message-utils';

function Playlist() {
  const { data: session } = useSession();
  const { setMessage, setIsMessageOpen } = useMessageStore();
  const { playlists, playlist, playlistId, getPlaylist, setPlaylist, setPlaylistId } =
    usePlaylistStore();
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

  const fetchPlaylist = async () => {
    const playlist = await getPlaylist(spotifyApi, playlists[0]?.id as string).catch((error) =>
      handleError(error.message),
    );

    setPlaylist(playlist as SpotifyPlaylist);
    setPlaylistId(playlists[0]?.id as string);
  };

  useEffect(() => {
    if (!spotifyApi.getAccessToken() || !playlists[0] || playlistId) return;

    fetchPlaylist();
  }, [session, spotifyApi, playlists]);

  return (
    <div className='relative mx-auto h-auto w-[42rem] space-y-8'>
      <div className='flex h-auto w-full pt-8'>
        <Image
          className='h-[180px] w-[180px] rounded-lg object-cover'
          src={
            playlist && playlist.images[0]
              ? (playlist.images[0]?.url as string)
              : '/placeholder-image.jpg'
          }
          width='180'
          height='180'
          alt='Playlist Cover'
        />
        <div className='ml-8 flex w-full flex-col justify-end font-bold text-charcoal'>
          <div className='w-[calc(672px-(2rem+180px))] text-[0.8rem] font-semibold'>PLAYLIST</div>
          <div className='my-2 w-[calc(672px-(2rem+180px))] break-words font-poppins text-5xl line-clamp-2'>
            {playlist?.name}
          </div>
          <div className='flex w-[calc(672px-(2rem+180px))] items-center space-x-2 text-sm font-normal'>
            <span className='cursor-pointer whitespace-nowrap font-semibold hover:underline'>
              {playlist?.owner.display_name}
            </span>
            <span className='space-x-2 text-gray-500'>
              <span className='font-poppins'>•</span>
              <span>{playlist && playlist.followers && playlist?.followers.total} likes</span>
              <span className='font-poppins'>•</span>
              <span>{playlist?.tracks.total} songs,</span>
              <span>{playlist && getPlaylistDuration(playlist.tracks.items)}</span>
            </span>
          </div>
        </div>
      </div>
      <div className='flex justify-end gap-2'>
        <button
          className='rounded-md border-[1px] border-solid border-gray-500 px-5 text-sm font-bold opacity-40 hover:opacity-80'
          onClick={() => signOut()}
        >
          Logout
        </button>
        <Dropdown />
      </div>
      <table className='h-auto w-full text-left text-charcoal'>
        <thead>
          <tr className='flex h-16 items-center gap-5 rounded-md p-3 text-xs tracking-widest text-gray-500'>
            <th className='w-[5%] font-normal'>#</th>
            <th className='w-[85%] font-normal'>TITLE</th>
            <th className='flex w-[10%] flex-shrink-0 items-center justify-end font-normal'>
              <Image
                className='h-[25px] w-[25px]'
                src={'/clock.svg'}
                width='25'
                height='25'
                alt='Clock Icon'
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {playlist &&
            playlist.tracks.items.map((item, index) => (
              <Track key={`${item.track?.id}`} track={item.track as SpotifyTrack} index={index} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Playlist;
