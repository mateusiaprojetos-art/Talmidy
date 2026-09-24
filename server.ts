import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Mock Email Queue for Backend Tracking
interface EmailLog {
  id: string;
  email: string;
  name: string;
  type: string;
  subject: string;
  sentAt: string;
  status: 'SENT' | 'PENDING' | 'FAILED';
}

const emailQueueLog: EmailLog[] = [
  {
    id: 'e1',
    email: 'talmid@estudos.com',
    name: 'Talmid Estudante',
    type: 'welcome',
    subject: 'Shalom! Bem-vindo à Talmidim Academy',
    sentAt: new Date().toISOString(),
    status: 'SENT'
  }
];

import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import {
  getOrCreateUser,
  getUserNotes,
  createUserNote,
  updateUserNote,
  deleteUserNote,
  updateUserProfile
} from './src/db/dbService.ts';

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), brand: 'Talmidim Academy', database: 'PostgreSQL Cloud SQL' });
});

// User Sync API
app.post('/api/users/sync', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    const email = req.user?.email || '';
    const { displayName, photoUrl } = req.body;
    if (!uid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await getOrCreateUser(uid, email, displayName, photoUrl);
    res.json({ success: true, user });
  } catch (error: any) {
    console.error('Failed to sync user in database:', error);
    res.status(500).json({ error: error.message || 'Database synchronization error' });
  }
});

// Database Notes API
app.get('/api/notes', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const notes = await getUserNotes(uid);
    res.json({ success: true, notes });
  } catch (error: any) {
    console.error('Failed to get notes:', error);
    res.status(500).json({ error: error.message || 'Database query failed' });
  }
});

app.post('/api/notes', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { title, content, verseRef, tags, isFavorite } = req.body;
    const note = await createUserNote(uid, { title, content, verseRef, tags, isFavorite });
    res.json({ success: true, note });
  } catch (error: any) {
    console.error('Failed to create note:', error);
    res.status(500).json({ error: error.message || 'Database insert failed' });
  }
});

app.put('/api/notes/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    const noteId = parseInt(req.params.id, 10);
    if (!uid || isNaN(noteId)) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }
    const note = await updateUserNote(uid, noteId, req.body);
    res.json({ success: true, note });
  } catch (error: any) {
    console.error('Failed to update note:', error);
    res.status(500).json({ error: error.message || 'Database update failed' });
  }
});

app.delete('/api/notes/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    const noteId = parseInt(req.params.id, 10);
    if (!uid || isNaN(noteId)) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }
    const note = await deleteUserNote(uid, noteId);
    res.json({ success: true, note });
  } catch (error: any) {
    console.error('Failed to delete note:', error);
    res.status(500).json({ error: error.message || 'Database delete failed' });
  }
});

// Gemini AI API: Generate Custom Study Material
app.post('/api/gemini/generate-study', async (req, res) => {
  try {
    const { topic, bibleRef, mode, depthLevel, targetAudience, includeHebrew, includeSlides } = req.body;

    const prompt = `Você é um erudito em estudos bíblicos e hermenêutica hebraica na "Talmidim Academy".
Crie um estudo completo em português para o tema/referência: "${topic || bibleRef}".
Modo de estudo: ${mode.toUpperCase()} (Pardes, Tradicional ou Comparativo).
Nível de profundidade: ${depthLevel}.
Público alvo: ${targetAudience}.
${includeHebrew ? 'Inclua trechos em hebraico com transliteração e tradução.' : ''}

A estrutura deve conter:
1. Título e Subtítulo
2. Objetivo do Estudo
3. Contexto Histórico e Literário
4. Análise em Níveis (Se for Pardes: Peshat, Remez, Derash, Sod. Se for Tradicional: Contexto e Comentários. Se Comparativo: Ponto a ponto das visões).
5. Conexões com os Profetas (Neviim) e com a Brit Hadasha.
6. Perguntas de Reflexão Prática.
7. Conclusão.

Diferencie com clareza: Texto Bíblico, Tradição, Comentário e Hipótese.
Use linguagem didática, respeitosa, educacional e profunda. Fontes primárias de preferência.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const markdownText = response.text || 'Estudo gerado com sucesso.';

    // Generate slides structure
    const slidesPrompt = `Com base no estudo anterior sobre "${topic}", crie 5 a 8 slides sintéticos de apresentação.
Retorne um JSON puro no seguinte formato (sem declaracoes de codigo markdown):
[
  {
    "slideNumber": 1,
    "title": "Título do Slide",
    "subtitle": "Subtítulo opcional",
    "bullets": ["Ponto 1", "Ponto 2", "Ponto 3"],
    "hebrewQuote": "Frase em hebraico se houver",
    "reference": "Referência bíblica se houver"
  }
]`;

    let slidesData = [];
    try {
      const slidesResponse = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: slidesPrompt,
        config: {
          responseMimeType: 'application/json'
        }
      });
      const slidesJsonStr = slidesResponse.text?.trim() || '[]';
      slidesData = JSON.parse(slidesJsonStr);
    } catch (e) {
      console.warn('Fallback for slides generation JSON parse:', e);
      slidesData = [
        { slideNumber: 1, title: topic || 'Estudo Bíblico', subtitle: 'Talmidim Academy', bullets: ['Aprofundamento nas Escrituras', `Modo: ${mode}`] },
        { slideNumber: 2, title: 'Contexto e Leitura', bullets: ['Fundamentação do texto no Tanakh', 'Perspectiva histórica'] },
        { slideNumber: 3, title: 'Análise e Aplicação', bullets: ['Reflexão ética e espiritual', 'Ensinamentos práticos'] }
      ];
    }

    res.json({
      success: true,
      contentMarkdown: markdownText,
      slides: slidesData
    });
  } catch (error: any) {
    console.error('Error generating study with Gemini:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Falha ao comunicar com a IA do Professor Talmidim.'
    });
  }
});

// Gemini AI API: Professor Talmidim Chat Assistant
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, personaMode, history } = req.body;

    const systemInstruction = `Você é o "Professor Talmidim", assistente erudito e atencioso de estudos bíblicos na Talmidim Academy.
Modo atual do professor: ${personaMode || 'Professor Pardes'}.

Diretrizes rigorosas:
1. Mantenha separação clara entre: O que o Texto diz, O que a Tradição interpreta, O que estudiosos propõem, O que é hipótese.
2. Explique palavras hebraicas trazendo raiz, transliteração e múltiplos significados contextuais.
3. Responda em português fluente, elegante e didático com tom educacional inspirador.
4. Nunca invente fontes ou citação inexistente.`;

    const chatMessages = (history || []).map((h: any) => `${h.role === 'user' ? 'Usuário' : 'Professor'}: ${h.text}`).join('\n');
    const fullPrompt = `${chatMessages}\nUsuário: ${message}\nProfessor:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    res.json({
      success: true,
      reply: response.text || 'Shalom! Como posso auxiliar em seus estudos hoje?'
    });
  } catch (error: any) {
    console.error('Error in Professor Talmidim Chat:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Erro ao processar mensagem com a IA.'
    });
  }
});

