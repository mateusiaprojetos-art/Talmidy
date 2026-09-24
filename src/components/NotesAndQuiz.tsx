import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Plus, Search, Star, Trash2, Tag, Bookmark, FileText } from 'lucide-react';

export const NotesAndQuiz: React.FC = () => {
  const { notes, addNote, deleteNote, toggleFavoriteNote } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  // New Note Modal / Form State
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newBibleRef, setNewBibleRef] = useState<string>('');
  const [newTagsStr, setNewTagsStr] = useState<string>('');

  const filteredNotes = notes.filter(n => {
    if (onlyFavorites && !n.isFavorite) return false;
    if (!searchQuery) return true;
    return (n.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
           (n.content || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
           (n.tags || []).some(t => (t || '').toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    addNote({
      title: newTitle,
      content: newContent,
      bibleRef: newBibleRef || undefined,
      tags: newTagsStr ? newTagsStr.split(',').map(s => s.trim()) : ['Geral'],
      isFavorite: false
    });

    setNewTitle('');
    setNewContent('');
    setNewBibleRef('');
    setNewTagsStr('');
    setShowForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Caderno de Estudos</span>
            <h1 className="text-3xl font-bold text-white font-sans mt-1">Minhas Anotações & Reflexões</h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Registre suas reflexões durante a leitura da Bíblia, aulas de Hebraico e estudos da Parashá.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition text-xs shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Nova Anotação
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar nas anotações..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${onlyFavorites ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'}`}
          >
            <Star className="w-3.5 h-3.5 fill-current" /> Somente Favoritas
          </button>
        </div>
      </div>

      {/* New Note Form */}
      {showForm && (
        <form onSubmit={handleCreateNote} className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" /> Criar Nova Anotação Pessoal
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Título da Anotação:</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Ex: Reflexão sobre a criação..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Referência Bíblica (Opcional):</label>
              <input
                type="text"
                value={newBibleRef}
                onChange={e => setNewBibleRef(e.target.value)}
                placeholder="Ex: Gênesis 1:1, Deuteronômio 6:4"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Conteúdo:</label>
            <textarea
              required
              rows={4}
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              placeholder="Escreva seus apontamentos..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Tags (separadas por vírgula):</label>
            <input
              type="text"
              value={newTagsStr}
              onChange={e => setNewTagsStr(e.target.value)}
              placeholder="Ex: Torá, Pardes, Hebraico"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400"
            >
              Salvar Anotação
            </button>
          </div>
        </form>
      )}

      {/* Notes List */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotes.map(n => (
            <div key={n.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    {n.bibleRef && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        {n.bibleRef}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-white mt-1">{n.title}</h3>
                  </div>

                  <button
                    onClick={() => toggleFavoriteNote(n.id)}
                    className={`p-1.5 rounded-lg transition ${n.isFavorite ? 'text-amber-400 bg-amber-500/10' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    <Star className={`w-4 h-4 ${n.isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{n.content}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
                <div className="flex flex-wrap gap-1">
                  {(n.tags || []).map((t, i) => (
                    <span key={i} className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => deleteNote(n.id)}
                  className="p-1.5 rounded text-red-400 hover:bg-red-500/10 transition"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4 shadow-xl">
          <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">Nenhuma anotação encontrada</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Crie sua primeira anotação ou altere os filtros de busca.
          </p>
        </div>
      )}

    </div>
  );
};
