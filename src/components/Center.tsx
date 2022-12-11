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
  return (
    <div className='flex flex-grow justify-center bg-spotify-100'>
      <div className='relative top-full h-[calc(100vh-0.75rem)] w-[calc(100%-2rem)] -translate-y-full overflow-y-scroll rounded-t-xl bg-offwhite drop-shadow-[0_0_10px_#1fbb5d]'>
        <div className='flex h-auto w-full items-center justify-between py-5 px-16'>
          <div>Page</div>
          <div className='flex items-center gap-4'>
            <Image
              className='rounded-full'
              src={'/favicon.ico'}
              width='45'
              height='45'
              alt='Profile Image'
            />
            {/* <p className='font-bold'>{session?.user?.name}</p>
            <Image src={'/chevron-down.svg'} width='17' height='17' alt='Account Dropdown Icon' /> */}
          </div>
        </div>
        <div className='flex py-5 px-40'>
          <Image
            className='rounded-lg'
            src={'/favicon.ico'}
            width='208'
            height='208'
            alt='Session Image'
          />
          <div className='ml-8 flex flex-col justify-end font-bold text-charcoal'>
            <div className='text-base'>PLAYLIST</div>
            <div className='fluid-text-5xl'>Playlist Name</div>
          </div>
        </div>
        <div>{/* Player */}</div>
        <div className='w-full px-40 text-left'>
          <table className='w-full text-charcoal'>
            <thead>
              <tr className='flex h-16 items-center gap-5 rounded-md p-3 text-sm tracking-widest text-zinc-500'>
                <th className='font-normal'>#</th>
                <th className='w-[40%] font-normal'>TITLE</th>
                <th className='w-[25%] font-normal'>ALBUM</th>
                <th className='w-[25%] font-normal'>DATE ADDED</th>
                <th className='w-[10%] font-normal'>DURATION</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((data: DummyData, index: number) => (
                <tr
                  key={`${data.songTitle}`}
                  className='flex h-16 cursor-pointer items-center justify-between gap-5 rounded-md p-3 hover:bg-gray-200'
                >
                  <td className='text-zinc-500'>{index + 1}</td>
                  <td className='before:content-[" "] relative flex w-[40%] items-center before:invisible'>
                    <Image
                      className='rounded-lg'
                      src={data.albumCover}
                      width='50'
                      height='50'
                      alt={`${data.albumTitle} Album Cover`}
                    />
                    <div className='absolute left-0 right-0 ml-[4.5rem] overflow-hidden text-ellipsis whitespace-nowrap'>
                      <span className='text-[1.05rem] font-semibold'>{data.songTitle}</span>
                      <br />
                      <span className='text-[0.95rem] font-semibold text-zinc-500'>
                        {data.artistName}
                      </span>
                    </div>
                  </td>
                  <td className='before:content-[" "] relative flex w-[25%] items-center text-gray-500 before:invisible'>
                    <span className='absolute left-0 right-0 overflow-hidden text-ellipsis whitespace-nowrap text-[0.95rem] font-semibold'>
                      {data.albumTitle}
                    </span>
                  </td>
                  <td className='before:content-[" "] relative flex w-[25%] items-center text-zinc-500 before:invisible'>
                    <span className='absolute left-0 right-0 overflow-hidden text-ellipsis whitespace-nowrap text-[0.95rem] font-semibold'>
                      {data.dateAdded}
                    </span>
                  </td>
                  <td className='w-[10%] text-[0.95rem] font-semibold tracking-widest text-zinc-500'>
                    {data.songLength}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Center;
