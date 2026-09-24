import React, { useState } from 'react';
import { PARASHOT_LIST } from '../data/parashotData';
import { Parasha } from '../types';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Calendar, Sparkles, Bookmark, Volume2 } from 'lucide-react';
import { playHebrewPronunciation, stopAllSpeech } from '../utils/speechUtils';

export const ParashaSection: React.FC = () => {
  const { setActiveView, addNote } = useAuth();
  const [selectedParasha, setSelectedParasha] = useState<Parasha>(PARASHOT_LIST[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'plan' | 'pardes'>('overview');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const handlePlayAudio = (id: string, hebrewText: string, transliteration: string) => {
    if (playingAudioId === id) {
      stopAllSpeech();
      setPlayingAudioId(null);
      return;
    }

    setPlayingAudioId(id);
    playHebrewPronunciation({
      hebrewText,
      transliteration,
      onStart: () => setPlayingAudioId(id),
      onEnd: () => setPlayingAudioId(null),
      onError: () => setPlayingAudioId(null)
    });
  };

  const handleSaveParashaNote = () => {
    addNote({
      title: `Estudo da Parashá: ${selectedParasha.namePt}`,
      content: `Porção da Torá: ${selectedParasha.toraRef}\nHaftará: ${selectedParasha.haftarahRef}\nBrit Hadasha: ${selectedParasha.britHadashaRef}\n\nResumo:\n${selectedParasha.summaryPt}`,
      tags: ['Parashá', selectedParasha.namePt],
      bibleRef: selectedParasha.toraRef,
      isFavorite: true
    });
    alert(`Estudo da Parashá ${selectedParasha.namePt} salvo em Minhas Anotações!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans text-[#34344e] dark:text-[#cbdad5]">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#566981] dark:text-[#89a7b1] font-bold text-xs uppercase tracking-widest">
              <Calendar className="w-4 h-4" /> Ciclo Anual de Leitura
            </div>
            <h1 className="text-3xl font-bold text-[#34344e] dark:text-[#cbdad5] font-sans mt-1">Parashat HaShavua (פָּרָשַׁת הַשָּׁבוּעַ)</h1>
            <p className="text-xs text-[#566981] dark:text-[#89a7b1] max-w-2xl mt-1">
              Acompanhe as 54 porções semanais da Torá estudadas pelas comunidades ao redor do mundo, conectadas às Haftarot e à Brit Hadasha.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveParashaNote}
              className="px-4 py-2.5 rounded-xl bg-[#cbdad5]/30 dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981] hover:bg-[#89a7b1]/30 transition text-xs font-semibold flex items-center gap-2"
            >
              <Bookmark className="w-4 h-4 text-[#566981] dark:text-[#89a7b1]" /> Salvar nas Anotações
            </button>
            <button
              onClick={() => setActiveView('generator')}
              className="px-4 py-2.5 rounded-xl bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] font-bold hover:bg-[#566981] transition text-xs shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Gerar Estudo
            </button>
          </div>
        </div>

        {/* Selector for Parashot */}
        <div className="pt-4 border-t border-[#89a7b1]/30 dark:border-[#566981] flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-[#566981] dark:text-[#89a7b1] whitespace-nowrap">Selecionar Parashá:</span>
          {PARASHOT_LIST.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedParasha(p)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition border ${selectedParasha.id === p.id ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] font-bold border-[#89a7b1] shadow' : 'bg-white dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border-[#89a7b1]/40 dark:border-[#566981] hover:bg-[#89a7b1]/20'}`}
            >
              {p.number ?? (idx + 1)}. {p.namePt} ({p.nameHebrew})
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Details & References (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-6 shadow-xl space-y-6">
            
            {/* Title Block */}
            <div className="pb-4 border-b border-[#89a7b1]/30 dark:border-[#566981] flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-[#566981] dark:text-[#89a7b1]">PARASHÁ # {selectedParasha.number} • {(selectedParasha.bookName || '').toUpperCase()}</span>
                <div className="flex items-center gap-3 mt-0.5">
                  <h2 className="text-2xl font-bold text-[#34344e] dark:text-[#cbdad5]">{selectedParasha.namePt}</h2>
                  <span className="text-2xl font-hebrew text-[#34344e] dark:text-[#cbdad5] font-bold leading-relaxed">{selectedParasha.nameHebrew}</span>
                  <button
                    onClick={() => handlePlayAudio(`parasha-${selectedParasha.id}`, selectedParasha.nameHebrew, selectedParasha.transliteration)}
                    className={`p-1.5 rounded-lg border transition ${
                      playingAudioId === `parasha-${selectedParasha.id}`
                        ? 'bg-[#566981] text-[#cbdad5] border-[#89a7b1] animate-pulse'
                        : 'bg-[#cbdad5]/30 dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border-[#89a7b1]/40 dark:border-[#566981] hover:bg-[#89a7b1]/30'
                    }`}
                    title="Ouvir pronúncia do nome em hebraico"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-[#566981] dark:text-[#89a7b1] mt-1">Transliteração: <span className="font-mono font-semibold">{selectedParasha.transliteration}</span></p>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981] text-xs font-bold">
                  {selectedParasha.hebDateApprox}
                </span>
              </div>
            </div>

            {/* Reading References Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981]">
                <p className="text-[10px] uppercase tracking-wider font-bold text-[#566981] dark:text-[#89a7b1]">1. Leitura da Torá</p>
                <p className="font-bold text-[#34344e] dark:text-[#cbdad5] text-sm mt-1">{selectedParasha.toraRef}</p>
                <p className="text-[11px] text-[#566981] dark:text-[#89a7b1] mt-0.5">Cinco Livros de Moisés</p>
              </div>

              <div className="p-4 rounded-xl bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981]">
                <p className="text-[10px] uppercase tracking-wider font-bold text-[#566981] dark:text-[#89a7b1]">2. Leitura da Haftará</p>
                <p className="font-bold text-[#34344e] dark:text-[#cbdad5] text-sm mt-1">{selectedParasha.haftarahRef}</p>
                <p className="text-[11px] text-[#566981] dark:text-[#89a7b1] mt-0.5">Os Profetas (Nevi'im)</p>
              </div>

              <div className="p-4 rounded-xl bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981]">
                <p className="text-[10px] uppercase tracking-wider font-bold text-[#566981] dark:text-[#89a7b1]">3. Brit Hadasha</p>
                <p className="font-bold text-[#34344e] dark:text-[#cbdad5] text-sm mt-1">{selectedParasha.britHadashaRef}</p>
                <p className="text-[11px] text-[#566981] dark:text-[#89a7b1] mt-0.5">Nova Aliança / Primeiro Século</p>
              </div>
            </div>

            {/* Navigation Sub-Tabs */}
            <div className="flex border-b border-[#89a7b1]/30 dark:border-[#566981] text-xs font-bold space-x-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2 border-b-2 transition ${activeTab === 'overview' ? 'border-[#566981] dark:border-[#89a7b1] text-[#34344e] dark:text-[#cbdad5]' : 'border-transparent text-[#566981] dark:text-[#89a7b1] hover:text-[#34344e]'}`}
              >
                Visão Geral & Temas
              </button>
              <button
                onClick={() => setActiveTab('pardes')}
                className={`pb-2 border-b-2 transition ${activeTab === 'pardes' ? 'border-[#566981] dark:border-[#89a7b1] text-[#34344e] dark:text-[#cbdad5]' : 'border-transparent text-[#566981] dark:text-[#89a7b1] hover:text-[#34344e]'}`}
              >
                Análise no Pardes
              </button>
              <button
                onClick={() => setActiveTab('plan')}
                className={`pb-2 border-b-2 transition ${activeTab === 'plan' ? 'border-[#566981] dark:border-[#89a7b1] text-[#34344e] dark:text-[#cbdad5]' : 'border-transparent text-[#566981] dark:text-[#89a7b1] hover:text-[#34344e]'}`}
              >
                Plano Semanal (Aliyot)
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-[#34344e] dark:text-[#cbdad5] mb-1">Resumo da Porção</h3>
                  <p className="text-xs text-[#34344e] dark:text-[#cbdad5]/90 leading-relaxed">{selectedParasha.summaryPt}</p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#34344e] dark:text-[#cbdad5] mb-2">Temas Principais</h3>
                  <div className="flex flex-wrap gap-2">
                    {(selectedParasha.keyThemes || []).map((theme, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-[#cbdad5]/30 dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1]/40 dark:border-[#566981] text-xs font-medium">
                        • {theme}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#89a7b1]/20 border border-[#566981] text-xs text-[#34344e] dark:text-[#cbdad5] space-y-1">
                  <p className="font-bold text-[#566981] dark:text-[#89a7b1]">Conexão com a Brit Hadasha:</p>
                  <p className="leading-relaxed">{selectedParasha.britHadashaConnection}</p>
                </div>
              </div>
            )}

            {/* Tab 2: Pardes Breakdown */}
            {activeTab === 'pardes' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981] space-y-1">
                  <p className="font-bold text-[#566981] dark:text-[#89a7b1]">1. PESHAT (Literal)</p>
                  <p className="text-[#34344e] dark:text-[#cbdad5]/90 leading-relaxed">{selectedParasha.pardesSummary.peshat}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981] space-y-1">
                  <p className="font-bold text-[#566981] dark:text-[#89a7b1]">2. REMEZ (Alusão)</p>
                  <p className="text-[#34344e] dark:text-[#cbdad5]/90 leading-relaxed">{selectedParasha.pardesSummary.remez}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981] space-y-1">
                  <p className="font-bold text-[#566981] dark:text-[#89a7b1]">3. DERASH (Rabínico / Ético)</p>
                  <p className="text-[#34344e] dark:text-[#cbdad5]/90 leading-relaxed">{selectedParasha.pardesSummary.derash}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981] space-y-1">
                  <p className="font-bold text-[#566981] dark:text-[#89a7b1]">4. SOD (Mistério Espiritual)</p>
                  <p className="text-[#34344e] dark:text-[#cbdad5]/90 leading-relaxed">{selectedParasha.pardesSummary.sod}</p>
                </div>
              </div>
            )}

            {/* Tab 3: Weekly Plan */}
            {activeTab === 'plan' && (
              <div className="space-y-3 text-xs">
                <p className="text-[#566981] dark:text-[#89a7b1]">Divida o estudo da Parashá em 7 etapas diárias (Aliyot) de Domingo a Shabat:</p>
                {(selectedParasha.weeklyPlan || []).map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] font-bold flex items-center justify-center shrink-0">
                        {step.day.substring(0, 3)}
                      </span>
                      <div>
                        <p className="font-bold text-[#34344e] dark:text-[#cbdad5]">{step.day}: Aliyá {step.aliyahNumber}</p>
                        <p className="text-[#566981] dark:text-[#89a7b1]">{step.ref}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#566981] dark:text-[#89a7b1] font-mono">{step.focusTopic}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Parashot Selector List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-4 shadow-md space-y-3">
            <h3 className="font-bold text-[#34344e] dark:text-[#cbdad5] text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#566981] dark:text-[#89a7b1]" />
              Todas as Parashot da Torá
            </h3>

            <div className="max-h-[500px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
              {PARASHOT_LIST.map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedParasha(p)}
                  className={`p-3 rounded-xl cursor-pointer transition border ${selectedParasha.id === p.id ? 'bg-[#89a7b1]/20 dark:bg-[#34344e] border-[#566981] text-[#34344e] dark:text-[#cbdad5] ring-1 ring-[#89a7b1]' : 'bg-[#cbdad5]/10 dark:bg-[#34344e]/50 border-[#89a7b1]/30 dark:border-[#566981] hover:border-[#89a7b1] text-[#34344e] dark:text-[#cbdad5]'}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs">{p.number ?? (idx + 1)}. {p.namePt}</span>
                    <span className="font-hebrew text-[#566981] dark:text-[#89a7b1] text-xs font-bold">{p.nameHebrew}</span>
                  </div>
                  <p className="text-[10px] text-[#566981] dark:text-[#89a7b1] mt-1">{p.toraRef || p.chumashRef}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

