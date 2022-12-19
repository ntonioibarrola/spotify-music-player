import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMessageStore, useTrackStore } from '../contexts/spotify-contexts';
import { Message } from '../types/message-types';
import { SpotifyTrack } from '../types/spotify-types';
import { getSongArtists, getSongDuration } from '../utils/helper-utils';
import Image from 'next/image';
import useSpotify from '../hooks/useSpotify';

function Player() {
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
  const [percentage, setPercentage] = useState<number>(50);
  const [savePercentage, setSavePercentage] = useState<number>(percentage);
  const spotifyApi = useSpotify();

  const rangeRef = useRef<HTMLInputElement>(null);

  const fetchTrackInfo = async () => {
    const playbackState = await getPlaybackState(spotifyApi);
    setTrack(playbackState?.item as SpotifyTrack);
    setTrackId(playbackState?.item?.id as string);
    setTrackProgress(playbackState?.progress_ms as number);
    setIsTrackPlaying(playbackState?.is_playing as boolean);
  };

  const fetchTrackOnPlay = async () => {
    const playbackState = await getPlaybackState(spotifyApi);
    setTrack(playbackState?.item as SpotifyTrack);
    setTrackId(playbackState?.item?.id as string);
    setTrackProgress(playbackState?.progress_ms as number);
  };

  useEffect(() => {
    if (!spotifyApi.getAccessToken() || trackId) return;

    fetchTrackInfo();
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

  const message: Message = {
    type: 'warning',
    title: 'Warning!',
    description: `No active device found. Please have a Spotify app (desktop or browser) running
      in the background, and interact with it at least once (e.g. click the play button).`,
    url: 'https://open.spotify.com/',
    button: 'Got it, thanks!',
  };

  const handlePlayClick = async () => {
    await spotifyApi
      .pause()
      .then()
      .catch((error) => {
        console.log(error);
        setMessage(message);
        setIsMessageOpen(true);
      });
    setIsTrackPlaying(false);
  };

  const handlePauseClick = async () => {
    await spotifyApi
      .play()
      .then()
      .catch((error) => {
        console.log(error);
        setMessage(message);
        setIsMessageOpen(true);
      });
    setIsTrackPlaying(true);
  };

  const handleSpeakerClick = () => {
    if (!rangeRef.current || !rangeRef.current.value) return;

    if (rangeRef.current.value === '0' && isMuted) {
      rangeRef.current.value = String(savePercentage);
      setPercentage(savePercentage);
    } else {
      rangeRef.current.value = '0';
      setSavePercentage(percentage);
      setPercentage(0);
    }

    setIsMuted(!isMuted);
  };

  const handlePreviousClick = async () => {
    await spotifyApi.skipToPrevious();
    fetchTrackInfo();
  };

  const handleNextClick = async () => {
    await spotifyApi.skipToNext();
    fetchTrackInfo();
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isMuted) setIsMuted(false);
    setPercentage(Number(event.target.value));
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
      <div className='flex h-[calc(100%-0.25rem)] w-full items-center justify-between rounded-b-lg px-10 text-charcoal'>
        <div className='flex w-[40%] items-center gap-x-5'>
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
        <div className='mx-10 flex w-[20%] flex-col items-center gap-y-2'>
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
        <div className='flex h-auto w-[40%] justify-end'>
          <div className='flex items-center gap-x-5'>
            <div onClick={handleSpeakerClick}>
              <Image
                className={`${isMuted ? 'hidden' : ''} cursor-pointer opacity-40 hover:opacity-80`}
                src={'/speaker.svg'}
                width='20'
                height='20'
                draggable={false}
                alt={`Volume Button`}
              />
              <Image
                className={`${isMuted ? '' : 'hidden'} cursor-pointer opacity-40 hover:opacity-80`}
                src={'/mute.svg'}
                width='20'
                height='20'
                draggable={false}
                alt={`Mute Button`}
              />
            </div>
            <input
              style={{ backgroundSize: ((percentage - 0) * 100) / (100 - 0) + '% 100%' }}
              className='cursor-pointer'
              type='range'
              step='0.01'
              ref={rangeRef}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
