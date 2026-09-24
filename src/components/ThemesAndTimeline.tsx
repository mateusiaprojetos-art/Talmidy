import React, { useState } from 'react';
import { BIBLICAL_THEMES as KEY_THEMES, HISTORICAL_TIMELINE, BIBLICAL_CHARACTERS } from '../data/bibleData';
import { Clock, BookOpen, Users } from 'lucide-react';

export const ThemesAndTimeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'themes' | 'characters'>('timeline');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Pano de Fundo Histórico & Teológico</span>
          <h1 className="text-3xl font-bold text-white font-sans mt-1">Linha do Tempo, Temas & Personagens</h1>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Compreenda a evolução histórica do período do Segundo Templo, os grandes temas transversais do Tanakh e o perfil dos patriarcas, profetas e apóstolos.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-slate-800 pt-4 gap-2">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'timeline' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
          >
            <Clock className="w-4 h-4" /> LINHA DO TEMPO HISTÓRICA
          </button>
          <button
            onClick={() => setActiveTab('themes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'themes' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
          >
            <BookOpen className="w-4 h-4" /> TEMAS CHAVE
          </button>
          <button
            onClick={() => setActiveTab('characters')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'characters' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
          >
            <Users className="w-4 h-4" /> PERSONAGENS BÍBLICOS
          </button>
        </div>
      </div>

      {/* Tab 1: Timeline */}
      {activeTab === 'timeline' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
            Cronologia do Período do Segundo Templo & História de Israel
          </h2>

          <div className="relative border-l-2 border-amber-500/40 ml-4 space-y-8 pl-6">
            {HISTORICAL_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-slate-900 shadow" />
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1 hover:border-amber-500/50 transition">
                  <span className="text-xs font-bold text-amber-400 font-mono">{item.dates}</span>
                  <h3 className="text-base font-bold text-white">{item.period}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Themes */}
      {activeTab === 'themes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {KEY_THEMES.map(t => (
            <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-lg">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h3 className="text-lg font-bold text-white">{t.title}</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{t.description}</p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <p className="font-bold text-amber-400">Referências Bíblicas:</p>
                <p className="text-slate-400 font-mono mt-0.5">{t.refs}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Characters */}
      {activeTab === 'characters' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BIBLICAL_CHARACTERS.map(c => (
            <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-lg">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <div>
                  <h3 className="text-lg font-bold text-white">{c.name}</h3>
                  <p className="text-xs text-amber-400 font-medium">Significado: {c.meaning}</p>
                </div>
                <span className="text-xl font-hebrew text-amber-300 font-bold">{c.hebrew}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{c.summary}</p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <p className="font-bold text-amber-400">Referências:</p>
                <p className="text-slate-300 mt-0.5">{c.refs}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
