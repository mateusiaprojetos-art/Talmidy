import React, { useState } from 'react';
import { BIBLICAL_HOLIDAYS, HEBREW_MONTHS } from '../data/prayersAndCalendar';
import { calculateShabbatTimes, getAvailableCities } from '../utils/shabbatCalculator';
import { useAuth } from '../context/AuthContext';
import { Calendar as CalendarIcon, Flame, Clock, MapPin, Volume2 } from 'lucide-react';
import { playHebrewPronunciation, stopAllSpeech } from '../utils/speechUtils';

export const CalendarAndShabbat: React.FC = () => {
  const { shabbatCity, setShabbatCity } = useAuth();
  const [activeTab, setActiveTab] = useState<'shabbat' | 'holidays' | 'converter'>('shabbat');
  const [selectedCity, setSelectedCity] = useState<string>(shabbatCity);
  const [civilDateInput, setCivilDateInput] = useState<string>(new Date().toISOString().split('T')[0]);
  const [audioPlayingId, setAudioPlayingId] = useState<string | null>(null);

  const shabbatTimes = calculateShabbatTimes(selectedCity);
  const cities = getAvailableCities();

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setShabbatCity(city);
  };

  const handlePlayBlessing = (id: string, hebrewText: string, transliteration: string, meaning?: string) => {
    if (audioPlayingId === id) {
      stopAllSpeech();
      setAudioPlayingId(null);
      return;
    }

    setAudioPlayingId(id);
    playHebrewPronunciation({
      hebrewText,
      transliteration,
      portugueseHint: meaning,
      rate: 0.8,
      onStart: () => setAudioPlayingId(id),
      onEnd: () => setAudioPlayingId(null),
      onError: () => setAudioPlayingId(null)
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans text-[#34344e] dark:text-[#cbdad5]">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-[#566981] dark:text-[#89a7b1] uppercase tracking-widest">Calendário & Ciclos Sagrados</span>
            <h1 className="text-3xl font-bold text-[#34344e] dark:text-[#cbdad5] font-sans mt-1">Calendário Judaico & Horários de Shabat</h1>
            <p className="text-xs text-[#566981] dark:text-[#89a7b1] max-w-2xl mt-1">
              Acompanhe as datas do calendário hebraico, horários exatos para acendimento das velas do Shabat na sua cidade e o guia de Festas Bíblicas com áudio de bênçãos.
            </p>
          </div>

          {/* City Selector */}
          <div className="flex items-center gap-2 bg-[#cbdad5]/30 dark:bg-[#34344e] p-2 rounded-xl border border-[#89a7b1] dark:border-[#566981]">
            <MapPin className="w-4 h-4 text-[#566981] dark:text-[#89a7b1]" />
            <span className="text-xs text-[#566981] dark:text-[#89a7b1] font-medium">Cidade:</span>
            <select
              value={selectedCity}
              onChange={e => handleCityChange(e.target.value)}
              className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] text-[#34344e] dark:text-[#cbdad5] text-xs font-bold rounded-lg px-2 py-1 focus:outline-none focus:border-[#566981]"
            >
              {cities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-t border-[#89a7b1]/30 dark:border-[#566981] pt-4 gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('shabbat')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'shabbat' ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] shadow-md' : 'bg-white dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981] hover:bg-[#89a7b1]/20'}`}
          >
            <Flame className="w-4 h-4" /> PRÓXIMO SHABAT
          </button>
          <button
            onClick={() => setActiveTab('holidays')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'holidays' ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] shadow-md' : 'bg-white dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981] hover:bg-[#89a7b1]/20'}`}
          >
            <CalendarIcon className="w-4 h-4" /> FESTAS BÍBLICAS
          </button>
          <button
            onClick={() => setActiveTab('converter')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'converter' ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] shadow-md' : 'bg-white dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981] hover:bg-[#89a7b1]/20'}`}
          >
            <Clock className="w-4 h-4" /> CONVERSOR DE DATAS
          </button>
        </div>
      </div>

      {/* Tab 1: Shabbat Hub */}
      {activeTab === 'shabbat' && (
        <div className="space-y-6">
          
          {/* Shabbat Hero Card */}
          <div className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#89a7b1]/30 dark:border-[#566981] pb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981]">
                  <Flame className="w-6 h-6 animate-pulse" />
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-[#34344e] dark:text-[#cbdad5]">Shabat Kodesh (שַׁבָּת קֹדֶשׁ)</h2>
                  <p className="text-xs text-[#566981] dark:text-[#89a7b1] font-medium">Parashat {shabbatTimes.parashaName} • Haftará: {shabbatTimes.haftarahRef}</p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-xs text-[#566981] dark:text-[#89a7b1]">Cidade selecionada:</p>
                <p className="text-sm font-bold text-[#34344e] dark:text-[#cbdad5]">{shabbatTimes.city}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981] rounded-xl p-4 space-y-1">
                <span className="text-[10px] font-bold text-[#566981] dark:text-[#89a7b1] uppercase tracking-wider block">Data Civil</span>
                <span className="text-lg font-bold text-[#34344e] dark:text-[#cbdad5]">{shabbatTimes.dateCivil}</span>
              </div>

              <div className="bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981] rounded-xl p-4 space-y-1">
                <span className="text-[10px] font-bold text-[#566981] dark:text-[#89a7b1] uppercase tracking-wider block">Data Hebraica</span>
                <span className="text-lg font-bold text-[#34344e] dark:text-[#cbdad5]">{shabbatTimes.dateHebrew}</span>
              </div>

              <div className="bg-[#89a7b1]/20 dark:bg-[#34344e] border border-[#566981] rounded-xl p-4 space-y-1">
                <span className="text-[10px] font-bold text-[#566981] dark:text-[#89a7b1] uppercase tracking-wider block">Entrada do Shabat</span>
                <span className="text-xl font-black text-[#34344e] dark:text-[#cbdad5]">{shabbatTimes.candleLighting}</span>
                <span className="text-[10px] text-[#566981] dark:text-[#89a7b1] block">Acendimento das Velas</span>
              </div>

              <div className="bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981] rounded-xl p-4 space-y-1">
                <span className="text-[10px] font-bold text-[#566981] dark:text-[#89a7b1] uppercase tracking-wider block">Término do Shabat</span>
                <span className="text-xl font-bold text-[#34344e] dark:text-[#cbdad5]">{shabbatTimes.havdalah}</span>
                <span className="text-[10px] text-[#566981] dark:text-[#89a7b1] block">Havdalá</span>
              </div>
            </div>
          </div>

          {/* Candle Blessing Card */}
          <div className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <h3 className="text-sm font-bold text-[#34344e] dark:text-[#cbdad5]">Bênção do Acendimento das Velas (Hadlakat Nerot)</h3>
              <button
                onClick={() => handlePlayBlessing(
                  'candle-blessing',
                  'בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל שַׁבָּת',
                  'Baruch atah Adonai Eloheinu melech haolam, asher kideshanu bemitzvotav vetzivanu lehadlik ner shel Shabbat',
                  'Bênção do Acendimento das Velas do Shabat'
                )}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 w-fit ${
                  audioPlayingId === 'candle-blessing'
                    ? 'bg-[#566981] text-[#cbdad5] border-[#89a7b1] animate-pulse'
                    : 'bg-[#cbdad5]/30 dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border-[#89a7b1] hover:bg-[#89a7b1]/30'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                {audioPlayingId === 'candle-blessing' ? 'Ouvindo Bênção...' : 'Ouvir Pronúncia'}
              </button>
            </div>

            <p className="text-xl font-hebrew text-[#34344e] dark:text-[#cbdad5] text-right leading-loose font-medium" dir="rtl">
              בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל שַׁבָּת׃
            </p>
            <p className="text-xs text-[#566981] dark:text-[#89a7b1] italic">
              Transliteração: Baruch atah Adonai Eloheinu melech ha'olam, asher kideshanu bemitzvotav vetzivanu lehadlik ner shel Shabbat.
            </p>
            <p className="text-xs text-[#34344e] dark:text-[#cbdad5]/90">
              Tradução: Bendito és Tu, Senhor nosso Deus, Rei do Universo, que nos santificou com Seus mandamentos e nos instruiu a acender a luz do Shabat.
            </p>
          </div>

        </div>
      )}

      {/* Tab 2: Biblical Holidays */}
      {activeTab === 'holidays' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BIBLICAL_HOLIDAYS.map(holiday => (
            <div key={holiday.id} className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-6 space-y-4 shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start border-b border-[#89a7b1]/30 dark:border-[#566981] pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#566981] dark:text-[#89a7b1] uppercase tracking-widest">{holiday.hebrewDate} ({holiday.civilDateApprox})</span>
                    <h3 className="text-xl font-bold text-[#34344e] dark:text-[#cbdad5] mt-0.5">{holiday.namePt}</h3>
                    <p className="text-lg font-hebrew text-[#34344e] dark:text-[#cbdad5] font-bold">{holiday.nameHebrew}</p>
                  </div>
                  <button
                    onClick={() => handlePlayBlessing(`holiday-${holiday.id}`, holiday.nameHebrew, holiday.namePt)}
                    className="p-2 rounded-lg bg-[#cbdad5]/30 dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] hover:bg-[#89a7b1]/30"
                    title="Ouvir pronúncia do nome"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-[#34344e] dark:text-[#cbdad5]/90 leading-relaxed">{holiday.significance}</p>

                <div className="space-y-2 text-xs">
                  <p className="font-bold text-[#566981] dark:text-[#89a7b1]">Práticas e Tradições:</p>
                  <ul className="list-disc list-inside text-[#566981] dark:text-[#89a7b1]/80 space-y-1">
                    {(holiday.practices || []).map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981] text-xs space-y-1">
                  <p className="font-bold text-[#566981] dark:text-[#89a7b1]">Conexão com a Brit Hadasha:</p>
                  <p className="text-[#34344e] dark:text-[#cbdad5]">{holiday.connectionsBritHadasha}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Date Converter */}
      {activeTab === 'converter' && (
        <div className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-6 space-y-6 max-w-2xl mx-auto shadow-xl">
          <h2 className="text-xl font-bold text-[#34344e] dark:text-[#cbdad5]">Conversor de Datas (Civil & Hebraica)</h2>
          <p className="text-xs text-[#566981] dark:text-[#89a7b1]">Selecione uma data civil para visualizar a correspondência exata no calendário hebraico lunar-solar.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#566981] dark:text-[#89a7b1] mb-1">Data Civil (Calendário Gregoriano):</label>
              <input
                type="date"
                value={civilDateInput}
                onChange={e => setCivilDateInput(e.target.value)}
                className="w-full bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1] dark:border-[#566981] rounded-xl px-4 py-2.5 text-xs text-[#34344e] dark:text-[#cbdad5] focus:outline-none focus:border-[#566981]"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1] dark:border-[#566981] text-xs space-y-2">
              <p className="font-bold text-[#566981] dark:text-[#89a7b1] text-sm">Data Hebraica Correspondente:</p>
              <p className="text-lg font-bold text-[#34344e] dark:text-[#cbdad5]">18 de Tishrei de 5787 (תִּשְׁרֵי)</p>
              <p className="text-[#566981] dark:text-[#89a7b1]">Pôr do sol inicia o novo dia no sistema bíblico (Gênesis 1:5).</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#89a7b1]/30 dark:border-[#566981]">
            <h3 className="text-xs font-bold text-[#566981] dark:text-[#89a7b1] mb-3">Meses do Ano Judaico:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {HEBREW_MONTHS.map(m => (
                <div key={m.name} className="p-2.5 rounded-lg bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981]">
                  <p className="font-bold text-[#34344e] dark:text-[#cbdad5]">{m.name}</p>
                  <p className="text-[10px] text-[#566981] dark:text-[#89a7b1]">{m.season}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

