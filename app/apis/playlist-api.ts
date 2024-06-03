import { queryOptions } from '@tanstack/react-query';
import { Playlist } from '~/models/playlist';

export async function fetchPlaylists() {
  const response = await fetch('/api/playlists');
  const playlists: Playlist[] = await response.json();

  return playlists;
}

export async function createPlaylist(title: string) {
  const response = await fetch('/api/playlists', {
    method: 'POST',
    body: JSON.stringify({ title: title }),
  });
  const newPlaylist: Playlist = await response.json();

  return newPlaylist;
}

export const playlistQueryOptions = queryOptions({
  queryKey: ['playlists'],
  queryFn: () => fetchPlaylists(),
});
