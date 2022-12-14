import { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';

function Player() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const [percentage, setPercentage] = useState<number>(50);
  const [savePercentage, setSavePercentage] = useState<number>(percentage);

  const rangeRef = useRef<HTMLInputElement>(null);

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
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
      className='flex h-full w-full items-center justify-between border-t-4 border-solid border-t-white
      bg-offwhite px-10 text-charcoal'
    >
      <div className='flex items-center gap-x-5'>
        <Image
          className={`${
            isPlaying ? 'animate-spin-slow-running' : 'animate-spin-slow-paused'
          } h-[80px] w-[80px] rounded-full border-[3px] border-solid border-offwhite drop-shadow-[0_0_8px_#b8bdc6]`}
          src={'/dummy-nurture.png'}
          width='80'
          height='80'
          draggable={false}
          alt={`Nurture Album Cover`}
        />
        <div className='leading-6'>
          <p className='cursor-pointer font-semibold hover:underline'>Something Comforting</p>
          <p className='cursor-pointer text-[0.95rem] text-zinc-500 hover:underline'>
            Porter Robinson
          </p>
        </div>
      </div>
      <div className='flex flex-col items-center gap-y-2'>
        <div className='space-x-2 text-sm text-zinc-500'>
          <span>1:04</span>
          <span className='text-spotify-100'>/</span>
          <span>4:41</span>
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
            <Image
              className={`${
                isPlaying ? 'hidden' : ''
              } cursor-pointer transition-[none_33ms_cubic-bezier(0.3,0,0,1)] hover:scale-[1.06] active:scale-[1]`}
              src={'/play.svg'}
              width='60'
              height='60'
              draggable={false}
              alt={`Play Button`}
            />
            <Image
              className={`${
                isPlaying ? '' : 'hidden'
              } cursor-pointer transition-[none_33ms_cubic-bezier(0.3,0,0,1)] hover:scale-[1.06] active:scale-[1]`}
              src={'/pause.svg'}
              width='60'
              height='60'
              draggable={false}
              alt={`Pause Button`}
            />
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
