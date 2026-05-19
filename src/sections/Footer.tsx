import { Link } from 'react-router';
import { useLanguage } from '@/hooks/useLanguage';
import { LayoutDashboard, BookOpen, Network, Terminal, FileText, Users } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-xl font-bold text-foreground">
                TJKT LABS
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Platform pembelajaran jaringan komputer modern untuk siswa TJKT.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/materials" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  {t('materials')}
                </Link>
              </li>
              <li>
                <Link to="/topology" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Network className="w-3.5 h-3.5" />
                  {t('topology')}
                </Link>
              </li>
              <li>
                <Link to="/cli-generator" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  {t('cliGenerator')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              {t('resources')}
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  Dokumentasi
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" />
                  Forum Komunitas
                </span>
              </li>
            </ul>
          </div>

          {/* System Status */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              {t('systemStatus')}
            </h4>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">{t('allSystemsActive')}</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            © {currentYear} TJKT Labs. {t('copyright')}
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            XI TJKT 2 · 2026/2027
          </p>
        </div>
      </div>
    </footer>
  );
}
