import React, { useState } from 'react';
import { Calendar, Flame, Plus, Edit, Trash2 } from 'lucide-react';
import { Holiday } from '../../types';

export const CalendarHolidaysManagement: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([
    {
      id: 'h1',
      namePt: 'Pessach (Páscoa Bíblica)',
      nameHebrew: 'פֶּסַח',
      transliteration: 'Pesach',
      hebrewDate: '14 de Nissan',
      civilDateApprox: 'Março/Abril',
      originText: 'Êxodo 12',
      significance: 'Comemoração da libertação do povo de Israel do Egito pela mão forte do Eterno.',
      biblicalRefs: ['Êxodo 12:1-28', 'Levítico 23:5'],
      practices: ['Remoção do fermento (Chametz)', 'Jantar de Seder', 'Ervas amargas e pão ázimo'],
      pardesSummary: 'No nível Sod, simboliza a redenção final pelo Cordeiro de Deus.',
      connectionsBritHadasha: 'Lucas 22:7-20; 1 Coríntios 5:7'
    },
    {
      id: 'h2',
      namePt: 'Shavuot (Festa das Semanas / Pentecostes)',
      nameHebrew: 'שָׁבוּעוֹת',
      transliteration: 'Shavuot',
      hebrewDate: '6 de Sivan',
      civilDateApprox: 'Maio/Junho',
      originText: 'Êxodo 19; Levítico 23:15-21',
      significance: 'Entrega da Torá no Monte Sinai e derramamento da Ruach HaKodesh.',
      biblicalRefs: ['Êxodo 19', 'Atos 2'],
      practices: ['Estudo noturno da Torá (Tikkun Leil Shavuot)', 'Leitura do Livro de Rute'],
      pardesSummary: 'Aliança renovada inscrita no coração humano.',
      connectionsBritHadasha: 'Atos 2:1-4'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            Gerenciamento do Calendário Judaico & Festas Bíblicas
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Administre festas moadim (Pessach, Chag HaMatzot, Shavuot, Yom Teruah, Yom Kippur, Sukkot, Shemini Atzeret).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {holidays.map(h => (
          <div key={h.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase">{h.hebrewDate}</span>
                <h3 className="text-base font-bold text-white">{h.namePt} ({h.nameHebrew})</h3>
              </div>
              <span className="text-xs font-serif text-blue-300">{h.transliteration}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{h.significance}</p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <p className="text-blue-400 font-bold">Conexão com a Brit Hadasha:</p>
              <p className="text-slate-300">{h.connectionsBritHadasha}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
