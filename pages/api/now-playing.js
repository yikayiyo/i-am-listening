import { getNowPlaying } from '../../lib/spotify'

export default async function handler(req, res) {
  const response = await getNowPlaying()
  console.log('res:', response)
  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false })
  }
  const data = await response.json()
  if (data.item === null) {
    return res.status(200).json({ isPlaying: false })
  }

  let isPlaying = false
  let title = ''
  let artist = ''
  let belongTo = ''
  let imageUrl = ''
  let itemUrl = ''
  // data type
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  )
  if (data.currently_playing_type === 'episode') {
    isPlaying = data.is_playing
    title = data.item.name
    artist = data.item.show.publisher
    belongTo = data.item.show.name
    imageUrl = data.item.images[0].url
    itemUrl = data.item.external_urls.spotify
  } else {
    isPlaying = data.is_playing
    title = data.item.name
    artist = data.item.artists.map((_artist) => _artist.name).join(', ')
    belongTo = data.item.album.name
    imageUrl = data.item.album.images[0].url
    itemUrl = data.item.external_urls.spotify
  }
  return res.status(200).json({
    album: belongTo,
    albumImageUrl: imageUrl,
    artist,
    isPlaying,
    songUrl: itemUrl,
    title
  })
}
