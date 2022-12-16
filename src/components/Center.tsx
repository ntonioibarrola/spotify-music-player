import { useSession } from 'next-auth/react';
import { usePlaylistStore } from '../contexts/spotify-contexts';
import {
  getPlaylistDuration,
  getSongArtists,
  getSongDuration,
  getAddedByDate,
} from '../utils/helper';
import Image from 'next/image';

interface DummyData {
  albumCover: string;
  songTitle: string;
  artistName: string;
  albumTitle: string;
  dateAdded: string;
  songLength: string;
}

const dummyData: Array<DummyData> = [
  {
    albumCover: '/dummy-nurture.png',
    songTitle: 'Something Comforting',
    artistName: 'Porter Robinson',
    albumTitle: 'Nurture',
    dateAdded: 'Dec 10, 2022',
    songLength: '4:41',
  },
  {
    albumCover: '/dummy-persona.png',
    songTitle: 'Mikrokosmos',
    artistName: 'BTS',
    albumTitle: 'MAP OF THE SOUL: PERSONA',
    dateAdded: 'Dec 10, 2022',
    songLength: '3:44',
  },
  {
    albumCover: '/dummy-whocares.png',
    songTitle: 'AMAZING',
    artistName: 'Rex Orange County',
    albumTitle: 'WHO CARES?',
    dateAdded: 'Dec 10, 2022',
    songLength: '3:29',
  },
];

function Center() {
  const { data: session } = useSession();
  const { playlist } = usePlaylistStore();

  return (
    <div className='flex h-full w-full justify-center bg-spotify-100'>
      <div className='relative top-full h-[calc(100%-0.75rem)] w-[calc(100%-2rem)] -translate-y-full overflow-y-scroll rounded-t-xl bg-offwhite drop-shadow-[0_0_10px_#1fbb5d]'>
        <div className='flex h-auto w-full items-center justify-between py-5 px-8'>
          <div className='flex gap-x-2'>
            <Image
              className='h-[45px] w-[45px] cursor-pointer rounded-full p-2 hover:bg-gray-200'
              src={'/chevron-left.svg'}
              width='45'
              height='45'
              alt='Return'
            />
            <Image
              className='h-[45px] w-[45px] cursor-pointer rounded-full p-2 hover:bg-gray-200'
              src={'/chevron-right.svg'}
              width='45'
              height='45'
              alt='Forward'
            />
          </div>
          <div className='flex items-center gap-4'>
            <Image
              className='h-[45px] w-[45px] rounded-full object-cover'
              src={
                session && session.user ? (session.user.image as string) : '/placeholder-avatar.png'
              }
              width='45'
              height='45'
              alt='Profile Image'
            />
          </div>
        </div>
        <div className='flex h-auto py-5 px-40'>
          <Image
            className='h-[208px] w-[208px] rounded-lg object-cover'
            src={
              playlist && playlist.images
                ? (playlist?.images[0]?.url as string)
                : '/placeholder-image.jpg'
            }
            width='208'
            height='208'
            alt='Playlist Cover'
          />
          <div className='ml-8 flex flex-col justify-end font-bold text-charcoal'>
            <div className='text-[0.8rem] font-semibold'>PLAYLIST</div>
            <div className='inline-block overflow-hidden text-ellipsis font-poppins fluid-text-5xl'>
              {playlist?.name}
            </div>
            <div className='flex items-center space-x-2 text-sm font-normal'>
              {/* <Image
                className='h-[40px] w-[40px] flex-shrink-0 rounded-full object-cover'
                src={}
                width='40'
                height='40'
                alt='Profile Image'
              /> */}
              <span className='cursor-pointer whitespace-nowrap font-semibold hover:underline'>
                {playlist?.owner.display_name}
              </span>
              <span className='space-x-2 text-zinc-500'>
                <span className='font-poppins'>•</span>
                <span>{playlist && playlist.followers && playlist?.followers.total} likes</span>
                <span className='font-poppins'>•</span>
                <span>{playlist?.tracks.total} songs,</span>
                <span>{playlist && getPlaylistDuration(playlist.tracks.items)}</span>
              </span>
            </div>
          </div>
        </div>
        <div className='h-10' />
        <div className='h-auto w-full px-40 pb-10 text-left'>
          <table className='w-full text-charcoal'>
            <thead>
              <tr className='flex h-16 items-center gap-5 rounded-md p-3 text-xs tracking-widest text-zinc-500'>
                <th className='font-normal'>#</th>
                <th className='w-[40%] font-normal'>TITLE</th>
                <th className='w-[25%] font-normal'>ALBUM</th>
                <th className='w-[25%] font-normal'>DATE ADDED</th>
                <th className='flex w-[10%] flex-shrink-0 items-center justify-end font-normal'>
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
              {playlist?.tracks.items.map((item, index) => (
                <tr
                  key={`${item.track!.id}`}
                  className='flex h-16 cursor-pointer items-center justify-between gap-5 rounded-md p-3 hover:bg-gray-200'
                >
                  <td className='text-[0.95rem] text-zinc-500'>{index + 1}</td>
                  <td className='before:content-[" "] relative flex w-[40%] items-center before:invisible'>
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
                  <td className='before:content-[" "] relative flex w-[25%] items-center text-zinc-500 before:invisible'>
                    <span className='absolute left-0 right-0 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-[0.95rem] hover:underline'>
                      {item.track?.album.name}
                    </span>
                  </td>
                  <td className='before:content-[" "] relative flex w-[25%] items-center text-zinc-500 before:invisible'>
                    <span className='absolute left-0 right-0 overflow-hidden text-ellipsis whitespace-nowrap text-[0.95rem]'>
                      {getAddedByDate(item.added_at)}
                    </span>
                  </td>
                  <td className='w-[10%] text-right text-[0.95rem] tracking-widest text-zinc-500'>
                    {getSongDuration(item.track?.duration_ms)}
                  </td>
                </tr>
              ))}
              {/* {dummyData.map((data: DummyData, index: number) => (
                <tr
                  key={`${data.songTitle}`}
                  className='flex h-16 cursor-pointer items-center justify-between gap-5 rounded-md p-3 hover:bg-gray-200'
                >
                  <td className='text-[0.95rem] text-zinc-500'>{index + 1}</td>
                  <td className='before:content-[" "] relative flex w-[40%] items-center before:invisible'>
                    <Image
                      className='h-[50px] w-[50px] rounded-lg'
                      src={data.albumCover}
                      width='50'
                      height='50'
                      alt={`${data.albumTitle} Album Cover`}
                    />
                    <div className='absolute left-0 right-0 ml-[4.5rem] overflow-hidden text-ellipsis whitespace-nowrap leading-5'>
                      <span className='text-[1rem]'>{data.songTitle}</span>
                      <br />
                      <span className='cursor-pointer text-[0.95rem] text-zinc-500 hover:underline'>
                        {data.artistName}
                      </span>
                    </div>
                  </td>
                  <td className='before:content-[" "] relative flex w-[25%] items-center text-zinc-500 before:invisible'>
                    <span className='absolute left-0 right-0 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-[0.95rem] hover:underline'>
                      {data.albumTitle}
                    </span>
                  </td>
                  <td className='before:content-[" "] relative flex w-[25%] items-center text-zinc-500 before:invisible'>
                    <span className='absolute left-0 right-0 overflow-hidden text-ellipsis whitespace-nowrap text-[0.95rem]'>
                      {data.dateAdded}
                    </span>
                  </td>
                  <td className='w-[10%] text-right text-[0.95rem] tracking-widest text-zinc-500'>
                    {data.songLength}
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Center;
