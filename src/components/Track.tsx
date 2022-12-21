import { useMessageStore } from '../contexts/message-contexts';
import { usePlaylistStore, useTrackStore } from '../contexts/spotify-contexts';
import { SpotifyTrack } from '../types/spotify-types';
import { getSongArtists, getSongDuration } from '../utils/helper-utils';
import Image from 'next/image';
import useSpotify from '../hooks/useSpotify';
import getMessage from '../utils/message-utils';

export const Track: React.FC<{ track: SpotifyTrack; index: number; offset: number }> = ({
  track,
  index,
  offset,
}) => {
  const {
    trackId,
    previewTrackId,
    isTrackPlaying,
    audio,
    fadeIn,
    fadeOut,
    setTrack,
    setTrackId,
    setPreviewTrackId,
    setIsTrackPlaying,
    setTrackProgress,
    setAudio,
    setFadeIn,
    setFadeOut,
  } = useTrackStore();
  const { setMessage, setIsMessageOpen } = useMessageStore();
  const { playlist } = usePlaylistStore();
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

  const playTrack = () => {
    stopPreviewTrack();
    spotifyApi
      .play({
        context_uri: playlist?.uri,
        offset: {
          position: offset,
        },
      })
      .then(() => {
        setTrack(track);
        setTrackId(track.id);
        setIsTrackPlaying(true);
        setTrackProgress(0);
      })
      .catch((error) => handleError(error.message));
  };

  const playPreviewTrack = () => {
    if (audio || !track.preview_url || isTrackPlaying) return;

    const newAudio = new Audio(track.preview_url);
    newAudio.volume = 0;

    newAudio
      .play()
      .then()
      .catch((error) => {});

    const timer = setInterval(() => {
      if (newAudio.volume < 0.1) {
        newAudio.volume = Number((newAudio.volume + 0.01).toFixed(2));
      } else if (fadeIn) {
        clearInterval(fadeIn);
      }
    }, 200);

    setFadeIn(timer);
    setAudio(newAudio);
    setPreviewTrackId(track.id);
  };

  const stopPreviewTrack = () => {
    if (!audio) return;

    const originalVolume = audio.volume;

    if (fadeIn) {
      clearInterval(fadeIn);
    }

    const timer = setInterval(() => {
      if (audio.volume > 0) {
        audio.volume = Number((audio.volume - 0.01).toFixed(2));
      } else if (fadeOut) {
        clearInterval(fadeOut);
      }
    }, 100);

    setTimeout(() => {
      audio.pause();
    }, (originalVolume / 0.01) * 100);

    setFadeOut(timer);
    setAudio(null);
    setPreviewTrackId(null);
  };

  return (
    <tr
      className={`${
        audio && track.id === previewTrackId && !isTrackPlaying
          ? 'before:w-full before:transition-all before:duration-[30s] before:ease-linear'
          : 'before:w-0'
      } ${previewTrackId && track.id !== previewTrackId ? 'opacity-40' : 'opacity-100'} ${
        isTrackPlaying && track.id === trackId && 'bg-spotify-100 hover:bg-spotify-200'
      } relative flex h-16 cursor-pointer items-center justify-between gap-5 p-3 transition-opacity before:absolute before:left-0 before:h-full
        before:bg-gray-300 hover:bg-gray-200 [@media(min-width:42rem)]:rounded-md before:[@media(min-width:42rem)]:rounded-md`}
      onClick={playTrack}
      onMouseOver={playPreviewTrack}
      onMouseLeave={stopPreviewTrack}
      onFocus={playPreviewTrack}
      onBlur={stopPreviewTrack}
    >
      <td
        className={`${
          isTrackPlaying && track.id === trackId && 'text-white'
        } relative w-[5%] text-[0.95rem] text-gray-500 [@media(max-width:949px)]:hidden`}
      >
        {index + 1}
      </td>
      <td
        className={`${
          isTrackPlaying && track.id === trackId && 'text-white'
        } before:content-[" "] relative flex w-[90%] items-center text-charcoal before:invisible [@media(min-width:950px)]:w-[85%]`}
      >
        <Image
          className='h-[50px] w-[50px] rounded-lg'
          src={track.album.images[0]?.url as string}
          width='50'
          height='50'
          alt={`${track.album?.name} Album Cover`}
        />
        <div className='absolute left-0 right-0 ml-[4.5rem] overflow-hidden text-ellipsis whitespace-nowrap leading-5'>
          <span
            className={`${
              isTrackPlaying && track.id === trackId && 'text-white'
            } text-base text-charcoal`}
          >
            {track?.name}
          </span>
          <br />
          <div className='flex items-center gap-2'>
            {track.explicit && (
              <span
                className={`${
                  isTrackPlaying && track.id === trackId
                    ? 'bg-white text-spotify-100'
                    : 'bg-gray-400'
                } inline-flex max-h-[1.1rem] min-h-[1.1rem] min-w-[1.1rem] items-center justify-center rounded-sm
                text-[0.5rem] font-light text-white`}
              >
                E
              </span>
            )}
            <span
              className={`${
                isTrackPlaying && track.id === trackId && 'text-white'
              } cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-[0.95rem] text-gray-500 hover:underline`}
            >
              {getSongArtists(track?.artists)}
            </span>
          </div>
        </div>
      </td>
      <td
        className={`${
          isTrackPlaying && track.id === trackId && 'text-white'
        } relative w-[10%] text-right text-[0.95rem] tracking-widest text-gray-500`}
      >
        {getSongDuration(track?.duration_ms)}
      </td>
    </tr>
  );
};

export default Track;
