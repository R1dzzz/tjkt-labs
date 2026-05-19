import { useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Link
        to="/login"
        className="fixed top-4 left-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Login
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <span className="font-display text-2xl font-bold text-foreground">TJKT LABS</span>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#e6ff00]/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-[#e6ff00]" />
                </div>
                <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                  {t('forgotPassword')}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
                </p>
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
                <Button
                  type="submit"
                  className="w-full bg-[#e6ff00] text-black hover:bg-[#d4eb00]"
                >
                  Kirim Link Reset
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                Email Terkirim!
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Periksa inbox Anda untuk link reset password.
              </p>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Kembali ke Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
