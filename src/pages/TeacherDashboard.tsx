import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuthStore } from '@/store/authStore';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Network,
  FileText,
  Users,
  Upload,
  ArrowRight,
  Activity,
} from 'lucide-react';
import { Link } from 'react-router';

const stats = [
  { label: 'Total Siswa', value: '156', icon: Users, change: '+12%', color: 'bg-blue-500/10 text-blue-500' },
  { label: 'Materi Diunggah', value: '42', icon: FileText, change: '+5', color: 'bg-green-500/10 text-green-500' },
  { label: 'Lab Dibuat', value: '28', icon: Network, change: '+3', color: 'bg-purple-500/10 text-purple-500' },
  { label: 'Aktivitas Hari Ini', value: '89', icon: Activity, change: '+23%', color: 'bg-orange-500/10 text-orange-500' },
];

const recentStudents = [
  { name: 'Ahmad Rizki', class: 'XI TJKT 1', progress: 85, lastActive: '10 menit lalu' },
  { name: 'Siti Nurhaliza', class: 'XI TJKT 2', progress: 92, lastActive: '25 menit lalu' },
  { name: 'Budi Santoso', class: 'XI TJKT 1', progress: 78, lastActive: '1 jam lalu' },
  { name: 'Dewi Anggraini', class: 'XI TJKT 2', progress: 65, lastActive: '2 jam lalu' },
  { name: 'Eko Prasetyo', class: 'XI TJKT 1', progress: 45, lastActive: '3 jam lalu' },
];

const recentMaterials = [
  { title: 'Konfigurasi VLAN', category: 'PDF', views: 89, date: '2 hari lalu' },
  { title: 'Panduan Subnetting', category: 'PDF', views: 124, date: '5 hari lalu' },
  { title: 'Lab Routing Static', category: 'Lab', views: 67, date: '1 minggu lalu' },
];

export default function TeacherDashboard() {
  const { user } = useAuthStore();
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState('week');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {t('welcome')}, {user?.full_name || 'Guru'}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Kelola pembelajaran dan pantau progres siswa.
            </p>
          </div>
          <Link to="/materials">
            <Button className="bg-[#e6ff00] text-black hover:bg-[#d4eb00]">
              <Upload className="w-4 h-4 mr-2" />
              Unggah Materi
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold font-display">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Students Progress */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display">Progres Siswa</CardTitle>
                <div className="flex gap-1">
                  {['day', 'week', 'month'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                        timeRange === range
                          ? 'bg-[#e6ff00] text-black'
                          : 'text-muted-foreground hover:bg-accent'
                      }`}
                    >
                      {range === 'day' ? 'Hari' : range === 'week' ? 'Minggu' : 'Bulan'}
                    </button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Kelas</TableHead>
                      <TableHead>Progres</TableHead>
                      <TableHead className="text-right">Terakhir Aktif</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentStudents.map((student) => (
                      <TableRow key={student.name}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 rounded-full bg-accent overflow-hidden">
                              <div
                                className="h-full rounded-full bg-[#e6ff00]"
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono">{student.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground text-sm">
                          {student.lastActive}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-base">Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/materials">
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Unggah Materi Baru
                  </Button>
                </Link>
                <Link to="/topology">
                  <Button variant="outline" className="w-full justify-start">
                    <Network className="w-4 h-4 mr-2" />
                    Buat Lab Topologi
                  </Button>
                </Link>
                <Link to="/cli-generator">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate CLI Config
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Materials */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-base">Materi Terbaru</CardTitle>
                <Link to="/materials" className="text-xs text-[#e6ff00] hover:underline flex items-center gap-1">
                  Lihat Semua <ArrowRight className="w-3 h-3" />
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentMaterials.map((material) => (
                  <div
                    key={material.title}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-[#e6ff00]/30 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#e6ff00]/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#e6ff00]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{material.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {material.views} views · {material.date}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
