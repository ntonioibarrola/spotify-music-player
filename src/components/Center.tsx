import Image from 'next/image';

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
          <div className='ml-8 flex flex-col justify-end font-bold'>
            <div className='text-base'>PLAYLIST</div>
            <div className='fluid-text-5xl'>Playlist Name</div>
          </div>
        </div>
        <div>{/* Player */}</div>
        <div className='w-full px-40 text-left'>
          <table className='w-full'>
            <thead>
              <tr className='flex h-16 items-center gap-5 rounded-md p-3'>
                <th>#</th>
                <th className='w-[40%]'>TITLE</th>
                <th className='w-[25%]'>ALBUM</th>
                <th className='w-[25%]'>DATE ADDED</th>
                <th className='w-[10%]'>DURATION</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, index) => (
                <tr
                  key={`Song ${index}`}
                  className='flex h-16 cursor-pointer items-center justify-between gap-5 rounded-md p-3 hover:bg-spotify-200'
                >
                  <td>{index}</td>
                  <td className='flex w-[40%] items-center'>
                    <div>Image</div>
                    <div className='ml-5'>
                      <div>Song Title</div>
                      <div>Artist Name</div>
                    </div>
                  </td>
                  <td className='w-[25%]'>Album Title</td>
                  <td className='w-[25%]'>Date Added</td>
                  <td className='w-[10%]'>Song Length</td>
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
