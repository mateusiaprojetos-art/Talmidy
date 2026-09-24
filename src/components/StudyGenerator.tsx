import React, { useState } from 'react';
import { StudyMode, StudyMaterial, Slide } from '../types';
import { useAuth } from '../context/AuthContext';
import { generatePdfWithoutSlides, generatePdfWithSlides, downloadTxt } from '../utils/pdfGenerator';
import { FormattedStudyContent } from './FormattedStudyContent';
import { Sparkles, Download, Layers, Save, FileText, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export const StudyGenerator: React.FC = () => {
  const { saveStudyMaterial, setActiveView } = useAuth();
  const [topic, setTopic] = useState<string>('Gênesis 1:1 - A Criação do Universo');
  const [mode, setMode] = useState<StudyMode>('pardes');
  const [depthLevel, setDepthLevel] = useState<'Iniciante' | 'Intermediário' | 'Avançado' | 'Erudito'>('Intermediário');
  const [targetAudience, setTargetAudience] = useState<string>('Estudantes e Discípulos');
  const [includeHebrew, setIncludeHebrew] = useState<boolean>(true);
  const [includeSlides, setIncludeSlides] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [generatedStudy, setGeneratedStudy] = useState<StudyMaterial | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;

    setLoading(true);
    setGeneratedStudy(null);

    try {
      const res = await fetch('/api/gemini/generate-study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          bibleRef: topic,
          mode,
          depthLevel,
          targetAudience,
          includeHebrew,
          includeSlides
        })
      });

      const data = await res.json();
      if (data.success) {
        const newStudy: StudyMaterial = {
          id: `std_${Date.now()}`,
          title: `Estudo: ${topic}`,
          subtitle: `Aprofundamento no Modo ${(mode || '').toUpperCase()} (${depthLevel})`,
          topic,
          mode,
          depthLevel,
          targetAudience,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          contentMarkdown: data.contentMarkdown,
          slides: data.slides || []
        };
        setGeneratedStudy(newStudy);
        saveStudyMaterial(newStudy);
      } else {
        alert(data.error || 'Erro ao gerar estudo com IA.');
      }
    } catch (err: any) {
      alert('Falha na comunicação com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Inteligência Artificial Erudita</span>
          <h1 className="text-3xl font-bold text-white font-sans mt-1">Gerador de Estudos & Slides em PDF</h1>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Gere apostilas completas em formato PDF ou TXT e apresentações de slides estruturadas com base nos métodos Pardes, Tradicional ou Comparativo.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Parameters (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> Parâmetros do Estudo
          </h2>

          <form onSubmit={handleGenerate} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Tema ou Passagem Bíblica:</label>
              <input
                type="text"
                required
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="Ex: Isaías 53, A Parashá Bereshit, O Shema..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Método / Abordagem de Estudo:</label>
              <select
                value={mode}
                onChange={e => setMode(e.target.value as StudyMode)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-blue-300 font-bold focus:outline-none focus:border-blue-500"
              >
                <option value="pardes">Método Pardes (Peshat, Remez, Derash, Sod)</option>
                <option value="traditional">Abordagem Tradicional Rabínica</option>
                <option value="comparative">Abordagem Comparativa</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Nível de Profundidade:</label>
                <select
                  value={depthLevel}
                  onChange={e => setDepthLevel(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                >
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                  <option value="Erudito">Erudito</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Público Alvo:</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={e => setTargetAudience(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={includeHebrew}
                  onChange={e => setIncludeHebrew(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                />
                Incluir texto hebraico com transliteração e raízes
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={includeSlides}
                  onChange={e => setIncludeSlides(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                />
                Gerar estrutura de slides de apresentação
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition shadow-lg text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Gerando Estudo no Pardes...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Gerar Estudo Agora
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Output Preview & Downloads (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {generatedStudy ? (
            <div className="bg-slate-900 border border-blue-500/40 rounded-2xl p-6 shadow-xl space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{generatedStudy.mode} • {generatedStudy.depthLevel}</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{generatedStudy.title}</h3>
                  <p className="text-xs text-slate-400">{generatedStudy.subtitle}</p>
                </div>

                {/* Download Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => generatePdfWithoutSlides(generatedStudy)}
                    className="px-3 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 hover:bg-blue-500/30 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF Apostila
                  </button>

                  <button
                    onClick={() => generatePdfWithSlides(generatedStudy)}
                    className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 text-xs font-bold transition flex items-center gap-1.5 shadow"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF Slides
                  </button>

                  <button
                    onClick={() => downloadTxt(generatedStudy)}
                    className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" /> TXT
                  </button>
                </div>
              </div>

              {/* Formatted Study Content Preview */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 max-h-[450px] overflow-y-auto">
                <FormattedStudyContent content={generatedStudy.contentMarkdown} />
              </div>

              {/* Slides Preview if available */}
              {generatedStudy.slides && generatedStudy.slides.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Estrutura dos Slides ({generatedStudy.slides.length} slides):</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {generatedStudy.slides.map(s => (
                      <div key={s.slideNumber} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold text-blue-400">Slide {s.slideNumber}</span>
                        <p className="font-bold text-white text-xs">{s.title}</p>
                        <ul className="text-[11px] text-slate-400 list-disc list-inside">
                          {(s.bullets || []).map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveView('mystudies')}
                  className="text-xs text-blue-400 font-bold hover:underline flex items-center gap-1"
                >
                  Ver todos em Meus Estudos <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Pronto para Gerar seu Estudo</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Preencha o tema ao lado e escolha o método. A IA do Professor Talmidim preparará o conteúdo erudito e a estrutura de slides para você.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
