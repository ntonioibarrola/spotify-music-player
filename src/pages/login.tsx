import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { type ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

interface LoginProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

const Login: FC<LoginProps> = ({ providers }) => {
  const { name: providerName, id: providerId } = providers?.spotify as ClientSafeProvider;

  return (
    <div className='grid h-screen grid-cols-[1fr_minmax(320px,_600px)_1fr] text-charcoal lg:grid-cols-[1fr_minmax(950px,_1100px)_1fr]'>
      <div className='col-start-2 col-end-3 flex flex-col items-center justify-center'>
        <div className='flex w-full items-center justify-between px-10'>
          <div className='w-full space-y-9 font-poppins lg:w-96'>
            <h1 className='text-5xl font-extrabold leading-[1.2]'>
              A themed Spotify music player.
            </h1>
            <p className='text-sm font-normal'>
              Design inspired by Spicetify themes. Please read the project's&nbsp;
              <a
                className='text-blue-600 underline'
                href='https://github.com/ntonioibarrola/spotify-music-player'
                target='_blank'
              >
                README
              </a>
              &nbsp;for more information. Most users will want to pick{' '}
              <span className='font-medium'>See Preview</span>.
            </p>
            <div className='flex flex-col justify-center gap-3 sm:block sm:space-x-3'>
              <button
                className='rounded-full bg-spotify-100 px-8 py-3 text-sm font-normal text-white hover:bg-spotify-200'
                onClick={() => signIn(providerId, { callbackUrl: '/' })}
              >
                Login with {providerName}
              </button>
              <Link href='/preview'>
                <button className='w-full rounded-full border-[1px] border-solid border-gray-500 px-8 py-3 text-sm font-normal opacity-60 hover:opacity-80 sm:w-auto'>
                  See Preview
                </button>
              </Link>
            </div>
          </div>
          <Image
            className='hidden lg:block'
            src='/spotify.svg'
            width='400'
            height='400'
            alt='Spotify Logo'
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps<LoginProps> = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
