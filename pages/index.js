import useSWR from 'swr';
import Head from 'next/head'
import NowPlaying from '../components/NowPlaying'
import Footer from '../components/Footer'
import fetcher from '../lib/fetcher';

export default function Home() {
  const { data } = useSWR('/api/now-playing', fetcher, { refreshInterval: 1000 });
  return (
    <div>
      <Head>
        <title>I'm listening to</title>
        <meta name="description" content="You can know what I'm listening to here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='main max-w-lg mx-auto bg-neutral-600 shadow shadow-blue-500/40 hover:shadow-indigo-500/40'>
        <div className="album-wrapper mt-20 px-10">
          <NowPlaying {...data} />
        </div>
      </main>
      <Footer />
    </div>
  )
}