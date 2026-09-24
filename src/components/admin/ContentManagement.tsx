import React, { useState } from 'react';
import { BookOpen, Plus, Edit2, Trash2, CheckCircle, Archive, Save, X, Eye, FileText } from 'lucide-react';
import { BiblicalContentItem } from '../../types';

export const ContentManagement: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'tora' | 'neviim' | 'ketuvim' | 'brit_hadasha'>('tora');
  const [toraSubCategory, setToraSubCategory] = useState<'bereshit' | 'shemot' | 'vayikra' | 'bamidbar' | 'devarim'>('bereshit');
  
  const [items, setItems] = useState<BiblicalContentItem[]>([
    {
      id: 'item_1',
      category: 'tora',
      subCategory: 'bereshit',
      title: 'A Criação do Universo e o Bet de Bereshit',
      hebrewTitle: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים',
      reference: 'Gênesis 1:1 - 2:3',
      textBody: 'No princípio, criou Deus os céus e a terra. A primeira palavra da Torá começa com a letra Bet (ב).',
      traditionNote: 'Segundo a tradição rabínica do Midrash Rabba, o Bet é fechado atrás, acima e abaixo, e aberto para frente, ensinando que não devemos especular o que veio antes.',
      commentaryNote: 'Exegese comparativa com cosmogonia do Oriente Próximo antigo.',
      hypothesisNote: 'Análise linguística da raiz Bará (ב.ר.א) no hebraico bíblico.',
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'item_2',
      category: 'brit_hadasha',
      reference: 'João 1:1-14',
      title: 'O Logos e o Dabar na Brit Hadasha',
      hebrewTitle: 'בְּרֵאשִׁית הָיָה הַדָּבָר',
      textBody: 'No princípio era o Verbo (Dabar / Logos), e o Verbo estava com Deus.',
      traditionNote: 'Conexão com a Memra no Targum Aramaico.',
      commentaryNote: 'Paralelo exegético com Bereshit 1.',
      hypothesisNote: 'Origem joanina no judaísmo do Segundo Templo.',
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<BiblicalContentItem> | null>(null);

  const handleOpenNew = () => {
    setEditingItem({
      category: activeCategory,
      subCategory: activeCategory === 'tora' ? toraSubCategory : undefined,
      title: '',
      hebrewTitle: '',
      reference: '',
      textBody: '',
      traditionNote: '',
      commentaryNote: '',
      hypothesisNote: '',
      status: 'published'
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!editingItem?.title || !editingItem?.textBody) {
      alert('Preencha pelo menos o Título e o Texto Principal.');
      return;
    }

    if (editingItem.id) {
      setItems(prev => prev.map(i => i.id === editingItem.id ? { ...i, ...editingItem, updatedAt: new Date().toISOString() } as BiblicalContentItem : i));
    } else {
      const newItem: BiblicalContentItem = {
        ...editingItem,
        id: `content_${Date.now()}`,
        category: activeCategory,
        subCategory: activeCategory === 'tora' ? toraSubCategory : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as BiblicalContentItem;
      setItems(prev => [newItem, ...prev]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja excluir este conteúdo permanente?')) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleToggleStatus = (item: BiblicalContentItem) => {
    const nextStatus = item.status === 'published' ? 'draft' : 'published';
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: nextStatus } : i));
  };

  const filteredItems = items.filter(i => {
    if (i.category !== activeCategory) return false;
    if (activeCategory === 'tora' && i.subCategory !== toraSubCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Gerenciamento de Conteúdos Bíblicos
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Cadastre, edite e organize leituras da Torá, Profetas (Neviim), Escritos (Ketuvim) e Brit Hadasha.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Conteúdo</span>
        </button>
      </div>

      {/* Main Categories Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 text-xs font-bold">
        <button
          onClick={() => setActiveCategory('tora')}
          className={`px-4 py-2 rounded-xl transition ${
            activeCategory === 'tora'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Torá (תּוֹרָה)
        </button>
        <button
          onClick={() => setActiveCategory('neviim')}
          className={`px-4 py-2 rounded-xl transition ${
            activeCategory === 'neviim'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Profetas (Neviim)
        </button>
        <button
          onClick={() => setActiveCategory('ketuvim')}
          className={`px-4 py-2 rounded-xl transition ${
            activeCategory === 'ketuvim'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Escritos (Ketuvim)
        </button>
        <button
          onClick={() => setActiveCategory('brit_hadasha')}
          className={`px-4 py-2 rounded-xl transition ${
            activeCategory === 'brit_hadasha'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Brit Hadasha (בְּרִית חֲדָשָׁה)
        </button>
      </div>

      {/* Torah Books Sub-Navigation */}
      {activeCategory === 'tora' && (
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/60 p-2 rounded-2xl border border-slate-800 text-xs">
          {(['bereshit', 'shemot', 'vayikra', 'bamidbar', 'devarim'] as const).map(book => (
            <button
              key={book}
              onClick={() => setToraSubCategory(book)}
              className={`px-3 py-1.5 rounded-xl capitalize font-semibold transition ${
                toraSubCategory === book
                  ? 'bg-slate-800 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {book === 'bereshit' ? 'Bereshit (Gênesis)' :
               book === 'shemot' ? 'Shemot (Êxodo)' :
               book === 'vayikra' ? 'Vayikra (Levítico)' :
               book === 'bamidbar' ? 'Bamidbar (Números)' : 'Devarim (Deuteronômio)'}
            </button>
          ))}
        </div>
      )}

      {/* Items List Grid */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl text-slate-500 text-xs space-y-3">
            <BookOpen className="w-8 h-8 mx-auto text-slate-600" />
            <p>Nenhum conteúdo cadastrado nesta seção ainda.</p>
            <button
              onClick={handleOpenNew}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
            >
              Adicionar Primeiro Conteúdo
            </button>
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{item.reference}</span>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  {item.hebrewTitle && <p className="text-sm text-blue-200 font-serif">{item.hebrewTitle}</p>}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>

                  <button
                    onClick={() => handleToggleStatus(item)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
                  >
                    {item.status === 'published' ? 'Despublicar' : 'Publicar'}
                  </button>

                  <button
                    onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition border border-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Categorized Notes Preview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="font-bold text-blue-400 block mb-1">📜 Texto Principal</span>
                  <p className="text-slate-300 line-clamp-3">{item.textBody}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="font-bold text-cyan-400 block mb-1">🕯️ Tradição</span>
                  <p className="text-slate-300 line-clamp-3">{item.traditionNote || 'Sem nota de tradição'}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="font-bold text-indigo-400 block mb-1">💬 Comentário</span>
                  <p className="text-slate-300 line-clamp-3">{item.commentaryNote || 'Sem comentário'}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="font-bold text-emerald-400 block mb-1">🔬 Hipótese</span>
                  <p className="text-slate-300 line-clamp-3">{item.hypothesisNote || 'Sem hipótese'}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Editor Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-slate-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white">
              {editingItem.id ? 'Editar Conteúdo Bíblico' : 'Novo Conteúdo Bíblico'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Título do Estudo:</label>
                <input
                  type="text"
                  value={editingItem.title || ''}
                  onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="Ex: A Criação do Universo"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Referência Bíblica:</label>
                <input
                  type="text"
                  value={editingItem.reference || ''}
                  onChange={e => setEditingItem({ ...editingItem, reference: e.target.value })}
                  placeholder="Ex: Gênesis 1:1-5"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-slate-300 mb-1">Título/Frase em Hebraico (Opcional):</label>
              <input
                type="text"
                value={editingItem.hebrewTitle || ''}
                onChange={e => setEditingItem({ ...editingItem, hebrewTitle: e.target.value })}
                placeholder="Ex: בְּרֵאשִׁית"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-blue-300 font-serif focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-3 text-xs pt-2 border-t border-slate-800">
              <div>
                <label className="block font-semibold text-blue-400 mb-1">1. Texto Bíblico Explicativo:</label>
                <textarea
                  rows={3}
                  value={editingItem.textBody || ''}
                  onChange={e => setEditingItem({ ...editingItem, textBody: e.target.value })}
                  placeholder="Apresentação exata do texto bíblico e contexto imediato..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-cyan-400 mb-1">2. Tradição Judaica / Midrash:</label>
                <textarea
                  rows={2}
                  value={editingItem.traditionNote || ''}
                  onChange={e => setEditingItem({ ...editingItem, traditionNote: e.target.value })}
                  placeholder="Interpretações dos sábios e comentários tradicionais..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-indigo-400 mb-1">3. Comentário Hermenêutico:</label>
                <textarea
                  rows={2}
                  value={editingItem.commentaryNote || ''}
                  onChange={e => setEditingItem({ ...editingItem, commentaryNote: e.target.value })}
                  placeholder="Comentário histórico e literário..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-emerald-400 mb-1">4. Hipótese Acadêmica / Exegética:</label>
                <textarea
                  rows={2}
                  value={editingItem.hypothesisNote || ''}
                  onChange={e => setEditingItem({ ...editingItem, hypothesisNote: e.target.value })}
                  placeholder="Análise de termos no hebraico e hipótese exegética..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium text-xs hover:bg-slate-700 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition shadow-lg flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Conteúdo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
