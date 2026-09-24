import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen,
  User,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Flame,
  FileText,
  Award,
  ChevronDown,
  Send,
  Moon,
  Sun
} from 'lucide-react';

interface HeaderProps {
  onOpenAuth: () => void;
  onOpenShabbatMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth, onOpenShabbatMode }) => {
  const { user, isAuthenticated, logout, activeView, setActiveView, hasAdminAccess, theme, toggleTheme } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (view: string) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveView('bible');
      setSearchOpen(false);
    }
  };

  const isVisible = isScrolled || isHovered || mobileMenuOpen;

  return (
    <>
      {/* Invisible Hover Trigger Area at the top when at scroll position 0 */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        className="fixed top-0 left-0 right-0 h-3 z-50 pointer-events-auto"
        aria-hidden="true"
      />

      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 right-0 z-40 bg-[#cbdad5]/95 dark:bg-[#34344e]/95 backdrop-blur-md border-b border-[#89a7b1] dark:border-[#566981] font-sans transition-all duration-300 ease-in-out transform ${
          isVisible
            ? 'translate-y-0 opacity-100 shadow-md pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Main Clean Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-[#3a415a] dark:bg-[#566981] flex items-center justify-center text-[#cbdad5] shadow-sm group-hover:bg-[#566981] dark:group-hover:bg-[#89a7b1] dark:group-hover:text-[#34344e] transition">
                <BookOpen className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-lg sm:text-xl tracking-tight text-[#34344e] dark:text-[#cbdad5] font-sans">
                    Talmidim
                  </span>
                  <span className="font-bold text-xs px-2 py-0.5 rounded bg-[#89a7b1]/20 dark:bg-[#3a415a] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981]">
                    Academy
                  </span>
                </div>
                <p className="text-[10px] text-[#566981] dark:text-[#89a7b1] font-medium tracking-wide">
                  Academia Digital de Estudos
                </p>
              </div>
            </div>

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center space-x-1 text-xs font-semibold overflow-x-auto scrollbar-none py-2 px-2">
              {[
                { id: 'home', label: 'Início' },
                { id: 'bible', label: 'Bíblia' },
                { id: 'tora', label: 'Torá' },
                { id: 'neviim', label: 'Profetas' },
                { id: 'ketuvim', label: 'Escritos' },
                { id: 'brit_hadasha', label: 'Brit Hadasha' },
                { id: 'pardes', label: 'Pardes' },
                { id: 'parasha', label: 'Parashá' },
                { id: 'calendar', label: 'Calendário' },
                { id: 'shabbat', label: 'Shabat' },
                { id: 'festas', label: 'Festas' },
                { id: 'hebrew', label: 'Hebraico Fácil' },
                { id: 'courses', label: 'Cursos' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg transition ${
                    activeView === item.id
                      ? 'bg-[#3a415a] text-[#cbdad5] dark:bg-[#566981]'
                      : 'text-[#34344e] dark:text-[#cbdad5] hover:text-[#34344e] dark:hover:text-white hover:bg-[#89a7b1]/30 dark:hover:bg-[#3a415a]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Action Bar: Theme Switcher, Shabbat Mode, Search, Notifications, Auth/Profile */}
            <div className="hidden lg:flex items-center space-x-2 shrink-0">
              {/* Shabbat Mode Button */}
              <button
                onClick={onOpenShabbatMode}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#566981]/20 hover:bg-[#566981] text-[#34344e] dark:text-[#cbdad5] hover:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981] transition text-xs font-semibold whitespace-nowrap"
                title="Abrir Modo Shabat"
              >
                <Flame className="w-3.5 h-3.5 text-[#566981] dark:text-[#89a7b1]" />
                <span className="hidden xl:inline text-[11px]">Shabat</span>
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-[#89a7b1]/30 dark:bg-[#3a415a] text-[#34344e] dark:text-[#cbdad5] hover:bg-[#89a7b1]/50 dark:hover:bg-[#566981] transition flex items-center gap-1.5 text-xs font-bold border border-[#89a7b1] dark:border-[#566981]"
                title={theme === 'dark' ? 'Mudar para MODO CLARO' : 'Mudar para MODO NOTURNO'}
              >
                {theme === 'dark' ? (
                  <>
                    <Moon className="w-4 h-4 text-[#89a7b1]" />
                    <span className="hidden xl:inline text-[11px] text-[#cbdad5]">NOTURNO</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-[#566981]" />
                    <span className="hidden xl:inline text-[11px] text-[#34344e]">CLARO</span>
                  </>
                )}
              </button>

              {/* Search Toggle */}
              <div className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center gap-1">
                    <input
                      type="text"
                      placeholder="Pesquisar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="px-3 py-1.5 text-xs bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-lg focus:outline-none focus:border-[#3a415a] w-44 text-[#34344e] dark:text-[#cbdad5]"
                    />
                    <button type="submit" className="p-1.5 bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] rounded-lg hover:bg-[#566981]">
                      <Search className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={() => setSearchOpen(false)} className="p-1.5 text-[#566981] hover:text-[#34344e]">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-[#34344e] dark:text-[#cbdad5] hover:text-[#34344e] hover:bg-[#89a7b1]/30 dark:hover:bg-[#3a415a] rounded-lg transition"
                    title="Pesquisar"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Notifications */}
              <button
                onClick={() => handleNav('notifications')}
                className="p-2 text-[#34344e] dark:text-[#cbdad5] hover:text-[#34344e] hover:bg-[#89a7b1]/30 dark:hover:bg-[#3a415a] rounded-lg transition relative"
                title="Notificações"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#566981]"></span>
              </button>

              {/* Profile / Auth Buttons */}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleNav('dashboard')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${activeView === 'dashboard' ? 'bg-[#3a415a] text-[#cbdad5]' : 'bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] hover:bg-[#89a7b1]/40'}`}
                  >
                    DASHBOARD
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#3a415a] hover:bg-[#89a7b1]/20 border border-[#89a7b1] dark:border-[#566981] text-[#34344e] dark:text-[#cbdad5] text-xs font-semibold transition"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#3a415a] text-[#cbdad5] font-bold flex items-center justify-center text-[10px]">
                        {(user?.name || user?.email || 'T').charAt(0).toUpperCase()}
                      </div>
                      <span className="max-w-[80px] truncate">{(user?.name || user?.email || 'Talmid').split(' ')[0]}</span>
                      <ChevronDown className="w-3 h-3 text-[#566981]" />
                    </button>

                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#3a415a] border border-[#89a7b1] dark:border-[#566981] rounded-xl shadow-lg py-2 z-50 text-xs">
                        <div className="px-4 py-2 border-b border-[#89a7b1]/30 bg-[#cbdad5]/30 dark:bg-[#34344e]">
                          <p className="font-bold text-[#34344e] dark:text-[#cbdad5]">{user?.name || user?.email || 'Talmid'}</p>
                          <p className="text-[11px] text-[#566981] dark:text-[#89a7b1] truncate">{user?.email || ''}</p>
                        </div>

                        <button onClick={() => handleNav('dashboard')} className="w-full text-left px-4 py-2 hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5] flex items-center gap-2 font-semibold">
                          <User className="w-3.5 h-3.5 text-[#566981] dark:text-[#89a7b1]" /> Meu Perfil
                        </button>
                        <button onClick={() => handleNav('mystudies')} className="w-full text-left px-4 py-2 hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5] flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-[#566981] dark:text-[#89a7b1]" /> Meus Estudos
                        </button>
                        <button onClick={() => handleNav('notes')} className="w-full text-left px-4 py-2 hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5] flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-[#566981] dark:text-[#89a7b1]" /> Minhas Anotações
                        </button>
                        <button onClick={() => handleNav('notifications')} className="w-full text-left px-4 py-2 hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5] flex items-center gap-2">
                          <Send className="w-3.5 h-3.5 text-[#566981] dark:text-[#89a7b1]" /> Preferências
                        </button>
                        {hasAdminAccess && (
                          <button onClick={() => handleNav('admin')} className="w-full text-left px-4 py-2 hover:bg-[#89a7b1]/20 text-[#3a415a] dark:text-[#cbdad5] font-bold flex items-center gap-2 border-t border-[#89a7b1]/30">
                            <Award className="w-3.5 h-3.5 text-[#3a415a] dark:text-[#89a7b1]" /> Painel Admin
                          </button>
                        )}
                        <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-[#34344e]/10 text-[#3a415a] dark:text-[#89a7b1] flex items-center gap-2 border-t border-[#89a7b1]/30">
                          <LogOut className="w-3.5 h-3.5" /> Sair
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={onOpenAuth}
                    className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-[#3a415a] border border-[#3a415a] dark:border-[#89a7b1] text-[#3a415a] dark:text-[#cbdad5] font-bold hover:bg-[#89a7b1]/20 transition text-xs"
                  >
                    ENTRAR
                  </button>
                  <button
                    onClick={onOpenAuth}
                    className="px-3.5 py-1.5 rounded-lg bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] font-bold hover:bg-[#566981] transition text-xs shadow-sm"
                  >
                    CADASTRE-SE
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={onOpenShabbatMode}
                className="p-1.5 rounded-lg bg-[#566981]/20 text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981]"
                title="Modo Shabat"
              >
                <Flame className="w-4 h-4 text-[#566981] dark:text-[#89a7b1]" />
              </button>
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg bg-[#89a7b1]/30 dark:bg-[#3a415a] text-[#34344e] dark:text-[#cbdad5] border border-[#89a7b1] dark:border-[#566981]"
                title="Alternar Tema"
              >
                {theme === 'dark' ? <Moon className="w-4 h-4 text-[#89a7b1]" /> : <Sun className="w-4 h-4 text-[#566981]" />}
              </button>
              {!isAuthenticated ? (
                <button
                  onClick={onOpenAuth}
                  className="px-3 py-1 rounded text-xs bg-[#3a415a] text-[#cbdad5] font-bold"
                >
                  ENTRAR
                </button>
              ) : (
                <button
                  onClick={() => handleNav('dashboard')}
                  className="px-3 py-1 rounded text-xs bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5] font-bold"
                >
                  PERFIL
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#34344e] dark:text-[#cbdad5] hover:text-[#3a415a] rounded-lg bg-[#89a7b1]/30 dark:bg-[#3a415a]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#34344e] border-b border-[#89a7b1] dark:border-[#566981] px-4 pt-3 pb-6 space-y-1 text-xs font-semibold shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#89a7b1]/30">
              <span className="text-[#566981] dark:text-[#89a7b1] text-[11px] font-bold">TEMA VISUAL</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#89a7b1]/20 dark:bg-[#3a415a] text-[#34344e] dark:text-[#cbdad5] font-bold border border-[#89a7b1] dark:border-[#566981]"
              >
                {theme === 'dark' ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#89a7b1]" />
                    <span>MODO NOTURNO</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#566981]" />
                    <span>MODO CLARO</span>
                  </>
                )}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1 pb-3 border-b border-[#89a7b1]/30">
              <button onClick={() => handleNav('home')} className="text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Início</button>
              <button onClick={() => handleNav('bible')} className="text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Bíblia</button>
              <button onClick={() => handleNav('tora')} className="text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Torá</button>
              <button onClick={() => handleNav('neviim')} className="text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Profetas</button>
              <button onClick={() => handleNav('ketuvim')} className="text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Escritos</button>
              <button onClick={() => handleNav('brit_hadasha')} className="text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Brit Hadasha</button>
              <button onClick={() => handleNav('pardes')} className="text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Pardes</button>
              <button onClick={() => handleNav('parasha')} className="text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Parashá</button>
              <button onClick={() => handleNav('calendar')} className="text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Calendário</button>
              <button onClick={() => handleNav('shabbat')} className="text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Shabat</button>
              <button onClick={() => handleNav('festas')} className="text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Festas</button>
              <button onClick={() => handleNav('hebrew')} className="text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Hebraico Fácil</button>
              <button onClick={() => handleNav('courses')} className="text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Cursos</button>
            </div>

            <div className="pt-2 space-y-2">
              <button onClick={() => handleNav('generator')} className="w-full text-left py-2 px-3 rounded bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5] font-bold border border-[#89a7b1]">✨ Gerar Estudo com IA</button>
              <button onClick={() => handleNav('ia')} className="w-full text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Professor Talmidim</button>
              
              {isAuthenticated && user && (
                <div className="pt-2 border-t border-[#89a7b1]/30 space-y-1">
                  <button onClick={() => handleNav('dashboard')} className="w-full text-left py-2 px-3 rounded bg-[#3a415a] dark:bg-[#566981] text-[#cbdad5] font-bold">Meu Dashboard & Perfil</button>
                  <button onClick={() => handleNav('mystudies')} className="w-full text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Meus Estudos</button>
                  <button onClick={() => handleNav('notes')} className="w-full text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5]">Minhas Anotações</button>
                  {hasAdminAccess && (
                    <button onClick={() => handleNav('admin')} className="w-full text-left py-2 px-3 rounded hover:bg-[#89a7b1]/20 text-[#34344e] dark:text-[#cbdad5] font-bold">Painel Admin</button>
                  )}
                  <button onClick={logout} className="w-full text-left py-2 px-3 rounded text-[#3a415a] dark:text-[#89a7b1] font-semibold">Sair</button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

