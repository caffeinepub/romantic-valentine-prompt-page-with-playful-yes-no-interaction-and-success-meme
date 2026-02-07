import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEvasiveButton } from '@/hooks/useEvasiveButton';

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const { position, containerRef, handlePointerEnter, handlePointerDown } = useEvasiveButton();

  const handleYesClick = () => {
    setAccepted(true);
  };

  if (accepted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 p-4">
        <div className="text-center space-y-8 animate-in fade-in duration-700">
          <div className="space-y-4">
            <Heart className="w-16 h-16 mx-auto text-rose-500 fill-rose-500 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-rose-600">
              She said yes
            </h1>
          </div>
          <div className="max-w-2xl mx-auto">
            <img
              src="/assets/generated/valentine-good-choice-meme.dim_1200x1200.png"
              alt="Good choice meme"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-10 left-10 w-8 h-8 text-pink-200 fill-pink-200 opacity-40" />
        <Heart className="absolute top-20 right-20 w-6 h-6 text-rose-200 fill-rose-200 opacity-30" />
        <Heart className="absolute bottom-20 left-20 w-10 h-10 text-pink-300 fill-pink-300 opacity-20" />
        <Heart className="absolute bottom-32 right-32 w-7 h-7 text-rose-300 fill-rose-300 opacity-25" />
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-2xl mx-auto text-center space-y-12 animate-in fade-in zoom-in duration-500"
      >
        <div className="space-y-6">
          <Heart className="w-20 h-20 mx-auto text-rose-500 fill-rose-500 animate-pulse" />
          <h1 className="text-5xl md:text-6xl font-bold text-rose-600 leading-tight">
            Will You Be My Valentine?
          </h1>
          <p className="text-xl md:text-2xl text-rose-400 font-medium">
            I promise to make every day special ❤️
          </p>
        </div>

        <div className="relative min-h-[120px] flex items-center justify-center">
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <Button
              onClick={handleYesClick}
              size="lg"
              className="text-xl px-12 py-8 bg-rose-500 hover:bg-rose-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 rounded-full font-bold"
            >
              Yes! 💕
            </Button>

            <Button
              onPointerEnter={handlePointerEnter}
              onPointerDown={handlePointerDown}
              onTouchStart={handlePointerDown}
              size="lg"
              variant="outline"
              className="text-xl px-12 py-8 border-2 border-gray-300 text-gray-500 hover:bg-gray-50 shadow-lg rounded-full font-bold transition-none touch-none select-none"
              style={{
                position: position ? 'fixed' : 'relative',
                left: position ? `${position.x}px` : 'auto',
                top: position ? `${position.y}px` : 'auto',
                transform: position ? 'translate(-50%, -50%)' : 'none',
                zIndex: position ? 50 : 'auto',
              }}
            >
              No
            </Button>
          </div>
        </div>

        <div className="pt-8">
          <p className="text-sm text-rose-300 italic">
            Choose wisely... 😉
          </p>
        </div>
      </div>

      <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-rose-300">
        © 2026. Built with <Heart className="inline w-4 h-4 fill-rose-400 text-rose-400" /> using{' '}
        <a
          href="https://caffeine.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-rose-400 transition-colors"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
