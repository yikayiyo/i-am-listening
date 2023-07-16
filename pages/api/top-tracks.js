import { getTopTracks } from '../../lib/spotify';

export default async function handler(req, res) {
  let tracks = [];
  const response = await getTopTracks();
  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ tracks });
  }
  const data = await response.json();
  if (data.items.length === 0) {
    return res.status(200).json({ tracks });
  } else {
    data.items.forEach(item => {
      let track = {
        id: "",
        name: "未知",
        artist: "佚名"
      };
      track.id = item.id;
      track.name = item.name;
      track.artist = item.artists[0].name;
      track.link = "https://open.spotify.com/track/"+item.id || "";
      tracks.push(track);
    })
  }
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );
  return res.status(200).json({
    tracks
  });
}
