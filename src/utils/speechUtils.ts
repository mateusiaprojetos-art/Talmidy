// Professional Hebrew Audio & Speech Pronunciation Engine for Talmidim Academy

// Persistent reference to prevent Chrome garbage-collection bug on SpeechSynthesisUtterance
let activeUtterance: SpeechSynthesisUtterance | null = null;
let audioCtx: AudioContext | null = null;

// Initialize or get Web Audio Context for audio feedback
function getAudioContext(): AudioContext | null {
  try {
    if (typeof window === 'undefined') return null;
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

// Gentle pleasant auditory chime to confirm audio trigger
export function playChimeTone(freq = 520, duration = 0.12) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio context failures
  }
}

// Phonetic helper to convert Hebrew letters to clean phonetic Portuguese representation if needed
const HEBREW_LETTER_PHONETICS: Record<string, string> = {
  'א': 'Álef',
  'בּ': 'Bet',
  'ב': 'Vet',
  'ג': 'Guímel',
  'ד': 'Dálet',
  'ה': 'He',
  'ו': 'Vav',
  'ז': 'Záin',
  'ח': 'Chet',
  'ט': 'Tet',
  'י': 'Yod',
  'כּ': 'Kaf',
  'כ': 'Chaf',
  'ך': 'Chaf Sofit',
  'ל': 'Lámed',
  'מ': 'Mem',
  'ם': 'Mem Sofit',
  'נ': 'Nun',
  'ן': 'Nun Sofit',
  'ס': 'Sámech',
  'ע': 'Áin',
  'פּ': 'Pe',
  'פ': 'Fe',
  'ף': 'Fe Sofit',
  'צ': 'Tsáde',
  'ץ': 'Tsáde Sofit',
  'ק': 'Kof',
  'ר': 'Reish',
  'שׁ': 'Shin',
  'שׂ': 'Sin',
  'ש': 'Shin',
  'ת': 'Tav',
};

export interface PronounceOptions {
  hebrewText?: string;
  transliteration?: string;
  portugueseHint?: string;
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

/**
 * Robust cross-browser speech pronunciation for Hebrew words, letters and prayers.
 */
export function playHebrewPronunciation(options: PronounceOptions | string, optionalTranslit?: string): void {
  if (typeof window === 'undefined') return;

  const config: PronounceOptions = typeof options === 'string'
    ? { hebrewText: options, transliteration: optionalTranslit }
    : options;

  const {
    hebrewText = '',
    transliteration = '',
    portugueseHint = '',
    rate = 0.85,
    pitch = 1.0,
    onStart,
    onEnd,
    onError,
  } = config;

  // Visual/chime trigger
  playChimeTone(587, 0.08);

  if (!('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis is not supported in this browser.');
    if (onStart) onStart();
    setTimeout(() => {
      if (onEnd) onEnd();
    }, 1200);
    return;
  }

  try {
    // 1. Cancel previous speech and resume synthesizer
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    // 2. Fetch available voices
    let voices = window.speechSynthesis.getVoices();
    
    // In case voices are loading asynchronously
    if (!voices || voices.length === 0) {
      setTimeout(() => {
        voices = window.speechSynthesis.getVoices();
      }, 50);
    }

    // Find Hebrew voice if available
    const hebrewVoice = voices.find(v => 
      v.lang.startsWith('he') || 
      v.lang.startsWith('iw') || 
      v.name.toLowerCase().includes('hebrew') || 
      v.name.toLowerCase().includes('israel')
    );

    // Find Portuguese / default fallback voice
    const ptVoice = voices.find(v => v.lang.startsWith('pt')) || voices.find(v => v.lang.startsWith('en')) || voices[0];

    // Determine what text to pronounce and which voice/lang to use
    let textToSpeak = '';
    let chosenVoice: SpeechSynthesisVoice | undefined = undefined;
    let chosenLang = 'he-IL';

    if (hebrewVoice && hebrewText.trim().length > 0) {
      // Direct Hebrew TTS available!
      textToSpeak = hebrewText.trim();
      chosenVoice = hebrewVoice;
      chosenLang = hebrewVoice.lang || 'he-IL';
    } else {
      // Fallback: If no Hebrew voice is installed, speak the clean phonetic transliteration or letter name
      if (transliteration && transliteration.trim().length > 0) {
        textToSpeak = transliteration.trim();
      } else if (hebrewText && HEBREW_LETTER_PHONETICS[hebrewText.trim()]) {
        textToSpeak = HEBREW_LETTER_PHONETICS[hebrewText.trim()];
      } else if (hebrewText) {
        textToSpeak = hebrewText.trim();
      } else if (portugueseHint) {
        textToSpeak = portugueseHint.trim();
      }

      chosenVoice = ptVoice;
      chosenLang = ptVoice ? ptVoice.lang : 'pt-BR';
    }

    if (!textToSpeak) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = chosenLang;
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error, retrying phonetic playback:', e);
      activeUtterance = null;
      
      // Fallback attempt with transliteration if direct Hebrew failed
      if (transliteration && textToSpeak !== transliteration) {
        try {
          const fallbackUtterance = new SpeechSynthesisUtterance(transliteration);
          fallbackUtterance.lang = 'pt-BR';
          fallbackUtterance.rate = 0.8;
          fallbackUtterance.onend = () => { if (onEnd) onEnd(); };
          activeUtterance = fallbackUtterance;
          window.speechSynthesis.speak(fallbackUtterance);
          return;
        } catch {
          // ignore
        }
      }

      if (onError) onError(e);
      if (onEnd) onEnd();
    };

    // Retain global reference
    activeUtterance = utterance;

    // Speak
    window.speechSynthesis.speak(utterance);

    // Timeout safety fallback in case onend doesn't fire
    const approxDurationMs = Math.max(1000, (textToSpeak.length * 120));
    setTimeout(() => {
      if (activeUtterance === utterance) {
        if (onEnd) onEnd();
        activeUtterance = null;
      }
    }, approxDurationMs + 1000);

  } catch (err) {
    console.error('Failed to execute speech synthesis:', err);
    if (onError) onError(err);
    if (onEnd) onEnd();
  }
}

/**
 * Stop any active audio/speech
 */
export function stopAllSpeech(): void {
  try {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    activeUtterance = null;
  } catch {
    // Ignore
  }
}
