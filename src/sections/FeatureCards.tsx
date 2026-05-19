import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '@/hooks/useLanguage';
import { Network, Terminal, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export default function FeatureCards() {
  const { t } = useLanguage();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    
    cards.forEach((card) => {
      const inner = card.querySelector('.tilt-card-inner') as HTMLElement;
      if (!inner) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(inner, {
          rotationX: rotateX,
          rotationY: rotateY,
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.out',
        });

        gsap.to(card, {
          '--mx': `${x}px`,
          '--my': `${y}px`,
          duration: 0.4,
        } as any);
      };

      const handleMouseLeave = () => {
        gsap.to(inner, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });

        gsap.to(card, {
          '--mx': '50%',
          '--my': '50%',
          duration: 0.4,
        } as any);
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
  }, []);

  const features = [
    {
      title: t('interactiveTopology'),
      description: t('topologyDesc'),
      image: '/images/feature-topology.jpg',
      icon: Network,
      link: '/topology',
      color: 'from-blue-500/20 to-cyan-500/10',
    },
    {
      title: t('cliGeneratorTitle'),
      description: t('cliGeneratorDesc'),
      image: '/images/feature-cli.jpg',
      icon: Terminal,
      link: '/cli-generator',
      color: 'from-green-500/20 to-emerald-500/10',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            03 / Fitur Unggulan
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-4">
            Fitur Interaktif
          </h2>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="tilt-card rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                background: 'rgba(230, 255, 0, 0.03)',
              } as React.CSSProperties}
            >
              {/* Spotlight effect */}
              <div
                className="absolute inset-0 pointer-events-none z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.08), transparent 60%)',
                }}
              />
              
              {/* Border */}
              <div className="tilt-card-border rounded-2xl" />

              <div className="tilt-card-inner">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color}`} />
                  
                  {/* Icon overlay */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-background/80 backdrop-blur flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {feature.description}
                  </p>
                  <Link
                    to={feature.link}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#e6ff00] hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {t('tryFeature')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
