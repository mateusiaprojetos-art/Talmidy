import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { BibleReader } from './components/BibleReader';
import { PardesView } from './components/PardesView';
import { ParashaSection } from './components/ParashaSection';
import { CalendarAndShabbat } from './components/CalendarAndShabbat';
import { HebrewEasyCourse } from './components/HebrewEasyCourse';
import { ShemaAndPrayers } from './components/ShemaAndPrayers';
import { StudyGenerator } from './components/StudyGenerator';
import { ProfessorTalmidim } from './components/ProfessorTalmidim';
import { MyStudies } from './components/MyStudies';
import { NotesAndQuiz } from './components/NotesAndQuiz';
import { CoursesView } from './components/CoursesView';
import { ThemesAndTimeline } from './components/ThemesAndTimeline';
import { EmailNotificationManager } from './components/EmailNotificationManager';
import { UserDashboard } from './components/UserDashboard';
import { AdminLayout } from './components/admin/AdminLayout';
import { ShabbatModeModal } from './components/ShabbatModeModal';
import { AuthModal } from './components/AuthModal';

const MainContent: React.FC = () => {
  const { activeView, setActiveView } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [shabbatModalOpen, setShabbatModalOpen] = useState(false);

  if (activeView === 'admin') {
    return <AdminLayout onBackToApp={() => setActiveView('home')} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <Hero onOpenAuth={() => setAuthModalOpen(true)} />;
      case 'bible':
        return <BibleReader />;
      case 'tora':
        return <BibleReader initialCategory="tora" />;
      case 'neviim':
        return <BibleReader initialCategory="neviim" />;
      case 'ketuvim':
        return <BibleReader initialCategory="ketuvim" />;
      case 'brit_hadasha':
        return <BibleReader initialCategory="brit_hadasha" />;
      case 'pardes':
        return <PardesView />;
      case 'parasha':
        return <ParashaSection />;
      case 'calendar':
      case 'shabbat':
      case 'festas':
        return <CalendarAndShabbat />;
      case 'hebrew':
        return <HebrewEasyCourse />;
      case 'shema':
      case 'daily':
        return <ShemaAndPrayers />;
      case 'generator':
        return <StudyGenerator />;
      case 'ia':
        return <ProfessorTalmidim />;
      case 'mystudies':
        return <MyStudies />;
      case 'notes':
        return <NotesAndQuiz />;
      case 'courses':
        return <CoursesView />;
      case 'themes':
        return <ThemesAndTimeline />;
      case 'notifications':
        return <EmailNotificationManager />;
      case 'dashboard':
        return <UserDashboard />;
      default:
        return <Hero onOpenAuth={() => setAuthModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#cbdad5] dark:bg-[#34344e] text-[#34344e] dark:text-[#cbdad5] font-sans selection:bg-[#566981] selection:text-[#cbdad5]">
      <Header
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenShabbatMode={() => setShabbatModalOpen(true)}
      />

      <main className="flex-1 bg-[#cbdad5] dark:bg-[#34344e]">
        {renderView()}
      </main>

      <Footer />

      {authModalOpen && (
        <AuthModal onClose={() => setAuthModalOpen(false)} />
      )}

      {shabbatModalOpen && (
        <ShabbatModeModal onClose={() => setShabbatModalOpen(false)} />
      )}
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

export default App;
