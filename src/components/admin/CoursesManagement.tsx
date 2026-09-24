import React, { useState } from 'react';
import { GraduationCap, Plus, Edit2, Trash2, Video, FileText, Award } from 'lucide-react';
import { Course } from '../../types';

export const CoursesManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 'c1',
      title: 'Introdução ao Hebraico Bíblico e Alef-Bet',
      subtitle: 'Aprenda a ler, escrever e pronunciar as letras e vogais (Niqqud) do texto bíblico original.',
      description: 'Curso fundamental para iniciantes interessados em ler a Torá no idioma hebraico.',
      level: 'Iniciante',
      category: 'Hebraico',
      modules: [
        {
          id: 'm1',
          title: 'Módulo 1: O Alfabeto Sagrado (Alef ao Tav)',
          lessons: [
            { id: 'l1', title: 'Aula 1: As Primeiras Letras (Alef, Bet, Guimel, Dalet)', durationMinutes: 25, contentMarkdown: 'Nesta aula aprenderemos as letras fundamentais...' }
          ]
        }
      ]
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-400" />
            Gerenciamento de Cursos & Aulas
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Crie novos cursos, organize módulos, insira videoaulas, materiais didáticos e certificados de conclusão.
          </p>
        </div>

        <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition">
          <Plus className="w-4 h-4" />
          <span>Criar Novo Curso</span>
        </button>
      </div>

      <div className="space-y-4">
        {courses.map(c => (
          <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold">{c.level}</span>
                <h3 className="text-lg font-bold text-white mt-1">{c.title}</h3>
                <p className="text-xs text-slate-400">{c.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 transition"><Edit2 className="w-4 h-4" /></button>
                <button className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition border border-red-500/20"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300">Módulos do Curso:</h4>
              {(c.modules || []).map(m => (
                <div key={m.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="font-semibold text-blue-300">{m.title}</div>
                  <div className="mt-2 space-y-1 pl-3 border-l-2 border-slate-800">
                    {(m.lessons || []).map(l => (
                      <div key={l.id} className="flex items-center justify-between text-slate-400">
                        <span>{l.title}</span>
                        <span className="text-[11px] font-mono">{l.durationMinutes} min</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
