import { ChangeEvent, useRef, useState } from 'react';
import { useTrackStore } from '../contexts/spotify-contexts';
import { getSongArtists, getSongDuration } from '../utils/helper';
import Image from 'next/image';
import useSpotify from '../hooks/useSpotify';

function Player() {
  const { track, isTrackPlaying, setIsTrackPlaying } = useTrackStore();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(50);
  const [savePercentage, setSavePercentage] = useState<number>(percentage);
  const spotifyApi = useSpotify();

  const rangeRef = useRef<HTMLInputElement>(null);

  const handlePlayClick = () => {
    if (isTrackPlaying) {
      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        if (data.body.is_playing) {
          spotifyApi.pause();
          setIsTrackPlaying(false);
        }
      });
    } else {
      setIsTrackPlaying(true);
      spotifyApi.play();
    }
  };

  const handleSpeakerClick = () => {
    if (!(rangeRef.current && rangeRef.current.value)) return;

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

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isMuted) setIsMuted(false);
    setPercentage(Number(event.target.value));
  };

  return (
    <div
      className='flex h-full w-full items-center justify-between rounded-b-lg border-t-4 border-solid
      border-t-white px-10 text-charcoal'
    >
      <div className='flex items-center gap-x-5'>
        <Image
          className={`${
            isTrackPlaying ? 'animate-spin-slow-running' : 'animate-spin-slow-paused'
          } h-[80px] w-[80px] rounded-full border-[3px] border-solid border-offwhite drop-shadow-[0_0_8px_#b8bdc6]`}
          src={track?.album.images[0] ? track.album.images[0].url : '/placeholder-image.jpg'}
          width='80'
          height='80'
          draggable={false}
          alt={`${track?.album.name} Album Cover`}
        />
        <div className='leading-6'>
          <p className='cursor-pointer font-semibold hover:underline'>
            {track ? track.name : 'No Track Playing'}
          </p>
          <p className='cursor-pointer text-[0.95rem] text-zinc-500 hover:underline'>
            {track ? getSongArtists(track.artists) : 'No Artist(s)'}
          </p>
        </div>
      </div>
      <div className='flex flex-col items-center gap-y-2'>
        <div className='space-x-2 text-sm text-zinc-500'>
          <span>{track ? '0:00' : '--:--'}</span>
          <span className='text-spotify-100'>/</span>
          <span>{track ? getSongDuration(track.duration_ms) : '--:--'}</span>
        </div>
        <div className='flex items-center gap-x-5'>
          <Image
            className='cursor-pointer opacity-40 hover:opacity-80'
            src={'/previous.svg'}
            width='20'
            height='20'
            draggable={false}
            alt={`Previous Button`}
          />
          <div className='flex-shrink-0' onClick={handlePlayClick}>
            {track ? (
              <>
                <Image
                  className={`${
                    isTrackPlaying ? 'hidden' : ''
                  } cursor-pointer transition-[none_33ms_cubic-bezier(0.3,0,0,1)] hover:scale-[1.06] active:scale-[1]`}
                  src={'/play.svg'}
                  width='60'
                  height='60'
                  draggable={false}
                  alt={`Play Button`}
                />
                <Image
                  className={`${
                    isTrackPlaying ? '' : 'hidden'
                  } cursor-pointer transition-[none_33ms_cubic-bezier(0.3,0,0,1)] hover:scale-[1.06] active:scale-[1]`}
                  src={'/pause.svg'}
                  width='60'
                  height='60'
                  draggable={false}
                  alt={`Pause Button`}
                />
              </>
            ) : (
              <Image
                className='cursor-not-allowed opacity-50'
                src={'/play.svg'}
                width='60'
                height='60'
                draggable={false}
                alt={`Disabled Play Button`}
              />
            )}
          </div>
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
      <div className='h-auto w-64'>
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
  );
}

export default Player;
