import React, { useState } from 'react';
import { X, BookOpen, Mail, Lock, User, Phone, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { login, register, loginWithGoogle, isFirestoreConnected } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('register');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [receiveEmails, setReceiveEmails] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const ok = await login(email, password);
        if (ok) onClose();
        else setErrorMsg('Credenciais inválidas. Verifique o e-mail e senha.');
      } else if (mode === 'register') {
        if (!name || !email || !password) {
          setErrorMsg('Preencha todos os campos obrigatórios.');
          setLoading(false);
          return;
        }
        const ok = await register(name, email, phone, password, receiveEmails);
        if (ok) onClose();
        else setErrorMsg('Erro ao cadastrar conta.');
      } else if (mode === 'forgot') {
        alert(`Instruções de recuperação enviadas para ${email}!`);
        setMode('login');
      }
    } catch (err) {
      setErrorMsg('Ocorreu um erro no servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    const ok = await loginWithGoogle();
    setLoading(false);
    if (ok) {
      onClose();
    } else {
      setErrorMsg('Falha na autenticação com o Google.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center mx-auto shadow-lg">
            <BookOpen className="w-7 h-7 stroke-[2.2]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Talmidim Academy</h2>
          <p className="text-xs text-blue-300 font-medium">
            {mode === 'login' && 'Acesse sua conta para sincronizar estudos na nuvem'}
            {mode === 'register' && 'Crie sua conta na Academia Digital de Estudos'}
            {mode === 'forgot' && 'Recuperação de Senha'}
          </p>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] text-emerald-400 font-medium">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Banco de Dados Firestore Conectado</span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-bold text-center">
            {errorMsg}
          </div>
        )}

        {/* Google Quick Sign-In */}
        {mode !== 'forgot' && (
          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white font-medium text-xs flex items-center justify-center gap-3 transition shadow"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continuar com Google</span>
            </button>

            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
              <div className="flex-1 h-px bg-slate-800" />
              <span>ou preencha os dados</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {mode === 'register' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Nome Completo:</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-300 mb-1">E-mail Profissional:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Telefone / WhatsApp (Opcional):</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="(11) 98765-4321"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {mode !== 'forgot' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Senha de Acesso:</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  minLength={4}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {mode === 'register' && (
            <label className="flex items-start gap-2 cursor-pointer pt-2 text-slate-300">
              <input
                type="checkbox"
                checked={receiveEmails}
                onChange={e => setReceiveEmails(e.target.checked)}
                className="mt-0.5 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
              />
              <span className="leading-tight">
                Desejo receber o devocional diário da Palavra do Dia, resumo da Parashat HaShavua e lembretes de Shabat por e-mail.
              </span>
            </label>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition text-sm shadow-lg pt-3 disabled:opacity-50"
          >
            {loading ? 'Aguarde...' : (
              mode === 'login' ? 'ENTRAR NA CONTA' :
              mode === 'register' ? 'CADASTRAR E COMEÇAR' : 'ENVIAR INSTRUÇÕES'
            )}
          </button>
        </form>

        {/* Footer Mode Switcher */}
        <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400 space-y-2">
          {mode === 'login' && (
            <>
              <p>
                Ainda não tem conta?{' '}
                <button onClick={() => setMode('register')} className="text-blue-400 font-bold hover:underline">
                  Cadastre-se Gratuitamente
                </button>
              </p>
              <p>
                <button onClick={() => setMode('forgot')} className="text-slate-500 hover:text-slate-300">
                  Esqueceu a senha?
                </button>
              </p>
            </>
          )}

          {mode === 'register' && (
            <p>
              Já possui conta cadastrada?{' '}
              <button onClick={() => setMode('login')} className="text-blue-400 font-bold hover:underline">
                Faça Login
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <button onClick={() => setMode('login')} className="text-blue-400 font-bold hover:underline">
              Voltar ao Login
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
