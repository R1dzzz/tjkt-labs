import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Sun, Moon, Menu, X, Globe, LogOut, User, LayoutDashboard, Network, Terminal, Calculator, BookOpen, Bot } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useAuthStore } from '@/store/authStore';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme, language, setLanguage } = useAppStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { t } = useLanguage();
  useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { href: '/', label: t('home'), icon: null },
    { href: '/materials', label: t('materials'), icon: BookOpen },
    { href: '/cli-generator', label: t('cliGenerator'), icon: Terminal },
    { href: '/subnet-calculator', label: t('subnetCalculator'), icon: Calculator },
  ];

  const dashboardLink = isAuthenticated
    ? user?.role === 'teacher'
      ? '/teacher-dashboard'
      : '/student-dashboard'
    : '/login';

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              TJKT LABS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative group ${
                  location.pathname === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#e6ff00] transition-all duration-300 ${
                    location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
            </button>

            {/* Auth buttons or user menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-accent transition-colors">
                    <div className="w-7 h-7 rounded-full bg-[#e6ff00] flex items-center justify-center">
                      <User className="w-4 h-4 text-black" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">{user?.full_name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate(dashboardLink)}>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <User className="w-4 h-4 mr-2" />
                    {t('settings')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-500">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  {t('login')}
                </Button>
                <Button
                  size="sm"
                  className="bg-[#e6ff00] text-black hover:bg-[#d4eb00]"
                  onClick={() => navigate('/register')}
                >
                  {t('register')}
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <>
                <Link
                  to="/topology"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50"
                >
                  <Network className="w-4 h-4" />
                  {t('topology')}
                </Link>
                <Link
                  to="/ai-assistant"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50"
                >
                  <Bot className="w-4 h-4" />
                  {t('aiAssistant')}
                </Link>
                <Link
                  to={dashboardLink}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {t('dashboard')}
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
                  {t('login')}
                </Button>
                <Button className="flex-1 bg-[#e6ff00] text-black hover:bg-[#d4eb00]" onClick={() => { navigate('/register'); setMobileMenuOpen(false); }}>
                  {t('register')}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
