import { GetServerSideProps } from 'next';
import { type ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

const Login: React.FC<{ providers: Props['providers'] }> = ({ providers }) => {
  const { name: providerName, id: providerId } = providers?.spotify as ClientSafeProvider;

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-5'>
      <Image src='/spotify.svg' width='300' height='300' alt='Spotify Logo' />
      <button
        className='rounded-xl bg-spotify-100 px-6 py-3 font-bold text-white'
        onClick={() => signIn(providerId, { callbackUrl: '/' })}
      >
        Login with {providerName}
      </button>
      <Link href='/preview'>
        <button className='rounded-xl bg-spotify-100 px-6 py-3 font-bold text-white'>
          See Preview
        </button>
      </Link>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
