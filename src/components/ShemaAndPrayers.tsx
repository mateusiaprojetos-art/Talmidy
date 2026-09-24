import React, { useState } from 'react';
import { SHEMA_WORD_BY_WORD, PRAYERS_LIST } from '../data/prayersAndCalendar';
import { useAuth } from '../context/AuthContext';
import { Heart, Volume2, Bookmark, Check } from 'lucide-react';
import { playHebrewPronunciation, stopAllSpeech } from '../utils/speechUtils';

export const ShemaAndPrayers: React.FC = () => {
  const { addNote } = useAuth();
  const [activeWordIdx, setActiveWordIdx] = useState<number | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  const handlePlayAudio = (id: string, hebrewText: string, transliteration: string, meaning?: string) => {
    if (playingAudioId === id) {
      stopAllSpeech();
      setPlayingAudioId(null);
      return;
    }

    setPlayingAudioId(id);
    playHebrewPronunciation({
      hebrewText,
      transliteration,
      portugueseHint: meaning,
      rate: 0.8,
      onStart: () => setPlayingAudioId(id),
      onEnd: () => setPlayingAudioId(null),
      onError: () => setPlayingAudioId(null)
    });
  };

  const handleSavePrayerNote = (p: typeof PRAYERS_LIST[0]) => {
    addNote({
      title: `Oração: ${p.titlePt}`,
      content: `Texto Hebraico:\n${p.hebrewText}\n\nTransliteração:\n${p.transliteration}\n\nTradução:\n${p.translationPt}\n\nContexto:\n${p.context}`,
      tags: ['Oração', p.sourceType],
      isFavorite: true
    });
    setSavedNotification(p.titlePt);
    setTimeout(() => setSavedNotification(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans text-[#34344e] dark:text-[#cbdad5]">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <span className="text-xs font-bold text-[#566981] dark:text-[#89a7b1] uppercase tracking-widest">Oração & Declaração de Fé</span>
          <h1 className="text-3xl font-bold text-[#34344e] dark:text-[#cbdad5] font-sans mt-1">Shema Israel & Orações Clássicas</h1>
          <p className="text-xs text-[#566981] dark:text-[#89a7b1] max-w-2xl mt-1">
            Estude palavra por palavra a proclamação central do monoteísmo hebraico em Deuteronômio 6:4 com áudio de pronúncia ativado e navegue pelas orações bíblicas do Siddur.
          </p>
        </div>
      </div>

      {savedNotification && (
        <div className="p-3 bg-[#89a7b1]/20 border border-[#566981] rounded-xl text-xs font-bold text-[#34344e] dark:text-[#cbdad5] flex items-center gap-2">
          <Check className="w-4 h-4 text-[#566981] dark:text-[#89a7b1]" />
          Oração "{savedNotification}" salva com sucesso em Minhas Anotações!
        </div>
      )}

      {/* Shema Israel Section */}
      <div className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981] text-xs font-bold">
            <Heart className="w-3.5 h-3.5 text-[#566981] dark:text-[#89a7b1]" />
            Deuteronômio 6:4 (דְּבָרִים ו':ד')
          </div>
          <h2 className="text-2xl font-bold text-[#34344e] dark:text-[#cbdad5]">Shema Yisrael Adonai Eloheinu Adonai Echad</h2>
          <p className="text-3xl sm:text-4xl font-hebrew text-[#34344e] dark:text-[#cbdad5] font-bold leading-loose" dir="rtl">
            שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד׃
          </p>
          <p className="text-xs text-[#566981] dark:text-[#89a7b1] italic max-w-xl mx-auto">
            "Ouve, Israel: o Senhor nosso Deus é o único Senhor!"
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => handlePlayAudio(
                'full-shema',
                'שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד',
                'Shemá Yisraél Adonái Elohéinu Adonái Echád',
                'Ouve Israel o Senhor nosso Deus é o único Senhor'
              )}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition border flex items-center gap-2 shadow ${
                playingAudioId === 'full-shema'
                  ? 'bg-[#566981] text-[#cbdad5] border-[#89a7b1] animate-pulse'
                  : 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] hover:bg-[#566981] dark:hover:bg-[#89a7b1] dark:hover:text-[#34344e] border-[#566981]'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              {playingAudioId === 'full-shema' ? 'Ouvindo Shema Completo...' : 'Ouvir Shema Completo'}
            </button>
          </div>
        </div>

        {/* Word-by-Word Breakdown Cards */}
        <div className="space-y-3 pt-4 border-t border-[#89a7b1]/30 dark:border-[#566981]">
          <h3 className="text-xs font-bold text-[#566981] dark:text-[#89a7b1] uppercase tracking-wider">Análise e Pronúncia Palavra por Palavra:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHEMA_WORD_BY_WORD.map((item, idx) => {
              const isPlaying = playingAudioId === `shema-word-${idx}`;

              return (
                <div
                  key={idx}
                  onClick={() => { setActiveWordIdx(idx); handlePlayAudio(`shema-word-${idx}`, item.hebrew, item.transliteration, item.meaning); }}
                  className={`p-4 rounded-xl cursor-pointer transition border space-y-2 ${
                    activeWordIdx === idx || isPlaying
                      ? 'bg-[#89a7b1]/20 dark:bg-[#34344e] border-[#566981] scale-102 shadow-lg ring-1 ring-[#89a7b1]'
                      : 'bg-[#cbdad5]/10 dark:bg-[#34344e]/60 border-[#89a7b1]/30 dark:border-[#566981] hover:border-[#89a7b1]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-hebrew text-[#34344e] dark:text-[#cbdad5] font-bold">{item.hebrew}</span>
                    <button
                      className={`p-1.5 rounded-lg border transition ${
                        isPlaying
                          ? 'bg-[#566981] text-[#cbdad5] border-[#89a7b1] animate-pulse'
                          : 'text-[#566981] dark:text-[#89a7b1] hover:bg-[#89a7b1]/20 border-transparent'
                      }`}
                      title="Ouvir palavra"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <p className="font-bold text-[#34344e] dark:text-[#cbdad5] text-xs">{item.transliteration} <span className="text-[#566981] dark:text-[#89a7b1] font-mono">({item.pronunciation})</span></p>
                    <p className="text-xs text-[#566981] dark:text-[#89a7b1] mt-0.5">Significado: <span className="font-semibold text-[#34344e] dark:text-[#cbdad5]">{item.meaning}</span></p>
                  </div>

                  <p className="text-[11px] text-[#566981] dark:text-[#89a7b1]/80 italic pt-1 border-t border-[#89a7b1]/20 dark:border-[#566981]">{item.note}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Traditional Prayers List Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#34344e] dark:text-[#cbdad5]">Outras Orações e Bênção Sacerdotal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRAYERS_LIST.map(p => {
            const isPlaying = playingAudioId === `prayer-${p.id}`;

            return (
              <div key={p.id} className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-6 space-y-4 shadow-lg">
                <div className="flex justify-between items-start border-b border-[#89a7b1]/30 dark:border-[#566981] pb-3">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#89a7b1]/20 dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981]">
                      {p.sourceName}
                    </span>
                    <h3 className="text-lg font-bold text-[#34344e] dark:text-[#cbdad5] mt-1">{p.titlePt}</h3>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePlayAudio(`prayer-${p.id}`, p.hebrewText, p.transliteration, p.titlePt)}
                      className={`p-2 rounded-lg border transition ${
                        isPlaying
                          ? 'bg-[#566981] text-[#cbdad5] border-[#89a7b1] animate-pulse'
                          : 'bg-[#cbdad5]/30 dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border-[#89a7b1]/40 dark:border-[#566981] hover:bg-[#89a7b1]/30'
                      }`}
                      title="Ouvir Pronúncia da Oração"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleSavePrayerNote(p)}
                      className="p-2 rounded-lg bg-[#cbdad5]/30 dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1]/40 dark:border-[#566981] hover:bg-[#89a7b1]/30 transition"
                      title="Salvar Oração em Anotações"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xl font-hebrew text-[#34344e] dark:text-[#cbdad5] font-bold text-right leading-loose" dir="rtl">
                  {p.hebrewText}
                </p>

                <p className="text-xs text-[#566981] dark:text-[#89a7b1] italic">{p.transliteration}</p>
                <p className="text-xs text-[#34344e] dark:text-[#cbdad5] font-medium">{p.translationPt}</p>
                <p className="text-[11px] text-[#566981] dark:text-[#89a7b1]/80 pt-2 border-t border-[#89a7b1]/20 dark:border-[#566981]">{p.context}</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

