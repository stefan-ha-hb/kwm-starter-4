import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import VolumeButton from './volume-button';
import Audio from './audio';
import { useAppDispatch, useAppSelector } from '~/store.client/store';
import { pauseAction, playAction, stopAction } from '~/store.client/player-reducer';
import { useQuery } from '@tanstack/react-query';
import { fetchTrackById } from '~/apis/track-api';
import { useLocalStorage } from 'usehooks-ts';

export function AudioPlayer() {
  const [isMute] = useLocalStorage('volume', false)
  const currentTrackState = useAppSelector((state) => state.player.trackState);
  const isCurrentlyPlaying = currentTrackState === 'playing';
  const currentTrackId = useAppSelector((state) => state.player.trackId);
  const dispatch = useAppDispatch();

  const onPlaybackEndedHandler = () => {
    dispatch(stopAction())
  }

  const showPlayer = currentTrackState !== 'idle';

  const { data } = useQuery({
    queryKey: ['tracks', currentTrackId],
    queryFn: () => {
      if (currentTrackId) {
        return fetchTrackById(currentTrackId);
      }
      return null;
    },
    enabled: currentTrackId !== null,
  });

  const audioSrc = data?.src;

  const handlePlayClick = () => {
    if (isCurrentlyPlaying) {
      dispatch(pauseAction());
    } else {
      dispatch(playAction({ trackId: currentTrackId }));
    }
  };

  return (
    <>
      <section className={`audio-player ${showPlayer ? 'is-shown' : ''}`}>
        {currentTrackState}
        <div className="mx-auto max-w-4xl w-full">
          <div className="flex gap-8 items-center">
            <div className="flex gap-3">
              <button className="icon-button" disabled type="button" aria-label="Previous" title="Previous">
                <ChevronLeft />
              </button>
              <button className="icon-button" type="button" onClick={handlePlayClick}>
                {isCurrentlyPlaying ? <Pause strokeWidth={1.5} /> : <Play strokeWidth={1.5} />}
              </button>
              <button className="icon-button" disabled type="button" aria-label="next" title="Next">
                <ChevronRight />
              </button>
            </div>

            <div className="flex-none w-52 min-h-11">
              <div className="text-sm text-muted-foreground">{data?.artist}</div>
              <div>{data?.title}</div>
            </div>

            <div className="flex-auto">
              <input aria-label="Track position" type="range" className="w-full my-auto block" defaultValue={0} />
            </div>

            <div className="flex-none">
              <VolumeButton />
            </div>
          </div>
        </div>
      </section>

      {/* Todo */}
      {audioSrc ? <Audio isPlaying={isCurrentlyPlaying} src={audioSrc} onPlaybackEnded={onPlaybackEndedHandler} volume={isMute ? 0: 1}></Audio> : null}
    </>
  );
}

export default AudioPlayer;
