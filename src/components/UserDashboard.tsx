import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Trophy, BookOpen, Flame, Languages, Calendar, FileText, Send, Clock, Award, ArrowRight, Target, Bookmark } from 'lucide-react';
import { calculateShabbatTimes } from '../utils/shabbatCalculator';

export const UserDashboard: React.FC = () => {
  const { user, setActiveView, logout, shabbatCity } = useAuth();
  const shabbatTimes = calculateShabbatTimes(shabbatCity);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-slate-600 dark:text-slate-400 font-sans">
        <p className="text-base font-medium">Por favor, faça login para visualizar seu Dashboard de Estudante.</p>
      </div>
    );
  }

  const prog = user.progress || {
    studyStreakDays: 0,
    totalMinutesStudied: 0,
    hebrewLettersLearned: [],
    completedLessons: [],
    hebrewWordsLearned: [],
    completedQuizzes: [],
    parashotStudied: []
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans text-slate-100 min-h-screen">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-bold text-2xl flex items-center justify-center shadow-md">
              {(user?.name || user?.email || 'T').charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-950/80 px-2.5 py-0.5 rounded-md border border-blue-800">
                Painel do Talmid
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Shalom, {user?.name || 'Talmid'}!
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {user?.email || ''} • {user?.phone || 'Estudante da Talmidim Academy'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('mystudies')}
              className="px-4 py-2.5 rounded-xl bg-blue-950/80 text-blue-300 hover:bg-blue-900 border border-blue-800 text-xs font-bold transition shadow-sm"
            >
              Meus Estudos
            </button>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-bold transition"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-md hover:border-blue-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-blue-950/80 text-blue-300 flex items-center justify-center">
            <Flame className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sequência de Estudos</p>
          <p className="text-2xl font-extrabold text-white">{prog.studyStreakDays} Dias Seguidos</p>
          <p className="text-[11px] text-blue-300 font-medium">Ofensiva de estudo mantida</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-md hover:border-blue-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-blue-950/80 text-blue-300 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tempo Dedicado</p>
          <p className="text-2xl font-extrabold text-white">{prog.totalMinutesStudied} Minutos</p>
          <p className="text-[11px] text-slate-400 font-medium">Tempo acumulado na plataforma</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-md hover:border-blue-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-blue-950/80 text-blue-300 flex items-center justify-center">
            <Languages className="w-5 h-5" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Letras de Hebraico</p>
          <p className="text-2xl font-extrabold text-white">{(prog.hebrewLettersLearned || []).length} / 22</p>
          <p className="text-[11px] text-blue-300 font-medium">Dominando o Alef-Bet</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-md hover:border-blue-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-blue-950/80 text-blue-300 flex items-center justify-center">
            <Award className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aulas Concluídas</p>
          <p className="text-2xl font-extrabold text-white">{(prog.completedLessons || []).length} Aulas</p>
          <p className="text-[11px] text-slate-400 font-medium">Módulos finalizados</p>
        </div>
      </div>

      {/* Resumo Shabat & Parashá Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Card Resumo Parashá */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Porção Semanal</span>
              <h3 className="text-lg font-bold text-white">Parashat HaShavua</h3>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <p className="text-base font-bold text-white">Bereshit (בְּרֵאשִׁית)</p>
            <p className="text-xs text-slate-300">Leitura: Gênesis 1:1 - 6:8 • Haftará: Isaías 42:5 - 43:10</p>
          </div>

          <button
            onClick={() => setActiveView('parasha')}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-md"
          >
            Estudar Porção Semanal <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card Resumo Shabat */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Flame className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Horários em {shabbatCity.split(',')[0]}</span>
              <h3 className="text-lg font-bold text-white">Próximo Shabat</h3>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <p className="text-sm font-bold text-blue-300">Acendimento das Velas: {shabbatTimes.candleLighting}</p>
            <p className="text-sm font-bold text-white">Havdalá: {shabbatTimes.havdalah}</p>
            <p className="text-xs text-slate-400 mt-1">{shabbatTimes.dateCivil}</p>
          </div>

          <button
            onClick={() => setActiveView('shabbat')}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 text-blue-300 border border-blue-900/60 font-bold text-xs hover:bg-slate-700 transition flex items-center justify-center gap-2 shadow-sm"
          >
            Ver Orações e Guia do Shabat <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Quick Navigation Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Atalhos e Ferramentas Principais</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <button
            onClick={() => setActiveView('hebrew')}
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500 text-left space-y-1.5 transition group"
          >
            <Languages className="w-5 h-5 text-blue-400" />
            <p className="text-white font-bold text-sm group-hover:text-blue-400 transition">Curso Hebraico Fácil</p>
            <p className="text-slate-400 text-[11px]">Aprenda o alfabeto, vocabulário e pronúncia</p>
          </button>

          <button
            onClick={() => setActiveView('generator')}
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500 text-left space-y-1.5 transition group"
          >
            <BookOpen className="w-5 h-5 text-blue-400" />
            <p className="text-white font-bold text-sm group-hover:text-blue-400 transition">Gerador de Estudos (IA)</p>
            <p className="text-slate-400 text-[11px]">Crie apostilas e apresentações em PDF</p>
          </button>

          <button
            onClick={() => setActiveView('notifications')}
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500 text-left space-y-1.5 transition group"
          >
            <Send className="w-5 h-5 text-blue-400" />
            <p className="text-white font-bold text-sm group-hover:text-blue-400 transition">Notificações Diárias</p>
            <p className="text-slate-400 text-[11px]">Configure avisos por e-mail e devocionais</p>
          </button>
        </div>
      </div>

    </div>
  );
};
