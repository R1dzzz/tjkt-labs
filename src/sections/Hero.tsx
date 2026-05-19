import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '@/hooks/useLanguage';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLDivElement>(null);

  // Animated network background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return;

    const canvasEl = ctx.canvas;
    canvasEl.style.position = 'absolute';
    canvasEl.style.top = '0';
    canvasEl.style.left = '0';
    canvasEl.style.width = '100%';
    canvasEl.style.height = '100%';
    canvasEl.style.pointerEvents = 'none';
    canvas.appendChild(canvasEl);

    const resize = () => {
      canvasEl.width = canvas.offsetWidth;
      canvasEl.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Nodes
    const nodeCount = 60;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvasEl.width,
        y: Math.random() * canvasEl.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 1.5 + Math.random() * 2,
      });
    }

    let animationId: number;
    const isDark = document.documentElement.classList.contains('dark');
    const nodeColor = isDark ? 'rgba(230, 255, 0, 0.6)' : 'rgba(33, 33, 33, 0.4)';
    const lineColor = isDark ? 'rgba(230, 255, 0, 0.1)' : 'rgba(33, 33, 33, 0.08)';

    const animate = () => {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

      // Update nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvasEl.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvasEl.height) node.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      canvasEl.remove();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Network canvas background */}
      <div ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,255,0,0.03)_0%,transparent_70%)] z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#e6ff00] animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">
            Future Network Engineers Start Here
          </span>
        </div>

        {/* Main title */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
          {t('heroTitle').split('.').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && '.'}
              {i === 0 && <br className="hidden sm:block" />}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('heroSubtitle')}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/materials">
            <Button
              variant="outline"
              size="lg"
              className="rounded-lg border-foreground/20 hover:bg-accent/10 px-8"
            >
              {t('exploreMaterials')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/topology">
            <Button
              size="lg"
              className="rounded-lg bg-[#e6ff00] text-black hover:bg-[#d4eb00] px-8"
            >
              <Play className="w-4 h-4 mr-2" />
              {t('startLab')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-8 left-8 font-mono text-xs text-muted-foreground hidden lg:block z-10">
        <p>SYS_STATUS: ONLINE</p>
        <p>NODE_04: ACTIVE</p>
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-xs text-muted-foreground hidden lg:block text-right z-10">
        <p>COORDS: 6.2088° S</p>
        <p>106.8456° E</p>
      </div>
    </section>
  );
}
