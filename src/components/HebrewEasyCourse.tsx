import React, { useState } from 'react';
import { HEBREW_ALPHABET as ALEF_BET, HEBREW_WORDS as HEBREW_VOCABULARY, HEBREW_ACTIVITIES } from '../data/hebrewData';
import { HebrewLetter } from '../types';
import { useAuth } from '../context/AuthContext';
import { Languages, Volume2, CheckCircle2, Trophy, VolumeX, Sparkles } from 'lucide-react';
import { playHebrewPronunciation, stopAllSpeech } from '../utils/speechUtils';

export const HebrewEasyCourse: React.FC = () => {
  const { user, markHebrewLetterLearned, markHebrewWordLearned, addStudyMinutes } = useAuth();
  const [activeTab, setActiveTab] = useState<'alphabet' | 'vocab' | 'activities'>('alphabet');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLetter, setActiveLetter] = useState<HebrewLetter>(ALEF_BET[0]);
  const [selectedActivityIdx, setSelectedActivityIdx] = useState<number>(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSuccess, setQuizSuccess] = useState<boolean | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const lettersLearned = user?.progress.hebrewLettersLearned || [];
  const wordsLearned = user?.progress.hebrewWordsLearned || [];

  const handlePlayPronunciation = (id: string, hebrewText: string, transliteration: string, portugueseHint?: string) => {
    if (playingAudioId === id) {
      stopAllSpeech();
      setPlayingAudioId(null);
      return;
    }

    setPlayingAudioId(id);
    playHebrewPronunciation({
      hebrewText,
      transliteration,
      portugueseHint,
      onStart: () => setPlayingAudioId(id),
      onEnd: () => setPlayingAudioId(null),
      onError: () => setPlayingAudioId(null)
    });
  };

  const handleSelectLetter = (letter: HebrewLetter) => {
    setActiveLetter(letter);
    handlePlayPronunciation(`letter-${letter.letter}`, letter.letter, letter.name, letter.soundDescription);
  };

  const handleToggleLetterLearned = (letter: string) => {
    markHebrewLetterLearned(letter);
    addStudyMinutes(5);
  };

  const handleToggleWordLearned = (wordId: string) => {
    markHebrewWordLearned(wordId);
    addStudyMinutes(5);
  };

  const filteredVocab = HEBREW_VOCABULARY.filter(w => {
    if (selectedCategory === 'all') return true;
    return w.category === selectedCategory;
  });

  const currentActivity = HEBREW_ACTIVITIES[selectedActivityIdx];
  const correctOptionIdx = currentActivity.correctOptionIndex ?? (currentActivity.options ? currentActivity.options.indexOf(currentActivity.correctAnswer) : 0);

  const handleAnswerQuiz = (chosenIdx: number) => {
    setQuizAnswer(chosenIdx);
    if (chosenIdx === correctOptionIdx) {
      setQuizSuccess(true);
      addStudyMinutes(10);
    } else {
      setQuizSuccess(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans text-[#34344e] dark:text-[#cbdad5] min-h-screen">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#34344e] dark:text-[#cbdad5] font-bold text-xs uppercase tracking-wider bg-[#89a7b1]/20 dark:bg-[#34344e] px-3 py-1 rounded-md border border-[#89a7b1] dark:border-[#566981] w-fit">
              <Languages className="w-4 h-4 text-[#566981] dark:text-[#89a7b1]" /> Língua Sagrada (Lashon HaKodesh)
            </div>
            <h1 className="text-3xl font-extrabold text-[#34344e] dark:text-[#cbdad5] font-sans mt-2">Curso de Hebraico Fácil</h1>
            <p className="text-xs text-[#566981] dark:text-[#89a7b1] max-w-2xl mt-1">
              Aprenda o alfabeto (Alef-Bet), vogais (Niqqud), vocabulário bíblico fundamental e leitura de orações com áudio ativado e exercícios práticos.
            </p>
          </div>

          {/* Progress Badge */}
          <div className="flex items-center gap-3 bg-[#cbdad5]/30 dark:bg-[#34344e] p-3.5 rounded-xl border border-[#89a7b1] dark:border-[#566981]">
            <Trophy className="w-6 h-6 text-[#3a415a] dark:text-[#89a7b1] shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-[#34344e] dark:text-[#cbdad5]">{lettersLearned.length} de {ALEF_BET.length} Letras Aprendidas</p>
              <div className="w-32 bg-[#89a7b1]/30 dark:bg-[#3a415a] rounded-full h-2 mt-1 overflow-hidden">
                <div
                  className="bg-[#566981] dark:bg-[#89a7b1] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(lettersLearned.length / ALEF_BET.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Course Subtabs */}
        <div className="flex border-t border-[#89a7b1]/30 dark:border-[#566981] pt-4 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('alphabet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'alphabet' ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] shadow-md' : 'bg-white dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981] hover:bg-[#89a7b1]/20'}`}
          >
            1. ALEF-BET (ALFABETO)
          </button>
          <button
            onClick={() => setActiveTab('vocab')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'vocab' ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] shadow-md' : 'bg-white dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981] hover:bg-[#89a7b1]/20'}`}
          >
            2. VOCABULÁRIO BÍBLICO
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'activities' ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] shadow-md' : 'bg-white dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981] hover:bg-[#89a7b1]/20'}`}
          >
            3. EXERCÍCIOS & QUIZ
          </button>
        </div>
      </div>

      {/* Tab 1: Alef-Bet Alphabet Grid */}
      {activeTab === 'alphabet' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Alphabet Grid (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#34344e] dark:text-[#cbdad5]">As 22 Letras do Alef-Bet</h2>
              <span className="text-xs font-medium text-[#566981] dark:text-[#89a7b1]">Clique para ouvir o áudio</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {ALEF_BET.map(item => {
                const isLearned = lettersLearned.includes(item.letter);
                const isSelected = activeLetter.letter === item.letter;
                const isPlaying = playingAudioId === `letter-${item.letter}`;

                return (
                  <button
                    key={item.letter}
                    onClick={() => handleSelectLetter(item)}
                    className={`p-3 rounded-xl transition flex flex-col items-center justify-center border relative ${
                      isSelected
                        ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] border-[#34344e] scale-105 shadow-md ring-2 ring-[#89a7b1]'
                        : isLearned
                        ? 'bg-[#89a7b1]/20 dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border-[#89a7b1] dark:border-[#566981] hover:bg-[#89a7b1]/40'
                        : 'bg-[#cbdad5]/20 dark:bg-[#34344e]/60 text-[#34344e] dark:text-[#cbdad5] border-[#89a7b1]/40 dark:border-[#566981] hover:bg-[#89a7b1]/30'
                    }`}
                  >
                    {isLearned && !isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#566981] dark:text-[#89a7b1] absolute top-1 right-1" />
                    )}
                    {isPlaying && (
                      <span className="absolute top-1 left-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#89a7b1] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#566981]"></span>
                      </span>
                    )}
                    <span className="text-2xl font-hebrew font-bold leading-none">{item.letter}</span>
                    <span className="text-[10px] font-bold mt-1">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Letter Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-6 shadow-xl space-y-6">
            <div className="text-center space-y-2 border-b border-[#89a7b1]/30 dark:border-[#566981] pb-4">
              <div className="relative inline-block">
                <span className="text-7xl font-hebrew text-[#34344e] dark:text-[#cbdad5] font-bold leading-none block">{activeLetter.letter}</span>
                <button
                  onClick={() => handlePlayPronunciation(`letter-${activeLetter.letter}`, activeLetter.letter, activeLetter.name, activeLetter.soundDescription)}
                  className={`absolute -bottom-2 -right-4 p-2 rounded-full border transition ${
                    playingAudioId === `letter-${activeLetter.letter}`
                      ? 'bg-[#566981] text-[#cbdad5] border-[#89a7b1] animate-pulse'
                      : 'bg-white dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border-[#89a7b1] hover:bg-[#89a7b1]/20'
                  }`}
                  title="Ouvir pronúncia da letra"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-2xl font-bold text-[#34344e] dark:text-[#cbdad5] mt-2">{activeLetter.name} ({activeLetter.transliteration})</h3>
              <p className="text-xs text-[#566981] dark:text-[#89a7b1] font-medium">Valor Numérico (Gematria): <span className="font-bold text-[#34344e] dark:text-[#cbdad5]">{activeLetter.numericalValue}</span></p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981]">
                <p className="font-bold text-[#566981] dark:text-[#89a7b1] uppercase tracking-wider text-[10px]">Som e Pronúncia:</p>
                <p className="text-[#34344e] dark:text-[#cbdad5] font-medium text-sm mt-0.5">{activeLetter.soundDescription}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981]">
                <p className="font-bold text-[#566981] dark:text-[#89a7b1] uppercase tracking-wider text-[10px]">Exemplo de Palavra:</p>
                <div className="flex justify-between items-center mt-1">
                  <div>
                    <p className="text-xl font-hebrew text-[#34344e] dark:text-[#cbdad5] font-bold">{activeLetter.exampleWordHebrew}</p>
                    <p className="text-[#566981] dark:text-[#89a7b1] font-medium">{activeLetter.exampleWordPt} ({activeLetter.exampleWordTranslit})</p>
                  </div>
                  <button
                    onClick={() => handlePlayPronunciation(`word-${activeLetter.exampleWordHebrew}`, activeLetter.exampleWordHebrew, activeLetter.exampleWordTranslit, activeLetter.exampleWordPt)}
                    className={`p-2.5 rounded-xl transition border shadow-sm flex items-center gap-1.5 ${
                      playingAudioId === `word-${activeLetter.exampleWordHebrew}`
                        ? 'bg-[#566981] text-[#cbdad5] border-[#89a7b1] animate-pulse'
                        : 'bg-white dark:bg-[#3a415a] text-[#34344e] dark:text-[#cbdad5] border-[#89a7b1] hover:bg-[#89a7b1]/20'
                    }`}
                    title="Ouvir pronúncia"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="text-[10px] font-bold">Ouvir</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleToggleLetterLearned(activeLetter.letter)}
              className={`w-full py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-md ${
                lettersLearned.includes(activeLetter.letter)
                  ? 'bg-[#566981] text-[#cbdad5] border border-[#89a7b1]'
                  : 'bg-[#3a415a] dark:bg-[#566981] hover:bg-[#566981] dark:hover:bg-[#89a7b1] text-[#cbdad5] dark:hover:text-[#34344e]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {lettersLearned.includes(activeLetter.letter) ? 'Letra Aprendida!' : 'Marcar como Aprendida'}
            </button>
          </div>

        </div>
      )}

      {/* Tab 2: Vocabulary */}
      {activeTab === 'vocab' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 bg-white dark:bg-[#3a415a] p-2 rounded-xl border border-[#89a7b1] dark:border-[#566981] text-xs font-medium shadow-md">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-lg transition ${selectedCategory === 'all' ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] font-bold' : 'text-[#34344e] dark:text-[#cbdad5] hover:bg-[#89a7b1]/20'}`}
            >
              Todas as Categorias
            </button>
            <button
              onClick={() => setSelectedCategory('Saudações & Essenciais')}
              className={`px-3.5 py-2 rounded-lg transition ${selectedCategory === 'Saudações & Essenciais' ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] font-bold' : 'text-[#34344e] dark:text-[#cbdad5] hover:bg-[#89a7b1]/20'}`}
            >
              Saudações
            </button>
            <button
              onClick={() => setSelectedCategory('Nomes Sagrados & Torá')}
              className={`px-3.5 py-2 rounded-lg transition ${selectedCategory === 'Nomes Sagrados & Torá' ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] font-bold' : 'text-[#34344e] dark:text-[#cbdad5] hover:bg-[#89a7b1]/20'}`}
            >
              Nomes Sagrados & Torá
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVocab.map(item => {
              const isLearned = wordsLearned.includes(item.id);
              const isPlaying = playingAudioId === `vocab-${item.id}`;

              return (
                <div key={item.id} className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-5 space-y-3 shadow-md hover:border-[#566981] transition">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#89a7b1]/20 dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981]">{item.category}</span>
                    <button
                      onClick={() => handlePlayPronunciation(`vocab-${item.id}`, item.hebrew, item.transliteration, item.translationPt)}
                      className={`p-2 rounded-lg transition border ${
                        isPlaying
                          ? 'bg-[#566981] text-[#cbdad5] border-[#89a7b1] animate-pulse'
                          : 'bg-[#cbdad5]/30 dark:bg-[#34344e] hover:bg-[#89a7b1]/30 text-[#34344e] dark:text-[#cbdad5] border-[#89a7b1]/40 dark:border-[#566981]'
                      }`}
                      title="Ouvir Pronúncia"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <p className="text-3xl font-hebrew text-[#34344e] dark:text-[#cbdad5] font-bold leading-relaxed">{item.hebrew}</p>
                    <p className="text-sm font-bold text-[#34344e] dark:text-[#cbdad5]">{item.transliteration}</p>
                    <p className="text-xs text-[#566981] dark:text-[#89a7b1] mt-0.5">Significado: <strong className="text-[#34344e] dark:text-[#cbdad5]">{item.translationPt}</strong></p>
                  </div>

                  {item.biblicalRef && <p className="text-[11px] text-[#566981] dark:text-[#89a7b1] italic">{item.biblicalRef}: {item.exampleSentencePt}</p>}

                  <button
                    onClick={() => handleToggleWordLearned(item.id)}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition border ${
                      isLearned
                        ? 'bg-[#566981] text-[#cbdad5] border-[#89a7b1]'
                        : 'bg-[#cbdad5]/20 dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border-[#89a7b1]/40 dark:border-[#566981] hover:bg-[#89a7b1]/30'
                    }`}
                  >
                    {isLearned ? '✓ Palavra Aprendida' : 'Marcar Aprendida'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Activities & Quizzes */}
      {activeTab === 'activities' && (
        <div className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-[#89a7b1]/30 dark:border-[#566981] pb-4">
            <div>
              <span className="text-xs font-bold text-[#566981] dark:text-[#89a7b1] uppercase tracking-wider">Exercício {selectedActivityIdx + 1} de {HEBREW_ACTIVITIES.length}</span>
              <h2 className="text-xl font-bold text-[#34344e] dark:text-[#cbdad5] mt-0.5">{currentActivity.question}</h2>
            </div>
          </div>

          {currentActivity.promptHebrew && (
            <div className="text-center bg-[#cbdad5]/20 dark:bg-[#34344e] p-6 rounded-2xl border border-[#89a7b1]/40 dark:border-[#566981] relative">
              <span className="text-5xl font-hebrew text-[#34344e] dark:text-[#cbdad5] font-bold">{currentActivity.promptHebrew}</span>
              <button
                onClick={() => handlePlayPronunciation(`activity-${selectedActivityIdx}`, currentActivity.promptHebrew || '', currentActivity.question)}
                className="absolute top-3 right-3 p-2 rounded-lg bg-white dark:bg-[#3a415a] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] hover:bg-[#89a7b1]/20"
                title="Ouvir áudio do exercício"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="space-y-2.5">
            {(currentActivity.options || []).map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerQuiz(idx)}
                className={`w-full p-4 rounded-xl text-xs font-bold text-left transition border ${
                  quizAnswer === idx
                    ? idx === correctOptionIdx
                      ? 'bg-[#566981] text-[#cbdad5] border-[#89a7b1]'
                      : 'bg-[#3a415a] text-white border-[#89a7b1]'
                    : 'bg-[#cbdad5]/10 dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border-[#89a7b1]/30 dark:border-[#566981] hover:bg-[#89a7b1]/20'
                }`}
              >
                {idx + 1}. {opt}
              </button>
            ))}
          </div>

          {quizSuccess !== null && (
            <div className={`p-4 rounded-xl text-xs font-bold text-center border ${quizSuccess ? 'bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5] border-[#566981]' : 'bg-[#3a415a]/20 text-[#34344e] dark:text-[#cbdad5] border-[#89a7b1]'}`}>
              {quizSuccess ? '¡Resposta Correta! Você ganhou +10 minutos de estudo.' : 'Tente novamente! Revise o Alef-Bet e o som das vogais.'}
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-[#89a7b1]/30 dark:border-[#566981]">
            <button
              disabled={selectedActivityIdx === 0}
              onClick={() => { setSelectedActivityIdx(prev => prev - 1); setQuizAnswer(null); setQuizSuccess(null); }}
              className="px-5 py-2.5 rounded-xl bg-[#cbdad5]/30 dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] text-xs font-bold disabled:opacity-50 hover:bg-[#89a7b1]/30 border border-[#89a7b1]/40"
            >
              Anterior
            </button>
            <button
              disabled={selectedActivityIdx === HEBREW_ACTIVITIES.length - 1}
              onClick={() => { setSelectedActivityIdx(prev => prev + 1); setQuizAnswer(null); setQuizSuccess(null); }}
              className="px-5 py-2.5 rounded-xl bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] text-xs font-bold disabled:opacity-50 hover:bg-[#566981] shadow-md"
            >
              Próximo
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

