import { useLanguage } from '@/hooks/useLanguage';
import { GraduationCap, Sparkles } from 'lucide-react';

const teamMembers = [
  { name: 'FARID ALFIYANSAH', absen: 26, class: 'XI TJKT 2', year: '2026/2027', avatar: '/images/team-farid.jpg' },
  { name: 'HALIM', absen: 31, class: 'XI TJKT 2', year: '2026/2027', avatar: '/images/team-halim.jpg' },
  { name: 'FAUZAN YUSUF', absen: 27, class: 'XI TJKT 2', year: '2026/2027', avatar: '/images/team-fauzan.jpg' },
  { name: 'DENIS ALFARIZI', absen: 4, class: 'XI TJKT 2', year: '2026/2027', avatar: '/images/team-denis.jpg' },
  { name: 'DEVINO BINTANG', absen: 5, class: 'XI TJKT 2', year: '2026/2027', avatar: '/images/team-devino.jpg' },
  { name: 'EKA ARDIANSYAH', absen: 19, class: 'XI TJKT 2', year: '2026/2027', avatar: '/images/team-eka.jpg' },
];

const aiTools = [
  { name: 'ChatGPT', color: '#10a37f' },
  { name: 'Claude', color: '#cc785c' },
  { name: 'Kimi AI', color: '#3b82f6' },
  { name: 'Grok AI', color: '#f97316' },
  { name: 'Gemini', color: '#8b5cf6' },
];

const teachers = [
  'Fajar Wibowo S.Kom',
  'Saiful Jefri S.Kom',
];

export default function Team() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            05 / Tim
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">
            {t('teamTitle')}
          </h2>
          <p className="text-muted-foreground">{t('teamSubtitle')}</p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-[#e6ff00] transition-all duration-300">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                Absen {member.absen} · {member.class}
              </p>
            </div>
          ))}
        </div>

        {/* AI Tools section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#e6ff00]" />
              <h3 className="font-display text-xl font-semibold text-foreground">
                {t('aiTools')}
              </h3>
              <Sparkles className="w-5 h-5 text-[#e6ff00]" />
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              {t('aiToolsSubtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {aiTools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card/50 border border-border hover:border-[#e6ff00]/30 transition-all duration-300 cursor-default group grayscale hover:grayscale-0"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: tool.color }}
                >
                  {tool.name.charAt(0)}
                </div>
                <span className="font-medium text-foreground text-sm group-hover:text-[#e6ff00] transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Teachers section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-[#e6ff00]" />
            <h3 className="font-display text-lg font-semibold text-foreground">
              {t('homeroomTeachers')}
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {teachers.map((teacher) => (
              <div
                key={teacher}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card/50 border border-border"
              >
                <div className="w-9 h-9 rounded-full bg-[#e6ff00]/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-[#e6ff00]" />
                </div>
                <span className="font-medium text-foreground text-sm">{teacher}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
