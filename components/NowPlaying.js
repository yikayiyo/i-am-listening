import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { debounce } from '../lib/lodash.custom.min.js'

export default function NowPlaying({
  isPlaying,
  album,
  albumImageUrl,
  artist,
  songUrl,
  title
}) {
  const scrollTitleRef = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    let scrollWidth = scrollTitleRef.current.scrollWidth, clientWidth = scrollTitleRef.current.clientWidth;
    if (scrollWidth > clientWidth) {
      const swipeSpinning = [
        { transform: 'translateX(0%)' },
        { transform: `translateX(${clientWidth - scrollWidth}px)` }
      ];
      const swipeTiming = {
        duration: 10000,
        iterations: Infinity,
        direction: "alternate"
      }
      let swipeAnimation = scrollTitleRef.current.animate(swipeSpinning, swipeTiming);
      return () => {
        swipeAnimation.cancel()
      }
    }
  });
  useEffect(() => {
    function handleResize() {
      setWidth(scrollTitleRef.current.clientWidth);
    }
    window.addEventListener('resize', debounce(handleResize, 500));
    return () => {
      window.removeEventListener('resize', debounce(handleResize, 500));
    }
  }, [width]);
  const albumWrapperStyle = isPlaying ? 'shadow-[03px_02px_302px_0px_#dfa]': '';
  return (
    <div className={'album-wrapper md:h-full px-10 rounded-3xl backdrop-blur bg-black/90 ' + albumWrapperStyle}>
      <a className="wrapper py-10 text-white block" href={songUrl || "#"}>
        <div className="record-bottom w-60 h-60 md:w-80 md:h-80 md:px-10 bg-black shadow-white shadow-[0_0_32px_0_rgba(0,0,0,0.3)] mx-auto flex justify-center items-center rounded-full">
          <div className="song-image-wrapper w-40 h-40 bg-gray-200 rounded-[50%]">
            <Image
              alt={title || "朋友越多越快乐"}
              src={albumImageUrl || "/songIMG.webp"}
              width={160}
              height={160}
              className={isPlaying ? "animate-record-effect rounded-[50%]" : "rounded-[50%]"}
            />
          </div>
        </div>
        <div className="song-info flex flex-col mt-5 mx-4">
          <div className="w-full md:w-72 text-center title text-xl font-medium whitespace-nowrap overflow-hidden scroll-smooth">
            <h1 ref={scrollTitleRef}>{title || "朋友越多越快乐"}</h1>
          </div>
          <p className="w-full text-center truncate author mt-1 text-gray-200">{artist || "李志"}</p>
          <p className="w-full text-center truncate album mt-1">{album || "未知"}</p>
        </div>
      </a>
      <div className="info absolute p-1 top-1 right-4 text-center">
        {
          isPlaying ? (
            <p className='text-green-200'>正在收听🎵</p>
          ) : (
            songUrl ? (
              <p className='text-green-100'>休息中🙉</p>
            ) : (
              <p className='text-gray-200'>不在线🙈</p>
            )
          )
        }
      </div>
    </div>
  )
}