import React, { useState } from 'react';
import { Sparkles, FileText, Layout, Save } from 'lucide-react';

export const StudyGeneratorAdmin: React.FC = () => {
  const [pdfTemplateConfig, setPdfTemplateConfig] = useState({
    fontFamily: 'Calibri, sans-serif',
    logoText: 'Talmidim Academy',
    headerText: 'Academia Digital de Estudos Bíblicos e Hermenêutica PaRDeS',
    footerText: 'www.talmidimacademy.com.br - Todos os direitos reservados',
    showSlideNumbering: true,
    primaryBrandColor: '#f59e0b'
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            Configuração do Gerador de Estudos & PDF/Slides
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure modelos de inteligência artificial Gemini 3.6, prompts internos e a identidade visual dos arquivos PDF/Slides.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <h3 className="font-bold text-white text-sm pb-3 border-b border-slate-800 flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-400" />
          <span>Configuração de Templates PDF & Slides</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Fonte Principal dos Documentos:</label>
            <input
              type="text"
              readOnly
              value={pdfTemplateConfig.fontFamily}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-blue-300 font-mono font-bold cursor-not-allowed"
            />
            <p className="text-[10px] text-slate-500 mt-1">Fonte oficial Calibri travada conforme especificação técnica.</p>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Logotipo do Cabeçalho:</label>
            <input
              type="text"
              value={pdfTemplateConfig.logoText}
              onChange={e => setPdfTemplateConfig({ ...pdfTemplateConfig, logoText: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Texto do Cabeçalho:</label>
            <input
              type="text"
              value={pdfTemplateConfig.headerText}
              onChange={e => setPdfTemplateConfig({ ...pdfTemplateConfig, headerText: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Texto do Rodapé:</label>
            <input
              type="text"
              value={pdfTemplateConfig.footerText}
              onChange={e => setPdfTemplateConfig({ ...pdfTemplateConfig, footerText: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            onClick={() => alert('Configurações do gerador e templates PDF salvos!')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Modelos de Exportação</span>
          </button>
        </div>
      </div>
    </div>
  );
};
