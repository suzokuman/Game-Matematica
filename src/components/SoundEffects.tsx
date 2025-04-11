
import { useRef } from "react";

interface SoundEffectsProps {
  correctSoundUrl?: string;
  wrongSoundUrl?: string;
}

export const useSoundEffects = () => {
  const correctRef = useRef<HTMLAudioElement | null>(null);
  const wrongRef = useRef<HTMLAudioElement | null>(null);

  const playCorrect = () => {
    if (correctRef.current) {
      correctRef.current.currentTime = 0;
      correctRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  };

  const playWrong = () => {
    if (wrongRef.current) {
      wrongRef.current.currentTime = 0;
      wrongRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  };

  return { playCorrect, playWrong, correctRef, wrongRef };
};

const SoundEffects: React.FC<SoundEffectsProps> = ({ 
  correctSoundUrl = "caminho/para/som_correto.mp3", 
  wrongSoundUrl = "caminho/para/som_errado.mp3" 
}) => {
  const { correctRef, wrongRef } = useSoundEffects();

  return (
    <div className="hidden">
      <audio ref={correctRef} src={correctSoundUrl} preload="auto"></audio>
      <audio ref={wrongRef} src={wrongSoundUrl} preload="auto"></audio>
    </div>
  );
};

export default SoundEffects;
