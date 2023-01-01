import { FC, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { useNoAuthStore } from '../contexts/spotify-noauth-contexts';
import Image from 'next/image';

const NoAuthDropdown: FC = () => {
  const { playlist } = useNoAuthStore();

  return (
    <div>
      <Popover className='relative'>
        {({ close }) => (
          <>
            <Popover.Button
              className='group inline-flex items-center rounded-md bg-spotify-100 px-3 py-2 text-sm font-bold text-white text-opacity-90 hover:bg-spotify-200
              hover:text-opacity-100 focus:outline-none ui-open:text-opacity-100'
            >
              <span>My Playlists</span>
              <Image
                className='ml-2 h-3 w-3 text-opacity-70 transition duration-150 ease-in-out group-hover:text-opacity-80 ui-open:rotate-180 ui-open:text-opacity-100'
                src={'/chevron-down.svg'}
                width='12'
                height='12'
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
              <Popover.Panel className='absolute left-[9px] z-10 mt-3 max-h-96 w-screen max-w-[320px] -translate-x-1/2 transform [@media(min-width:950px)]:-left-[39px]'>
                <div className='max-h-96 w-full overflow-x-hidden overflow-y-scroll overscroll-contain rounded-lg shadow-lg shadow-[rgba(0,0,0,0.05)] [&::-webkit-scrollbar]:bg-white'>
                  <div className='relative flex flex-col items-center gap-7 bg-white p-7'>
                    {playlist && (
                      <div
                        key={playlist.id}
                        onClick={() => close()}
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
                    )}
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

export default NoAuthDropdown;
