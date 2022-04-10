import Image from 'next/image'

export default function NowPlaying({ isPlaying }) {
  if (!isPlaying) {
    return (
      <p> Not Playing now</p>
    )
  } else {
    return (
      <div className="wrapper pt-10">
        <div className="record-bottom w-60 h-60 bg-black mx-auto flex justify-center items-center rounded-full">
          <div className="song-image-wrapper w-40 h-40 bg-gray-200 rounded-full overflow-hidden">
            <Image
              alt="A song's image"
              src="/songIMG.webp"
              width={160}
              height={160}
              className="animate-record-effect"
            />
          </div>
        </div>
        <div className="song-info flex flex-col items-center mt-5">
          <h1 className="title text-lg font-medium">朋友越多越快乐</h1>
          <p className="author text-gray-500">李志</p>
          <p className="album">忘了什么专辑</p>
        </div>
      </div>

    )
  }
}