import { VolumeX, Volume2 } from 'lucide-react';

export default function VolumeButton() {
  const isMute = false;

  return <button className="icon-button">{isMute ? <VolumeX /> : <Volume2 />}</button>;
}
