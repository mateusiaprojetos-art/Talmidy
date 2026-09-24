import React, { useState, useEffect } from 'react';
import { Settings, ShieldAlert, Save, Globe, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SiteConfig } from '../../types';

export const SiteSettingsAdmin: React.FC = () => {
  const { isSuperAdmin } = useAuth();
  const [config, setConfig] = useState<SiteConfig>({
    siteName: 'Talmidim Academy',
    logoText: 'Talmidim Academy',
    description: 'Academia Digital de Estudos Bíblicos, Hebraico e Tradição Judaica',
    contactEmail: 'mateus.iaprojetos@gmail.com',
    primaryColor: '#f59e0b',
    fontFamily: 'Calibri, sans-serif',
    heroHeadline: 'Ensino Didático, Profundo e Fiel às Escrituras',
    heroSubheadline: 'Explore Torá, Profetas, Escritos, Brit Hadasha e Idioma Hebraico com exegese e hermenêutica Pardes',
    enablePublicRegistrations: true,
    maintenanceMode: false,
    defaultShabbatCity: 'São Paulo, BR'
  });

  useEffect(() => {
    fetch('/api/admin/site-config')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.config) {
          setConfig(data.config);
        }
      })
      .catch(e => console.warn('Site config fetch warning:', e));
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch('/api/admin/site-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const data = await res.json();
      if (data.success) {
        alert('Configurações do site salvas com sucesso!');
      }
    } catch (e) {
      alert('Erro ao salvar configurações.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            Configurações Gerais da Plataforma
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Defina informações institucionais, textos da página inicial e preferências do sistema.
          </p>
        </div>

        {!isSuperAdmin && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>Configurações críticas exigem SUPER_ADMIN</span>
          </div>
        )}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Nome da Plataforma:</label>
            <input
              type="text"
              value={config.siteName}
              onChange={e => setConfig({ ...config, siteName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">E-mail de Contato/Suporte:</label>
            <input
              type="email"
              value={config.contactEmail}
              onChange={e => setConfig({ ...config, contactEmail: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Título do Banner Principal (Hero):</label>
          <input
            type="text"
            value={config.heroHeadline}
            onChange={e => setConfig({ ...config, heroHeadline: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Subtítulo do Banner Principal:</label>
          <textarea
            rows={2}
            value={config.heroSubheadline}
            onChange={e => setConfig({ ...config, heroSubheadline: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Critical Settings restricted to SuperAdmin */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h3 className="font-bold text-blue-400 flex items-center gap-2 text-sm">
            <Lock className="w-4 h-4" /> Configurações Críticas de Segurança
          </h3>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="pubReg"
              checked={config.enablePublicRegistrations}
              disabled={!isSuperAdmin}
              onChange={e => setConfig({ ...config, enablePublicRegistrations: e.target.checked })}
              className="rounded bg-slate-950 border-slate-800 text-blue-500"
            />
            <label htmlFor="pubReg" className="text-slate-300 font-medium">
              Permitir novos cadastros públicos na plataforma
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="maint"
              checked={config.maintenanceMode}
              disabled={!isSuperAdmin}
              onChange={e => setConfig({ ...config, maintenanceMode: e.target.checked })}
              className="rounded bg-slate-950 border-slate-800 text-blue-500"
            />
            <label htmlFor="maint" className="text-slate-300 font-medium">
              Ativar Modo Manutenção (Apenas administradores conseguem acessar)
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
};
