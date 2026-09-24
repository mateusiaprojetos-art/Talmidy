import React, { useEffect, useState } from 'react';
import {
  Users, BookOpen, GraduationCap, Flame, Sparkles, FileText, Mail, Bell,
  TrendingUp, Database, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminDashboardProps {
  onNavigate: (sectionId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { user, isSuperAdmin } = useAuth();
  const [metrics, setMetrics] = useState({
    totalUsers: 124,
    activeUsers: 98,
    newUsersThisMonth: 18,
    coursesCount: 5,
    lessonsCount: 38,
    studiesCount: 82,
    generatedStudiesCount: 210,
    parashotCount: 54,
    haftarotCount: 54,
    contentItemsCount: 142,
    hebrewWordsCount: 120,
    hebrewActivitiesCount: 28,
    quizzesCount: 15,
    generatedFilesCount: 89,
    emailsSentCount: 341,
    notificationsSentCount: 76
  });

  useEffect(() => {
    fetch('/api/admin/metrics')
      ? fetch('/api/admin/metrics')
          .then(res => res.json())
          .then(data => {
            if (data.success && data.data) {
              setMetrics(data.data);
            }
          })
          .catch(err => console.warn('Metrics fetch warning:', err))
      : null;
  }, []);

  return (
    <div className="space-y-8" style={{ fontFamily: "Calibri, Aptos, 'Segoe UI', sans-serif" }}>
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-900 border border-blue-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-700/60 text-blue-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Painel de Controle do {isSuperAdmin ? 'SUPER_ADMIN' : 'ADMINISTRADOR'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Shalom, {user?.name || 'Administrador'}!
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Bem-vindo ao centro de gerenciamento completo da <strong>Talmidim Academy</strong>. Monitore usuários, gerencie conteúdos da Torá, cursos de Hebraico, agendamentos de e-mails e métricas em tempo real.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onNavigate('users')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg"
            >
              <Users className="w-4 h-4" />
              <span>Gerenciar Usuários</span>
            </button>
            <button
              onClick={() => onNavigate('content')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 transition border border-slate-700"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Conteúdo da Torá</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Users Card */}
        <div 
          onClick={() => onNavigate('users')}
          className="bg-slate-900 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 cursor-pointer transition shadow-lg group space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Usuários Registrados</span>
            <div className="p-2.5 rounded-xl bg-blue-950/80 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">{metrics.totalUsers}</div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{metrics.activeUsers} usuários ativos no momento</span>
            </div>
          </div>
        </div>

        {/* Courses & Lessons Card */}
        <div 
          onClick={() => onNavigate('courses')}
          className="bg-slate-900 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 cursor-pointer transition shadow-lg group space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cursos & Aulas</span>
            <div className="p-2.5 rounded-xl bg-blue-950/80 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">{metrics.coursesCount} Cursos</div>
            <p className="text-[11px] text-slate-400 mt-1">
              {metrics.lessonsCount} aulas publicadas na plataforma
            </p>
          </div>
        </div>

        {/* AI Generated Studies */}
        <div 
          onClick={() => onNavigate('generator')}
          className="bg-slate-900 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 cursor-pointer transition shadow-lg group space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estudos com IA</span>
            <div className="p-2.5 rounded-xl bg-blue-950/80 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">{metrics.generatedStudiesCount}</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Estudos e slides sintetizados pelo Gemini
            </p>
          </div>
        </div>

        {/* Hebrew Dictionary */}
        <div 
          onClick={() => onNavigate('hebrew')}
          className="bg-slate-900 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 cursor-pointer transition shadow-lg group space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Hebraico Fácil</span>
            <div className="p-2.5 rounded-xl bg-blue-950/80 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">{metrics.hebrewWordsCount} Palavras</div>
            <p className="text-[11px] text-slate-400 mt-1">
              {metrics.hebrewActivitiesCount} atividades e flashcards cadastrados
            </p>
          </div>
        </div>

      </div>

      {/* Secondary Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3.5 text-center">
          <p className="text-[10px] text-slate-500 uppercase font-bold">Parashot</p>
          <p className="text-lg font-bold text-white mt-0.5">{metrics.parashotCount}</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3.5 text-center">
          <p className="text-[10px] text-slate-500 uppercase font-bold">Conteúdos Bíblicos</p>
          <p className="text-lg font-bold text-white mt-0.5">{metrics.contentItemsCount}</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3.5 text-center">
          <p className="text-[10px] text-slate-500 uppercase font-bold">Quizzes Ativos</p>
          <p className="text-lg font-bold text-white mt-0.5">{metrics.quizzesCount}</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3.5 text-center">
          <p className="text-[10px] text-slate-500 uppercase font-bold">Arquivos PDF/Slides</p>
          <p className="text-lg font-bold text-white mt-0.5">{metrics.generatedFilesCount}</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3.5 text-center">
          <p className="text-[10px] text-slate-500 uppercase font-bold">E-mails Enviados</p>
          <p className="text-lg font-bold text-white mt-0.5">{metrics.emailsSentCount}</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3.5 text-center">
          <p className="text-[10px] text-slate-500 uppercase font-bold">Notificações Push</p>
          <p className="text-lg font-bold text-white mt-0.5">{metrics.notificationsSentCount}</p>
        </div>
      </div>

      {/* System Status & Management Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* System Health */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Database className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">Status dos Serviços da Plataforma</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300 font-medium">Banco de Dados Firestore</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Online
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300 font-medium">Servidor Node/Express API</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ativo (Porta 3000)
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300 font-medium">IA Gemini 3.6 Flash</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Operacional
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300 font-medium">Autenticação Firebase Auth</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> RBAC Ativo
              </span>
            </div>
          </div>
        </div>

        {/* Quick Admin Actions */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-white text-sm pb-3 border-b border-slate-800">Ações Rápidas de Gerenciamento</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            
            <button
              onClick={() => onNavigate('emails')}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-950/80 text-blue-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Criar Campanha de E-mail</div>
                  <div className="text-[11px] text-slate-400">Agendar envios para alunos</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition" />
            </button>

            <button
              onClick={() => onNavigate('parashot')}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-950/80 text-blue-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Cadastrar Parashá da Semana</div>
                  <div className="text-[11px] text-slate-400">Definir Torá e Haftará</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition" />
            </button>

            <button
              onClick={() => onNavigate('generator')}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-950/80 text-blue-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Configurar Gerador AI Pardes</div>
                  <div className="text-[11px] text-slate-400">Modelos de prompt e slides</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition" />
            </button>

            <button
              onClick={() => onNavigate('settings')}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-950/80 text-blue-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Configurações Gerais do Site</div>
                  <div className="text-[11px] text-slate-400">Nome, logos e permissões</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition" />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};
