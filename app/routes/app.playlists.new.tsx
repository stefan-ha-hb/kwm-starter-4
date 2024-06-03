import { ClientActionFunctionArgs, redirect, useNavigate } from '@remix-run/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SyntheticEvent } from 'react';
import { createPlaylist, playlistQueryOptions } from '~/apis/playlist-api';

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get('title');

  if (!title || typeof title !== 'string') {
    throw new Error('missing title');
  }

  await createPlaylist(title);

  return redirect('/app/playlists');
}

export default function CreatePlaylistPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (title: string) => createPlaylist(title),
    onSuccess: () => {
      queryClient.invalidateQueries(playlistQueryOptions);
      navigate('/app/playlists');
    },
  });

  const isSubmitting = mutation.isPending;

  const onSubmitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get('title');

    if (typeof title !== 'string') {
      throw Error('missing title');
    }

    mutation.mutate(title);
  };

  return (
    <div className="max-w-md">
      <h1 className="mb-6">Create a new playlist</h1>

      <form onSubmit={onSubmitHandler} className="flex gap-4 flex-col" method="post">
        <label className="flex gap-3 items-baseline">
          <div className="w-40">Playlist title:</div>

          <div className="flex-auto">
            <input aria-label="Playlist" name="title" type="text" required />
          </div>
        </label>

        <button className="ml-auto" type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
}
