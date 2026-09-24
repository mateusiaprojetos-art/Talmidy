import React, { useState } from 'react';
import { Mail, Bell, Plus, Send, Pause, Play, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import { EmailCampaign, PushNotificationCampaign } from '../../types';

export const EmailsNotificationsManagement: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'emails' | 'push'>('emails');

  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([
    {
      id: 'c_1',
      title: 'Devocional de Shabat e Parashá Re\'eh',
      subject: 'Shabbat Shalom! Estudo da Parashá Re\'eh e acendimento das velas',
      category: 'Shabbat',
      targetAudience: 'Todos',
      scheduledDate: new Date().toISOString(),
      status: 'AGENDADO',
      bodyMarkdown: 'Shalom queridos alunos da Talmidim Academy! Esta semana estudamos a Parashá Re\'eh...'
    }
  ]);

  const [pushNotifs, setPushNotifs] = useState<PushNotificationCampaign[]>([
    {
      id: 'p_1',
      title: 'Aviso de Shabat',
      message: 'Lembrete: O acendimento das velas em São Paulo ocorre às 17:38.',
      targetAudience: 'Todos',
      scheduledAt: new Date().toISOString(),
      status: 'PUBLICADO'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" />
            Gerenciamento de E-mails & Notificações
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Crie campanhas de devocionais diários, avisos de Shabat, lembretes de cursos e disparos push para audiências selecionadas.
          </p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('emails')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
            activeSubTab === 'emails' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Campanhas de E-mail ({campaigns.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('push')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
            activeSubTab === 'push' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notificações Push ({pushNotifs.length})</span>
        </button>
      </div>

      {/* Emails Tab */}
      {activeSubTab === 'emails' && (
        <div className="space-y-4">
          {campaigns.map(c => (
            <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold uppercase text-[10px]">
                    {c.category} • Público: {c.targetAudience}
                  </span>
                  <h3 className="font-bold text-white text-sm mt-1">{c.title}</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold">{c.status}</span>
              </div>

              <p className="text-slate-300 font-medium"><strong>Assunto:</strong> {c.subject}</p>
              <p className="text-slate-400 line-clamp-2">{c.bodyMarkdown}</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-[11px] text-slate-500 font-mono">Agendado: {new Date(c.scheduledDate).toLocaleString('pt-BR')}</span>
                <button
                  onClick={() => alert('Disparo de e-mail de teste enviado para seu e-mail!')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 font-bold transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Enviar Teste
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Push Tab */}
      {activeSubTab === 'push' && (
        <div className="space-y-4">
          {pushNotifs.map(p => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{p.title}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">{p.status}</span>
              </div>
              <p className="text-slate-300">{p.message}</p>
              <p className="text-[11px] text-slate-500">Público-alvo: {p.targetAudience}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
