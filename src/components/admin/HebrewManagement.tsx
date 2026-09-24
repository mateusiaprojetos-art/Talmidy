import React, { useState } from 'react';
import { Flame, Plus, Edit2, Trash2, Volume2, Award, BookOpen, CheckCircle, XCircle, Play } from 'lucide-react';
import { HebrewWord, HebrewLetter } from '../../types';
import { runHebrewValidationTests, TestResult } from '../../utils/hebrewUtils';

export const HebrewManagement: React.FC = () => {
  const [words, setWords] = useState<HebrewWord[]>([
    {
      id: 'w1',
      hebrew: 'שָׁלוֹם',
      transliteration: 'Shalom',
      pronunciation: 'sha-LOHM',
      translationPt: 'Paz, Plenitude, Saúde, Bem-estar',
      category: 'oracoes',
      root: 'ש-ל-מ (Shin-Lamed-Mem)',
      biblicalRef: 'Números 6:26',
      exampleSentenceHebrew: 'שָׁלוֹם עֲלֵיכֶם',
      exampleSentencePt: 'A paz esteja com vocês'
    },
    {
      id: 'w2',
      hebrew: 'תּוֹרָה',
      transliteration: 'Torah',
      pronunciation: 'toh-RAH',
      translationPt: 'Instrução, Ensino, Lei',
      category: 'tora',
      root: 'י-ר-ה (Yod-Resh-Heh - Instruir/Apontar)',
      biblicalRef: 'Deuteronômio 33:4',
      exampleSentenceHebrew: 'תּוֹרַת יְהוָה תְּמִימָה',
      exampleSentencePt: 'A instrução do Eterno é perfeita'
    }
  ]);

  const [testSuiteResults, setTestSuiteResults] = useState<{ allPassed: boolean; results: TestResult[] } | null>(null);

  const handleRunTests = () => {
    const res = runHebrewValidationTests();
    setTestSuiteResults(res);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-blue-400" />
            Gerenciamento do Hebraico Fácil
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Administre o alfabeto (Alef-Bet), vocabulário, raízes, pronúncias com áudio e atividades por níveis.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleRunTests}
            className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Executar Bateria de Testes de Hebraico</span>
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition">
            <Plus className="w-4 h-4" />
            <span>Cadastrar Nova Palavra</span>
          </button>
        </div>
      </div>

      {/* Validation Test Results Card */}
      {testSuiteResults && (
        <div className="bg-slate-900 border border-blue-900/80 rounded-2xl p-6 shadow-xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle className={`w-5 h-5 ${testSuiteResults.allPassed ? 'text-emerald-400' : 'text-red-400'}`} />
              <h3 className="font-bold text-white text-sm">
                Resultado do Teste de Validação em Hebraico (10/10 Requisitos)
              </h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${testSuiteResults.allPassed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'}`}>
              {testSuiteResults.allPassed ? '100% APROVADO' : 'FALHAS DETECTADAS'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {(testSuiteResults?.results || []).map((r, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                {r.passed ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold text-white">{idx + 1}. {r.name}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{r.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-white text-sm">Dicionário de Palavras e Termos Bíblicos</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {words.map(w => (
            <div key={w.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xl font-serif text-blue-300">{w.hebrew}</span>
                <span className="font-bold text-slate-300">{w.transliteration} ({w.pronunciation})</span>
              </div>
              <p className="text-blue-400 font-semibold">{w.translationPt}</p>
              <p className="text-slate-400"><strong>Raiz:</strong> {w.root}</p>
              <p className="text-slate-400"><strong>Ref. Bíblica:</strong> {w.biblicalRef}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
