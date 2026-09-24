import React, { useState } from 'react';
import { AlertTriangle, X, ShieldAlert } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDangerous?: boolean;
  requireDoubleConfirmation?: boolean;
  doubleConfirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  isDangerous = false,
  requireDoubleConfirmation = false,
  doubleConfirmText = 'CONFIRMAR',
  onConfirm,
  onCancel
}) => {
  const [typedConfirm, setTypedConfirm] = useState('');

  if (!isOpen) return null;

  const canConfirm = !requireDoubleConfirmation || (typedConfirm || '').trim().toUpperCase() === (doubleConfirmText || 'CONFIRMAR').toUpperCase();

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-5 animate-in fade-in zoom-in-95">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${isDangerous ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-blue-950/80 text-blue-400 border border-blue-800'}`}>
            {isDangerous ? <ShieldAlert className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-snug">{title}</h3>
            <p className="text-xs text-slate-400">Ação administrativa sensível</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
          {message}
        </p>

        {requireDoubleConfirmation && (
          <div className="space-y-1.5 text-xs">
            <label className="block text-slate-400 font-medium">
              Digite <span className="text-red-400 font-bold">{doubleConfirmText}</span> para habilitar a confirmação:
            </label>
            <input
              type="text"
              value={typedConfirm}
              onChange={(e) => setTypedConfirm(e.target.value)}
              placeholder={`Digite "${doubleConfirmText}"`}
              className="w-full bg-slate-950 border border-red-500/40 rounded-xl px-3 py-2 text-red-300 font-mono text-xs focus:outline-none focus:border-red-500"
            />
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={!canConfirm}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition disabled:opacity-40 disabled:cursor-not-allowed ${
              isDangerous
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
