import React from 'react';
import { Flame, X, Heart, Sparkles, Volume2 } from 'lucide-react';
import { calculateShabbatTimes } from '../utils/shabbatCalculator';
import { useAuth } from '../context/AuthContext';

interface ShabbatModeModalProps {
  onClose: () => void;
}

export const ShabbatModeModal: React.FC<ShabbatModeModalProps> = ({ onClose }) => {
  const { shabbatCity } = useAuth();
  const times = calculateShabbatTimes(shabbatCity);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-slate-900 border border-amber-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-center text-slate-100 animate-in fade-in zoom-in duration-300">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Glowing Candle Visual */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-t from-amber-600 via-amber-400 to-amber-200 mx-auto flex items-center justify-center text-slate-950 shadow-2xl shadow-amber-500/50 animate-pulse">
          <Flame className="w-12 h-12 fill-current text-slate-950" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Shabat Shalom U'mvorach</span>
          <h2 className="text-3xl font-bold text-white font-sans">Modo Contemplativo de Shabat</h2>
          <p className="text-xs text-amber-200">
            {times.city} • Entrada: {times.candleLighting} • Saída: {times.havdalah}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/30 text-left space-y-3">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Bênção das Velas:</p>
          <p className="text-xl font-hebrew text-amber-300 font-bold text-right leading-loose" dir="rtl">
            בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל שַׁבָּת׃
          </p>
          <p className="text-xs text-slate-300 italic">
            Baruch atah Adonai Eloheinu melech ha'olam, asher kideshanu bemitzvotav vetzivanu lehadlik ner shel Shabbat.
          </p>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
          Desconecte-se das distrações da semana. Dedique este tempo sagrado à família, à contemplação da Torá, à gratidão e ao descanso da alma.
        </p>

        <button
          onClick={onClose}
          className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition text-xs shadow-lg"
        >
          Retornar ao Estudo
        </button>

      </div>
    </div>
  );
};
