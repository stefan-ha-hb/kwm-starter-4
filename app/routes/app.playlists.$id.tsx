import { LoaderFunctionArgs } from '@remix-run/node';
import { getPlaylistById } from '~/storage.server/playlist-storage';
import { useLoaderData } from '@remix-run/react';
import { fetchTracks } from '~/apis/track-api';
import { TrackCardList } from './../components/track-card-list';

export async function loader({ params }: LoaderFunctionArgs) {
  const playlistId = params['id'];

  if (!playlistId) {
    throw Error('404');
  }

  const playlist = await getPlaylistById(playlistId);
  const tracks = await fetchTracks();

  const filteredTracks = playlist?.tracks.map((trackId) => tracks.find((track) => track.id === trackId));

  return { playlist: playlist, playlistTracks: filteredTracks };
}

export default function PlaylistDetail() {
  const data = useLoaderData<typeof loader>();
  const playlist = data.playlist;
  const tracks = data.playlistTracks;

  if (!playlist) {
    return <h1>Oops, we could not find your playlist</h1>;
  }

  return (
    <>
      <h1 className="mb-8">{playlist.title}</h1>
      {tracks?.length ? <TrackCardList tracks={tracks}></TrackCardList> : null}
    </>
  );
}
