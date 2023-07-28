export default function TopTracks({ tracks }) {
  let tracksEl
  if (tracks && tracks?.data?.tracks) {
    tracksEl = tracks.data.tracks.map((track) => {
      return (
        <div
          key={track.id}
          className='flex justify-between items-center py-2 border-b border-b-zinc-900 cursor-pointer'
          data-link={track.link}
          onClick={() => {
            window.open(track.link, '_blank')
          }}
        >
          <span className='text-base max-w-[80%]'>{track.name}</span>
          <span className='text-base flex-shrink-0'>{track.artist}</span>
        </div>
      )
    })
  } else {
    tracksEl = '暂无数据'
  }
  return (
    <section className='top-tracks relative md:w-[400px] lg:overflow-auto m-5 mt-10 md:mb-32 lg:mb-0 rounded sm:mx-auto text-white text-xl backdrop-blur bg-black/80'>
      <h2 className='pl-10 py-5 pr-6 sticky top-0 backdrop-blur bg-black/90'>
        最近在听
      </h2>
      <div className='tracks-wrapper scroll-smooth p-4 lg:px-10 lg:pr-6 lg:max-h-[60vh]'>
        {tracksEl}
      </div>
    </section>
  )
}
