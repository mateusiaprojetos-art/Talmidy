import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Send, Mail, CheckCircle2, Clock, MapPin, Shield, RefreshCw } from 'lucide-react';

interface EmailLog {
  id: string;
  email: string;
  name: string;
  type: string;
  subject: string;
  sentAt: string;
  status: 'SENT' | 'PENDING' | 'FAILED';
}

export const EmailNotificationManager: React.FC = () => {
  const { user, updateNotificationPreferences, triggerWelcomeEmail, triggerTestDailyEmail, setShabbatCity } = useAuth();
  const [emailQueue, setEmailQueue] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchQueue = async () => {
    try {
      const res = await fetch('/api/email/queue');
      const data = await res.json();
      if (data.success) {
        setEmailQueue(data.queue || []);
      }
    } catch (e) {
      console.warn('Queue fetch:', e);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-slate-300">
        <p>Por favor, entre em sua conta para configurar suas preferências de notificações por e-mail.</p>
      </div>
    );
  }

  const prefs = user.notificationPreferences || {
    weeklyParashaSummary: true,
    shabbatReminders: true,
    newCoursesAndLessons: true,
    hebrewPracticeReminders: true,
    academicAnnouncements: true,
    studyStreakAlerts: true
  };

  const handleToggle = (key: keyof typeof prefs) => {
    updateNotificationPreferences({ [key]: !prefs[key] });
  };

  const handleTestWelcome = async () => {
    setLoading(true);
    setSuccessMsg(null);
    await triggerWelcomeEmail();
    await fetchQueue();
    setSuccessMsg('E-mail de boas-vindas enviado com sucesso para a fila!');
    setLoading(false);
  };

  const handleTestDaily = async () => {
    setLoading(true);
    setSuccessMsg(null);
    await triggerTestDailyEmail();
    await fetchQueue();
    setSuccessMsg(`E-mail diário agendado para às ${prefs.dailyTime} enviado com sucesso!`);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Comunicação & Notificações</span>
          <h1 className="text-3xl font-bold text-white font-sans mt-1">Notificações por E-mail & Lembretes</h1>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Gerencie seu recebimento diário de devocionais, Palavra do Dia, Parashat HaShavua e lembretes de acendimento de velas do Shabat.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Preferences Form (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Bell className="w-5 h-5 text-amber-400" /> Preferências do Usuário ({user.email})
          </h2>

          <div className="space-y-4 text-xs">
            {/* Main Daily Toggle */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <p className="font-bold text-white text-sm">Receber E-mail Diário de Estudos</p>
                <p className="text-slate-400">Palavra do Dia em Hebraico, versículo e devocional matutino</p>
              </div>
              <input
                type="checkbox"
                checked={prefs.dailyEmail}
                onChange={() => handleToggle('dailyEmail')}
                className="w-5 h-5 rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
              />
            </div>

            {/* Time Picker */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <p className="font-bold text-white">Horário Preferido para Envio:</p>
                <p className="text-slate-400">Escolha o melhor momento da manhã</p>
              </div>
              <select
                value={prefs.dailyTime}
                onChange={e => updateNotificationPreferences({ dailyTime: e.target.value })}
                className="bg-slate-900 border border-slate-700 text-amber-300 font-bold rounded-lg px-3 py-1.5 focus:outline-none"
              >
                <option value="06:00">06:00 AM</option>
                <option value="07:00">07:00 AM</option>
                <option value="08:00">08:00 AM</option>
                <option value="09:00">09:00 AM</option>
              </select>
            </div>

            {/* Category Checks */}
            <div className="space-y-2 pt-2">
              <p className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">Módulos Inclusos no E-mail:</p>
              
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer">
                <span>Palavra do Dia em Hebraico & Pronúncia</span>
                <input type="checkbox" checked={prefs.wordOfDay} onChange={() => handleToggle('wordOfDay')} className="text-amber-500 rounded" />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer">
                <span>Resumo da Parashat HaShavua</span>
                <input type="checkbox" checked={prefs.parashah} onChange={() => handleToggle('parashah')} className="text-amber-500 rounded" />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer">
                <span>Horários de Shabat da Minha Cidade</span>
                <input type="checkbox" checked={prefs.shabbat} onChange={() => handleToggle('shabbat')} className="text-amber-500 rounded" />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer">
                <span>Alertas de Festas Bíblicas</span>
                <input type="checkbox" checked={prefs.holidays} onChange={() => handleToggle('holidays')} className="text-amber-500 rounded" />
              </label>
            </div>

            {/* Test Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3">
              <button
                onClick={handleTestWelcome}
                disabled={loading}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 text-xs font-semibold transition flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-amber-400" /> Testar E-mail de Boas-Vindas
              </button>

              <button
                onClick={handleTestDaily}
                disabled={loading}
                className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 text-xs transition flex items-center gap-2 shadow"
              >
                <Mail className="w-3.5 h-3.5" /> Testar E-mail Diário ({prefs.dailyTime})
              </button>
            </div>

          </div>
        </div>

        {/* Right: Email Queue History / Admin View (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" />
              Fila de Disparos de E-mail
            </h3>
            <button onClick={fetchQueue} className="p-1 rounded text-slate-400 hover:text-white">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1 text-xs">
            {emailQueue.length > 0 ? (
              emailQueue.map(item => (
                <div key={item.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white truncate max-w-[150px]">{item.subject}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Destinatário: {item.email}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{new Date(item.sentAt).toLocaleString('pt-BR')}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-6">Nenhum e-mail na fila.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
