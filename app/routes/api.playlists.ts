import { ActionFunctionArgs, json } from '@remix-run/node';
import { createPlaylist, getAllPlaylists } from '~/storage.server/playlist-storage';

export async function loader() {
  const playlists = await getAllPlaylists();
  return json(playlists, 200);
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    throw new Error(`Method ${request.method} not supported`);
  }

  const payload = await request.json();
  const title = payload.title;

  if (typeof title !== 'string' || !title) {
    throw new Error('Missing data: title');
  }

  const playlist = await createPlaylist(title);
  return json(playlist, 200);
}
