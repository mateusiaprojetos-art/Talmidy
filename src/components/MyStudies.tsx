import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { generatePdfWithoutSlides, generatePdfWithSlides, downloadTxt } from '../utils/pdfGenerator';
import { FormattedStudyContent } from './FormattedStudyContent';
import { FileText, Download, Trash2, Search, Sparkles, Layers, BookOpen, ArrowRight, Eye, X } from 'lucide-react';
import { StudyMaterial } from '../types';

export const MyStudies: React.FC = () => {
  const { savedStudies, deleteStudyMaterial, setActiveView } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudy, setSelectedStudy] = useState<StudyMaterial | null>(null);

  const filtered = (savedStudies || []).filter(s =>
    (s.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.topic || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.mode || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Biblioteca Pessoal</span>
            <h1 className="text-3xl font-bold text-white font-sans mt-1">Meus Estudos & Materiais Gerados</h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Acesse seus estudos salvos, baixe em PDF de Apostila ou PDF de Slides e exporte em TXT a qualquer momento.
            </p>
          </div>

          <button
            onClick={() => setActiveView('generator')}
            className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition text-xs shadow-md flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Criar Novo Estudo
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-5" />
          <input
            type="text"
            placeholder="Buscar estudos por título ou tema..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Grid of Saved Studies */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(study => (
            <div key={study.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800">
                    {(study.mode || '').toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(study.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">{study.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{study.subtitle || study.topic}</p>

                <button
                  onClick={() => setSelectedStudy(study)}
                  className="w-full py-2 px-3 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/60 text-xs font-bold transition flex items-center justify-center gap-1.5 mt-2"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-300" /> Leitura & Estudo
                </button>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => generatePdfWithoutSlides(study)}
                    className="flex-1 py-2 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center justify-center gap-1"
                    title="Baixar Apostila PDF"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" /> Apostila
                  </button>

                  <button
                    onClick={() => generatePdfWithSlides(study)}
                    className="flex-1 py-2 px-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center justify-center gap-1 shadow-md"
                    title="Baixar Slides PDF"
                  >
                    <Download className="w-3.5 h-3.5" /> Slides PDF
                  </button>

                  <button
                    onClick={() => downloadTxt(study)}
                    className="py-2 px-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white text-xs transition"
                    title="Exportar TXT"
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => deleteStudyMaterial(study.id)}
                    className="py-2 px-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition"
                    title="Excluir Estudo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4 shadow-xl">
          <FileText className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">Nenhum estudo encontrado</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Você ainda não possui estudos salvos ou nenhum resultado corresponde à sua busca.
          </p>
          <button
            onClick={() => setActiveView('generator')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition text-xs shadow-md"
          >
            Gerar Primeiro Estudo
          </button>
        </div>
      )}

      {/* Selected Study Modal Reader */}
      {selectedStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{selectedStudy.mode} • {selectedStudy.depthLevel}</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{selectedStudy.title}</h3>
                <p className="text-xs text-slate-400">{selectedStudy.subtitle || selectedStudy.topic}</p>
              </div>
              <button
                onClick={() => setSelectedStudy(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-slate-900">
              <FormattedStudyContent content={selectedStudy.contentMarkdown} />
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-wrap justify-between items-center gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => generatePdfWithoutSlides(selectedStudy)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" /> Apostila PDF
                </button>
                <button
                  onClick={() => generatePdfWithSlides(selectedStudy)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" /> Slides PDF
                </button>
                <button
                  onClick={() => downloadTxt(selectedStudy)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" /> TXT
                </button>
              </div>

              <button
                onClick={() => setSelectedStudy(null)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
              >
                Fechar Leitura
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
