import { Link, useLocation } from 'react-router';
import { useAppStore } from '@/store/appStore';
import { useAuthStore } from '@/store/authStore';
import { useLanguage } from '@/hooks/useLanguage';
import {
  LayoutDashboard,
  BookOpen,
  Network,
  Terminal,
  Bot,
  Calculator,
  Settings,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const { user } = useAuthStore();
  const { t } = useLanguage();
  const location = useLocation();

  const isTeacher = user?.role === 'teacher';

  const mainLinks = [
    { href: isTeacher ? '/teacher-dashboard' : '/student-dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/materials', label: t('materials'), icon: BookOpen },
    { href: '/topology', label: t('topology'), icon: Network },
    { href: '/cli-generator', label: t('cliGenerator'), icon: Terminal },
    { href: '/ai-assistant', label: t('aiAssistant'), icon: Bot },
    { href: '/subnet-calculator', label: t('subnetCalculator'), icon: Calculator },
  ];

  const teacherLinks = [
    { href: '/teacher-dashboard', label: 'Analytics', icon: FileText },
    { href: '/materials', label: 'Manage Students', icon: Users },
  ];

  const bottomLinks = [
    { href: '/settings', label: t('settings'), icon: Settings },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      } hidden lg:block`}
    >
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-4 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center hover:bg-accent transition-colors z-50"
      >
        {sidebarOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>

      <div className="flex flex-col h-full py-4">
        {/* Main navigation */}
        <nav className="flex-1 px-2 space-y-1">
          {mainLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#e6ff00]/10 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
                title={!sidebarOpen ? link.label : undefined}
              >
                <link.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#e6ff00]' : ''}`} />
                {sidebarOpen && <span className="truncate">{link.label}</span>}
              </Link>
            );
          })}

          {/* Teacher-only links */}
          {isTeacher && (
            <>
              {sidebarOpen && (
                <div className="pt-4 pb-2 px-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Teacher
                  </p>
                </div>
              )}
              {teacherLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[#e6ff00]/10 text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`}
                    title={!sidebarOpen ? link.label : undefined}
                  >
                    <link.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#e6ff00]' : ''}`} />
                    {sidebarOpen && <span className="truncate">{link.label}</span>}
                  </Link>
                );
              })}
            </>
          )}
        </nav>

        {/* Bottom navigation */}
        <div className="px-2 space-y-1 border-t border-border pt-4">
          {bottomLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#e6ff00]/10 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
                title={!sidebarOpen ? link.label : undefined}
              >
                <link.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#e6ff00]' : ''}`} />
                {sidebarOpen && <span className="truncate">{link.label}</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
