import { motion, useAnimation, useInView } from 'framer-motion'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import { useRef } from 'react'
import { isMobile } from '../lib/utils'

function TrackItem({ track }) {
  // animation when page loads
  const itemVariants = {
    hidden: {
      x: 50,
      opacity: 0
    },
    done: {
      x: 0,
      opacity: 1
    }
  }
  // animation when user scrolls, for mobile users
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: true })
  // animation when hover
  const hoverControl = useAnimation()
  return (
    <motion.div
      ref={itemRef}
      variants={itemVariants}
      animate={hoverControl}
      onHoverStart={() =>
        hoverControl.start({ x: 10, scale: 1.02, color: '#dfa' })
      }
      onHoverEnd={() => hoverControl.start({ x: 0, scale: 1, color: 'white' })}
      className={`track-item flex justify-between items-center py-2 border-b border-b-zinc-900 cursor-pointer ${
        isMobile() && isInView ? 'animate-slidein' : ''
      }`}
      data-link={track.link}
      onClick={() => {
        window.open(track.link, '_blank')
      }}
    >
      <span className='text-base max-w-[80%]'>{track.name}</span>
      <span className='text-base flex-shrink-0'>{track.artist}</span>
    </motion.div>
  )
}

export default function TopTracks() {
  const containerVariants = {
    hidden: {
      transition: {
        staggerChildren: 0.07
      }
    },
    done: {
      transition: {
        staggerChildren: 0.07
      }
    }
  }

  const {
    data: tracks,
    error,
    isValidating
  } = useSWR('/api/top-tracks', fetcher)
  let trackEl
  if (error) {
    trackEl = <div onClick={location.reload()}>Refresh</div>
  } else if (isValidating) {
    trackEl = (
      <div
        role='status'
        className='absolute inset-0 grid items-center justify-center'
      >
        <svg
          aria-hidden='true'
          className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black/70'
          viewBox='0 0 100 101'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
            fill='currentColor'
          />
          <path
            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
            fill='currentFill'
          />
        </svg>
        <span className='sr-only'>Loading...</span>
      </div>
    )
  } else {
    trackEl = (
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='done'
        className='tracks-wrapper px-4 py-2 lg:overflow-auto lg:absolute lg:inset-0 lg:top-[68px]'
      >
        {tracks.tracks.map((track) => (
          <TrackItem
            track={track}
            key={track.id}
          />
        ))}
      </motion.div>
    )
  }

  return (
    <section className='top-tracks relative my-5 md:mb-32 lg:my-0 rounded-xl overflow-hidden text-white text-xl backdrop-blur bg-black/80'>
      <h2 className='pl-10 py-5 pr-6 sticky top-0 backdrop-blur bg-black/90'>
        最近在听
      </h2>
      {trackEl}
    </section>
  )
}
