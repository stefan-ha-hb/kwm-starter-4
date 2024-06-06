import { VolumeX, Volume2 } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';

export default function VolumeButton() {
  const [isMute, setIsMute] = useLocalStorage('volume', false, {initializeWithValue: false})

  return <button className="icon-button" onClick={() => setIsMute(!isMute)}>{isMute ? <VolumeX /> : <Volume2 />}</button>;
}
