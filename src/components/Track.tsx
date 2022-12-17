import { getSongArtists, getSongDuration } from '../utils/helper';
import { useTrackStore } from '../contexts/spotify-contexts';
import { SpotifyTrack } from '../types/spotify';
import Image from 'next/image';
import useSpotify from '../hooks/useSpotify';

export const Track: React.FC<{ track: SpotifyTrack; index: number }> = ({ track, index }) => {
  const {
    previewTrackId,
    isTrackPlaying,
    audio,
    fadeIn,
    fadeOut,
    setTrack,
    setTrackId,
    setPreviewTrackId,
    setIsTrackPlaying,
    setAudio,
    setFadeIn,
    setFadeOut,
  } = useTrackStore();
  const spotifyApi = useSpotify();

  const playTrack = () => {
    stopPreviewTrack();
    setTrack(track);
    setTrackId(track.id);
    setIsTrackPlaying(true);
    spotifyApi.play({
      uris: [track.uri],
    });
  };

  const playPreviewTrack = () => {
    if (audio || !track.preview_url || isTrackPlaying) {
      return;
    }

    const newAudio = new Audio(track.preview_url);
    newAudio.volume = 0;

    newAudio
      .play()
      .then()
      .catch((error) => {
        console.log(error);
        console.log(
          'Please connect with Spotify by interacting with the desktop application (e.g. click a button).',
        );
      });

    const timer = setInterval(() => {
      if (newAudio.volume < 0.1) {
        newAudio.volume = Number((newAudio.volume + 0.05).toFixed(2));
      } else if (fadeIn) {
        clearInterval(fadeIn);
      }
    }, 200);

    setFadeIn(timer);
    setAudio(newAudio);
    setPreviewTrackId(track.id);
  };

  const stopPreviewTrack = () => {
    if (!audio || isTrackPlaying) {
      return;
    }

    const originalVolume = audio.volume;

    if (fadeIn) {
      clearInterval(fadeIn);
    }

    const timer = setInterval(() => {
      if (audio.volume > 0) {
        audio.volume = Number((audio.volume - 0.05).toFixed(2));
      } else if (fadeOut) {
        clearInterval(fadeOut);
      }
    }, 200);

    setTimeout(() => {
      audio.pause();
    }, (originalVolume / 0.05) * 100);

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
      } relative flex h-16 cursor-pointer items-center justify-between gap-5 rounded-md p-3 before:absolute before:left-0
      before:h-full before:rounded-md before:bg-gray-300 hover:bg-gray-200`}
      onClick={playTrack}
      onMouseOver={playPreviewTrack}
      onMouseLeave={stopPreviewTrack}
      onFocus={playPreviewTrack}
      onBlur={stopPreviewTrack}
    >
      <td className='relative w-[5%] text-[0.95rem] text-zinc-500'>{index + 1}</td>
      <td className='before:content-[" "] relative flex w-[85%] items-center before:invisible'>
        <Image
          className='h-[50px] w-[50px] rounded-lg'
          src={track.album.images[0]?.url as string}
          width='50'
          height='50'
          alt={`${track.album?.name} Album Cover`}
        />
        <div className='absolute left-0 right-0 ml-[4.5rem] overflow-hidden text-ellipsis whitespace-nowrap leading-5'>
          <span className='text-base'>{track?.name}</span>
          <br />
          <span className='cursor-pointer text-[0.95rem] text-zinc-500 hover:underline'>
            {getSongArtists(track?.artists)}
          </span>
        </div>
      </td>
      <td className='relative w-[10%] text-right text-[0.95rem] tracking-widest text-zinc-500'>
        {getSongDuration(track?.duration_ms)}
      </td>
    </tr>
  );
};

export default Track;
