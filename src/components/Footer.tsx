import React from 'react';
import { BookOpen, Send, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Footer: React.FC = () => {
  const { setActiveView } = useAuth();

  return (
    <footer className="bg-[#34344e] text-[#cbdad5] border-t border-[#566981] pt-12 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#566981]">
          
          {/* Brand & Subtitle */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3a415a] flex items-center justify-center text-[#cbdad5] font-bold shadow-md border border-[#566981]">
                <BookOpen className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-bold text-xl text-white">Talmidim Academy</span>
                <p className="text-xs text-[#89a7b1] font-medium">Academia Digital de Estudos das Escrituras</p>
              </div>
            </div>

            <p className="text-xs text-[#cbdad5]/80 leading-relaxed pr-4">
              Dedicação ao estudo, aprendizado e aprofundamento das Escrituras (Torá, Nevi'im, Ketuvim e Brit Hadasha) através dos métodos Pardes, Tradicional e Comparativo.
            </p>

            <div className="pt-2 text-xs font-semibold text-[#89a7b1] tracking-wide">
              Torá • Pardes • Parashá • Shabat • Hebraico • Brit Hadasha
            </div>
          </div>

          {/* Column 1: Estudos */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 tracking-wide">Estudos Bíblicos</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveView('tora')} className="hover:text-white transition">Torá (תּוֹרָה)</button></li>
              <li><button onClick={() => setActiveView('neviim')} className="hover:text-white transition">Profetas (Nevi'im)</button></li>
              <li><button onClick={() => setActiveView('ketuvim')} className="hover:text-white transition">Escritos (Ketuvim)</button></li>
              <li><button onClick={() => setActiveView('brit_hadasha')} className="hover:text-white transition">Brit Hadasha</button></li>
              <li><button onClick={() => setActiveView('pardes')} className="hover:text-white transition">Método Pardes</button></li>
              <li><button onClick={() => setActiveView('parasha')} className="hover:text-white transition">Parashat HaShavua</button></li>
            </ul>
          </div>

          {/* Column 2: Ferramentas & Hebraico */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 tracking-wide">Ferramentas</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveView('hebrew')} className="hover:text-white transition">Curso Hebraico Fácil</button></li>
              <li><button onClick={() => setActiveView('generator')} className="hover:text-white transition">Gerador de Estudos</button></li>
              <li><button onClick={() => setActiveView('ia')} className="hover:text-white transition">Professor Talmidim (IA)</button></li>
              <li><button onClick={() => setActiveView('calendar')} className="hover:text-white transition">Calendário Judaico</button></li>
              <li><button onClick={() => setActiveView('shema')} className="hover:text-white transition">Shema Israel & Orações</button></li>
              <li><button onClick={() => setActiveView('courses')} className="hover:text-white transition">Academia de Cursos</button></li>
            </ul>
          </div>

          {/* Column 3: Notificações & Suporte */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 tracking-wide">Notificações Diárias</h4>
            <p className="text-xs text-[#cbdad5]/80 mb-3 leading-snug">
              Receba diariamente a Palavra do Dia, estudo da Parashá e lembretes de Shabat por e-mail.
            </p>
            <button
              onClick={() => setActiveView('notifications')}
              className="w-full py-2 px-3 rounded-lg bg-[#3a415a] text-[#cbdad5] border border-[#566981] hover:bg-[#566981] font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5 text-[#89a7b1]" />
              Configurar Preferências
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[#89a7b1] gap-3">
          <p>© {new Date().getFullYear()} Talmidim Academy. Todos os direitos reservados.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#cbdad5]" /> Plataforma Segura</span>
            <button onClick={() => setActiveView('home')} className="hover:text-white">Início</button>
            <button onClick={() => setActiveView('notifications')} className="hover:text-white">Notificações</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
