import { Link } from 'react-router';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuthStore } from '@/store/authStore';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Network,
  Terminal,
  BookOpen,
  Bot,
  Calculator,
  ArrowRight,
  TrendingUp,
  Clock,
  Award,
} from 'lucide-react';

const quickAccess = [
  { title: 'Topologi', desc: 'Buat topologi jaringan', icon: Network, href: '/topology', color: 'bg-blue-500/10 text-blue-500' },
  { title: 'CLI Generator', desc: 'Hasilkan konfigurasi', icon: Terminal, href: '/cli-generator', color: 'bg-green-500/10 text-green-500' },
  { title: 'Materi', desc: 'Akses materi belajar', icon: BookOpen, href: '/materials', color: 'bg-purple-500/10 text-purple-500' },
  { title: 'AI Asisten', desc: 'Tanya tentang jaringan', icon: Bot, href: '/ai-assistant', color: 'bg-orange-500/10 text-orange-500' },
  { title: 'Kalkulator Subnet', desc: 'Hitung subnet', icon: Calculator, href: '/subnet-calculator', color: 'bg-pink-500/10 text-pink-500' },
];

const recentActivities = [
  { action: 'Menyelesaikan modul Subnetting', time: '2 jam lalu', icon: TrendingUp },
  { action: 'Membuat topologi Star', time: '5 jam lalu', icon: Network },
  { action: 'Mengunduh materi DHCP', time: '1 hari lalu', icon: BookOpen },
];

const progressItems = [
  { module: 'Dasar Jaringan', progress: 100 },
  { module: 'Subnetting', progress: 85 },
  { module: 'Konfigurasi Router', progress: 60 },
  { module: 'Troubleshooting', progress: 40 },
];

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {t('welcome')}, {user?.full_name || 'Siswa'}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Lanjutkan pembelajaran jaringan Anda.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Modul Selesai</p>
                  <p className="text-2xl font-bold font-display">4/10</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#e6ff00]/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#e6ff00]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Lab</p>
                  <p className="text-2xl font-bold font-display">12</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Network className="w-5 h-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Jam Belajar</p>
                  <p className="text-2xl font-bold font-display">48h</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Access */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-display">{t('quickAccess')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quickAccess.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-[#e6ff00]/30 hover:bg-accent/5 transition-all group"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#e6ff00] transition-colors" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Progres Belajar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {progressItems.map((item) => (
                  <div key={item.module}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-foreground">{item.module}</span>
                      <span className="text-xs text-muted-foreground font-mono">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">{t('recentActivity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <activity.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
