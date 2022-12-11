import { type NextPage } from 'next';
import Head from 'next/head';
// import Link from 'next/link';
import Center from '../components/Center';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bounce</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex'>
        <Sidebar />
        <Center />
        <Player />
      </main>
    </>
  );
};

export default Home;
