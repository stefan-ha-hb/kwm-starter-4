import { Pause, Play } from 'lucide-react';
import { Track } from '~/models/track';
import { pauseAction, playAction } from '~/store.client/player-reducer';
import { useAppDispatch, useAppSelector } from '~/store.client/store';

type TrackCardInput = {
  track: Track;
};

export function TrackCard({ track }: TrackCardInput) {
  const dispatch = useAppDispatch();
  const currentPlayingTrackId = useAppSelector((state) => {
    return state.player.trackId;
  });
  const trackState = useAppSelector((state) => {
    return state.player.trackState;
  });
  const isPlaying = track.id === currentPlayingTrackId && trackState === 'playing';

  const onPlayButtonClicked = () => {
    if (isPlaying) {
      dispatch(pauseAction());
    } else {
      dispatch(playAction({ trackId: track.id }));
    }
  };

  return (
    <section className="card">
      <div className="card_cover">
        <img alt={'Cover image of ' + track.title} src={track.coverUrl} className="card_cover-img" />
      </div>

      <div className="card_body">
        <div className="flex-none">
          <PlayButton isPlaying={isPlaying} onClick={onPlayButtonClicked}></PlayButton>
        </div>
        <div className="flex-auto">
          <h3 className="card_title">{track.title}</h3>
          <div>{track.artist}</div>
          <div>({track.id})</div>
        </div>
      </div>
    </section>
  );
}

type PlayButtonProps = { isPlaying: boolean; onClick?: () => void };
function PlayButton({ isPlaying = false, onClick }: PlayButtonProps) {
  return (
    <button type="button" className="icon-button" onClick={onClick}>
      {isPlaying ? <Pause strokeWidth={1.5} /> : <Play strokeWidth={1.5} />}
    </button>
  );
}
