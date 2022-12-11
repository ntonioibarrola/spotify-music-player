import Image from 'next/image';

function Sidebar() {
  const main = [
    { name: 'Home', source: '/home.svg', alt: 'Home Icon' },
    { name: 'Search', source: '/search.svg', alt: 'Search Icon' },
    { name: 'Your Library', source: '/books.svg', alt: 'Books Icon' },
  ];

  const middle = [
    { name: 'Create Playlist', source: '/plus.svg', alt: 'Plus Icon' },
    { name: 'Liked Songs', source: '/heart.svg', alt: 'Heart Icon' },
  ];

  return (
    <div
      className='scrollbar-hide h-screen w-1/6 min-w-[300px] max-w-[380px] space-y-12 overflow-y-scroll bg-spotify-100 px-7 py-20
      text-base font-bold text-white'
    >
      <ul>
        {main.map((item) => (
          <li
            key={item.alt}
            className='flex cursor-pointer items-center gap-5 rounded-xl p-3 hover:bg-spotify-200'
          >
            <Image src={item.source} width='25' height='25' alt={item.alt} />
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
      <ul>
        {middle.map((item) => (
          <li
            key={item.alt}
            className='flex h-[49px] cursor-pointer items-center gap-5 rounded-xl p-3 hover:bg-spotify-200'
          >
            <Image
              className={
                item.alt === 'Plus Icon'
                  ? 'rounded-xl bg-spotify-300 p-2'
                  : 'rounded-xl bg-gradient-to-br from-indigo-800 via-indigo-600 to-gray-50 p-2'
              }
              src={item.source}
              width='35'
              height='35'
              alt={item.alt}
            />
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
      <ul>
        {['Sad Boi Hours', 'Boss Girl', 'Rave', 'Minecraft'].map((playlist, index) => (
          <li
            key={`${playlist} ${index}`}
            className='cursor-pointer rounded-xl p-3 hover:bg-spotify-200'
          >
            <p className='font-semibold'>{playlist}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
