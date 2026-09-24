import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen,
  Sparkles,
  Flame,
  Calendar,
  Languages,
  Book,
  Heart,
  Bot,
  ArrowRight,
  Clock,
  Layers,
  FileText,
  Award
} from 'lucide-react';
import { calculateShabbatTimes } from '../utils/shabbatCalculator';

interface HeroProps {
  onOpenAuth: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth }) => {
  const { setActiveView, isAuthenticated, shabbatCity } = useAuth();
  const shabbatTimes = calculateShabbatTimes(shabbatCity);

  return (
    <div className="bg-slate-50 dark:bg-[#070c1a] text-slate-900 dark:text-slate-100 pt-10 pb-20 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Top Title & Tagline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Flame className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Torá • Pardes • Parashá • Shabat • Hebraico • Brit Hadasha
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-blue-950 dark:text-white leading-tight font-sans">
            TALMIDIM ACADEMY
          </h1>

          <p className="text-xl sm:text-2xl text-blue-800 dark:text-blue-300 font-bold">
            Academia Digital de Estudos das Escrituras
          </p>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Estude a Torá, os Profetas, os Escritos e a Brit Hadasha através do método Pardes, abordagens tradicionais e comparativas em uma plataforma educacional limpa, moderna e estruturada.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveView('bible')}
              className="px-7 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold transition shadow-md hover:shadow-lg text-sm flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              COMEÇAR ESTUDO
            </button>

            <button
              onClick={() => setActiveView('pardes')}
              className="px-7 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 font-bold border-2 border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 transition text-sm flex items-center gap-2 shadow-sm"
            >
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              CONHECER A ACADEMIA
            </button>

            {!isAuthenticated && (
              <button
                onClick={onOpenAuth}
                className="px-7 py-3.5 rounded-xl bg-slate-900 dark:bg-blue-950 text-white font-bold hover:bg-slate-800 dark:hover:bg-blue-900 transition text-sm shadow-sm border border-transparent dark:border-blue-800"
              >
                ENTRAR OU CADASTRAR-SE
              </button>
            )}
          </div>
        </div>

        {/* Live Status Summary Banner */}
        <div className="mt-14 bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-blue-900/50 rounded-2xl p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 dark:bg-blue-600 text-white flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider font-bold">Parashat HaShavua</p>
              <p className="font-bold text-blue-950 dark:text-white text-sm">Bereshit (בְּרֵאשִׁית)</p>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">Gênesis 1:1 - 6:8</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 dark:bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider font-bold">Próximo Shabat ({(shabbatCity || 'São Paulo').split(',')[0]})</p>
              <p className="font-bold text-blue-900 dark:text-amber-300 text-sm">Velas: {shabbatTimes.candleLighting} • Havdalá: {shabbatTimes.havdalah}</p>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">{shabbatTimes.dateCivil}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 dark:bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider font-bold">Calendário Judaico</p>
              <p className="font-bold text-blue-950 dark:text-white text-sm">23 de Tishrei, 5786</p>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">Ano de Estudos Ativo</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 dark:bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider font-bold">Palavra do Dia em Hebraico</p>
              <p className="font-bold text-blue-900 dark:text-blue-300 text-sm">שָׁלוֹם (Shalom)</p>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">Paz, Plenitude e Bem-Estar</p>
            </div>
          </div>
        </div>

        {/* Clean Minimalist Cards Grid */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-2xl font-bold text-blue-950 dark:text-white tracking-tight flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-500"></span>
                Recursos Principais da Academia
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Selecione um módulo para iniciar o seu aprendizado</p>
            </div>
            <span className="text-xs text-blue-700 dark:text-blue-300 font-bold bg-blue-50 dark:bg-blue-950/80 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
              Módulos Ativos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            
            {/* 1. Estudo de Hoje */}
            <div
              onClick={() => setActiveView('daily')}
              className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl p-5 cursor-pointer transition group shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3 group-hover:bg-blue-700 group-hover:text-white transition">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-blue-950 dark:text-white text-base mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
                  Estudo de Hoje
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Seu plano diário com leitura bíblica, palavra em hebraico e devocional.
                </p>
              </div>
              <span className="text-xs text-blue-700 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                Iniciar Estudo <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* 2. Parashat HaShavua */}
            <div
              onClick={() => setActiveView('parasha')}
              className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl p-5 cursor-pointer transition group shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3 group-hover:bg-blue-700 group-hover:text-white transition">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-blue-950 dark:text-white text-base mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
                  Parashat HaShavua
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Acompanhe a porção semanal da Torá com análises em modo Pardes completo.
                </p>
              </div>
              <span className="text-xs text-blue-700 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                Estudar Parashá <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* 3. Calendário Judaico */}
            <div
              onClick={() => setActiveView('calendar')}
              className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl p-5 cursor-pointer transition group shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3 group-hover:bg-blue-700 group-hover:text-white transition">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-blue-950 dark:text-white text-base mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
                  Calendário Judaico
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Sincronismo entre datas hebraicas e civis, contagem de meses e festas bíblicas.
                </p>
              </div>
              <span className="text-xs text-blue-700 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                Ver Calendário <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* 4. Próximo Shabat */}
            <div
              onClick={() => setActiveView('shabbat')}
              className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl p-5 cursor-pointer transition group shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3 group-hover:bg-blue-700 group-hover:text-white transition">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-blue-950 dark:text-white text-base mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
                  Próximo Shabat
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Horários precisos de acendimento de velas e Havdalá para sua região.
                </p>
              </div>
              <span className="text-xs text-blue-700 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                Ver Horários <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* 5. Palavra do Dia */}
            <div
              onClick={() => setActiveView('daily')}
              className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl p-5 cursor-pointer transition group shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3 group-hover:bg-blue-700 group-hover:text-white transition">
                  <Languages className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-blue-950 dark:text-white text-base mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
                  Palavra do Dia
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Vocabulário bíblico diário com raiz hebraica, pronúncia e aplicação.
                </p>
              </div>
              <span className="text-xs text-blue-700 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                Ver Palavra <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* 6. Oração do Dia */}
            <div
              onClick={() => setActiveView('shema')}
              className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl p-5 cursor-pointer transition group shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3 group-hover:bg-blue-700 group-hover:text-white transition">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-blue-950 dark:text-white text-base mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
                  Oração do Dia
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Tefilot e bênçãos diárias com texto em hebraico, transliteração e tradução.
                </p>
              </div>
              <span className="text-xs text-blue-700 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                Ver Orações <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* 7. Shema Israel */}
            <div
              onClick={() => setActiveView('shema')}
              className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl p-5 cursor-pointer transition group shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3 group-hover:bg-blue-700 group-hover:text-white transition">
                  <Book className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-blue-950 dark:text-white text-base mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
                  Shema Israel
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Estudo aprofundado versículo por versículo de Deuteronômio 6:4-9.
                </p>
              </div>
              <span className="text-xs text-blue-700 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                Estudar o Shema <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* 8. Hebraico Fácil */}
            <div
              onClick={() => setActiveView('hebrew')}
              className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl p-5 cursor-pointer transition group shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3 group-hover:bg-blue-700 group-hover:text-white transition">
                  <Languages className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-blue-950 dark:text-white text-base mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
                  Hebraico Fácil
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Curso estruturado do alfabeto hebraico a gramática e leitura bíblica.
                </p>
              </div>
              <span className="text-xs text-blue-700 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                Aprender Hebraico <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* 9. Cursos */}
            <div
              onClick={() => setActiveView('courses')}
              className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl p-5 cursor-pointer transition group shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3 group-hover:bg-blue-700 group-hover:text-white transition">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-blue-950 dark:text-white text-base mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
                  Academia de Cursos
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Cursos sequenciais sobre Teologia Bíblica, Contexto Histórico e Pardes.
                </p>
              </div>
              <span className="text-xs text-blue-700 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                Ver Cursos <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* 10. Meus Estudos */}
            <div
              onClick={() => setActiveView('mystudies')}
              className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl p-5 cursor-pointer transition group shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3 group-hover:bg-blue-700 group-hover:text-white transition">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-blue-950 dark:text-white text-base mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
                  Meus Estudos
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Seu acervo de apostilas salvas, anotações e histórico de aprendizado.
                </p>
              </div>
              <span className="text-xs text-blue-700 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                Acessar Acervo <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