// Email Simulation API: Send Welcome Email
app.post('/api/email/welcome', (req, res) => {
  const { email, name } = req.body;
  const newLog: EmailLog = {
    id: `e_${Date.now()}`,
    email: email || 'usuario@exemplo.com',
    name: name || 'Talmid',
    type: 'welcome',
    subject: `Shalom, ${name}! Bem-vindo à Talmidim Academy`,
    sentAt: new Date().toISOString(),
    status: 'SENT'
  };
  emailQueueLog.unshift(newLog);
  res.json({ success: true, log: newLog, message: 'E-mail de boas-vindas enviado com sucesso!' });
});

// Email Simulation API: Send Daily Study Email Test
app.post('/api/email/send-daily', (req, res) => {
  const { email, name, time } = req.body;
  const newLog: EmailLog = {
    id: `e_${Date.now()}`,
    email: email || 'usuario@exemplo.com',
    name: name || 'Talmid',
    type: 'daily_study',
    subject: `Palavra do Dia e Parashá - Talmidim Academy (${new Date().toLocaleDateString('pt-BR')})`,
    sentAt: new Date().toISOString(),
    status: 'SENT'
  };
  emailQueueLog.unshift(newLog);
  res.json({ success: true, log: newLog, message: `E-mail diário agendado para ${time || '08:00'} enviado com sucesso!` });
});

// Email Simulation API: Get Queue History for Admin
app.get('/api/email/queue', (req, res) => {
  res.json({ success: true, queue: emailQueueLog });
});

// Admin System Metrics API
app.get('/api/admin/metrics', (req, res) => {
  res.json({
    success: true,
    data: {
      totalUsers: 124,
      activeUsers: 98,
      newUsersThisMonth: 18,
      coursesCount: 5,
      lessonsCount: 38,
      studiesCount: 82,
      generatedStudiesCount: 210,
      parashotCount: 54,
      haftarotCount: 54,
      contentItemsCount: 142,
      hebrewWordsCount: 120,
      hebrewActivitiesCount: 28,
      quizzesCount: 15,
      generatedFilesCount: 89,
      emailsSentCount: emailQueueLog.length + 340,
      notificationsSentCount: 76
    }
  });
});

// Admin Site Config API
let currentSiteConfig = {
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
};

app.get('/api/admin/site-config', (req, res) => {
  res.json({ success: true, config: currentSiteConfig });
});

app.post('/api/admin/site-config', (req, res) => {
  const newConfig = req.body;
  if (newConfig && typeof newConfig === 'object') {
    currentSiteConfig = { ...currentSiteConfig, ...newConfig };
    res.json({ success: true, message: 'Configurações do site salvas com sucesso!', config: currentSiteConfig });
  } else {
    res.status(400).json({ success: false, error: 'Dados inválidos.' });
  }
});


// Vite Middleware & Static Server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Talmidim Academy Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
