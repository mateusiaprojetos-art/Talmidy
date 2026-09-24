import React, { useState } from 'react';
import { BIBLE_BOOKS, SAMPLE_VERSES } from '../data/bibleData';
import { BibleBook, BibleVerse } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen,
  Search,
  Layers,
  Sparkles,
  Bookmark,
  Share2,
  ChevronRight,
  Filter,
  FileText,
  Volume2
} from 'lucide-react';

interface BibleReaderProps {
  initialCategory?: 'tora' | 'neviim' | 'ketuvim' | 'brit_hadasha';
}

export const BibleReader: React.FC<BibleReaderProps> = ({ initialCategory }) => {
  const { setActiveView, addNote } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'tora');
  const [selectedBook, setSelectedBook] = useState<BibleBook>(
    BIBLE_BOOKS.find(b => b.category === (initialCategory || 'tora')) || BIBLE_BOOKS[0]
  );
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showHebrew, setShowHebrew] = useState<boolean>(true);
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);

  const filteredBooks = BIBLE_BOOKS.filter(b => {
    if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
    if (searchQuery) {
      return (b.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
             (b.hebrewName || '').includes(searchQuery) ||
             (b.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  // Get verses for book and chapter
  const verseKey = `${selectedBook.id}_${selectedChapter}`;
  const currentVerses: BibleVerse[] = SAMPLE_VERSES[verseKey] || [
    {
      bookId: selectedBook.id,
      chapter: selectedChapter,
      verse: 1,
      textPt: `Versículo 1 do capítulo ${selectedChapter} de ${selectedBook.name}. Texto preparado para estudo sob perspectiva histórica e hebraica.`,
      textHebrew: `פְּסוּק א' מִפֶּרֶק ${selectedChapter} בְּסֵפֶר ${selectedBook.hebrewName}`,
      transliteration: `Pasuk 1 mi-perek ${selectedChapter} be-sefer ${selectedBook.transliteration}.`
    },
    {
      bookId: selectedBook.id,
      chapter: selectedChapter,
      verse: 2,
      textPt: `Versículo 2 de ${selectedBook.name} capítulo ${selectedChapter}. "A Palavra de Elohim permanece para sempre."`,
      textHebrew: `פְּסוּק ב' בְּסֵפֶר ${selectedBook.hebrewName}`,
      transliteration: `Pasuk 2 be-sefer ${selectedBook.transliteration}.`
    }
  ];

  const handleCreateNoteForVerse = (v: BibleVerse) => {
    addNote({
      title: `Anotação: ${selectedBook.name} ${v.chapter}:${v.verse}`,
      content: `Versículo: "${v.textPt}"\n\nMinhas reflexões de estudo...`,
      tags: [selectedBook.name, 'Estudo Bíblico'],
      bibleRef: `${selectedBook.name} ${v.chapter}:${v.verse}`,
      isFavorite: false
    });
    alert(`Anotação criada para ${selectedBook.name} ${v.chapter}:${v.verse}! Acesse no menu "Anotações".`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Category Header */}
      <div className="bg-[#3a415a] dark:bg-[#34344e] border border-[#566981] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-[#89a7b1] uppercase tracking-widest">Leitor das Escrituras</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#cbdad5] mt-1">Biblioteca Bíblica Digital</h1>
          <p className="text-xs text-[#89a7b1] mt-1 max-w-2xl">
            Acesse a Torá, Nevi'im, Ketuvim e a Brit Hadasha no contexto hebraico e histórico do Segundo Templo sem interpolações posteriores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHebrew(!showHebrew)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${showHebrew ? 'bg-[#566981] text-[#cbdad5] border-[#89a7b1]' : 'bg-[#34344e] text-[#89a7b1] border-[#566981]'}`}
          >
            {showHebrew ? 'Hebraico Visível' : 'Ocultar Hebraico'}
          </button>
        </div>
      </div>

      {/* Main Grid: Left Book Selector, Right Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Category Tabs & Books Search (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-4 space-y-4 shadow-md">
            
            {/* Category Filter Tabs */}
            <div className="grid grid-cols-2 gap-1 bg-[#cbdad5]/40 dark:bg-[#34344e] p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => { setSelectedCategory('tora'); setSelectedBook(BIBLE_BOOKS.find(b=>b.category==='tora')!); setSelectedChapter(1); }}
                className={`py-2 px-2 rounded-lg text-center transition ${selectedCategory === 'tora' ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] font-bold' : 'text-[#34344e] dark:text-[#89a7b1] hover:text-[#3a415a] dark:hover:text-white'}`}
              >
                Torá (תּוֹרָה)
              </button>
              <button
                onClick={() => { setSelectedCategory('neviim'); setSelectedBook(BIBLE_BOOKS.find(b=>b.category==='neviim')!); setSelectedChapter(1); }}
                className={`py-2 px-2 rounded-lg text-center transition ${selectedCategory === 'neviim' ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] font-bold' : 'text-[#34344e] dark:text-[#89a7b1] hover:text-[#3a415a] dark:hover:text-white'}`}
              >
                Nevi'im (Profetas)
              </button>
              <button
                onClick={() => { setSelectedCategory('ketuvim'); setSelectedBook(BIBLE_BOOKS.find(b=>b.category==='ketuvim')!); setSelectedChapter(1); }}
                className={`py-2 px-2 rounded-lg text-center transition ${selectedCategory === 'ketuvim' ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] font-bold' : 'text-[#34344e] dark:text-[#89a7b1] hover:text-[#3a415a] dark:hover:text-white'}`}
              >
                Ketuvim (Escritos)
              </button>
              <button
                onClick={() => { setSelectedCategory('brit_hadasha'); setSelectedBook(BIBLE_BOOKS.find(b=>b.category==='brit_hadasha')!); setSelectedChapter(1); }}
                className={`py-2 px-2 rounded-lg text-center transition ${selectedCategory === 'brit_hadasha' ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] font-bold' : 'text-[#34344e] dark:text-[#89a7b1] hover:text-[#3a415a] dark:hover:text-white'}`}
              >
                Brit Hadasha
              </button>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#566981] dark:text-[#89a7b1] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar livro..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#cbdad5]/20 dark:bg-[#34344e] border border-[#89a7b1] dark:border-[#566981] rounded-xl pl-9 pr-3 py-2 text-xs text-[#34344e] dark:text-[#cbdad5] placeholder-[#566981] dark:placeholder-[#89a7b1] focus:outline-none focus:border-[#3a415a]"
              />
            </div>

            {/* Book List */}
            <div className="max-h-[450px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-[#566981]">
              {filteredBooks.map(b => (
                <div
                  key={b.id}
                  onClick={() => { setSelectedBook(b); setSelectedChapter(1); }}
                  className={`p-3 rounded-xl cursor-pointer transition flex items-center justify-between border ${selectedBook.id === b.id ? 'bg-[#89a7b1]/30 dark:bg-[#34344e] border-[#566981] text-[#34344e] dark:text-[#cbdad5]' : 'bg-[#cbdad5]/10 dark:bg-[#34344e]/50 border-[#89a7b1]/30 dark:border-[#566981]/50 hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#89a7b1]'}`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs">{b.name}</span>
                      <span className="text-[11px] font-hebrew text-[#566981] dark:text-[#89a7b1]">{b.hebrewName}</span>
                    </div>
                    <p className="text-[10px] text-[#566981] dark:text-[#89a7b1]/80 line-clamp-1">{b.description}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#566981] dark:text-[#89a7b1] px-1.5 py-0.5 rounded bg-[#cbdad5]/40 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981]">
                    {b.chaptersCount} cap
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Column: Book Text Viewer & Chapter Selector (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-2xl p-6 shadow-xl space-y-6">
            
            {/* Book Info Bar */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-[#89a7b1]/40 dark:border-[#566981]">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-[#34344e] dark:text-[#cbdad5]">{selectedBook.name}</h2>
                  <span className="text-lg font-hebrew text-[#566981] dark:text-[#89a7b1] font-bold">{selectedBook.hebrewName}</span>
                  <span className="text-xs text-[#566981] dark:text-[#89a7b1] font-mono">({selectedBook.transliteration})</span>
                </div>
                <p className="text-xs text-[#566981] dark:text-[#89a7b1] mt-1">{selectedBook.description}</p>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveView('pardes')}
                  className="px-3 py-2 rounded-lg bg-[#89a7b1]/20 dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981] text-xs font-bold hover:bg-[#89a7b1]/40 transition flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" /> ESTUDAR NO PARDES
                </button>
                <button
                  onClick={() => setActiveView('generator')}
                  className="px-3 py-2 rounded-lg bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] text-xs font-bold hover:bg-[#566981] dark:hover:bg-[#89a7b1] dark:hover:text-[#34344e] transition flex items-center gap-1.5 shadow"
                >
                  <Sparkles className="w-3.5 h-3.5" /> GERAR ESTUDO
                </button>
              </div>
            </div>

            {/* Chapter Selector Grid */}
            <div>
              <p className="text-xs font-semibold text-[#566981] dark:text-[#89a7b1] mb-2">Capítulos ({selectedBook.chaptersCount}):</p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {Array.from({ length: selectedBook.chaptersCount }, (_, i) => i + 1).map(chapNum => (
                  <button
                    key={chapNum}
                    onClick={() => setSelectedChapter(chapNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition ${selectedChapter === chapNum ? 'bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] scale-105 shadow' : 'bg-[#cbdad5]/20 dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1]/50 dark:border-[#566981] hover:bg-[#89a7b1]/30'}`}
                  >
                    {chapNum}
                  </button>
                ))}
              </div>
            </div>

            {/* Verses Text Display */}
            <div className="space-y-6 pt-4 border-t border-[#89a7b1]/40 dark:border-[#566981]">
              <h3 className="text-sm font-bold text-[#34344e] dark:text-[#cbdad5] tracking-wide uppercase">
                {selectedBook.name} — Capítulo {selectedChapter}
              </h3>

              <div className="space-y-6">
                {currentVerses.map(v => (
                  <div
                    key={v.verse}
                    onClick={() => setHighlightedVerse(v.verse)}
                    className={`p-4 rounded-xl transition border ${highlightedVerse === v.verse ? 'bg-[#89a7b1]/20 dark:bg-[#34344e] border-[#566981] shadow-lg' : 'bg-[#cbdad5]/10 dark:bg-[#34344e]/60 border-[#89a7b1]/30 dark:border-[#566981] hover:border-[#89a7b1]'}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] font-bold text-xs flex items-center justify-center">
                            {v.verse}
                          </span>
                          <span className="text-xs text-[#566981] dark:text-[#89a7b1] font-mono">{selectedBook.name} {selectedChapter}:{v.verse}</span>
                        </div>

                        {/* Portuguese Text */}
                        <p className="text-sm text-[#34344e] dark:text-[#cbdad5] leading-relaxed font-sans">{v.textPt}</p>

                        {/* Hebrew Text */}
                        {showHebrew && v.textHebrew && (
                          <div className="pt-2 border-t border-[#89a7b1]/30 dark:border-[#566981] space-y-1">
                            <p className="text-lg text-[#34344e] dark:text-[#cbdad5] font-hebrew text-right leading-loose font-medium" dir="rtl">
                              {v.textHebrew}
                            </p>
                            {v.transliteration && (
                              <p className="text-xs text-[#566981] dark:text-[#89a7b1] italic">Transliteração: {v.transliteration}</p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Verse Actions */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCreateNoteForVerse(v); }}
                          className="p-1.5 rounded bg-[#cbdad5]/40 dark:bg-[#34344e] hover:bg-[#89a7b1]/40 text-[#34344e] dark:text-[#cbdad5] hover:text-[#3a415a] transition border border-[#89a7b1]/40 dark:border-[#566981]"
                          title="Criar Anotação sobre este Versículo"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
