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
  const tracks = useSWR('/api/top-tracks', fetcher);
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
      <main className="main relative min-w-[20rem] max-w-lg mx-5 sm:mx-auto rounded-3xl first-letter:shadow shadow-blue-500/40 hover:shadow-indigo-500/40">
        <div className="album-wrapper mt-20 px-10 rounded-3xl backdrop-blur bg-black/60">
          <NowPlaying {...data} />
        </div>
        <div className="blur-layer w-full h-full rounded-3xl absolute -z-10 top-0 left-0" style={{ backgroundImage: `url(${albumImageUrl})` }}>
        </div>
      </main>
      {
        tracks && tracks?.data?.tracks &&
        < section className='top-tracks min-w-[20rem] max-w-lg mt-10 mx-5 sm:mx-auto text-xl text-gray-500'>
          <h2 className='pb-2'>最近在听</h2>
          {
            tracks.data.tracks.map(track => {
              return (
                <div key={track.id} className="flex justify-between  py-2 border-b-2 border-opacity-10">
                  <span className='text-lg'>{track.name}</span>
                  <span className=''>{track.artist}</span>
                </div>
              );
            })
          }
        </section>
      }
      <Footer />
    </div >
  )
}