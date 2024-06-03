import { Track } from '~/models/track';
import { TrackCard } from './track-card';

type TrackCardListProps = { tracks: Track[] };

export function TrackCardList({ tracks }: TrackCardListProps) {
  return (
    <ul className="card-list">
      {tracks.map((track) => (
        <li key={track.id}>
          <TrackCard track={track}></TrackCard>
        </li>
      ))}
    </ul>
  );
}
