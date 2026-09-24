import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserNote, StudyMaterial, UserRole, AdminAuditLog } from '../types';
import {
  auth,
  db,
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  deleteDoc,
  updateDoc,
  addDoc,
  onAuthStateChanged,
  signInWithPopup,
  googleProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateFirebaseProfile,
  FirebaseUser
} from '../lib/firebase';

const SUPER_ADMIN_EMAIL = 'mateus.iaprojetos@gmail.com';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isFirestoreConnected: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  hasAdminAccess: boolean;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (mode: 'dark' | 'light') => void;
  notes: UserNote[];
  savedStudies: StudyMaterial[];
  activeView: string;
  setActiveView: (view: string) => void;
  shabbatCity: string;
  setShabbatCity: (city: string) => void;
  login: (email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, phone: string, pass: string, receiveEmails: boolean) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (updated: Partial<UserProfile>) => void;
  updateNotificationPreferences: (prefs: Partial<UserProfile['notificationPreferences']>) => void;
  updateUserRole: (targetUserId: string, newRole: UserRole) => Promise<boolean>;
  toggleUserStatus: (targetUserId: string, isActive: boolean) => Promise<boolean>;
  deleteUserAccount: (targetUserId: string) => Promise<boolean>;
  addAuditLog: (action: string, resource: string, outcome: 'SUCCESS' | 'DENIED' | 'FAILED', details?: string) => Promise<void>;
  addNote: (note: Omit<UserNote, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  deleteNote: (id: string) => void;
  toggleFavoriteNote: (id: string) => void;
  saveStudyMaterial: (study: StudyMaterial) => void;
  deleteStudyMaterial: (id: string) => void;
  markHebrewLetterLearned: (letter: string) => void;
  markHebrewWordLearned: (word: string) => void;
  addStudyMinutes: (minutes: number) => void;
  triggerWelcomeEmail: () => Promise<void>;
  triggerTestDailyEmail: () => Promise<void>;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_superadmin',
  name: 'Mateus (Super Admin)',
  email: SUPER_ADMIN_EMAIL,
  phone: '(11) 98765-4321',
  role: 'SUPER_ADMIN',
  isActive: true,
  createdAt: new Date().toISOString(),
  receiveEmailNotifications: true,
  notificationPreferences: {
    dailyEmail: true,
    dailyTime: '08:00',
    wordOfDay: true,
    studyOfDay: true,
    prayerOfDay: true,
    hebrewOfDay: true,
    parashah: true,
    shabbat: true,
    holidays: true,
    courses: true,
    studyReminders: true,
    studyReminderTime: '20:00',
    cityLocation: 'São Paulo, BR'
  },
  progress: {
    hebrewLettersLearned: ['א', 'ב', 'ג', 'ד'],
    hebrewWordsLearned: ['w1', 'w2', 'w3'],
    completedLessons: ['l1', 'l7'],
    completedQuizzes: ['act1'],
    parashotStudied: ['p1'],
    studyStreakDays: 12,
    totalMinutesStudied: 320
  }
};

