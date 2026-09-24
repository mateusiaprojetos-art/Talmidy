import React, { useState } from 'react';
import { HelpCircle, Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { QuizQuestion } from '../../types';

export const QuizzesManagement: React.FC = () => {
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([
    {
      id: 'q1',
      question: 'Qual é a primeira palavra da Torá no texto em hebraico e o significado de sua primeira letra?',
      options: [
        'Elohim (Deus) - A primeira letra representa unicidade',
        'Bereshit (No princípio) - A letra Bet (ב) representa casa/dualidade dos mundos',
        'Bara (Criou) - A primeira letra representa criação',
        'Shalom (Paz) - A primeira letra representa perfeição'
      ],
      correctIndex: 1,
      explanation: 'A Torá inicia com Bereshit (בְּרֵאשִׁית). A letra Bet (ב) tem valor numérico 2 e formato de uma casa fechada.',
      category: 'parasha'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            Gerenciamento de Quizzes & Exercícios
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Cadastre perguntas, alternativas de múltipla escolha, verdadeiro/falso, explicações e dificuldades.
          </p>
        </div>

        <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition">
          <Plus className="w-4 h-4" />
          <span>Nova Pergunta</span>
        </button>
      </div>

      <div className="space-y-4">
        {quizzes.map(q => (
          <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold uppercase text-[10px]">Categoria: {q.category}</span>
            </div>

            <p className="font-bold text-white text-sm">{q.question}</p>

            <div className="space-y-1.5 pt-1">
              {(q.options || []).map((opt, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center justify-between ${
                    idx === q.correctIndex
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <span>{opt}</span>
                  {idx === q.correctIndex && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
              <strong className="text-blue-400">Explicação Didática:</strong> {q.explanation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
