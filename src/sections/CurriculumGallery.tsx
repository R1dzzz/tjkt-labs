import { useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const modules = [
  {
    id: 1,
    title: 'networkingBasics',
    image: '/images/module-networking.jpg',
  },
  {
    id: 2,
    title: 'subnetting',
    image: '/images/module-subnetting.jpg',
  },
  {
    id: 3,
    title: 'routerConfig',
    image: '/images/module-router.jpg',
  },
  {
    id: 4,
    title: 'troubleshooting',
    image: '/images/module-troubleshooting.jpg',
  },
];

export default function CurriculumGallery() {
  const { t } = useLanguage();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll('.curriculum-item');
    gsap.set(grid, { perspective: 1000 });

    const triggers: ScrollTrigger[] = [];
    
    items.forEach((item, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(item, {
        rotationX: 70,
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out',
        delay: (index % 4) * 0.1,
      });

      if (tl.scrollTrigger) {
        triggers.push(tl.scrollTrigger);
      }

      // Hover effect
      const img = item.querySelector('img');
      if (img) {
        item.addEventListener('mouseenter', () => {
          gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' });
        });
        item.addEventListener('mouseleave', () => {
          gsap.to(img, { scale: 1.2, duration: 0.5, ease: 'power2.out' });
        });
      }
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left panel - static */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              02 / Kurikulum
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t('curriculumTitle')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('curriculumDesc')}
            </p>
          </div>

          {/* Right panel - grid */}
          <div ref={gridRef} className="lg:col-span-8 curriculum-grid">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="curriculum-item group cursor-pointer"
              >
                <img
                  src={mod.image}
                  alt={t(mod.title as any)}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-display font-semibold text-lg">
                    {t(mod.title as any)}
                  </h3>
                  <p className="text-white/70 text-sm font-mono">
                    Modul {mod.id} / 4
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
