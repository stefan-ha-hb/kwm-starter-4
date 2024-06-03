import { Link } from '@remix-run/react';
import { useQuery } from '@tanstack/react-query';
import { ListMusic, ListPlus } from 'lucide-react';
import { playlistQueryOptions } from '~/apis/playlist-api';
import LoadingSpinner from './loading-spinner';

export function PlaylistNav() {
  const { data, isSuccess, isLoading } = useQuery(playlistQueryOptions);

  return (
    <div className="space-y-1">
      {isLoading ? <LoadingSpinner className={''}></LoadingSpinner> : null}

      {isSuccess
        ? data?.map((playlist) => (
            <Link key={playlist.id} className="sidebar_link" to={`/app/playlists/${playlist.id}`}>
              <ListMusic />
              {playlist.title}
            </Link>
          ))
        : null}

      <Link className="sidebar_link" to="/app/playlists/new">
        <ListPlus /> Create new playlist
      </Link>
    </div>
  );
}
