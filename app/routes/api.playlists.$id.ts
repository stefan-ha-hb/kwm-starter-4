import { json } from '@remix-run/react';
import { getAllPlaylists } from '~/storage.server/playlist-storage';

export async function loader() {
    const playlists = await getAllPlaylists();
    return json(playlists, 200);
}
