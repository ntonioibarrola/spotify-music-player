import { signOut } from 'next-auth/react';
import { usePlaylistStore } from '../contexts/spotify-contexts';
import Image from 'next/image';
import useSpotify from '../hooks/useSpotify';

function Sidebar() {
  const spotifyApi = useSpotify();
  const { playlists, playlist: currentPlaylist, getPlaylist } = usePlaylistStore();

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
      className='scrollbar-hide h-full w-full space-y-12 overflow-y-scroll bg-spotify-100 px-7 py-20
      text-base font-bold text-white'
    >
      <div>
        <button onClick={() => signOut()}>Logout</button>
      </div>
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
        {playlists.map((playlist) => (
          <li
            key={playlist.id}
            className={`${
              playlist.id === currentPlaylist?.id && 'bg-spotify-200'
            } cursor-pointer rounded-xl p-3 hover:bg-spotify-200`}
            onClick={() => getPlaylist(spotifyApi, playlist.id)}
          >
            <p className='font-semibold'>{playlist.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
