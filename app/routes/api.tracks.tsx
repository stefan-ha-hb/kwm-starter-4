import { fetchTracks } from '~/apis/track-api';

// Is not used anymore
export async function loader() {
  const tracks = await fetchTracks();

  const filteredTracks = tracks.filter((track) => {
    return track.type === 'podcast' || track.type === 'song';
  });

  return {
    tracks: filteredTracks,
  };
}
