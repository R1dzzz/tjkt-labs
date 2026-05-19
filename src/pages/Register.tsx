import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '@/store/authStore';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sun, Moon, ArrowLeft, Loader2 } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'teacher' | 'student'>('student');
  const { register, isLoading } = useAuthStore();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { theme, setTheme } = useAppStore();
  useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(email, password, fullName, role);
    if (success) {
      navigate(role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent transition-colors border border-border"
      >
        {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </button>

      <Link
        to="/"
        className="fixed top-4 left-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <span className="font-display text-2xl font-bold text-foreground">TJKT LABS</span>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              {t('createAccount')}
            </h1>
            <p className="text-sm text-muted-foreground">{t('createAccountDesc')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t('fullName')}</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nama lengkap"
                required
              />
            </div>
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
            <div className="space-y-2">
              <Label>{t('role')}</Label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium border transition-all ${
                    role === 'student'
                      ? 'bg-[#e6ff00] text-black border-[#e6ff00]'
                      : 'bg-transparent text-muted-foreground border-border hover:border-foreground/30'
                  }`}
                >
                  {t('student')}
                </button>
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium border transition-all ${
                    role === 'teacher'
                      ? 'bg-[#e6ff00] text-black border-[#e6ff00]'
                      : 'bg-transparent text-muted-foreground border-border hover:border-foreground/30'
                  }`}
                >
                  {t('teacher')}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#e6ff00] text-black hover:bg-[#d4eb00]"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {t('register')}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {t('hasAccount')}{' '}
            <Link to="/login" className="text-[#e6ff00] hover:underline font-medium">
              {t('signInNow')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
