import { ChangeEvent, useEffect } from 'react';
import { useNoAuthStore } from '../contexts/spotify-noauth-contexts';
import { getSongArtists, getSongDuration } from '../utils/helper-utils';
import Image from 'next/image';

function NoAuthPlayer() {
  const {
    tracks,
    track,
    trackId,
    isTrackPlaying,
    trackProgress,
    playingAudio,
    isMuted,
    volume,
    saveVolume,
    setTrack,
    setTrackId,
    setIsTrackPlaying,
    setTrackProgress,
    setPlayingAudio,
    setIsMuted,
    setVolume,
    setSaveVolume,
  } = useNoAuthStore();

  useEffect(() => {
    if (!isTrackPlaying || !playingAudio) return;

    const interval = setInterval(() => {
      setTrackProgress(Math.ceil(playingAudio.currentTime) * 1000);

      if (playingAudio.currentTime >= playingAudio.duration) {
        playingAudio.pause();
        setIsTrackPlaying(false);
      }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  });

  const handlePauseClick = () => {
    if (!playingAudio) return;

    playingAudio.pause();

    setIsTrackPlaying(false);
    setTrackProgress(Math.ceil(playingAudio.currentTime) * 1000);
  };

  const handlePlayClick = () => {
    if (!playingAudio) return;

    playingAudio
      .play()
      .then()
      .catch((error) => {});

    setIsTrackPlaying(true);
    setTrackProgress(Math.ceil(playingAudio.currentTime) * 1000);
  };

  const handleSpeakerClick = () => {
    if (!playingAudio) return;

    if (volume === 0 && isMuted) {
      playingAudio.volume = saveVolume * 0.001;
      setVolume(saveVolume);
    } else {
      setSaveVolume(volume);
      playingAudio.volume = 0;
      setVolume(0);
    }

    setIsMuted(!isMuted);
  };

  const stopTrack = () => {
    if (!playingAudio) return;

    playingAudio.pause();
    playingAudio.volume = 0;

    setPlayingAudio(null);
  };

  const handlePreviousClick = async () => {
    stopTrack();

    const currentTrackOffset = track?.offset as number;
    const previousTrack = currentTrackOffset === 0 ? tracks[0] : tracks[currentTrackOffset - 1];

    if (!previousTrack?.track?.preview_url) return;

    const newAudio = new Audio(previousTrack.track.preview_url);
    newAudio.volume = volume * 0.001;

    newAudio
      .play()
      .then()
      .catch((error) => {});

    setPlayingAudio(newAudio);
    setTrack(previousTrack.track);
    setTrackId(previousTrack.track.id);
    setIsTrackPlaying(true);
    setTrackProgress(0);
  };

  const handleNextClick = async () => {
    stopTrack();

    const currentTrackOffset = track?.offset as number;
    const lastTrackOffset = tracks.length - 1;
    const nextTrack =
      currentTrackOffset === lastTrackOffset
        ? tracks[lastTrackOffset]
        : tracks[currentTrackOffset + 1];

    if (!nextTrack?.track?.preview_url) return;

    const newAudio = new Audio(nextTrack.track.preview_url);
    newAudio.volume = volume * 0.001;

    newAudio
      .play()
      .then()
      .catch((error) => {});

    setPlayingAudio(newAudio);
    setTrack(nextTrack.track);
    setTrackId(nextTrack.track.id);
    setIsTrackPlaying(true);
    setTrackProgress(0);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isMuted) setIsMuted(false);

    if (!playingAudio) {
      setVolume(Number(event.target.value));
      return;
    }

    playingAudio.volume = Number(event.target.value) * 0.001;
    setVolume(Number(event.target.value));
  };

  return (
    <div className='flex h-full w-full flex-col justify-center'>
      <div className='relative h-1 w-full bg-white'>
        <span
          style={{
            width: `calc(${trackProgress} / 30000 * 100%)`,
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
            <span>{playingAudio ? '0:30' : '--:--'}</span>
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
                    onClick={handlePauseClick}
                    alt={`Pause Button`}
                  />
                ) : (
                  <Image
                    className='block cursor-pointer transition-[scale_33ms_cubic-bezier(0.3,0,0,1)] hover:scale-[1.06] active:scale-[1]'
                    src={'/play.svg'}
                    width='60'
                    height='60'
                    draggable={false}
                    onClick={handlePlayClick}
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
}

export default NoAuthPlayer;
