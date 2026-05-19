import { useState, useEffect, useCallback } from 'react';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: 'Networks are built not only with cables, but with understanding.',
    author: 'TJKT Wisdom',
  },
  {
    text: 'Every configuration is a step toward real infrastructure.',
    author: 'Network Philosophy',
  },
  {
    text: 'Technology rewards those who keep learning.',
    author: 'Digital Age',
  },
  {
    text: 'Strong engineers are shaped through practice and troubleshooting.',
    author: 'Engineering Mindset',
  },
  {
    text: 'Learning networking means learning how the digital world connects.',
    author: 'Internet Era',
  },
];

export default function Quotes() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextQuote = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
      setIsAnimating(false);
    }, 500);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextQuote, 6000);
    return () => clearInterval(timer);
  }, [nextQuote]);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Inspirational Quotes
          </span>
        </div>

        {/* Quote card */}
        <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 sm:p-12">
          {/* Large quote icon */}
          <Quote className="absolute top-6 left-6 w-12 h-12 text-[#e6ff00]/20" />

          <div className="text-center">
            <div
              className={`transition-all duration-500 ${
                isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-foreground leading-relaxed mb-6">
                &ldquo;{quotes[current].text}&rdquo;
              </blockquote>
              <cite className="text-sm text-muted-foreground not-italic font-mono">
                — {quotes[current].author}
              </cite>
            </div>
          </div>

          {/* Progress indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i !== current) {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrent(i);
                      setIsAnimating(false);
                    }, 500);
                  }
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 bg-[#e6ff00]' : 'w-1.5 bg-border hover:bg-muted-foreground/50'
                }`}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
