import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, Plus, Edit, Trash2, CheckCircle, Save } from 'lucide-react';
import { Parasha, ShabbatTimes } from '../../types';

export const ParashotShabbatManagement: React.FC = () => {
  const [parashotList, setParashotList] = useState<Parasha[]>([
    {
      id: 'p1',
      number: 1,
      namePt: 'Bereshit',
      nameHebrew: 'בְּרֵאשִׁית',
      transliteration: 'Bereshit',
      bookId: 'b1',
      chumashRef: 'Gênesis 1:1 - 6:8',
      haftarahRef: 'Isaías 42:5 - 43:10',
      britHadashaRef: 'João 1:1-18; 1 Coríntios 15:35-58',
      hebrewDate: '27 de Tishrei',
      summary: 'A criação do mundo, de Adão e Eva, o Jardim do Éden, a queda, Caim e Abel e a genealogia até Noé.',
      mainThemes: ['Criação', 'Sábado', 'Responsabilidade humana', 'Genealogias'],
      peshat: 'Narrativa literal da criação e história dos patriarcas.',
      remez: 'Dica da revelação messiânica na palavra inicial.',
      derash: 'Lição sobre o cuidado com a criação e o próximo.',
      sod: 'Mistério da luz primordial.',
      connections: { neviim: 'Isaías 42', britHadasha: 'João 1' }
    }
  ]);

  const [shabbatTimes, setShabbatTimes] = useState<ShabbatTimes>({
    city: 'São Paulo, BR',
    dateCivil: '15/08/2026',
    dateHebrew: '2 de Elul, 5786',
    candleLighting: '17:38',
    havdalah: '18:31',
    parashaName: 'Re\'eh',
    haftarahRef: 'Isaías 54:11 - 55:5'
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Gerenciamento de Parashot & Horários de Shabat
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Cadastre lectionários semanais, Haftarot, leituras da Brit Hadasha e horários calculados de acendimento das velas.
          </p>
        </div>
      </div>

      {/* Shabbat Candle Lighting Config Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-blue-400 font-bold text-sm">
          <Clock className="w-4 h-4" />
          <span>Configuração Padrão dos Horários de Shabat</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Cidade Principal:</label>
            <input
              type="text"
              value={shabbatTimes.city}
              onChange={e => setShabbatTimes({ ...shabbatTimes, city: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Acendimento das Velas (Entrada):</label>
            <input
              type="text"
              value={shabbatTimes.candleLighting}
              onChange={e => setShabbatTimes({ ...shabbatTimes, candleLighting: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Havdalá (Saída de Shabat):</label>
            <input
              type="text"
              value={shabbatTimes.havdalah}
              onChange={e => setShabbatTimes({ ...shabbatTimes, havdalah: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Parashot List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-white text-sm">Lista de Parashot Cadastradas</h3>
        {parashotList.map(p => (
          <div key={p.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-blue-400 font-bold">Parashá #{p.number}: {p.namePt} ({p.nameHebrew})</span>
                <p className="text-slate-400">{p.chumashRef}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">Publicada</span>
            </div>
            <p className="text-slate-300">{p.summary}</p>
            <div className="flex items-center gap-4 text-slate-400 text-[11px] pt-1">
              <span><strong>Haftará:</strong> {p.haftarahRef}</span>
              <span><strong>Brit Hadasha:</strong> {p.britHadashaRef}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
