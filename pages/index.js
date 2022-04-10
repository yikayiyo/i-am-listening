import Head from 'next/head'
import Image from 'next/image'
import NowPlaying from '../components/NowPlaying'

export default function Home() {
  return (
    <div>
      <Head>
        <title>I'm listening</title>
        <meta name="description" content="You can know what I'm listening here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='main bg-red-200 h-screen '>
        <div className="album-wrapper mt-20 px-10 bg-green-200">
          <NowPlaying isPlaying={true} />
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
