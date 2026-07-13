import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CONFIG, EMOJIS } from './config';
import Candle from './components/Candle';
import candleImg1 from './assets/candleimg1.jpg';
import candleImg2 from './assets/candleImg2.jpg';
import lockImg1 from './assets/lockImg1.jpg';
import noteImage from './assets/notesimgs.jpg';

export default function App() {
  const [page, setPage] = useState('gate');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [typedNote, setTypedNote] = useState('');
  const audioRef = useRef(null);

  const petals = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: EMOJIS[i % EMOJIS.length],
    left: `${(i * 7 + 3) % 100}%`,
    size: 14 + (i % 4) * 6,
    duration: 6 + (i % 5) * 2,
    delay: -(i * 0.8),
  }));

  useEffect(() => {
    document.title = CONFIG.PAGE_TITLE;
    audioRef.current = new Audio(CONFIG.MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.preload = 'auto';
    audioRef.current.play().then(() => {
      setMusicPlaying(true);
    }).catch(() => {
      setMusicPlaying(false);
    });

    const startOnFirstInteraction = () => {
      if (!audioRef.current) {
        return;
      }

      audioRef.current.play().then(() => {
        setMusicPlaying(true);
      }).catch(() => {});
    };

    window.addEventListener('pointerdown', startOnFirstInteraction, { once: true });
    window.addEventListener('keydown', startOnFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', startOnFirstInteraction);
      window.removeEventListener('keydown', startOnFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (page !== 'note') {
      setTypedNote('');
      return undefined;
    }

    const fullText = CONFIG.LOVE_NOTE_TEXT;
    let index = 0;
    setTypedNote('');

    const timer = setInterval(() => {
      index += 1;
      setTypedNote(fullText.slice(0, index));

      if (index >= fullText.length) {
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [page]);

  const handleMusicToggle = () => {
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicPlaying(!musicPlaying);
  };

  const handlePinChange = (value) => {
    const clean = value.replace(/\D/g, '').slice(0, 6);
    setPin(clean);
    setPinError(false);
    if (clean === CONFIG.PASSWORD) {
      triggerUnlock();
    }
  };

  const triggerUnlock = () => {
    setTimeout(() => {
      setPage('celebration');
      audioRef.current.play().catch(() => {});
      setMusicPlaying(true);
      triggerConfetti();
    }, 400);
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="select-none text-white">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal select-none"
          style={{
            left: petal.left,
            fontSize: petal.size,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          {petal.emoji}
        </span>
      ))}

      <AnimatePresence mode="wait">
        {page === 'gate' && (
          <motion.div
            key="gate"
            className="fixed inset-0 bg-romantic-gate flex items-center justify-center p-4"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card rounded-3xl p-8 w-full max-w-md text-center relative z-10">
              <div className="flex justify-center mb-6">
                <div className="glow-pulse relative h-24 w-24 overflow-hidden rounded-full border-4 border-white/20 bg-gradient-to-br from-rose-500 to-rose-700 shadow-[0_0_30px_rgba(244,63,94,0.45)]">
                  <img src={lockImg1} alt="Birthday card illustration" className="h-full w-full object-cover" />
                </div>
              </div>
              <h1 className="font-display text-white text-3xl font-semibold mb-2">A Special Surprise Awaits ❤️</h1>
              <p className="text-white/60 mb-6 text-sm">Enter the Secret Birthday Code</p>

              <div className="relative mb-4">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={pin}
                  onChange={(event) => handlePinChange(event.target.value)}
                  placeholder="● ● ● ● ● ●"
                  className={`pin-input ${pinError ? 'error' : ''}`}
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {pinError && <p className="text-rose-300 text-sm mb-4">Incorrect Code 🙈 Try again!</p>}
              <button onClick={() => (pin === CONFIG.PASSWORD ? triggerUnlock() : setPinError(true))} className="btn-luxury w-full py-4 rounded-2xl font-bold">
                Unlock Surprise
              </button>
            </div>
          </motion.div>
        )}

        {page === 'celebration' && (
          <motion.div
            key="celebration"
            className="fixed inset-0 bg-romantic-celebration flex flex-col items-center justify-center p-4 text-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-60">
              <div className="absolute left-6 top-16 text-3xl animate-sway">🌸</div>
              <div className="absolute right-12 top-28 text-2xl animate-sway" style={{ animationDelay: '0.6s' }}>💗</div>
              <div className="absolute left-10 bottom-24 text-3xl animate-sway" style={{ animationDelay: '1.2s' }}>🌹</div>
              <div className="absolute right-16 bottom-32 text-2xl animate-sway" style={{ animationDelay: '0.3s' }}>✨</div>
            </div>

            <motion.div initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="relative z-10">
              <h1 className="font-display text-4xl sm:text-6xl font-bold bg-gradient-to-r from-rose-300 via-rose-500 to-amber-300 bg-clip-text text-transparent drop-shadow-md">
                Happy Birthday, {CONFIG.BIRTHDAY_NAME}!
              </h1>
              <p className="mt-3 text-white/65 text-sm sm:text-base tracking-[0.3em] uppercase">A little moment made just for you</p>
            </motion.div>

            <div className="relative w-[96vw] max-w-[980px] my-8 sm:my-10 z-10">
              <div className="flex items-end justify-center gap-3 sm:gap-6">
                <motion.div
                  className="relative h-50 w-40 sm:h-60 sm:w-34 overflow-hidden rounded-[1.6rem] border-2 border-white/35 ring-4 ring-rose-300/15 shadow-[0_18px_40px_rgba(0,0,0,0.28)] -mt-4 sm:-mt-8"
                  animate={{ rotate: -8, y: [0, -10, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <img src={candleImg1} alt="Left birthday decoration" className="h-full w-full object-cover object-center" />
                </motion.div>

                <div className="relative h-[22rem] w-[12rem] sm:h-[26rem] sm:w-[15rem] flex items-center justify-center -mt-1 sm:-mt-2">
                  <Candle candleBlown={candleBlown} />
                </div>

                <motion.div
                  className="relative h-50 w-40 sm:h-60 sm:w-34 overflow-hidden rounded-[1.6rem] border-2 border-white/35 ring-4 ring-rose-300/15 shadow-[0_18px_40px_rgba(0,0,0,0.28)] -mt-4 sm:-mt-8"
                  animate={{ rotate: 8, y: [0, -25, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.12 }}
                >
                  <img src={candleImg2} alt="Right birthday decoration" className="h-full w-full object-cover object-center" />
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md z-10">
              <button
                onClick={() => {
                  setCandleBlown(true);
                  triggerConfetti();
                }}
                className="btn-luxury flex-1 py-4 rounded-2xl font-bold"
              >
                {candleBlown ? 'Wish Made! 💖' : 'Blow Candle 🕯️'}
              </button>
              <button onClick={() => setPage('note')} className="btn-outline flex-1 py-4 rounded-2xl font-bold">
                Open Special Note
              </button>
            </div>
          </motion.div>
        )}

        {page === 'note' && (
          <motion.div
            key="note"
            className="fixed inset-0 bg-romantic-celebration overflow-y-auto p-4 flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <div className="glass-card-dark rounded-3xl p-4 sm:p-6 w-full max-w-6xl my-8 border border-white/10 shadow-2xl">
              <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] items-stretch">
                <div className="relative flex items-center justify-center px-2 py-2 sm:px-4 lg:px-0">
                  <div className="relative w-full max-w-[340px] animate-sway">
                    <div className="absolute inset-0 translate-x-3 translate-y-4 rounded-[2rem] bg-black/35 blur-2xl" />
                    <div className="relative overflow-hidden rounded-[2rem] border border-rose-300/30 bg-[#2a0f1d] p-3 sm:p-4 shadow-[0_28px_80px_rgba(0,0,0,0.5)] rotate-[-2deg]">
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-fuchsia-400/10" />
                      <img
                        src={noteImage}
                        alt="Birthday collage"
                        className="relative block w-full rounded-[1.4rem] border border-white/10 object-cover shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-[2rem] p-6 sm:p-8 lg:p-10 flex flex-col justify-between border border-white/10">
                  <div className="space-y-4 font-display text-lg sm:text-xl leading-relaxed text-white/90">
                    <div className="mb-2 text-center lg:text-left">
                      <div className="text-4xl sm:text-5xl mb-3">🌸</div>
                      <h2 className="text-3xl sm:text-4xl font-semibold text-rose-200">A Special Message</h2>
                      <p className="text-sm sm:text-base text-white/45 mt-1">Just for you 🌸</p>
                    </div>

                    <p className="whitespace-pre-line text-[1.05rem] sm:text-[1.12rem] leading-8 text-white/90 min-h-[14rem]">
                      {typedNote}
                      <span className="inline-block w-[0.6ch] animate-pulse text-rose-200">|</span>
                    </p>
                  </div>

                  <button onClick={() => setPage('celebration')} className="btn-outline w-full py-3 rounded-2xl mt-8 flex items-center justify-center gap-2 font-bold text-base sm:text-lg">
                    <ArrowLeft size={16} /> Back to Celebration
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {page !== 'gate' && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          <button
            onClick={handleMusicToggle}
            className="music-btn flex h-12 items-center gap-2 rounded-full px-4 text-white shadow-[0_10px_30px_rgba(244,63,94,0.35)]"
            aria-label={musicPlaying ? 'Pause song' : 'Play song'}
          >
            {musicPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            <span className="text-sm font-semibold tracking-wide">{musicPlaying ? 'Pause Song' : 'Play Song'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
