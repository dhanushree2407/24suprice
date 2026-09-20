import { useEffect, useRef, useState } from 'react';
import {
  Heart,
  Gift,
  Sparkles,
  Star,
  Mail,
  ChevronDown,
  Cake,
  Flower2,
  Music,
  Smile,
  ArrowDown,
  ImagePlus,
} from 'lucide-react';

type FloatingItem = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
};

type PetalItem = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
};

type ConfettiItem = {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
};

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${visible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

type UploadedPhoto = {
  id: number;
  url: string;
  name: string;
  rotate: string;
};



const loveMessages = [
  {
    icon: Heart,
    title: 'You Are My Everything',
    text: 'From the moment I met you, my life changed in the most beautiful way. You bring color to my gray days and laughter to my quiet moments. I cannot imagine this world without you in it.',
  },
  {
    icon: Sparkles,
    title: 'My Shining Star',
    text: 'You light up every room you walk into. Your kindness, your smile, your gentle heart — they inspire me to be better every single day. You are my personal ray of sunshine.',
  },
  {
    icon: Cake,
    title: 'Celebrating You',
    text: 'Today is all about you, Anna. Not because it has to be, but because you deserve to be celebrated every single day. This little surprise is my way of saying thank you for being you.',
  },
  {
    icon: Flower2,
    title: 'Growing Together',
    text: 'Like a garden that blooms with care, our love grows stronger with each passing day. I cherish every memory we create and every new chapter we write together.',
  },
];

const reasons = [
  'The way you smile when you are happy',
  'How you always know what to say',
  'Your kindness to everyone you meet',
  'The little things you do that show you care',
  'Your laugh — my favorite sound in the world',
  'How safe I feel when I am with you',
  'Your strength and your gentle heart',
  'Every dream we share for the future',
];

function App() {
  const [floatingItems, setFloatingItems] = useState<FloatingItem[]>([]);
  const [petals, setPetals] = useState<PetalItem[]>([]);
  const [confetti, setConfetti] = useState<ConfettiItem[]>([]);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showSurprise, setShowSurprise] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const surpriseRef = useRef<HTMLDivElement>(null);

  const rotateClasses = ['-rotate-3', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1', 'rotate-3'];

  // Preload photos from public/ so the "Choose Photos" gallery contains them by default.
  useEffect(() => {
    const preloadedNames = ['Achu 2.jpeg', 'Achu 3.jpeg', 'Achu.jpeg'];
    const newPhotos = preloadedNames.map((name, i) => ({
      id: Date.now() + i,
      url: encodeURI(`/${name}`),
      name,
      rotate: rotateClasses[i % rotateClasses.length],
    }));
    setUploadedPhotos((prev) => (prev.length ? prev : newPhotos));
  }, []);

  // photo upload removed

  

  const fullText = 'Dear Anna, you are the best thing that ever happened to me.';

  useEffect(() => {
    const emojis = ['❤️', '💕', '🌹', '✨', '💖', '🌸'];
    const items: FloatingItem[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 16 + Math.random() * 20,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setFloatingItems(items);

    const petalItems: PetalItem[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 16,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 10,
    }));
    setPetals(petalItems);
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const triggerConfetti = () => {
    const colors = ['#e63946', '#ff8fa3', '#e9c46a', '#2a9d8f', '#ffd6e0', '#f4a261'];
    const items: ConfettiItem[] = Array.from({ length: 80 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 3,
      size: 8 + Math.random() * 8,
    }));
    setConfetti(items);
    setTimeout(() => setConfetti([]), 6000);
  };

  const handleSurprise = () => {
    setShowSurprise(true);
    triggerConfetti();
    setTimeout(() => {
      surpriseRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#fff5f6] font-body relative overflow-hidden">
      {/* Floating hearts background */}
      {floatingItems.map((item) => (
        <div
          key={item.id}
          className="floating-heart"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Falling petals */}
      {petals.map((item) => (
        <div
          key={item.id}
          className="petal"
          style={{
            left: `${item.left}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="#ff8fa3" width="100%" height="100%">
            <path d="M12 2C8 6 4 8 4 14c0 4 4 8 8 8s8-4 8-8c0-6-4-8-8-12z" opacity="0.6" />
          </svg>
        </div>
      ))}

      {/* Confetti */}
      {confetti.map((item) => (
        <div
          key={item.id}
          className="confetti"
          style={{
            left: `${item.left}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            backgroundColor: item.color,
            borderRadius: '2px',
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        />
      ))}

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ffd6e0] via-[#fff5f6] to-[#fff5f6] -z-10" />

        {/* Decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#ff8fa3] opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#e9c46a] opacity-20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-[#e63946] opacity-10 rounded-full blur-2xl" />

        <div className="text-center max-w-3xl mx-auto">
          {/* Sparkle decorations */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="text-[#e9c46a] sparkle" size={24} style={{ animationDelay: '0s' }} />
            <span className="font-poppins text-sm tracking-[0.3em] uppercase text-[#c1121f] font-medium">
              A Special Surprise
            </span>
            <Sparkles className="text-[#e9c46a] sparkle" size={24} style={{ animationDelay: '1s' }} />
          </div>

          <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#c1121f] mb-4 leading-tight">
            For My <span className="shimmer-text">Anna</span>
          </h1>

          <p className="font-script text-3xl sm:text-4xl text-[#e63946] mb-8 gentle-bounce">
            with all my heart
          </p>

          {/* Typed message */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl px-6 py-5 mb-8 max-w-xl mx-auto shadow-lg border border-[#ff8fa3]/30">
            <p className="font-body text-lg sm:text-xl text-[#444] leading-relaxed">
              {typedText}
              <span className="cursor-blink text-[#e63946]">|</span>
            </p>
          </div>

          {/* Heart icon */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Heart className="text-[#e63946] pulse-heart" size={64} fill="#e63946" />
              <Sparkles className="absolute -top-2 -right-2 text-[#e9c46a] sparkle" size={20} style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={() => document.getElementById('message-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-[#c1121f] hover:text-[#e63946] transition-colors group"
          >
            <span className="font-poppins text-sm tracking-widest uppercase">Scroll to explore</span>
            <ChevronDown className="animate-bounce group-hover:scale-125 transition-transform" size={28} />
          </button>
        </div>
      </section>

      {/* Love Messages Section */}
      <section id="message-section" className="relative py-24 px-4 z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-[#ff8fa3]" />
                <Flower2 className="text-[#e63946]" size={28} />
                <div className="h-px w-12 bg-[#ff8fa3]" />
              </div>
              <h2 className="font-script text-5xl sm:text-6xl text-[#c1121f] mb-3">
                Words From My Heart
              </h2>
              <p className="font-poppins text-[#666] text-base sm:text-lg max-w-2xl mx-auto">
                Some things are too big for just one word, so here are a few I want you to always remember
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loveMessages.map((msg, i) => {
              const Icon = msg.icon;
              return (
                <ScrollReveal key={i} delay={i * 150}>
                  <div className="gradient-border h-full">
                    <div className="bg-white rounded-[1.4rem] p-8 h-full">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ffd6e0] to-[#ff8fa3] flex items-center justify-center shadow-md">
                          <Icon className="text-[#c1121f]" size={28} />
                        </div>
                        <div>
                          <h3 className="font-script text-3xl text-[#c1121f] mb-2">
                            {msg.title}
                          </h3>
                          <p className="font-body text-[#555] leading-relaxed text-base">
                            {msg.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="relative py-24 px-4 z-10 bg-gradient-to-b from-[#fff5f6] to-[#ffeef2]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-[#e9c46a]" />
                <Star className="text-[#e9c46a]" size={28} fill="#e9c46a" />
                <div className="h-px w-12 bg-[#e9c46a]" />
              </div>
              <h2 className="font-script text-5xl sm:text-6xl text-[#c1121f] mb-3">
                Beautiful Moments
              </h2>
              <p className="font-poppins text-[#666] text-base sm:text-lg">
                Every picture tells a story — and ours is my favorite
              </p>
            </div>
          </ScrollReveal>

          {/* Upload Section removed: upload UI and handlers eliminated */}

          {/* Uploaded photos in gallery */}
          {uploadedPhotos.length > 0 && (
            <div className="mb-8">
              <ScrollReveal>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="h-px w-12 bg-[#ff8fa3]" />
                  <ImagePlus className="text-[#e63946]" size={24} />
                  <span className="font-script text-2xl text-[#c1121f]">Our Memories</span>
                  <ImagePlus className="text-[#e63946]" size={24} />
                  <div className="h-px w-12 bg-[#ff8fa3]" />
                </div>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {uploadedPhotos.map((photo, i) => (
                  <ScrollReveal key={photo.id} delay={i * 100}>
                    <div className={`photo-card ${photo.rotate} bg-white p-3 pb-6 shadow-xl rounded-2xl`}>
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={photo.url}
                          alt={photo.name}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#e63946]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="font-script text-xl text-[#c1121f] text-center mt-4 px-2">
                        A moment I will always cherish
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}


        </div>
      </section>

      {/* Reasons I Love You Section */}
      <section className="relative py-24 px-4 z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-[#ff8fa3]" />
                <Smile className="text-[#e63946]" size={28} />
                <div className="h-px w-12 bg-[#ff8fa3]" />
              </div>
              <h2 className="font-script text-5xl sm:text-6xl text-[#c1121f] mb-3">
                Reasons I Love You
              </h2>
              <p className="font-poppins text-[#666] text-base sm:text-lg">
                I could list a thousand, but here are a few to start
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {reasons.map((reason, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-md hover:shadow-xl transition-shadow border-l-4 border-[#ff8fa3]">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#ffd6e0] to-[#ff8fa3] flex items-center justify-center font-poppins font-bold text-[#c1121f]">
                    {i + 1}
                  </div>
                  <p className="font-body text-[#444] text-lg">{reason}</p>
                  <Heart className="ml-auto text-[#ff8fa3] flex-shrink-0" size={20} fill="#ff8fa3" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded surprise page removed (restored original flow) */}

      {/* Flip Card Surprise Section */}
      <section className="relative py-24 px-4 z-10">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-[#ff8fa3]" />
                <Gift className="text-[#e63946] wiggle" size={32} />
                <div className="h-px w-12 bg-[#ff8fa3]" />
              </div>
              <h2 className="font-script text-5xl sm:text-6xl text-[#c1121f] mb-3">
                A Gift For You
              </h2>
              <p className="font-poppins text-[#666] text-base sm:text-lg mb-8">
                Tap the card below to reveal your surprise message
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div
              className={`reveal-card ${cardFlipped ? 'flipped' : ''} mx-auto cursor-pointer`}
              style={{ width: '320px', height: '420px' }}
              onClick={() => setCardFlipped(!cardFlipped)}
            >
              <div className="reveal-card-inner">
                {/* Front */}
                <div className="reveal-card-front bg-gradient-to-br from-[#e63946] via-[#c1121f] to-[#e63946] flex flex-col items-center justify-center p-8 shadow-2xl glow">
                  <Gift className="text-white gentle-bounce mb-6" size={80} />
                  <p className="font-script text-4xl text-white mb-2">Tap to Open</p>
                  <p className="font-poppins text-white/80 text-sm tracking-wider uppercase">
                    Your surprise awaits
                  </p>
                  <Sparkles className="text-[#e9c46a] sparkle mt-4" size={28} style={{ animationDelay: '0.5s' }} />
                </div>
                {/* Back */}
                <div className="reveal-card-back bg-gradient-to-br from-[#ffd6e0] via-white to-[#ffd6e0] flex flex-col items-center justify-center p-8 shadow-2xl border-4 border-[#ff8fa3]">
                  <Heart className="text-[#e63946] pulse-heart mb-4" size={48} fill="#e63946" />
                  <p className="font-script text-3xl text-[#c1121f] text-center leading-snug mb-4">
                    You are my today and all of my tomorrows
                  </p>
                  <p className="font-body text-[#666] text-center text-base leading-relaxed">
                    Thank you for being the most amazing person I know. This gift is just a small token of how much you mean to me. I love you, Anna.
                  </p>
                  <div className="flex items-center gap-2 mt-6">
                    <Star className="text-[#e9c46a]" size={16} fill="#e9c46a" />
                    <Star className="text-[#e9c46a]" size={20} fill="#e9c46a" />
                    <Star className="text-[#e9c46a]" size={16} fill="#e9c46a" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Big Surprise Button Section */}
      <section className="relative py-24 px-4 z-10 bg-gradient-to-b from-[#fff5f6] to-[#ffd6e0]/50">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-[#e9c46a]" />
              <Music className="text-[#e9c46a]" size={32} />
              <div className="h-px w-16 bg-[#e9c46a]" />
            </div>
            <h2 className="font-script text-5xl sm:text-6xl text-[#c1121f] mb-4">
              One More Thing...
            </h2>
            <p className="font-poppins text-[#666] text-lg mb-10">
              I have one last surprise for you. Are you ready?
            </p>
            <button
              onClick={handleSurprise}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#e63946] to-[#c1121f] text-white font-poppins text-lg font-medium rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Gift className="group-hover:rotate-12 transition-transform" size={24} />
              <span>Reveal My Final Surprise</span>
              <Sparkles className="text-[#e9c46a] group-hover:scale-125 transition-transform" size={24} />
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* Final Surprise Section */}
      {showSurprise && (
        <section ref={surpriseRef} className="relative py-24 px-4 z-10 scale-in">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-[#ff8fa3] relative overflow-hidden">
              {/* Decorative corners */}
              <div className="absolute top-4 left-4">
                <Flower2 className="text-[#ff8fa3] opacity-50" size={32} />
              </div>
              <div className="absolute top-4 right-4">
                <Flower2 className="text-[#ff8fa3] opacity-50" size={32} />
              </div>
              <div className="absolute bottom-4 left-4">
                <Flower2 className="text-[#ff8fa3] opacity-50" size={32} />
              </div>
              <div className="absolute bottom-4 right-4">
                <Flower2 className="text-[#ff8fa3] opacity-50" size={32} />
              </div>

              <div className="flex items-center justify-center gap-3 mb-6">
                <Heart className="text-[#e63946] pulse-heart" size={36} fill="#e63946" />
              </div>

              <h2 className="font-script text-5xl sm:text-6xl text-[#c1121f] mb-6">
                My Promise to You
              </h2>

              <p className="font-body text-[#555] text-lg sm:text-xl leading-relaxed mb-6">
                Anna, you are the most precious person in my life. I promise to stand by you
                through every storm and celebrate with you in every sunshine. I promise to
                love you more each day, to make you smile when you are sad, and to hold you
                close when the world feels too big.
              </p>

              <p className="font-script text-3xl text-[#e63946] mb-8">
                You are my forever and always.
              </p>

              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-20 bg-[#ff8fa3]" />
                <div className="flex items-center gap-2">
                  <Star className="text-[#e9c46a]" size={20} fill="#e9c46a" />
                  <Star className="text-[#e9c46a]" size={24} fill="#e9c46a" />
                  <Star className="text-[#e9c46a]" size={20} fill="#e9c46a" />
                </div>
                <div className="h-px w-20 bg-[#ff8fa3]" />
              </div>

              <p className="font-script text-4xl text-[#c1121f]">
                Forever yours
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative py-12 px-4 z-10 bg-[#c1121f]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="text-[#ffd6e0]" size={24} fill="#ffd6e0" />
            <span className="font-script text-3xl text-white">Made with love for Anna</span>
            <Heart className="text-[#ffd6e0]" size={24} fill="#ffd6e0" />
          </div>
          <p className="font-poppins text-[#ffd6e0]/70 text-sm tracking-wider">
            Every beat of my heart says your name
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Mail className="text-[#ffd6e0]/60" size={16} />
            <span className="font-poppins text-[#ffd6e0]/60 text-xs">
              A gift from the heart
            </span>
          </div>
        </div>
      </footer>

      {/* Floating scroll-to-top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-20 w-12 h-12 rounded-full bg-[#e63946] hover:bg-[#c1121f] shadow-lg flex items-center justify-center transition-all hover:scale-110 group"
        aria-label="Scroll to top"
      >
        <ArrowDown className="text-white rotate-180 group-hover:-translate-y-1 transition-transform" size={22} />
      </button>
    </div>
  );
}

export default App;
