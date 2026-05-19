import { useAppStore } from '@/store/appStore';

const translations = {
  id: {
    // Navigation
    home: 'Beranda',
    materials: 'Materi',
    cliGenerator: 'Generator CLI',
    subnetCalculator: 'Kalkulator Subnet',
    dashboard: 'Dashboard',
    topology: 'Topologi',
    aiAssistant: 'Asisten AI',
    settings: 'Pengaturan',
    login: 'Masuk',
    register: 'Daftar',
    logout: 'Keluar',
    
    // Hero
    heroTitle: 'Raih Sertifikasi Cisco dengan Pembelajaran Modern',
    heroSubtitle: 'Platform lengkap untuk siswa TJKT. Pelajari topologi, konfigurasi CLI Cisco, dan subnetting secara interaktif.',
    exploreMaterials: 'Jelajahi Materi',
    startLab: 'Mulai Lab Virtual',
    
    // Features
    interactiveTopology: 'Topologi Virtual',
    topologyDesc: 'Bangun dan visualisasikan topologi jaringan secara interaktif dengan drag-and-drop.',
    cliGeneratorTitle: 'Generator CLI Cisco',
    cliGeneratorDesc: 'Hasilkan konfigurasi CLI Cisco valid secara otomatis untuk berbagai skenario jaringan.',
    tryFeature: 'Coba Fitur',
    
    // Curriculum
    curriculumTitle: 'Modul Pembelajaran',
    curriculumDesc: 'Kurikulum lengkap yang mencakup semua aspek jaringan komputer dari dasar hingga mahir.',
    networkingBasics: 'Dasar Jaringan',
    subnetting: 'Subnetting',
    routerConfig: 'Konfigurasi Router',
    troubleshooting: 'Troubleshooting',
    
    // Benefits
    benefitsTitle: 'BANGUN KEMAMPUAN JARINGAN ANDA',
    studentsCount: '500+ Siswa',
    labsCount: '50+ Lab',
    interactiveLabel: '100% Interaktif',
    
    // Quotes
    inspirationalQuotes: 'Kata-Kata Inspiratif',
    
    // Team
    teamTitle: 'Tim Kami',
    teamSubtitle: 'Siswa XI TJKT 2 Tahun Ajaran 2026/2027',
    aiTools: 'Alat Pengembangan AI',
    aiToolsSubtitle: 'Dibangun dengan alur pengembangan modern berbasis AI untuk mempercepat inovasi pendidikan jaringan.',
    homeroomTeachers: 'Guru Wali Kelas',
    
    // Auth
    welcomeBack: 'Selamat Datang Kembali',
    signInDesc: 'Masuk ke akun Anda untuk melanjutkan pembelajaran',
    email: 'Email',
    password: 'Kata Sandi',
    forgotPassword: 'Lupa Kata Sandi?',
    noAccount: 'Belum punya akun?',
    hasAccount: 'Sudah punya akun?',
    signUpNow: 'Daftar sekarang',
    signInNow: 'Masuk sekarang',
    createAccount: 'Buat Akun',
    createAccountDesc: 'Daftar untuk memulai perjalanan pembelajaran Anda',
    fullName: 'Nama Lengkap',
    role: 'Peran',
    teacher: 'Guru',
    student: 'Siswa',
    
    // Dashboard
    totalLabs: 'Total Lab',
    materialsUploaded: 'Materi Diunggah',
    recentActivity: 'Aktivitas Terbaru',
    quickAccess: 'Akses Cepat',
    welcome: 'Selamat Datang',
    
    // Topology
    topologyBuilder: 'Pembuat Topologi',
    addRouter: 'Tambah Router',
    addSwitch: 'Tambah Switch',
    addPC: 'Tambah PC',
    addServer: 'Tambah Server',
    connect: 'Hubungkan',
    delete: 'Hapus',
    saveTopology: 'Simpan Topologi',
    clearAll: 'Bersihkan Semua',
    
    // CLI Generator
    configType: 'Jenis Konfigurasi',
    generateConfig: 'Hasilkan Konfigurasi',
    copyConfig: 'Salin Konfigurasi',
    downloadConfig: 'Unduh Konfigurasi',
    enterParams: 'Masukkan Parameter',
    
    // AI Assistant
    askAnything: 'Tanyakan apa saja tentang jaringan...',
    send: 'Kirim',
    thinking: 'Berpikir...',
    suggestedQuestions: 'Pertanyaan yang Disarankan',
    
    // Materials
    uploadMaterial: 'Unggah Materi',
    searchMaterials: 'Cari materi...',
    allCategories: 'Semua Kategori',
    pdf: 'PDF',
    video: 'Video',
    document: 'Dokumen',
    noMaterials: 'Belum ada materi',
    
    // Subnet Calculator
    ipAddress: 'Alamat IP',
    subnetMask: 'Subnet Mask',
    cidr: 'CIDR',
    calculate: 'Hitung',
    networkAddress: 'Alamat Jaringan',
    broadcastAddress: 'Alamat Broadcast',
    usableHosts: 'Host yang Dapat Digunakan',
    hostRange: 'Rentang Host',
    
    // Settings
    profile: 'Profil',
    appearance: 'Tampilan',
    language: 'Bahasa',
    notifications: 'Notifikasi',
    saveChanges: 'Simpan Perubahan',
    
    // Footer
    quickLinks: 'Tautan Cepat',
    resources: 'Sumber Daya',
    systemStatus: 'Status Sistem',
    allSystemsActive: 'Semua Sistem Aktif',
    copyright: 'TJKT Labs. Semua hak dilindungi.',
  },
  en: {
    // Navigation
    home: 'Home',
    materials: 'Materials',
    cliGenerator: 'CLI Generator',
    subnetCalculator: 'Subnet Calculator',
    dashboard: 'Dashboard',
    topology: 'Topology',
    aiAssistant: 'AI Assistant',
    settings: 'Settings',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Hero
    heroTitle: 'Achieve Cisco Certification with Modern Learning',
    heroSubtitle: 'Complete platform for TJKT students. Learn topology, Cisco CLI configuration, and subnetting interactively.',
    exploreMaterials: 'Explore Materials',
    startLab: 'Start Virtual Lab',
    
    // Features
    interactiveTopology: 'Virtual Topology',
    topologyDesc: 'Build and visualize network topology interactively with drag-and-drop.',
    cliGeneratorTitle: 'Cisco CLI Generator',
    cliGeneratorDesc: 'Automatically generate valid Cisco CLI configurations for various network scenarios.',
    tryFeature: 'Try Feature',
    
    // Curriculum
    curriculumTitle: 'Learning Modules',
    curriculumDesc: 'Complete curriculum covering all aspects of computer networking from basics to advanced.',
    networkingBasics: 'Networking Basics',
    subnetting: 'Subnetting',
    routerConfig: 'Router Configuration',
    troubleshooting: 'Troubleshooting',
    
    // Benefits
    benefitsTitle: 'BUILD YOUR NETWORKING SKILLS',
    studentsCount: '500+ Students',
    labsCount: '50+ Labs',
    interactiveLabel: '100% Interactive',
    
    // Quotes
    inspirationalQuotes: 'Inspirational Quotes',
    
    // Team
    teamTitle: 'Our Team',
    teamSubtitle: 'XI TJKT 2 Students Academic Year 2026/2027',
    aiTools: 'AI Development Tools',
    aiToolsSubtitle: 'Built with modern AI-assisted development workflows to accelerate networking education innovation.',
    homeroomTeachers: 'Homeroom Teachers',
    
    // Auth
    welcomeBack: 'Welcome Back',
    signInDesc: 'Sign in to your account to continue learning',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    signUpNow: 'Sign up now',
    signInNow: 'Sign in now',
    createAccount: 'Create Account',
    createAccountDesc: 'Register to start your learning journey',
    fullName: 'Full Name',
    role: 'Role',
    teacher: 'Teacher',
    student: 'Student',
    
    // Dashboard
    totalLabs: 'Total Labs',
    materialsUploaded: 'Materials Uploaded',
    recentActivity: 'Recent Activity',
    quickAccess: 'Quick Access',
    welcome: 'Welcome',
    
    // Topology
    topologyBuilder: 'Topology Builder',
    addRouter: 'Add Router',
    addSwitch: 'Add Switch',
    addPC: 'Add PC',
    addServer: 'Add Server',
    connect: 'Connect',
    delete: 'Delete',
    saveTopology: 'Save Topology',
    clearAll: 'Clear All',
    
    // CLI Generator
    configType: 'Configuration Type',
    generateConfig: 'Generate Config',
    copyConfig: 'Copy Config',
    downloadConfig: 'Download Config',
    enterParams: 'Enter Parameters',
    
    // AI Assistant
    askAnything: 'Ask anything about networking...',
    send: 'Send',
    thinking: 'Thinking...',
    suggestedQuestions: 'Suggested Questions',
    
    // Materials
    uploadMaterial: 'Upload Material',
    searchMaterials: 'Search materials...',
    allCategories: 'All Categories',
    pdf: 'PDF',
    video: 'Video',
    document: 'Document',
    noMaterials: 'No materials yet',
    
    // Subnet Calculator
    ipAddress: 'IP Address',
    subnetMask: 'Subnet Mask',
    cidr: 'CIDR',
    calculate: 'Calculate',
    networkAddress: 'Network Address',
    broadcastAddress: 'Broadcast Address',
    usableHosts: 'Usable Hosts',
    hostRange: 'Host Range',
    
    // Settings
    profile: 'Profile',
    appearance: 'Appearance',
    language: 'Language',
    notifications: 'Notifications',
    saveChanges: 'Save Changes',
    
    // Footer
    quickLinks: 'Quick Links',
    resources: 'Resources',
    systemStatus: 'System Status',
    allSystemsActive: 'All Systems Active',
    copyright: 'TJKT Labs. All rights reserved.',
  },
};

export function useLanguage() {
  const { language } = useAppStore();
  
  const t = (key: keyof typeof translations.id): string => {
    return translations[language][key] || key;
  };
  
  return { t, language };
}
