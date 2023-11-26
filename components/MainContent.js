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
  let albumImageUrl = '/songIMG.webp'
  let bgPointColor = '#0003'
  if (data?.albumImageUrl) {
    albumImageUrl = data.albumImageUrl
  }
  if (data?.isPlaying) {
    bgPointColor = 'blue'
  }
  return (
    <main className='main min-h-screen lg:min-h-[initial] mt-10 px-4 grid grid-cols-1 lg:grid-cols-[35%,35%,0] gap-10 justify-center'>
      <section className='current-playing perspective-lg relative lg:mb-0 rounded-3xl'>
        <NowPlaying {...data} />
        <div
          className='blur-layer w-full h-full fixed -z-10 inset-0 bg-center bg-cover'
          style={{
            background: `fixed 0 0/32px 32px radial-gradient(${bgPointColor} 1px,transparent 0), fixed 16px 16px /32px 32px radial-gradient(${bgPointColor} 1px,transparent 0)`
          }}
        ></div>
      </section>
      <TopTracks />
    </main>
  )
}
