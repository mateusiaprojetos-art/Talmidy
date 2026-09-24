import React, { useState } from 'react';
import { Layers, HelpCircle, FileText, CheckCircle, Save, Plus } from 'lucide-react';

interface PardesConfig {
  level: 'peshat' | 'remez' | 'derash' | 'sod';
  title: string;
  hebrewTerm: string;
  meaning: string;
  objective: string;
  guidelines: string;
  structureTemplate: string;
  examples: string[];
}

export const PardesManagement: React.FC = () => {
  const [configs, setConfigs] = useState<PardesConfig[]>([
    {
      level: 'peshat',
      title: 'Peshat (Sentido Literal / Histórico)',
      hebrewTerm: 'פְּשָׁט',
      meaning: 'Sentido direto, gramatical e histórico do texto bíblico.',
      objective: 'Compreender o contexto gramatical, sintático e o sentido pretendido pelo autor original.',
      guidelines: 'Utilize concordâncias exatas do hebraico, dicionários exegéticos e contexto histórico do Antigo Oriente Próximo.',
      structureTemplate: '1. Leitura do Texto Original\n2. Contexto Histórico do Autor\n3. Análise Gramatical das Palavras-Chave',
      examples: ['Bereshit 1:1 - A criação cósmica em 6 dias segundo a narrativa bíblica.']
    },
    {
      level: 'remez',
      title: 'Remez (Sentido Alusivo / Alegórico)',
      hebrewTerm: 'רֶמֶז',
      meaning: 'Dica, alusão ou símbolo sutil contido nas letras, palavras ou estrutura.',
      objective: 'Descobrir padrões simbólicos, acrósticos e alusões messiânicas ou espirituais.',
      guidelines: 'Sempre fundamente as alusões em conexões textuais reais (Gematria lógica, parallels textuais).',
      structureTemplate: '1. Identificação de Palavras-Chave\n2. Alusões em Outras Partes do Tanakh\n3. Simbolismo Teológico',
      examples: ['A letra Bet (ב) em Bereshit aludindo às duas revelações (Torá Escrita e Torá Oral).']
    },
    {
      level: 'derash',
      title: 'Derash (Sentido Homilético / Prático)',
      hebrewTerm: 'דְּרַשׁ',
      meaning: 'Aplicação prática, moral, ética e ensino para a vida comunitária e individual.',
      objective: 'Extrair lições éticas e comportamentais relevantes para o cotidiano do crente.',
      guidelines: 'Faça pontes responsáveis entre o texto antigo e o mundo moderno sem violentar o contexto original.',
      structureTemplate: '1. Pergunta Ética Central\n2. Lição Moral do Texto\n3. Desafio e Ação Prática',
      examples: ['A guarda do Shabat como libertação do utilitarismo e da ansiedade secular.']
    },
    {
      level: 'sod',
      title: 'Sod (Sentido Místico / Profundo)',
      hebrewTerm: 'סוֹד',
      meaning: 'Mistério espiritual profundo, realidades escatológicas e o plano divino secreto.',
      objective: 'Contemplar os mistérios da vontade divina e revelações escatológicas manifestas.',
      guidelines: 'Trate o nível Sod com extrema reverência, sempre subordinado à integridade da revelação do Deus de Israel.',
      structureTemplate: '1. Revelação da Vontade Divina\n2. Paralelos Escatológicos na Brit Hadasha\n3. Contemplação Teológica',
      examples: ['A luz primordial em Bereshit 1:3 refletida na luz do Messias em João 8:12.']
    }
  ]);

  const [activeTab, setActiveTab] = useState<'peshat' | 'remez' | 'derash' | 'sod'>('peshat');
  const activeConfig = configs.find(c => c.level === activeTab)!;

  const handleUpdate = (field: keyof PardesConfig, value: any) => {
    setConfigs(prev => prev.map(c => c.level === activeTab ? { ...c, [field]: value } : c));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            Gerenciamento da Metodologia PaRDeS
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure as orientações, diretrizes exegéticas e modelos de estudo para os quatro níveis hermenêuticos.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {configs.map(c => (
          <button
            key={c.level}
            onClick={() => setActiveTab(c.level)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === c.level
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span className="font-serif text-sm">{c.hebrewTerm}</span>
            <span>{(c.title || '').split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Active Level Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs text-blue-400 font-mono uppercase font-bold">Nível Exegético</span>
            <h3 className="text-lg font-bold text-white">{activeConfig.title}</h3>
          </div>
          <span className="text-2xl font-serif text-blue-300 bg-blue-950/80 px-3 py-1 rounded-xl border border-blue-700/50">
            {activeConfig.hebrewTerm}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Significado Geral:</label>
            <input
              type="text"
              value={activeConfig.meaning}
              onChange={e => handleUpdate('meaning', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Objetivo Hermenêutico:</label>
            <input
              type="text"
              value={activeConfig.objective}
              onChange={e => handleUpdate('objective', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Diretrizes e Orientações aos Alunos:</label>
            <textarea
              rows={3}
              value={activeConfig.guidelines}
              onChange={e => handleUpdate('guidelines', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Estrutura Padrão do Modelo:</label>
            <textarea
              rows={3}
              value={activeConfig.structureTemplate}
              onChange={e => handleUpdate('structureTemplate', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono text-[11px] focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            onClick={() => alert(`Configurações de ${activeConfig.title} atualizadas com sucesso!`)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Alterações do Pardes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
