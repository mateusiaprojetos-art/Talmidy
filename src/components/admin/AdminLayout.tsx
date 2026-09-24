import React, { useState } from 'react';
import {
  LayoutDashboard, Users, BookOpen, Layers, Calendar, Flame, GraduationCap,
  HelpCircle, Sparkles, FileText, Mail, Settings, Clock, ArrowLeft, Menu, X, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminDashboard } from './AdminDashboard';
import { UsersManagement } from './UsersManagement';
import { ContentManagement } from './ContentManagement';
import { PardesManagement } from './PardesManagement';
import { ParashotShabbatManagement } from './ParashotShabbatManagement';
import { CalendarHolidaysManagement } from './CalendarHolidaysManagement';
import { HebrewManagement } from './HebrewManagement';
import { CoursesManagement } from './CoursesManagement';
import { QuizzesManagement } from './QuizzesManagement';
import { StudyGeneratorAdmin } from './StudyGeneratorAdmin';
import { FilesManagement } from './FilesManagement';
import { EmailsNotificationsManagement } from './EmailsNotificationsManagement';
import { SiteSettingsAdmin } from './SiteSettingsAdmin';
import { AuditLogsAdmin } from './AuditLogsAdmin';

interface AdminLayoutProps {
  onBackToApp: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToApp }) => {
  const { user, isSuperAdmin, hasAdminAccess } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  if (!hasAdminAccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-red-500/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/40">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">ACESSO NEGADO</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Você não possui permissões administrativas para acessar esta área. Apenas contas autorizadas com perfil de Administrador têm acesso.
          </p>
          <button
            onClick={onBackToApp}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition text-xs shadow-lg"
          >
            VOLTAR À ÁREA DO ALUNO
          </button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Usuários & Admins', icon: Users },
    { id: 'content', label: 'Conteúdos Bíblicos', icon: BookOpen },
    { id: 'pardes', label: 'Metodologia Pardes', icon: Layers },
    { id: 'parashot', label: 'Parashot & Shabat', icon: Calendar },
    { id: 'calendar', label: 'Calendário & Festas', icon: Calendar },
    { id: 'hebrew', label: 'Hebraico Fácil', icon: Flame },
    { id: 'courses', label: 'Cursos & Aulas', icon: GraduationCap },
    { id: 'quizzes', label: 'Quizzes & Exercícios', icon: HelpCircle },
    { id: 'generator', label: 'Gerador AI Pardes', icon: Sparkles },
    { id: 'files', label: 'Arquivos Gerados', icon: FileText },
    { id: 'emails', label: 'E-mails & Notificações', icon: Mail },
    { id: 'settings', label: 'Configurações do Site', icon: Settings },
    { id: 'logs', label: 'Log de Atividades', icon: Clock },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard onNavigate={setActiveTab} />;
      case 'users':
        return <UsersManagement />;
      case 'content':
        return <ContentManagement />;
      case 'pardes':
        return <PardesManagement />;
      case 'parashot':
        return <ParashotShabbatManagement />;
      case 'calendar':
        return <CalendarHolidaysManagement />;
      case 'hebrew':
        return <HebrewManagement />;
      case 'courses':
        return <CoursesManagement />;
      case 'quizzes':
        return <QuizzesManagement />;
      case 'generator':
        return <StudyGeneratorAdmin />;
      case 'files':
        return <FilesManagement />;
      case 'emails':
        return <EmailsNotificationsManagement />;
      case 'settings':
        return <SiteSettingsAdmin />;
      case 'logs':
        return <AuditLogsAdmin />;
      default:
        return <AdminDashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white text-sm">Talmidim Admin</span>
            <span className="block text-[10px] text-blue-400">{isSuperAdmin ? 'SUPER_ADMIN' : 'ADMINISTRADOR'}</span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-800 text-slate-300"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 transform ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h1 className="font-bold text-white text-sm leading-none">Talmidim</h1>
                <p className="text-[10px] text-blue-400 font-semibold mt-1 uppercase tracking-wider">
                  {isSuperAdmin ? 'PAINEL SUPER_ADMIN' : 'PAINEL ADMIN'}
                </p>
              </div>
            </div>
          </div>

          {/* User badge */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-white truncate">{user?.name}</div>
            <div className="text-[10px] text-slate-400 font-mono truncate">{user?.email}</div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-medium">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl transition flex items-center gap-3 text-left ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-md'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onBackToApp}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400" />
            <span>Voltar à Área de Estudos</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {renderContent()}
      </main>

    </div>
  );
};
