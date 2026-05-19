import { useState, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/layout/Header';
import {
  Search,
  Upload,
  FileText,
  Download,
  Eye,
  Trash2,
  Filter,
} from 'lucide-react';

interface MaterialItem {
  id: string;
  title: string;
  description: string;
  category: string;
  fileName: string;
  fileSize: string;
  uploadedBy: string;
  date: string;
}

const mockMaterials: MaterialItem[] = [
  {
    id: '1',
    title: 'Dasar-Dasar Jaringan Komputer',
    description: 'Pengenalan konsep dasar jaringan komputer, OSI layer, dan protokol.',
    category: 'PDF',
    fileName: 'dasar-jaringan.pdf',
    fileSize: '2.4 MB',
    uploadedBy: 'Fajar Wibowo',
    date: '2 hari lalu',
  },
  {
    id: '2',
    title: 'Konfigurasi VLAN',
    description: 'Panduan lengkap konfigurasi VLAN pada switch Cisco.',
    category: 'PDF',
    fileName: 'konfigurasi-vlan.pdf',
    fileSize: '1.8 MB',
    uploadedBy: 'Saiful Jefri',
    date: '5 hari lalu',
  },
  {
    id: '3',
    title: 'Subnetting Calculator Guide',
    description: 'Cara cepat menghitung subnetting dengan metode binary dan CIDR.',
    category: 'PDF',
    fileName: 'subnetting-guide.pdf',
    fileSize: '3.1 MB',
    uploadedBy: 'Fajar Wibowo',
    date: '1 minggu lalu',
  },
  {
    id: '4',
    title: 'Static Routing Lab',
    description: 'Lab praktikum konfigurasi static routing pada Cisco Packet Tracer.',
    category: 'Lab',
    fileName: 'static-routing-lab.pdf',
    fileSize: '1.2 MB',
    uploadedBy: 'Saiful Jefri',
    date: '1 minggu lalu',
  },
  {
    id: '5',
    title: 'DHCP Configuration',
    description: 'Konfigurasi DHCP server dan relay pada perangkat Cisco.',
    category: 'PDF',
    fileName: 'dhcp-config.pdf',
    fileSize: '1.5 MB',
    uploadedBy: 'Fajar Wibowo',
    date: '2 minggu lalu',
  },
  {
    id: '6',
    title: 'Network Troubleshooting',
    description: 'Teknik troubleshooting jaringan menggunakan command line tools.',
    category: 'PDF',
    fileName: 'troubleshooting.pdf',
    fileSize: '2.7 MB',
    uploadedBy: 'Saiful Jefri',
    date: '2 minggu lalu',
  },
];

export default function Materials() {
  const { user } = useAuthStore();
  const { t } = useLanguage();
  const [materials, setMaterials] = useState<MaterialItem[]>(mockMaterials);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({ title: '', description: '', category: 'PDF' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isTeacher = user?.role === 'teacher';

  const filteredMaterials = materials.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || m.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleUpload = () => {
    if (!newMaterial.title) return;
    
    const material: MaterialItem = {
      id: Date.now().toString(),
      title: newMaterial.title,
      description: newMaterial.description,
      category: newMaterial.category,
      fileName: fileInputRef.current?.files?.[0]?.name || 'document.pdf',
      fileSize: '1.0 MB',
      uploadedBy: user?.full_name || 'User',
      date: 'Baru saja',
    };

    setMaterials([material, ...materials]);
    setNewMaterial({ title: '', description: '', category: 'PDF' });
    setUploadOpen(false);
  };

  const handleDelete = (id: string) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">{t('materials')}</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {filteredMaterials.length} materi tersedia
              </p>
            </div>
            {isTeacher && (
              <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#e6ff00] text-black hover:bg-[#d4eb00]">
                    <Upload className="w-4 h-4 mr-2" />
                    {t('uploadMaterial')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="font-display">Unggah Materi Baru</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Judul</label>
                      <Input
                        value={newMaterial.title}
                        onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                        placeholder="Judul materi"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Deskripsi</label>
                      <Textarea
                        value={newMaterial.description}
                        onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                        placeholder="Deskripsi singkat"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Kategori</label>
                      <Select
                        value={newMaterial.category}
                        onValueChange={(val) => setNewMaterial({ ...newMaterial, category: val })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PDF">PDF</SelectItem>
                          <SelectItem value="Lab">Lab</SelectItem>
                          <SelectItem value="Video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">File</label>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                      />
                    </div>
                    <Button
                      onClick={handleUpload}
                      className="w-full bg-[#e6ff00] text-black hover:bg-[#d4eb00]"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Unggah
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchMaterials')}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allCategories')}</SelectItem>
                  <SelectItem value="PDF">{t('pdf')}</SelectItem>
                  <SelectItem value="Lab">Lab</SelectItem>
                  <SelectItem value="Video">{t('video')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Materials Grid */}
          {filteredMaterials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map((material) => (
                <Card key={material.id} className="group hover:border-[#e6ff00]/30 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#e6ff00]/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#e6ff00]" />
                      </div>
                      {isTeacher && (
                        <button
                          onClick={() => handleDelete(material.id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-1 line-clamp-1">
                      {material.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {material.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span className="px-2 py-1 rounded-full bg-accent text-foreground font-medium">
                        {material.category}
                      </span>
                      <span>{material.fileSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-3.5 h-3.5 mr-1.5" />
                        Baca
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-3.5 h-3.5 mr-1.5" />
                        Unduh
                      </Button>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                      <span>{material.uploadedBy}</span>
                      <span>{material.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('noMaterials')}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
