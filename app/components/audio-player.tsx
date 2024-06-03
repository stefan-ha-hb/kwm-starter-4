import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import VolumeButton from './volume-button';
import Audio from './audio';

export function AudioPlayer() {
  const showPlayer = false;
  const isCurrentlyPlaying = false;
  const audioSrc = null;

  const handlePlayClick = () => {
    console.log('clicked play button');
  };

  return (
    <>
      <section className={`audio-player ${showPlayer ? 'is-shown' : ''}`}>
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
              {/* TODO add artist & track title from api */}
              <div className="text-sm text-muted-foreground">Artist placeholder</div>
              <div>Track placeholder</div>
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
      {audioSrc ? <Audio isPlaying={isCurrentlyPlaying} src={audioSrc} onPlaybackEnded={() => console.log('track ended')}></Audio> : null}
    </>
  );
}

export default AudioPlayer;
