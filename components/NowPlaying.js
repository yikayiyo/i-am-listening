import Image from 'next/image'
import { useRef, useEffect } from 'react'

export default function NowPlaying({
  isPlaying,
  album,
  albumImageUrl,
  artist,
  songUrl,
  title
}) {
  const scrollTitleRef = useRef(null);
  useEffect(() => {
    let scrollWidth = scrollTitleRef.current.scrollWidth, clientWidth = scrollTitleRef.current.clientWidth;
    if (scrollWidth > clientWidth) {
      // bad 1
      // let interval = setInterval(() => {
      //   scrollTitleRef.current.scrollLeft += 10;
      //   if (scrollTitleRef.current.scrollLeft === scrollWidth - clientWidth) {
      //     scrollTitleRef.current.scrollLeft = 0;
      //   }
      // }, 1000);
      // return () => {
      //   clearInterval(interval);
      // }
      // bad 2
      // scrollTitleRef.current.scrollTo({
      //   top: 0,
      //   left: scrollWidth - clientWidth,
      //   behavior: 'smooth'
      // })
      const swipeSpinning = [
        { transform: 'translateX(0%)' },
        { transform: `translateX(${clientWidth - scrollWidth - 5}px)` }
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
      // when the windowsize changes, there should be a new animation.
      // TODO: how to reuse logic
      let scrollWidth = scrollTitleRef.current.scrollWidth, clientWidth = scrollTitleRef.current.clientWidth;
      if (scrollWidth > clientWidth) {
        const swipeSpinning = [
          { transform: 'translateX(0%)' },
          { transform: `translateX(${clientWidth - scrollWidth - 5}px)` }
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
    }
    window.addEventListener('resize', handleResize)
  });
  return (
    <>
      <a className="wrapper py-10 text-white block" href={songUrl || "#"}>
        <div className="record-bottom w-60 h-60 bg-black mx-auto flex justify-center items-center rounded-full">
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
        <div className="song-info flex flex-col mt-5">
          <div className="w-full text-center title text-xl font-medium whitespace-nowrap overflow-hidden scroll-smooth">
            <h1 ref={scrollTitleRef}>{title || "朋友越多越快乐"}</h1>
          </div>
          <p className="w-full text-center truncate author mt-1 text-gray-200">{artist || "李志"}</p>
          <p className="w-full text-center truncate album mt-1">{album || "未知"}</p>
        </div>
      </a>
      <div className="info absolute inset-x-0 text-center mt-1">
        {
          isPlaying ? (
            <p className='text-green-600'>正在收听🎵</p>
          ) : (
            songUrl ? (
              <p className='text-green-400'>休息中🙉</p>
            ) : (
              <p className='text-gray-400'>不在线🙈</p>
            )
          )
        }
      </div>
    </>
  )
}