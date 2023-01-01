import { useNoAuthStore } from '../contexts/spotify-noauth-contexts';
import { SpotifyTrack } from '../types/spotify-types';
import { getPlaylistDuration } from '../utils/helper-utils';
import Image from 'next/image';
import Link from 'next/link';
import NoAuthDropdown from './NoAuthDropdown';
import NoAuthTrack from './NoAuthTrack';

function Playlist() {
  const {
    playlist,
    playingAudio,
    setTrack,
    setTrackId,
    setPreviewTrackId,
    setIsTrackPlaying,
    setTrackProgress,
    setPlayingAudio,
    setPreviewAudio,
    setIsMuted,
    setVolume,
    setSaveVolume,
  } = useNoAuthStore();

  const resetState = () => {
    setTrack(null);
    setTrackId(null);
    setPreviewTrackId(null);
    setIsTrackPlaying(false);
    setTrackProgress(0);
    setPlayingAudio(null);
    setPreviewAudio(null);
    setIsMuted(false);
    setVolume(50);
    setSaveVolume(50);

    if (!playingAudio) return;

    playingAudio.pause();
    playingAudio.volume = 0;
  };

  return (
    <div className='relative mx-auto flex h-auto min-w-[20rem] max-w-[42rem] flex-col space-y-5'>
      <div
        className='order-1 mt-4 flex justify-center gap-2 [@media(min-width:950px)]:order-3 [@media(min-width:950px)]:mt-8 [@media(min-width:950px)]:justify-end
        [@media(max-width:949px)]:-mb-3 [@media(max-width:949px)]:px-3'
      >
        <Link href='/login'>
          <button
            className='rounded-md border-[1px] border-solid border-gray-500 px-5 py-2 text-sm font-bold opacity-40 hover:opacity-60'
            onClick={() => resetState()}
          >
            Go back to login
          </button>
        </Link>
        <NoAuthDropdown />
      </div>
      <div className='order-2 flex h-auto w-full flex-col [@media(min-width:950px)]:flex-row [@media(min-width:950px)]:pt-8 [@media(max-width:949px)]:gap-5'>
        <div className='mx-auto w-[180px]'>
          <Image
            className='mx-auto h-[180px] min-w-[180px] rounded-lg object-cover'
            src={
              playlist && playlist.images[0]
                ? (playlist.images[0]?.url as string)
                : '/placeholder-image.jpg'
            }
            width='180'
            height='180'
            alt='Playlist Cover'
          />
        </div>
        <div className='flex w-full flex-col justify-end font-bold text-charcoal [@media(min-width:950px)]:ml-8 [@media(max-width:949px)]:px-3'>
          <div className='w-[calc(100%-1.5rem)] text-[0.8rem] font-semibold [@media(min-width:950px)]:w-[calc(672px-(2rem+180px))]'>
            PLAYLIST
          </div>
          <div className='w-[calc(100%-1.5rem)] break-words font-poppins text-5xl leading-tight line-clamp-2 [@media(min-width:950px)]:w-[calc(672px-(2rem+180px))]'>
            {playlist?.name}
          </div>
          <div className='flex w-[calc(100%-1.5rem)] items-center text-sm font-normal [@media(min-width:950px)]:w-[calc(672px-(2rem+180px))] [@media(min-width:950px)]:space-x-2'>
            <span className='cursor-pointer whitespace-nowrap font-semibold hover:underline [@media(max-width:949px)]:hidden'>
              {playlist?.owner.display_name}
            </span>
            <span className='space-x-2 text-gray-500'>
              <span className='font-poppins [@media(max-width:949px)]:hidden'>•</span>
              <span>{playlist?.followers?.total} likes</span>
              <span className='font-poppins'>•</span>
              <span>{playlist?.tracks?.total} songs,</span>
              <span>{playlist && getPlaylistDuration(playlist.tracks.items)}</span>
            </span>
          </div>
        </div>
      </div>
      <table className='order-3 h-auto w-full text-left text-charcoal'>
        <thead>
          <tr className='flex h-16 items-center gap-5 rounded-md p-3 text-xs tracking-widest text-gray-500'>
            <th className='w-[5%] font-normal [@media(max-width:949px)]:hidden'>#</th>
            <th className='w-[80%] font-normal'>TITLE</th>
            <th className='flex w-[20%] flex-shrink-0 items-center justify-end font-normal'>
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
              <NoAuthTrack
                key={`${item.track?.id}`}
                track={item.track as SpotifyTrack}
                index={index}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Playlist;
