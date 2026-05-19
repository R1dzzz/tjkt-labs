import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '@/store/authStore';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sun, Moon, ArrowLeft, Loader2 } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { theme, setTheme } = useAppStore();
  useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/student-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent transition-colors border border-border"
      >
        {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </button>

      {/* Back button */}
      <Link
        to="/"
        className="fixed top-4 left-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali
      </Link>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <span className="font-display text-2xl font-bold text-foreground">TJKT LABS</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              {t('welcomeBack')}
            </h1>
            <p className="text-sm text-muted-foreground">{t('signInDesc')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@sekolah.sch.id"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                Ingat saya
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[#e6ff00] hover:underline"
              >
                {t('forgotPassword')}
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#e6ff00] text-black hover:bg-[#d4eb00]"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {t('login')}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 rounded-lg bg-accent/30 border border-border">
            <p className="text-xs text-muted-foreground font-mono mb-2">Demo Credentials:</p>
            <p className="text-xs font-mono text-foreground">Teacher: teacher@tjkt.labs / teacher123</p>
            <p className="text-xs font-mono text-foreground">Student: student@tjkt.labs / student123</p>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {t('noAccount')}{' '}
            <Link to="/register" className="text-[#e6ff00] hover:underline font-medium">
              {t('signUpNow')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
