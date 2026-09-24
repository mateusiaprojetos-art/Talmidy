import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, RefreshCw, BookOpen, Layers, ShieldCheck, Languages } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

const PERSONA_MODES = [
  { id: 'pardes', name: 'Professor Pardes', icon: Layers, desc: 'Especialista nos 4 níveis de hermenêutica (Peshat, Remez, Derash, Sod)' },
  { id: 'hebrew', name: 'Professor de Hebraico', icon: Languages, desc: 'Análise de raízes trifórmicas, gramática e vocabulário' },
  { id: 'parasha', name: 'Mestre de Parashá', icon: BookOpen, desc: 'Estudos e exegeses sobre a porção semanal da Torá' },
  { id: 'history', name: 'Historiador do 2º Templo', icon: ShieldCheck, desc: 'Contexto social, fariseus, saduceus, essênios no 1º Século' },
  { id: 'brit', name: 'Pesquisador da Brit Hadasha', icon: Sparkles, desc: 'Estudos dos Evangelhos e Epístolas sob a matriz judaica' }
];

export const ProfessorTalmidim: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<string>('pardes');
  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Shalom u\'vrachah! Sou o Professor Talmidim. Como posso auxiliar seus estudos das Escrituras hoje? Podemos analisar passagens pelo método Pardes, examinar raízes hebraicas ou explorar o contexto do Segundo Templo.',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userMsgText = inputMessage.trim();
    const newUserMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const historyPayload = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        text: m.text
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsgText,
          personaMode: selectedPersona,
          history: historyPayload
        })
      });

      const data = await res.json();
      if (data.success) {
        const newBotMsg: ChatMessage = {
          id: `a_${Date.now()}`,
          sender: 'assistant',
          text: data.reply,
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newBotMsg]);
      } else {
        alert(data.error || 'Erro na resposta do Professor Talmidim.');
      }
    } catch (err) {
      alert('Falha ao conectar com o servidor da IA.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Inteligência Artificial Erudita</span>
          <h1 className="text-3xl font-bold text-white font-sans mt-1">Professor Talmidim (Assistente de IA)</h1>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Tire dúvidas, peça exegeses em hebraico, solicite análises do Pardes e explore o pano de fundo histórico em tempo real.
          </p>
        </div>

        {/* Persona Selectors */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {PERSONA_MODES.map(p => {
            const IconComp = p.icon;
            const isSelected = selectedPersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPersona(p.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${isSelected ? 'bg-amber-500 text-slate-950 border-amber-400 shadow' : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'}`}
              >
                <IconComp className="w-3.5 h-3.5" />
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col h-[550px]">
        
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${msg.sender === 'user' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-amber-400 border border-slate-700'}`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-2xl text-xs leading-relaxed space-y-1 shadow-md ${msg.sender === 'user' ? 'bg-amber-500/20 text-white border border-amber-500/40' : 'bg-slate-950 text-slate-200 border border-slate-800 whitespace-pre-wrap'}`}>
                <div className="flex justify-between items-center gap-4 text-[10px] text-slate-400 mb-1 font-mono">
                  <span>{msg.sender === 'user' ? 'Você' : 'Professor Talmidim'}</span>
                  <span>{msg.time}</span>
                </div>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 max-w-xl mr-auto">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center border border-slate-700">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 text-slate-400 text-xs border border-slate-800 animate-pulse">
                O Professor Talmidim está consultando o texto e as fontes...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-950/80 flex gap-2 rounded-b-2xl">
          <input
            type="text"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            placeholder="Pergunte sobre uma passagem, termo em hebraico ou conceito..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="px-5 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition text-xs flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> Enviar
          </button>
        </form>

      </div>
    </div>
  );
};
