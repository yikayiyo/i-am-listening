import Image from 'next/image'

export default function NowPlaying({
  isPlaying,
  album,
  albumImageUrl,
  artist,
  songUrl,
  title
}) {
  return (
    <>
      <a className="wrapper py-10 text-white block" href={songUrl || "#"}>
        <div className="record-bottom w-60 h-60 bg-black mx-auto flex justify-center items-center rounded-full">
          <div className="song-image-wrapper w-40 h-40 bg-gray-200 rounded-full overflow-hidden">
            <Image
              alt={title || "朋友越多越快乐"}
              src={albumImageUrl || "/songIMG.webp"}
              width={160}
              height={160}
              className={isPlaying ? "animate-record-effect" : ""}
            />
          </div>
        </div>
        <div className="song-info flex flex-col mt-5">
          <h1 className="w-full text-center truncate title text-lg font-medium">{title || "朋友越多越快乐"}</h1>
          <p className="w-full text-center truncate author mt-1 text-gray-400">{artist || "李志"}</p>
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