const INITIAL_NOTES: UserNote[] = [
  {
    id: 'n1',
    userId: 'usr_superadmin',
    title: 'Aprofundamento sobre Bereshit 1:1',
    content: 'Análise da palavra "Bereshit". A letra Bet (ב) é a primeira letra da Torá. O valor numérico de Bet é 2, aludindo ao mundo físico e ao mundo espiritual que operam juntos.',
    tags: ['Bereshit', 'Pardes', 'Remez'],
    bibleRef: 'Gênesis 1:1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isFavorite: true
  },
  {
    id: 'n2',
    userId: 'usr_superadmin',
    title: 'Significado da Palavra Shalom',
    content: 'Shalom vem da raiz Shin-Lamed-Mem (ש-ל-מ). Significa mais do que ausência de guerra: significa inteireza, plenitude, saúde e paz da aliança.',
    tags: ['Hebraico', 'Vocabulário'],
    hebrewWord: 'שָׁלוֹם',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isFavorite: false
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const local = localStorage.getItem('talmidim_user');
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()) {
        parsed.role = 'SUPER_ADMIN';
      }
      return parsed;
    }
    return DEFAULT_USER;
  });

  const [notes, setNotes] = useState<UserNote[]>(() => {
    const local = localStorage.getItem('talmidim_notes');
    return local ? JSON.parse(local) : INITIAL_NOTES;
  });

  const [savedStudies, setSavedStudies] = useState<StudyMaterial[]>(() => {
    const local = localStorage.getItem('talmidim_studies');
    return local ? JSON.parse(local) : [];
  });

  const [activeView, setActiveView] = useState<string>('home');
  const [shabbatCity, setShabbatCity] = useState<string>('São Paulo, BR');
  const [isFirestoreConnected, setIsFirestoreConnected] = useState<boolean>(true);

  // Theme state: default is 'dark' (MODO NOTURNO)
  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('talmidim_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark'; // DEFAULT MODO NOTURNO
  });

  // Apply theme class on root DOM element and body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      body.classList.add('dark');
      body.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      body.classList.add('light');
      body.classList.remove('dark');
    }
    localStorage.setItem('talmidim_theme', theme);
  }, [theme]);

  // Sync with logged in user theme preference if set
  useEffect(() => {
    if (user?.themePreference && user.themePreference !== theme) {
      setThemeState(user.themePreference);
    }
  }, [user?.themePreference]);

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    localStorage.setItem('talmidim_theme', newTheme);
    if (user) {
      updateProfile({ themePreference: newTheme });
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const isSuperAdmin = !!user && ((user.email?.toLowerCase() || '') === SUPER_ADMIN_EMAIL.toLowerCase() || user.role === 'SUPER_ADMIN');
  const isAdmin = isSuperAdmin || user?.role === 'ADMIN' || user?.role === 'admin';
  const isEditor = isAdmin || user?.role === 'EDITOR' || user?.role === 'teacher';
  const hasAdminAccess = isSuperAdmin || isAdmin || isEditor;

  // Sync state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('talmidim_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('talmidim_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('talmidim_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('talmidim_studies', JSON.stringify(savedStudies));
  }, [savedStudies]);

  // Firebase Auth listener
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const userRef = doc(db, 'users', fbUser.uid);
        try {
          const snap = await getDoc(userRef);
          const isSuperAdminEmail = fbUser.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();

          if (snap.exists()) {
            const fetched = snap.data() as UserProfile;
            if (isSuperAdminEmail) {
              fetched.role = 'SUPER_ADMIN';
              await setDoc(userRef, { role: 'SUPER_ADMIN' }, { merge: true });
            }
            setUser(fetched);
          } else {
            const newUserProfile: UserProfile = {
              id: fbUser.uid,
              name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Talmid',
              email: fbUser.email || 'talmid@estudos.com',
              role: isSuperAdminEmail ? 'SUPER_ADMIN' : 'USER',
              isActive: true,
              createdAt: new Date().toISOString(),
              receiveEmailNotifications: true,
              notificationPreferences: DEFAULT_USER.notificationPreferences,
              progress: DEFAULT_USER.progress
            };
            await setDoc(userRef, newUserProfile);
            setUser(newUserProfile);
          }

          // Synchronize with PostgreSQL database
          try {
            const token = await fbUser.getIdToken();
            await fetch('/api/users/sync', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                displayName: fbUser.displayName || undefined,
                photoUrl: fbUser.photoURL || undefined
              })
            });
          } catch (syncErr) {
            console.warn('PostgreSQL user sync notice:', syncErr);
          }
        } catch (err) {
          console.warn('Firestore fetch user warning:', err);
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen to Firestore notes
  useEffect(() => {
    if (!user?.id) return;
    const notesRef = collection(db, 'notes');
    const unsub = onSnapshot(notesRef, (snapshot) => {
      const remoteNotes: UserNote[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data() as UserNote;
        if (data.userId === user.id) {
          remoteNotes.push({ ...data, id: docSnap.id });
        }
      });
      if (remoteNotes.length > 0) {
        setNotes(remoteNotes);
      }
    }, (err) => {
      console.warn('Firestore notes subscription error:', err);
      setIsFirestoreConnected(false);
    });

    return () => unsub();
  }, [user?.id]);

  // Listen to Firestore studies
  useEffect(() => {
    if (!user?.id) return;
    const studiesRef = collection(db, 'studies');
    const unsub = onSnapshot(studiesRef, (snapshot) => {
      const remoteStudies: StudyMaterial[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data() as StudyMaterial;
        if (data.userId === user.id) {
          remoteStudies.push({ ...data, id: docSnap.id });
        }
      });
      if (remoteStudies.length > 0) {
        setSavedStudies(remoteStudies);
      }
    }, (err) => {
      console.warn('Firestore studies subscription error:', err);
    });

    return () => unsub();
  }, [user?.id]);

  const addAuditLog = async (action: string, resource: string, outcome: 'SUCCESS' | 'DENIED' | 'FAILED', details?: string) => {
    if (!user) return;
    const log: AdminAuditLog = {
      id: `log_${Date.now()}`,
      adminEmail: user.email,
      adminName: user.name,
      action,
      resource,
      timestamp: new Date().toISOString(),
      outcome,
      details
    };
    try {
      await setDoc(doc(db, 'audit_logs', log.id), log);
    } catch (e) {
      console.warn('Audit log write error:', e);
    }
  };

  const saveUserToFirestore = async (updatedUser: UserProfile) => {
    if ((updatedUser.email?.toLowerCase() || '') === SUPER_ADMIN_EMAIL.toLowerCase()) {
      updatedUser.role = 'SUPER_ADMIN';
    }
    setUser(updatedUser);
    if (updatedUser.id) {
      try {
        const userRef = doc(db, 'users', updatedUser.id);
        await setDoc(userRef, updatedUser, { merge: true });
      } catch (err) {
        console.warn('Firestore user save warning:', err);
      }
    }
  };

  const updateUserRole = async (targetUserId: string, newRole: UserRole): Promise<boolean> => {
    if (!isSuperAdmin && newRole === 'SUPER_ADMIN') {
      await addAuditLog('ALTERAR_ROLE', `User ${targetUserId}`, 'DENIED', 'Apenas SUPER_ADMIN pode atribuir role SUPER_ADMIN');
      alert('Apenas o SUPER_ADMIN pode atribuir o cargo de SUPER_ADMIN.');
      return false;
    }

    if (!isAdmin) {
      await addAuditLog('ALTERAR_ROLE', `User ${targetUserId}`, 'DENIED', 'Tentativa de alteração de role por usuário comum');
      return false;
    }

    try {
      const userRef = doc(db, 'users', targetUserId);
      await updateDoc(userRef, { role: newRole });
      await addAuditLog('ALTERAR_ROLE', `User ${targetUserId}`, 'SUCCESS', `Role alterada para ${newRole}`);
      return true;
    } catch (err) {
      console.error('Error updating role in Firestore:', err);
      return false;
    }
  };

  const toggleUserStatus = async (targetUserId: string, isActive: boolean): Promise<boolean> => {
    if (!isAdmin) {
      await addAuditLog('ALTERAR_STATUS_USUARIO', `User ${targetUserId}`, 'DENIED');
      return false;
    }
    try {
      const userRef = doc(db, 'users', targetUserId);
      await updateDoc(userRef, { isActive });
      await addAuditLog('ALTERAR_STATUS_USUARIO', `User ${targetUserId}`, 'SUCCESS', `Status definido para ${isActive ? 'Ativo' : 'Inativo'}`);
      return true;
    } catch (err) {
      console.error('Error toggling user status:', err);
      return false;
    }
  };

  const deleteUserAccount = async (targetUserId: string): Promise<boolean> => {
    if (!isSuperAdmin) {
      await addAuditLog('EXCLUIR_USUARIO', `User ${targetUserId}`, 'DENIED', 'Apenas SUPER_ADMIN pode excluir contas de usuário');
      alert('Apenas o SUPER_ADMIN tem permissão para excluir usuários permanentemente.');
      return false;
    }
    try {
      await deleteDoc(doc(db, 'users', targetUserId));
      await addAuditLog('EXCLUIR_USUARIO', `User ${targetUserId}`, 'SUCCESS', 'Conta excluída com sucesso');
      return true;
    } catch (err) {
      console.error('Error deleting user:', err);
      return false;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const fbUser = res.user;
      const isSuperAdminEmail = fbUser.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();

      const userRef = doc(db, 'users', fbUser.uid);
      const snap = await getDoc(userRef);
      let profile: UserProfile;

      if (snap.exists()) {
        profile = snap.data() as UserProfile;
        if (isSuperAdminEmail) {
          profile.role = 'SUPER_ADMIN';
          await setDoc(userRef, { role: 'SUPER_ADMIN' }, { merge: true });
        }
      } else {
        profile = {
          id: fbUser.uid,
          name: fbUser.displayName || 'Talmid',
          email: fbUser.email || SUPER_ADMIN_EMAIL,
          role: isSuperAdminEmail ? 'SUPER_ADMIN' : 'USER',
          isActive: true,
          createdAt: new Date().toISOString(),
          receiveEmailNotifications: true,
          notificationPreferences: DEFAULT_USER.notificationPreferences,
          progress: DEFAULT_USER.progress
        };
        await setDoc(userRef, profile);
      }
      setUser(profile);
      await addAuditLog('LOGIN_GOOGLE', 'Autenticação', 'SUCCESS', `Login efetuado por ${profile.email}`);
      return true;
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      return false;
    }
  };

  const login = async (email: string, pass: string) => {
    if (email && pass.length >= 4) {
      const isSuperAdminEmail = email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();

      try {
        const res = await signInWithEmailAndPassword(auth, email, pass);
        const fbUser = res.user;
        const userRef = doc(db, 'users', fbUser.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const profile = snap.data() as UserProfile;
          if (isSuperAdminEmail) {
            profile.role = 'SUPER_ADMIN';
            await setDoc(userRef, { role: 'SUPER_ADMIN' }, { merge: true });
          }
          setUser(profile);
        }
        await addAuditLog('LOGIN_EMAIL', 'Autenticação', 'SUCCESS', `Login efetuado por ${email}`);
        return true;
      } catch (err) {
        // Local user login fallback
        const loggedUser: UserProfile = {
          ...DEFAULT_USER,
          id: `usr_${email.replace(/[^a-zA-Z0-9]/g, '_')}`,
          email,
          name: email.split('@')[0],
          role: isSuperAdminEmail ? 'SUPER_ADMIN' : 'USER'
        };
        await saveUserToFirestore(loggedUser);
        await addAuditLog('LOGIN_LOCAL', 'Autenticação Local', 'SUCCESS', `Login local por ${email}`);
        return true;
      }
    }
    return false;
  };

  const register = async (name: string, email: string, phone: string, pass: string, receiveEmails: boolean) => {
    if (name && email && pass) {
      const isSuperAdminEmail = email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
      let uid = `usr_${Date.now()}`;
      try {
        const res = await createUserWithEmailAndPassword(auth, email, pass);
        uid = res.user.uid;
        if (auth.currentUser) {
          await updateFirebaseProfile(auth.currentUser, { displayName: name });
        }
      } catch (err) {
        console.warn('Firebase register fallback:', err);
      }

      const newUser: UserProfile = {
        id: uid,
        name,
        email,
        phone,
        role: isSuperAdminEmail ? 'SUPER_ADMIN' : 'USER',
        isActive: true,
        createdAt: new Date().toISOString(),
        receiveEmailNotifications: receiveEmails,
        notificationPreferences: {
          ...DEFAULT_USER.notificationPreferences,
          dailyEmail: receiveEmails
        },
        progress: {
          hebrewLettersLearned: [],
          hebrewWordsLearned: [],
          completedLessons: [],
          completedQuizzes: [],
          parashotStudied: [],
          studyStreakDays: 1,
          totalMinutesStudied: 15
        }
      };

      await saveUserToFirestore(newUser);

      fetch('/api/email/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newUser.email, name: newUser.name })
      }).catch(err => console.warn('Email trigger warning:', err));

      return true;
    }
    return false;
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Signout warning:', e);
    }
    setUser(null);
    setActiveView('home');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...updated };
      saveUserToFirestore(updatedUser);
    }
  };

  const updateNotificationPreferences = (prefs: Partial<UserProfile['notificationPreferences']>) => {
    if (user) {
      const updatedUser = {
        ...user,
        notificationPreferences: {
          ...user.notificationPreferences,
          ...prefs
        }
      };
      saveUserToFirestore(updatedUser);
    }
  };

  const addNote = async (noteData: Omit<UserNote, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const noteId = `n_${Date.now()}`;
    const newNote: UserNote = {
      ...noteData,
      id: noteId,
      userId: user ? user.id : 'guest',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setNotes(prev => [newNote, ...prev]);

    try {
      const noteRef = doc(db, 'notes', noteId);
      await setDoc(noteRef, newNote);
    } catch (err) {
      console.warn('Firestore addNote error:', err);
    }
  };

  const deleteNote = async (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    try {
      await deleteDoc(doc(db, 'notes', id));
    } catch (err) {
      console.warn('Firestore deleteNote error:', err);
    }
  };

  const toggleFavoriteNote = async (id: string) => {
    const target = notes.find(n => n.id === id);
    if (!target) return;
    const updatedFav = !target.isFavorite;

    setNotes(prev => prev.map(n => n.id === id ? { ...n, isFavorite: updatedFav } : n));
    try {
      await updateDoc(doc(db, 'notes', id), { isFavorite: updatedFav, updatedAt: new Date().toISOString() });
    } catch (err) {
      console.warn('Firestore toggleFavoriteNote error:', err);
    }
  };

  const saveStudyMaterial = async (study: StudyMaterial) => {
    const formattedStudy: StudyMaterial = {
      ...study,
      userId: user ? user.id : 'guest'
    };

    setSavedStudies(prev => {
      const existingIdx = prev.findIndex(s => s.id === study.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = formattedStudy;
        return updated;
      }
      return [formattedStudy, ...prev];
    });

    try {
      const studyRef = doc(db, 'studies', study.id);
      await setDoc(studyRef, formattedStudy);
    } catch (err) {
      console.warn('Firestore saveStudyMaterial error:', err);
    }
  };

  const deleteStudyMaterial = async (id: string) => {
    setSavedStudies(prev => prev.filter(s => s.id !== id));
    try {
      await deleteDoc(doc(db, 'studies', id));
    } catch (err) {
      console.warn('Firestore deleteStudyMaterial error:', err);
    }
  };

  const markHebrewLetterLearned = (letter: string) => {
    if (user) {
      const set = new Set(user.progress.hebrewLettersLearned);
      set.add(letter);
      updateProfile({
        progress: {
          ...user.progress,
          hebrewLettersLearned: Array.from(set)
        }
      });
    }
  };

  const markHebrewWordLearned = (wordId: string) => {
    if (user) {
      const set = new Set(user.progress.hebrewWordsLearned);
      set.add(wordId);
      updateProfile({
        progress: {
          ...user.progress,
          hebrewWordsLearned: Array.from(set)
        }
      });
    }
  };

  const addStudyMinutes = (minutes: number) => {
    if (user) {
      updateProfile({
        progress: {
          ...user.progress,
          totalMinutesStudied: user.progress.totalMinutesStudied + minutes
        }
      });
    }
  };

  const triggerWelcomeEmail = async () => {
    if (user) {
      await fetch('/api/email/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, name: user.name })
      });
    }
  };

  const triggerTestDailyEmail = async () => {
    if (user) {
      await fetch('/api/email/send-daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          time: user.notificationPreferences.dailyTime
        })
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isFirestoreConnected,
      isSuperAdmin,
      isAdmin,
      isEditor,
      hasAdminAccess,
      theme,
      toggleTheme,
      setTheme,
      notes,
      savedStudies,
      activeView,
      setActiveView,
      shabbatCity,
      setShabbatCity,
      login,
      loginWithGoogle,
      register,
      logout,
      updateProfile,
      updateNotificationPreferences,
      updateUserRole,
      toggleUserStatus,
      deleteUserAccount,
      addAuditLog,
      addNote,
      deleteNote,
      toggleFavoriteNote,
      saveStudyMaterial,
      deleteStudyMaterial,
      markHebrewLetterLearned,
      markHebrewWordLearned,
      addStudyMinutes,
      triggerWelcomeEmail,
      triggerTestDailyEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
