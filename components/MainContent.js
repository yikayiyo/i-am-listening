import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import dynamic from 'next/dynamic'

const NowPlaying = dynamic(() => import('./NowPlaying'), {
  ssr: false
})

const TopTracks = dynamic(() => import('./TopTracks'), {
  ssr: false
})

export default function MainContent() {
  const { data } = useSWR('/api/now-playing', fetcher, {
    refreshInterval: 1000
  })
  const tracks = useSWR('/api/top-tracks', fetcher)
  let albumImageUrl = '/songIMG.webp'
  if (data && data.albumImageUrl) {
    albumImageUrl = data.albumImageUrl
  }
  return <main className='main mt-10 px-4 grid grid-cols-1 lg:grid-cols-[35%,35%,0] gap-10 justify-center'>
    <section className='current-playing relative lg:mb-0 rounded-3xl'>
      <NowPlaying {...data} />
      <div
        className='blur-layer w-full h-full fixed -z-10 inset-0 bg-center bg-cover bg-no-repeat bg-black/20'
        style={{ backgroundImage: `url(${albumImageUrl})` }}
      ></div>
    </section>
    <TopTracks tracks={tracks} />
  </main>
}