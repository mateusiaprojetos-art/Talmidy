import React, { useState } from 'react';
import { StudyMode } from '../types';
import { useAuth } from '../context/AuthContext';
import { Layers, BookOpen, Sparkles, CheckCircle2, HelpCircle, ShieldAlert } from 'lucide-react';

export const PardesView: React.FC = () => {
  const { setActiveView } = useAuth();
  const [selectedMode, setSelectedMode] = useState<StudyMode>('pardes');
  const [selectedSample, setSelectedSample] = useState<'bereshit' | 'shema' | 'isaiah'>('bereshit');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Hermenêutica Hebraica</span>
            <h1 className="text-3xl font-bold text-white font-sans mt-1">O Método Pardes (פַּרְדֵּס)</h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Pardes significa "Pomar" em hebraico e é o acrônimo dos quatro níveis de interpretação das Escrituras: Peshat, Remez, Derash e Sod.
            </p>
          </div>

          <button
            onClick={() => setActiveView('generator')}
            className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition text-xs shadow-md flex items-center gap-2 self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4" /> Gerar Estudo no Pardes
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
          <button
            onClick={() => setSelectedMode('pardes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${selectedMode === 'pardes' ? 'bg-blue-600 text-white shadow' : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'}`}
          >
            <Layers className="w-4 h-4" /> MODO PARDES
          </button>
          <button
            onClick={() => setSelectedMode('traditional')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${selectedMode === 'traditional' ? 'bg-blue-600 text-white shadow' : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'}`}
          >
            <BookOpen className="w-4 h-4" /> MODO TRADICIONAL
          </button>
          <button
            onClick={() => setSelectedMode('comparative')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${selectedMode === 'comparative' ? 'bg-blue-600 text-white shadow' : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'}`}
          >
            <Sparkles className="w-4 h-4" /> MODO COMPARATIVO
          </button>
        </div>
      </div>

      {/* Distinction Mandate Card */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-amber-300 uppercase tracking-wide text-[11px]">Princípio Fundamental da Talmidim Academy</p>
          <p className="mt-0.5 leading-relaxed">
            Mantemos rigorosa separação entre <strong className="text-white">O Texto Bíblico</strong>, <strong className="text-white">A Tradição</strong>, <strong className="text-white">O Comentário Rabínico</strong> e <strong className="text-white">A Hipótese Interpretativa</strong>. Nenhuma camada allegórica (Sod/Derash) pode anular a verdade histórica e literal do texto (Peshat).
          </p>
        </div>
      </div>

      {/* 4 Levels Grid */}
      {selectedMode === 'pardes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* PESHAT */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">NÍVEL 1</span>
              <span className="text-lg font-hebrew text-amber-400 font-bold">פְּשָׁט (Peshat)</span>
            </div>
            <h3 className="text-lg font-bold text-white">Sentido Simples e Literal</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              O significado histórico, gramatical e direto do texto dentro do seu contexto histórico e literário imediato. Responde às perguntas: Quem escreveu? Para quem? O que o texto diz objetivamente?
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Análise gramatical do vocabulário hebraico</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Contexto do Israel e Próximo Oriente Antigo</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Narrativa histórica sem alegorias forçadas</li>
            </ul>
          </div>

          {/* REMEZ */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">NÍVEL 2</span>
              <span className="text-lg font-hebrew text-amber-400 font-bold">רֶמֶז (Remez)</span>
            </div>
            <h3 className="text-lg font-bold text-white">Alusões, Símbolos e Padrões</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              O significado alegórico ou alusivo. Revela conexões cruzadas, repetições intencionais de palavras-chave, paralelismos poéticos e valores numéricos (Gematria).
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Tipologias e sombras messiânicas</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Referências cruzadas entre Tanakh e Brit Hadasha</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Padrões numéricos e estruturais</li>
            </ul>
          </div>

          {/* DERASH */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">NÍVEL 3</span>
              <span className="text-lg font-hebrew text-amber-400 font-bold">דְּרַשׁ (Derash)</span>
            </div>
            <h3 className="text-lg font-bold text-white">Interpretação e Comentários</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A aplicação homilética, ética e prática. Inclui a tradição rabínica (Talmud, Midrash, Rashi, Ramban) e ensinamentos aplicados à vida ética e à conduta da comunidade.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Comentários e tradições judaicas históricas</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Aplicações éticas para a vida comunitária</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Parábolas e sermões ilustrativos</li>
            </ul>
          </div>

          {/* SOD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">NÍVEL 4</span>
              <span className="text-lg font-hebrew text-amber-400 font-bold">סוֹד (Sod)</span>
            </div>
            <h3 className="text-lg font-bold text-white">Segredos e Mistérios Profundos</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              O mistério interior oculto. Refere-se à dimensão espiritual mais profunda, contemplação da divindade, o Olam HaBa (Mundo Vindouro) e a união da alma com o Criador.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dimensão espiritual e interior do mandamento</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Realidades do Reino Celestial</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Contemplação da Glória Divina (Shekhinah)</li>
            </ul>
          </div>

        </div>
      )}

      {selectedMode === 'traditional' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-white">Abordagem Tradicional dos Estudos</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            No Modo Tradicional, o estudo foca no texto bíblico direto acompanhado pelas exegeses clássicas das escolas judaicas de estudo (Bet Hillel, Bet Shammai, Rashi, Ramban, Ibn Ezra) respeitando a transmissão oral histórica.
          </p>
        </div>
      )}

      {selectedMode === 'comparative' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-white">Abordagem Comparativa</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            O Modo Comparativo coloca lado a lado a interpretação pelo Pardes, a interpretação tradicional e o contexto histórico do Segundo Templo para destacar convergências, divergências e riquezas textuais sem impor leituras dogmáticas únicas.
          </p>
        </div>
      )}

    </div>
  );
};
