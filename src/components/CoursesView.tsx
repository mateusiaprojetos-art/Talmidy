import React, { useState } from 'react';
import { ACADEMY_COURSES } from '../data/coursesData';
import { Course, CourseLesson } from '../types';
import { useAuth } from '../context/AuthContext';
import { BookOpen, CheckCircle2, PlayCircle, Trophy, Sparkles, ArrowRight } from 'lucide-react';

export const CoursesView: React.FC = () => {
  const { user, addStudyMinutes } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<Course>(ACADEMY_COURSES[0]);
  const [selectedLesson, setSelectedLesson] = useState<CourseLesson>(ACADEMY_COURSES[0].modules[0].lessons[0]);

  const handleCompleteLesson = (lessonId: string) => {
    addStudyMinutes(20);
    alert('Aula concluída! +20 minutos de estudo adicionados ao seu perfil.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Ensino Sistematizado</span>
          <h1 className="text-3xl font-bold text-white font-sans mt-1">Academia de Cursos Talmidim</h1>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Cursos estruturados em módulos para guiar seu aprendizado desde os fundamentos da Torá até o hebraico e o contexto histórico do Primeiro Século.
          </p>
        </div>

        {/* Course Selectors */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800 overflow-x-auto">
          {ACADEMY_COURSES.map(c => (
            <button
              key={c.id}
              onClick={() => { setSelectedCourse(c); setSelectedLesson(c.modules[0].lessons[0]); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${selectedCourse.id === c.id ? 'bg-amber-500 text-slate-950 border-amber-400 shadow' : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'}`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Course Modules Left (4 cols), Lesson Viewer Right (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Modules List */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">{selectedCourse.level}</span>
            <h2 className="text-lg font-bold text-white mt-1">{selectedCourse.title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{selectedCourse.subtitle}</p>
          </div>

          <div className="space-y-4 pt-2 border-t border-slate-800">
            {(selectedCourse.modules || []).map(mod => (
              <div key={mod.id} className="space-y-2">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">{mod.title}</h3>
                <div className="space-y-1.5">
                  {(mod.lessons || []).map(less => (
                    <button
                      key={less.id}
                      onClick={() => setSelectedLesson(less)}
                      className={`w-full p-3 rounded-xl text-left text-xs transition border flex items-center justify-between ${selectedLesson.id === less.id ? 'bg-amber-500/20 text-white border-amber-400 font-bold' : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'}`}
                    >
                      <div className="flex items-center gap-2">
                        <PlayCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="line-clamp-1">{less.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{less.durationMinutes} min</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Lesson Viewer */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4 flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">{selectedCourse.title}</span>
              <h2 className="text-2xl font-bold text-white mt-1">{selectedLesson.title}</h2>
              <p className="text-xs text-slate-400">Duração estimada: {selectedLesson.durationMinutes} minutos</p>
            </div>

            <button
              onClick={() => handleCompleteLesson(selectedLesson.id)}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 text-xs transition flex items-center gap-1.5 shadow"
            >
              <CheckCircle2 className="w-4 h-4" /> Marcar como Concluída
            </button>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans space-y-4 whitespace-pre-wrap">
            {selectedLesson.contentMarkdown}
          </div>
        </div>

      </div>
    </div>
  );
};
