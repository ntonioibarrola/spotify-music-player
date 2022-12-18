import { FC, Fragment, useCallback } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { usePlaylistStore } from '../contexts/spotify-contexts';
import Image from 'next/image';
import useSpotify from '../hooks/useSpotify';

const Dropdown: FC = () => {
  const { playlists, setPlaylist, setPlaylistId, getPlaylist } = usePlaylistStore();
  const spotifyApi = useSpotify();

  const fetchPlaylist = useCallback(async (playlistId: string) => {
    const playlist = await getPlaylist(spotifyApi, playlistId);
    setPlaylist(playlist);
    setPlaylistId(playlistId);
  }, []);

  return (
    <div>
      <Popover className='relative'>
        {({ close }) => (
          <>
            <Popover.Button
              className='group inline-flex items-center rounded-md bg-spotify-100 px-3 py-2 text-sm font-bold text-white text-opacity-90 hover:text-opacity-100
              hover:opacity-90 focus:outline-none ui-open:text-opacity-100'
            >
              <span>My Playlists</span>
              <Image
                className='ml-2 h-4 w-4 text-opacity-70 transition duration-150 ease-in-out group-hover:text-opacity-80 ui-open:rotate-180 ui-open:text-opacity-100'
                src={'/chevron-down.svg'}
                width='16'
                height='16'
                alt={'Popover Icon'}
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <Popover.Panel className='absolute -left-[52px] z-10 mt-3 max-h-96 w-screen max-w-sm -translate-x-1/2 transform px-4'>
                <div className='max-h-96 w-full overflow-y-scroll rounded-lg shadow-lg shadow-gray-200'>
                  <div className='relative flex flex-col items-center gap-7 bg-white p-7'>
                    {playlists.map((playlist) => (
                      <div
                        key={playlist.id}
                        onClick={() => {
                          fetchPlaylist(playlist.id);
                          close();
                        }}
                        className='-m-3 flex w-[300px] cursor-pointer items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100'
                      >
                        <Image
                          className='h-[50px] w-[50px] rounded-lg object-cover'
                          src={
                            playlist && playlist.images[0]
                              ? (playlist.images[0]?.url as string)
                              : '/placeholder-image.jpg'
                          }
                          width='50'
                          height='50'
                          alt='Playlist Cover'
                        />
                        <div className='ml-4 break-words pr-7 line-clamp-2'>
                          <span className='text-[0.95rem] font-medium text-charcoal'>
                            {playlist.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default Dropdown;
