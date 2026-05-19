import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User,
  Palette,
  Globe,
  Bell,
  Save,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react';

export default function Settings() {
  const { user } = useAuthStore();
  const { theme, setTheme, language, setLanguage } = useAppStore();
  const { t } = useLanguage();
  const [profile, setProfile] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    bio: '',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    materials: true,
    lab: true,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t('settings')}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Kelola pengaturan akun dan preferensi Anda
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="profile" className="data-[state=active]:bg-[#e6ff00] data-[state=active]:text-black">
              <User className="w-4 h-4 mr-2" />
              {t('profile')}
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-[#e6ff00] data-[state=active]:text-black">
              <Palette className="w-4 h-4 mr-2" />
              {t('appearance')}
            </TabsTrigger>
            <TabsTrigger value="language" className="data-[state=active]:bg-[#e6ff00] data-[state=active]:text-black">
              <Globe className="w-4 h-4 mr-2" />
              {t('language')}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-[#e6ff00] data-[state=active]:text-black">
              <Bell className="w-4 h-4 mr-2" />
              {t('notifications')}
            </TabsTrigger>
          </TabsList>

          {/* Profile */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-base">{t('profile')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#e6ff00] flex items-center justify-center">
                    <User className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <p className="font-semibold">{user?.full_name || 'User'}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t('fullName')}</Label>
                  <Input
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={profile.email} disabled className="bg-accent/50" />
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Ceritakan tentang diri Anda..."
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <Button onClick={handleSave} className="bg-[#e6ff00] text-black hover:bg-[#d4eb00]">
                  <Save className="w-4 h-4 mr-2" />
                  {saved ? 'Tersimpan!' : t('saveChanges')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-base">{t('appearance')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Tema</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'light', label: 'Terang', icon: Sun },
                      { value: 'dark', label: 'Gelap', icon: Moon },
                      { value: 'system', label: 'Sistem', icon: Laptop },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                          theme === option.value
                            ? 'border-[#e6ff00] bg-[#e6ff00]/5'
                            : 'border-border hover:border-foreground/30'
                        }`}
                      >
                        <option.icon className="w-5 h-5" />
                        <span className="text-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Language */}
          <TabsContent value="language">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-base">{t('language')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Bahasa / Language</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'id', label: 'Bahasa Indonesia', flag: 'ID' },
                      { value: 'en', label: 'English', flag: 'EN' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setLanguage(option.value as 'id' | 'en')}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                          language === option.value
                            ? 'border-[#e6ff00] bg-[#e6ff00]/5'
                            : 'border-border hover:border-foreground/30'
                        }`}
                      >
                        <span className="text-lg font-bold">{option.flag}</span>
                        <span className="text-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-base">{t('notifications')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'email', label: 'Notifikasi Email', desc: 'Terima notifikasi melalui email' },
                  { key: 'push', label: 'Notifikasi Push', desc: 'Notifikasi real-time di browser' },
                  { key: 'materials', label: 'Materi Baru', desc: 'Notifikasi saat materi baru diunggah' },
                  { key: 'lab', label: 'Update Lab', desc: 'Notifikasi saat lab baru tersedia' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, [item.key]: checked })
                      }
                    />
                  </div>
                ))}

                <Button onClick={handleSave} className="bg-[#e6ff00] text-black hover:bg-[#d4eb00] mt-4">
                  <Save className="w-4 h-4 mr-2" />
                  {saved ? 'Tersimpan!' : t('saveChanges')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
