import useSWR from 'swr'
import Head from 'next/head'
import Footer from '../components/Footer'
import fetcher from '../lib/fetcher'

import dynamic from 'next/dynamic'

const NowPlaying = dynamic(() => import('../components/NowPlaying'), {
  ssr: false
})

export default function Home() {
  const { data } = useSWR('/api/now-playing', fetcher, {
    refreshInterval: 1000
  })
  const tracks = useSWR('/api/top-tracks', fetcher)
  let albumImageUrl = '/songIMG.webp'
  if (data && data.albumImageUrl) {
    albumImageUrl = data.albumImageUrl
  }
  return (
    <div>
      <Head>
        <title>I'm listening to</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
        <meta
          name='description'
          content="You can know what I'm listening to here"
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <main className='main md:grid md:grid-cols-2'>
        <section className='current-playing relative p-10 mx-5 sm:mx-auto rounded-3xl first-letter:shadow shadow-blue-500/40 hover:shadow-indigo-500/40'>
          <div className='album-wrapper md:px-10 rounded-3xl backdrop-blur bg-black/60'>
            <NowPlaying {...data} />
          </div>
          <div
            className='blur-layer w-full h-full fixed -z-10 inset-0 bg-origin-content bg-cover bg-no-repeat'
            style={{ backgroundImage: `url(${albumImageUrl})` }}
          ></div>
        </section>
        {tracks && tracks?.data?.tracks && (
          <section className='top-tracks relative min-w-[20rem] max-w-lg md:overflow-auto mt-10 mx-5 pb-10 rounded sm:mx-auto text-white text-xl backdrop-blur bg-black/60'>
            <h2 className='pl-10 py-5 pr-6 sticky top-0 backdrop-blur bg-black/90'>最近在听</h2>
            <div className="tracks-wrapper px-10 pr-6 md:max-h-[60vh]">
              {tracks.data.tracks.map((track) => {
                return (
                  <div
                    key={track.id}
                    className='flex justify-between py-2 border-b cursor-pointer'
                    data-link={track.link}
                    onClick={()=>{window.open(track.link, "_blank")}}
                  >
                    <span className='text-lg'>{track.name}</span>
                    <span className=''>{track.artist}</span>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
