import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMessageStore } from '../contexts/message-contexts';
import { useTrackStore } from '../contexts/spotify-contexts';
import { SpotifyTrack } from '../types/spotify-types';
import { getSongArtists, getSongDuration } from '../utils/helper-utils';
import Image from 'next/image';
import debounce from 'lodash.debounce';
import useSpotify from '../hooks/useSpotify';
import getMessage from '../utils/message-utils';

const Player = () => {
  const { data: session } = useSession();
  const {
    track,
    trackId,
    isTrackPlaying,
    trackProgress,
    setTrack,
    setTrackId,
    setIsTrackPlaying,
    setTrackProgress,
    getPlaybackState,
  } = useTrackStore();
  const { setMessage, setIsMessageOpen } = useMessageStore();
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);
  const [saveVolume, setSaveVolume] = useState<number>(volume);
  const spotifyApi = useSpotify();

  const handleError = (error: string) => {
    let message = null;

    if (error.includes('NO_ACTIVE_DEVICE')) {
      message = getMessage(error, 'warning', 'https://open.spotify.com/');
    } else {
      message = getMessage(error, 'error');
    }

    setMessage(message);
    setIsMessageOpen(true);
  };

  const fetchTrackInfo = async () => {
    const playbackState = await getPlaybackState(spotifyApi).catch((error) =>
      handleError(error.message),
    );
    setTrack(playbackState?.item as SpotifyTrack);
    setTrackId(playbackState?.item?.id as string);
    setTrackProgress(playbackState?.progress_ms as number);
    setIsTrackPlaying(playbackState?.is_playing as boolean);
  };

  const fetchTrackOnPlay = async () => {
    const playbackState = await getPlaybackState(spotifyApi).catch((error) =>
      handleError(error.message),
    );
    setTrack(playbackState?.item as SpotifyTrack);
    setTrackId(playbackState?.item?.id as string);
    setTrackProgress(playbackState?.progress_ms as number);
  };

  const debouncedVolume = useCallback(
    debounce((volume) => {
      spotifyApi
        .setVolume(volume)
        .then()
        .catch((error) => {});
    }, 500),
    [],
  );

  useEffect(() => {
    if (!spotifyApi.getAccessToken() || trackId) return;

    fetchTrackInfo();
    debouncedVolume(volume);
  }, [session, spotifyApi]);

  useEffect(() => {
    if (!spotifyApi.getAccessToken() || !isTrackPlaying) return;

    const interval = setInterval(() => {
      fetchTrackOnPlay();
    }, 300);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    if (!spotifyApi.getAccessToken() || !trackId) return;

    if (volume >= 0 && volume <= 100) {
      debouncedVolume(volume);
    }
  }, [volume]);

  const handlePlayClick = async () => {
    await spotifyApi
      .pause()
      .then()
      .catch((error) => handleError(error.message));
    setIsTrackPlaying(false);
  };

  const handlePauseClick = async () => {
    await spotifyApi
      .play()
      .then()
      .catch((error) => handleError(error.message));
    setIsTrackPlaying(true);
  };

  const handleSpeakerClick = () => {
    if (volume === 0 && isMuted) {
      setVolume(saveVolume);
    } else {
      spotifyApi
        .setVolume(0)
        .then()
        .catch((error) => handleError(error.message));
      setSaveVolume(volume);
      setVolume(0);
    }

    setIsMuted(!isMuted);
  };

  const handlePreviousClick = async () => {
    await spotifyApi
      .skipToPrevious()
      .then()
      .catch((error) => handleError(error.message));
    fetchTrackInfo();
  };

  const handleNextClick = async () => {
    await spotifyApi
      .skipToNext()
      .then()
      .catch((error) => handleError(error.message));
    fetchTrackInfo();
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isMuted) setIsMuted(false);
    setVolume(Number(event.target.value));
  };

  return (
    <div className='flex h-full w-full flex-col justify-center'>
      <div className='relative h-1 w-full bg-white'>
        <span
          style={{
            width: `calc(${trackProgress} / ${track?.duration_ms} * 100%)`,
          }}
          className='absolute h-1 bg-spotify-100'
        />
      </div>
      <div
        className={`${
          !isTrackPlaying && 'hidden'
        } flex h-[4rem] w-full items-center justify-between border-[1px] border-solid border-b-gray-300 px-2 [@media(min-width:950px)]:hidden`}
      >
        <div className='flex w-[60%] items-center gap-2'>
          <Image
            className='h-[50px] w-[50px] rounded-lg object-cover'
            src={track?.album.images[0] ? track.album.images[0].url : '/placeholder-image.jpg'}
            width='50'
            height='50'
            draggable={false}
            alt={`${track?.album.name} Album Cover`}
          />
          <div className='overflow-hidden whitespace-nowrap leading-6'>
            <p className='cursor-pointer overflow-hidden text-ellipsis text-sm font-semibold hover:underline'>
              {track?.name}
            </p>
            <p className='cursor-pointer overflow-hidden text-ellipsis text-xs text-gray-500 hover:underline'>
              {getSongArtists(track?.artists)}
            </p>
          </div>
        </div>
        <div className='flex w-[40%] items-center justify-end gap-2'>
          <div onClick={handleSpeakerClick}>
            <Image
              className={`${
                isMuted ? 'hidden' : ''
              } min-w-[20px] cursor-pointer opacity-60 hover:opacity-90`}
              src={'/speaker.svg'}
              width='20'
              height='20'
              draggable={false}
              alt={`Volume Button`}
            />
            <Image
              className={`${
                isMuted ? '' : 'hidden'
              } min-w-[20px] cursor-pointer opacity-60 hover:opacity-90`}
              src={'/mute.svg'}
              width='20'
              height='20'
              draggable={false}
              alt={`Mute Button`}
            />
          </div>
          <input
            style={{ backgroundSize: ((volume - 0) * 100) / (100 - 0) + '% 100%' }}
            className='w-[70px] cursor-pointer sm:w-[150px]'
            type='range'
            step='10'
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
      <div
        className={`${
          isTrackPlaying ? 'h-[calc(100%-0.25rem-4rem)]' : 'h-[calc(100%-0.25rem)]'
        } flex w-full items-center justify-between rounded-b-lg px-10 text-charcoal [@media(min-width:950px)]:h-[calc(100%-0.25rem)]`}
      >
        <div className='hidden w-[40%] items-center gap-x-5 [@media(min-width:950px)]:flex'>
          <Image
            className={`${
              isTrackPlaying ? 'animate-spin-slow-running' : 'animate-spin-slow-paused'
            } h-[80px] w-[80px] rounded-full border-[3px] border-solid border-offwhite object-cover drop-shadow-[0_0_8px_#b8bdc6]`}
            src={track?.album.images[0] ? track.album.images[0].url : '/placeholder-image.jpg'}
            width='80'
            height='80'
            draggable={false}
            alt={`${track?.album.name} Album Cover`}
          />
          <div className='overflow-hidden whitespace-nowrap leading-6'>
            <p className='cursor-pointer overflow-hidden text-ellipsis font-semibold hover:underline'>
              {track ? track.name : 'No Track Playing'}
            </p>
            <p className='cursor-pointer overflow-hidden text-ellipsis text-[0.95rem] text-gray-500 hover:underline'>
              {track ? getSongArtists(track.artists) : 'No Artist(s)'}
            </p>
          </div>
        </div>
        <div className='mx-auto flex w-full flex-col items-center gap-y-2 [@media(min-width:950px)]:mx-10 [@media(min-width:950px)]:w-[20%]'>
          <div className='space-x-2 text-sm text-gray-500'>
            <span>
              {trackProgress && track
                ? getSongDuration(trackProgress)
                : !trackProgress && track
                ? '0:00'
                : '--:--'}
            </span>
            <span className='text-spotify-100'>/</span>
            <span>{track ? getSongDuration(track.duration_ms) : '--:--'}</span>
          </div>
          <div className='flex items-center gap-x-5'>
            <div onClick={handlePreviousClick}>
              <Image
                className='cursor-pointer opacity-40 hover:opacity-80'
                src={'/previous.svg'}
                width='20'
                height='20'
                draggable={false}
                alt={`Previous Button`}
              />
            </div>
            {track ? (
              <div className='flex-shrink-0'>
                {isTrackPlaying ? (
                  <Image
                    className='block cursor-pointer transition-[scale_33ms_cubic-bezier(0.3,0,0,1)] hover:scale-[1.06] active:scale-[1]'
                    src={'/pause.svg'}
                    width='60'
                    height='60'
                    draggable={false}
                    onClick={handlePlayClick}
                    alt={`Pause Button`}
                  />
                ) : (
                  <Image
                    className='block cursor-pointer transition-[scale_33ms_cubic-bezier(0.3,0,0,1)] hover:scale-[1.06] active:scale-[1]'
                    src={'/play.svg'}
                    width='60'
                    height='60'
                    draggable={false}
                    onClick={handlePauseClick}
                    alt={`Play Button`}
                  />
                )}
              </div>
            ) : (
              <div className='flex-shrink-0'>
                <Image
                  className='cursor-not-allowed opacity-50'
                  src={'/play.svg'}
                  width='60'
                  height='60'
                  draggable={false}
                  alt={`Disabled Play Button`}
                />
              </div>
            )}
            <div onClick={handleNextClick}>
              <Image
                className='cursor-pointer opacity-40 hover:opacity-80'
                src={'/next.svg'}
                width='20'
                height='20'
                draggable={false}
                alt={`Next Button`}
              />
            </div>
          </div>
        </div>
        <div className='hidden h-auto w-[40%] justify-end [@media(min-width:950px)]:flex'>
          <div className='flex items-center gap-x-5'>
            <div onClick={handleSpeakerClick}>
              <Image
                className={`${isMuted ? 'hidden' : ''} cursor-pointer opacity-60 hover:opacity-90`}
                src={'/speaker.svg'}
                width='20'
                height='20'
                draggable={false}
                alt={`Volume Button`}
              />
              <Image
                className={`${isMuted ? '' : 'hidden'} cursor-pointer opacity-60 hover:opacity-90`}
                src={'/mute.svg'}
                width='20'
                height='20'
                draggable={false}
                alt={`Mute Button`}
              />
            </div>
            <input
              style={{ backgroundSize: ((volume - 0) * 100) / (100 - 0) + '% 100%' }}
              className='w-[200px] cursor-pointer'
              type='range'
              step='10'
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
