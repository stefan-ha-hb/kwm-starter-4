import { useRef, useEffect } from 'react';

type AudioProps = {
  src: string;
  isPlaying: boolean;
  volume?: number;
  onPlaybackEnded?: () => void;
};
export default function AudioComponent({ src, isPlaying, volume = 1, onPlaybackEnded = () => {} }: AudioProps) {
  const audioRef = useRef(new Audio(src));

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = src;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [src]);

  useEffect(() => {
    const effect = async () => {
      const audio = audioRef.current;
      if (isPlaying) {
        try {
          await audio.play();
          // eslint-disable-next-line no-empty
        } catch (e) {}
      } else {
        audio.pause();
      }
    };

    effect();
  }, [isPlaying, src]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const handlePlaybackEnd = () => onPlaybackEnded();
    audioRef.current.addEventListener('ended', handlePlaybackEnd);
    () => {
      audioRef.current.removeEventListener('ended', handlePlaybackEnd);
    };
  }, [onPlaybackEnded]);

  return null;
}
