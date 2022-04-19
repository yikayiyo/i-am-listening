import useSWR from 'swr';
import Head from 'next/head'
import Footer from '../components/Footer'
import fetcher from '../lib/fetcher';

import dynamic from 'next/dynamic'

const NowPlaying = dynamic(
  () => import('../components/NowPlaying'),
  { ssr: false }
)

export default function Home() {
  const { data } = useSWR('/api/now-playing', fetcher, { refreshInterval: 1000 });
  let albumImageUrl = "/songIMG.webp";
  if (data && data.albumImageUrl) {
    albumImageUrl = data.albumImageUrl;
  }
  return (
    <div>
      <Head>
        <title>I'm listening to</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="You can know what I'm listening to here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main relative max-w-lg mx-5 sm:mx-auto rounded-3xl first-letter:shadow shadow-blue-500/40 hover:shadow-indigo-500/40">
        <div className="album-wrapper mt-20 px-10 rounded-3xl backdrop-blur bg-black/60">
          <NowPlaying {...data} />
        </div>
        <div className="blur-layer w-full h-full rounded-3xl absolute -z-10 top-0 left-0" style={{ backgroundImage: `url(${albumImageUrl})` }}>
        </div>
      </main>
      <Footer />
    </div >
  )
}