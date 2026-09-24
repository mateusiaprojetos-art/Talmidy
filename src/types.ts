export type UserRole = 'USER' | 'EDITOR' | 'ADMIN' | 'SUPER_ADMIN' | 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  isActive?: boolean;
  createdAt: string;
  themePreference?: 'dark' | 'light';
  receiveEmailNotifications: boolean;
  notificationPreferences: {
    dailyEmail: boolean;
    dailyTime: string; // e.g., '08:00'
    wordOfDay: boolean;
    studyOfDay: boolean;
    prayerOfDay: boolean;
    hebrewOfDay: boolean;
    parashah: boolean;
    shabbat: boolean;
    holidays: boolean;
    courses: boolean;
    studyReminders: boolean;
    studyReminderTime: string; // e.g. '20:00'
    cityLocation: string; // e.g. 'São Paulo, BR'
  };
  progress: {
    hebrewLettersLearned: string[];
    hebrewWordsLearned: string[];
    completedLessons: string[];
    completedQuizzes: string[];
    parashotStudied: string[];
    studyStreakDays: number;
    totalMinutesStudied: number;
  };
}

export type PardesLevel = 'peshat' | 'remez' | 'derash' | 'sod';

export type StudyMode = 'pardes' | 'traditional' | 'comparative';

export interface BibleBook {
  id: string;
  name: string;
  hebrewName: string;
  transliteration: string;
  category: 'tora' | 'neviim' | 'ketuvim' | 'brit_hadasha';
  chaptersCount: number;
  description: string;
}

export interface BibleVerse {
  bookId: string;
  chapter: number;
  verse: number;
  textPt: string;
  textHebrew?: string;
  transliteration?: string;
}

export interface Parasha {
  id: string;
  number?: number;
  namePt: string;
  nameHebrew: string;
  transliteration: string;
  bookId: string;
  chumashRef: string;
  toraRef?: string;
  haftarahRef: string;
  britHadashaRef: string;
  hebrewDate: string;
  summary: string;
  mainThemes: string[];
  peshat: string;
  remez: string;
  derash: string;
  sod: string;
  connections: {
    neviim: string;
    britHadasha: string;
  };
}

export interface ShabbatTimes {
  city: string;
  dateCivil: string;
  dateHebrew: string;
  candleLighting: string;
  havdalah: string;
  parashaName: string;
  haftarahRef: string;
}

export interface Holiday {
  id: string;
  namePt: string;
  nameHebrew: string;
  transliteration: string;
  hebrewDate: string;
  civilDateApprox: string;
  originText: string;
  significance: string;
  biblicalRefs: string[];
  practices: string[];
  pardesSummary: string;
  connectionsBritHadasha: string;
}

export interface HebrewLetter {
  letter: string;
  finalForm?: string;
  name: string;
  transliteration: string;
  soundDescription: string;
  numericalValue: number;
  exampleWordHebrew: string;
  exampleWordTransliteration: string;
  exampleWordPt: string;
}

export interface HebrewWord {
  id: string;
  hebrew: string;
  transliteration: string;
  pronunciation: string;
  translationPt: string;
  category: 'familia' | 'numeros' | 'cores' | 'animais' | 'casa' | 'tempo' | 'natureza' | 'tora' | 'shabbat' | 'festas' | 'oracoes' | 'termos_biblicos';
  root?: string;
  biblicalRef?: string;
  exampleSentenceHebrew?: string;
  exampleSentencePt?: string;
}

export interface HebrewActivity {
  id: string;
  type: 'letter_match' | 'translation_quiz' | 'word_assembly' | 'pronunciation_listen';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  promptHebrew?: string;
  correctOptionIndex?: number;
}

export interface Prayer {
  id: string;
  titlePt: string;
  titleHebrew: string;
  transliteration: string;
  hebrewText: string;
  translationPt: string;
  context: string;
  sourceType: 'biblical' | 'traditional' | 'custom' | 'platform_reflection';
  sourceName: string;
}

export interface Slide {
  slideNumber: number;
  title: string;
  subtitle?: string;
  bullets: string[];
  hebrewQuote?: string;
  reference?: string;
}

export interface StudyMaterial {
  id: string;
  userId?: string;
  title: string;
  subtitle?: string;
  topic: string;
  bibleRef?: string;
  mode: StudyMode;
  targetAudience: string;
  depthLevel: string;
  createdAt: string;
  updatedAt?: string;
  contentMarkdown: string;
  slides?: Slide[];
  isSaved?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'parasha' | 'hebrew' | 'pardes' | 'calendar' | 'general';
}

export interface UserNote {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
  bibleRef?: string;
  hebrewWord?: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}

export interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  contentMarkdown: string;
  hebrewTerms?: string[];
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: string;
  modules: CourseModule[];
  badgeImage?: string;
}

export interface EmailNotificationLog {
  id: string;
  recipientEmail: string;
  recipientName: string;
  type: 'welcome' | 'daily_study' | 'parasha' | 'shabbat' | 'holiday' | 'progress';
  subject: string;
  sentAt: string;
  status: 'PENDENTE' | 'PROCESSANDO' | 'ENVIADO' | 'ENTREGUE' | 'FALHOU';
}

export interface AdminAuditLog {
  id: string;
  adminEmail: string;
  adminName: string;
  action: string;
  resource: string;
  resourceId?: string;
  timestamp: string;
  outcome: 'SUCCESS' | 'DENIED' | 'FAILED';
  details?: string;
}

export interface SiteConfig {
  siteName: string;
  logoText: string;
  description: string;
  contactEmail: string;
  primaryColor: string;
  fontFamily: string;
  heroHeadline: string;
  heroSubheadline: string;
  enablePublicRegistrations: boolean;
  maintenanceMode: boolean;
  defaultShabbatCity: string;
}

export interface BiblicalContentItem {
  id: string;
  category: 'tora' | 'neviim' | 'ketuvim' | 'brit_hadasha';
  subCategory?: 'bereshit' | 'shemot' | 'vayikra' | 'bamidbar' | 'devarim' | string;
  title: string;
  hebrewTitle?: string;
  reference: string;
  textBody: string;
  traditionNote?: string;
  commentaryNote?: string;
  hypothesisNote?: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface AdminGeneratedFile {
  id: string;
  name: string;
  userId: string;
  userEmail: string;
  fileType: 'PDF' | 'PDF_WITH_SLIDES' | 'PDF_WITHOUT_SLIDES' | 'TXT';
  createdAt: string;
  sizeBytes: number;
  status: 'PRONTO' | 'PROCESSANDO' | 'ERRO';
  url?: string;
}

export interface EmailCampaign {
  id: string;
  title: string;
  subject: string;
  category: 'Boas-vindas' | 'Estudo Diario' | 'Palavra do Dia' | 'Parasha' | 'Shabbat' | 'Festas' | 'Hebraico' | 'Oracao' | 'Novos Cursos' | 'Lembretes';
  targetAudience: 'Todos' | 'Usuarios Ativos' | 'Alunos de Curso' | 'Estudantes de Hebraico';
  scheduledDate: string;
  status: 'RASCUNHO' | 'AGENDADO' | 'ENVIADO' | 'PAUSADO' | 'CANCELADO';
  bodyMarkdown: string;
}

export interface PushNotificationCampaign {
  id: string;
  title: string;
  message: string;
  targetAudience: 'Todos' | 'Usuarios Ativos' | 'Interessados em Parasha' | 'Interessados em Hebraico';
  scheduledAt: string;
  status: 'RASCUNHO' | 'PUBLICADO' | 'CANCELADO';
}

