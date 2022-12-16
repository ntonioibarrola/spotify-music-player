import { useState } from 'react';
import { getSongArtists, getSongDuration } from '../utils/helper';
import { useTrackStore } from '../contexts/spotify-contexts';
import Image from 'next/image';

export const Track: React.FC<{ item: SpotifyApi.PlaylistTrackObject; index: number }> = ({
  item,
  index,
}) => {
  return (
    <tr className='flex h-16 cursor-pointer items-center justify-between gap-5 rounded-md p-3 hover:bg-gray-200'>
      <td className='text-[0.95rem] text-zinc-500'>{index + 1}</td>
      <td className='before:content-[" "] relative flex w-[90%] items-center before:invisible'>
        <Image
          className='h-[50px] w-[50px] rounded-lg'
          src={item.track?.album.images[0]?.url as string}
          width='50'
          height='50'
          alt={`${item.track?.album.name} Album Cover`}
        />
        <div className='absolute left-0 right-0 ml-[4.5rem] overflow-hidden text-ellipsis whitespace-nowrap leading-5'>
          <span className='text-[1rem]'>{item.track?.name}</span>
          <br />
          <span className='cursor-pointer text-[0.95rem] text-zinc-500 hover:underline'>
            {getSongArtists(item.track?.artists)}
          </span>
        </div>
      </td>
      <td className='w-[10%] text-right text-[0.95rem] tracking-widest text-zinc-500'>
        {getSongDuration(item.track?.duration_ms)}
      </td>
    </tr>
  );
};

export default Track;
