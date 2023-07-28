import Head from 'next/head'
import MainContent from '../components/MainContent'
import Footer from '../components/Footer'

export default function Home() {
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
      <MainContent />
      <Footer />
    </div>
  )
}
