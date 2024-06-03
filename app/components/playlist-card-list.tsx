import { Playlist } from '~/models/playlist';
import { PlaylistCard } from './playlist-card';

type PlaylistCardListProps = { playlists: Playlist[] };

export function PlaylistCardList({ playlists }: PlaylistCardListProps) {
  return (
    <ul className="card-list">
      {playlists.map((playlist) => (
        <li key={playlist.id}>
          <PlaylistCard playlist={playlist}></PlaylistCard>
        </li>
      ))}
    </ul>
  );
}
