import { useState, useRef, useEffect, ChangeEvent } from 'react';

const Slider: React.FC<{
  percentage: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ percentage = 50, onChange }) => {
  const [position, setPosition] = useState<number>(0);
  const [marginLeft, setMarginLeft] = useState<number>(0);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);

  const thumbRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let rangeWidth = 0;
    let thumbWidth = 0;

    if (rangeRef.current) rangeWidth = rangeRef.current.getBoundingClientRect().width;
    if (thumbRef.current) thumbWidth = thumbRef.current.getBoundingClientRect().width;

    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      thumbWidth + (rangeWidth / 100) * percentage - (thumbWidth / 100) * percentage;
    setPosition(percentage);
    setMarginLeft(centerThumb);
    setProgressBarWidth(centerProgressBar);
  }, [percentage]);

  return (
    <div
      className='relative w-full before:pointer-events-none before:absolute before:top-1/2 before:left-1/2 before:block before:h-[0.3125rem]
      before:w-[99%] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-lg before:bg-white'
    >
      <div
        className='pointer-events-none absolute top-1/2 z-[1] block h-[0.3125rem] w-0 -translate-y-1/2 select-none rounded-lg bg-spotify-100'
        style={{ width: `calc(${progressBarWidth}px - 0.45rem)` }}
      />
      <div
        className='pointer-events-none absolute top-1/2 z-[3] ml-0.5 block h-[0.9rem] w-[0.9rem] translate-x-0 -translate-y-1/2
          select-none rounded-full border-2 border-solid border-spotify-100 bg-white'
        ref={thumbRef}
        style={{ left: `${position}%`, marginLeft: `${marginLeft}px` }}
      />
      <input
        className='h-[10px] w-full cursor-pointer appearance-none bg-red-300 opacity-0'
        type='range'
        ref={rangeRef}
        value={position}
        step='0.01'
        onChange={onChange}
      />
      {/* <div className='ml-4 flex flex-auto rounded-full bg-white'>
        <div className='h-[0.3125rem] w-1/3 flex-none rounded-l-full rounded-r-[1px] bg-spotify-100' />
        <div
          className='-my-[0.25rem] ml-0.5 h-3 w-3 cursor-grab rounded-full border-2 border-solid border-spotify-100 bg-white
                  transition-[none_33ms_cubic-bezier(0.3,0,0,1)] hover:scale-[1.2] active:cursor-grabbing'
        />
      </div> */}
    </div>
  );
};

export default Slider;
