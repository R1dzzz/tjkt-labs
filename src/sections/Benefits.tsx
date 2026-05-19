import { useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, FlaskConical, MousePointerClick } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Benefits() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const titleElement = titleRef.current;
    if (!container || !titleElement) return;

    const text = titleElement.textContent || '';
    titleElement.innerHTML = '';

    const chars: (HTMLSpanElement | Text)[] = [];
    text.split('').forEach((char) => {
      if (char === ' ') {
        chars.push(document.createTextNode(' '));
      } else {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        chars.push(span);
      }
    });

    chars.forEach((c) => titleElement.appendChild(c));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(
      chars.filter((c) => c instanceof HTMLSpanElement),
      {
        y: '100%',
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.03,
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const stats = [
    { value: '500+', label: t('studentsCount'), icon: Users },
    { value: '50+', label: t('labsCount'), icon: FlaskConical },
    { value: '100%', label: t('interactiveLabel'), icon: MousePointerClick },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={containerRef} className="mosaic-text-container text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4 block">
            04 / Mengapa Kami
          </span>
          <h2
            ref={titleRef}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
          >
            {t('benefitsTitle')}
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-card/50 border border-border hover:border-[#e6ff00]/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#e6ff00]/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-[#e6ff00]" />
              </div>
              <div className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
