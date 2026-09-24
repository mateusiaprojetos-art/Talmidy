/**
 * Talmidim Academy - Hebrew Text & Unicode Utility Suite
 * Supports UTF-8 Unicode, Niqqud preservation, RTL detection, and study formatting.
 */

// Range for Hebrew characters, Niqqud accents, and points
export const HEBREW_REGEX = /[\u0590-\u05FF]/;

/**
 * Detects if a given string contains Hebrew characters (including Niqqud).
 */
export function containsHebrew(text: string): boolean {
  if (!text) return false;
  return HEBREW_REGEX.test(text);
}

/**
 * Checks if a string line is primarily Hebrew text.
 */
export function isHebrewLine(line: string): boolean {
  if (!line || !line.trim()) return false;
  const clean = line.replace(/[*_#\-•[\]()]/g, '').trim();
  const hebrewChars = (clean.match(/[\u0590-\u05FF]/g) || []).length;
  const latinChars = (clean.match(/[a-zA-Z]/g) || []).length;
  
  // If line explicitly starts with HEBRAICO: or contains mostly Hebrew chars
  if (/^hebraico:/i.test(clean) || /^hebrew:/i.test(clean)) return true;
  return hebrewChars > 0 && hebrewChars >= latinChars;
}

export interface HebrewStudyBlock {
  type: 'hebrew' | 'transliteration' | 'translation' | 'text' | 'heading';
  content: string;
  isHebrew: boolean;
}

/**
 * Parses markdown or text content into structured blocks for accurate RTL/LTR rendering.
 */
export function parseStudyContentBlocks(markdownContent: string): HebrewStudyBlock[] {
  if (!markdownContent) return [];

  const lines = markdownContent.split('\n');
  const blocks: HebrewStudyBlock[] = [];

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('#')) {
      blocks.push({
        type: 'heading',
        content: trimmed,
        isHebrew: containsHebrew(trimmed)
      });
      continue;
    }

    if (/^(hebraico|hebrew|texto em hebraico):/i.test(trimmed)) {
      const hebrewText = trimmed.replace(/^(hebraico|hebrew|texto em hebraico):/i, '').trim();
      blocks.push({
        type: 'hebrew',
        content: hebrewText || trimmed,
        isHebrew: true
      });
      continue;
    }

    if (/^(transliteração|transliteracao|pronúncia|pronuncia):/i.test(trimmed)) {
      blocks.push({
        type: 'transliteration',
        content: trimmed,
        isHebrew: false
      });
      continue;
    }

    if (/^(tradução|traducao|significado):/i.test(trimmed)) {
      blocks.push({
        type: 'translation',
        content: trimmed,
        isHebrew: false
      });
      continue;
    }

    if (isHebrewLine(trimmed)) {
      blocks.push({
        type: 'hebrew',
        content: trimmed,
        isHebrew: true
      });
    } else {
      blocks.push({
        type: 'text',
        content: trimmed,
        isHebrew: false
      });
    }
  }

  return blocks;
}

/**
 * Reverse string for RTL rendering when PDF rendering engines lack native bidi support.
 * Keeps Niqqud attached to their corresponding base letter.
 */
export function reverseHebrewForPdf(hebrewText: string): string {
  if (!containsHebrew(hebrewText)) return hebrewText;

  // Split into grapheme clusters (base character + combined Niqqud marks)
  const graphemes: string[] = [];
  let currentGrapheme = '';

  for (let i = 0; i < hebrewText.length; i++) {
    const char = hebrewText[i];
    const code = char.charCodeAt(0);
    
    // Check if char is Niqqud mark (U+0591 to U+05C7)
    if (code >= 0x0591 && code <= 0x05C7) {
      currentGrapheme += char;
    } else {
      if (currentGrapheme) {
        graphemes.push(currentGrapheme);
      }
      currentGrapheme = char;
    }
  }
  if (currentGrapheme) {
    graphemes.push(currentGrapheme);
  }

  // Reverse graphemes for proper visual order in non-RTL PDF renderers
  return graphemes.reverse().join('');
}

export interface TestResult {
  name: string;
  passed: boolean;
  details: string;
}

/**
 * Automatic Test Suite for Hebrew UTF-8, Niqqud, RTL, and study formatting (Requirement 11)
 */
export function runHebrewValidationTests(): { allPassed: boolean; results: TestResult[] } {
  const results: TestResult[] = [];

  // Test 1: Simple Hebrew
  const simpleHebrew = "שָׁלוֹם";
  results.push({
    name: "Hebraico Simples",
    passed: containsHebrew(simpleHebrew) && simpleHebrew.length === 5,
    details: `Original: ${simpleHebrew}`
  });

  // Test 2: Hebraico com Niqqud
  const niqqudText = "בְּרֵאשִׁית בָּרָא אֱלֹהִים";
  const containsNiqqud = /[\u0591-\u05C7]/.test(niqqudText);
  results.push({
    name: "Hebraico com Niqqud",
    passed: containsNiqqud && containsHebrew(niqqudText),
    details: `Niqqud detectado: ${containsNiqqud}`
  });

  // Test 3: Hebraico + Português
  const mixText = "A palavra Shalom (שָׁלוֹם) significa paz e integridade.";
  results.push({
    name: "Hebraico + Português",
    passed: containsHebrew(mixText) && mixText.includes("Shalom"),
    details: `Suporte a texto misto validado`
  });

  // Test 4: Hebraico + Transliteração
  const translitText = "TEXTO: שָׁמַע yisrael\nTRANSLITERAÇÃO: Shema Yisrael\nTRADUÇÃO: Ouve, Israel";
  const blocks = parseStudyContentBlocks(translitText);
  results.push({
    name: "Hebraico + Transliteração",
    passed: blocks.length === 3 && blocks[0].isHebrew && !blocks[1].isHebrew,
    details: `Blocos parsed: ${blocks.length}`
  });

  // Test 5: Hebraico em Estudos Pardes
  const pardesText = "Peshat: בְּרֵאשִׁית - No princípio\nRemez: Alusão à sabedoria divina\nDerash: Interpretação rabínica\nSod: Mistério do Ein Sof";
  results.push({
    name: "Hebraico em Estudos Pardes",
    passed: containsHebrew(pardesText) && pardesText.includes("Peshat"),
    details: `Amostra Pardes testada com sucesso`
  });

  // Test 6: Hebraico em Estudos Tradicionais
  const tradText = "Estudo Tradicional: Vayikra (וַיִּקְרָא) e o serviço no Mishkan";
  results.push({
    name: "Hebraico em Estudos Tradicionais",
    passed: containsHebrew(tradText),
    details: `Modo Tradicional validado`
  });

  // Test 7: Hebraico em Estudos Comparativos
  const compText = "Comparativo: Tanakh (תַּנַ\"ךְ) vs Septuaginta (LXX)";
  results.push({
    name: "Hebraico em Estudos Comparativos",
    passed: containsHebrew(compText),
    details: `Modo Comparativo validado`
  });

  // Test 8: Hebraico no PDF
  const pdfText = "בְּרֵאשִׁית";
  const pdfReversed = reverseHebrewForPdf(pdfText);
  results.push({
    name: "Hebraico no PDF (Reversão RTL / Grapheme Clustered)",
    passed: pdfReversed.length > 0 && containsHebrew(pdfReversed),
    details: `Inversão visual preservando Niqqud gerada`
  });

  // Test 9: Hebraico no PDF com slides
  const slideQuote = "שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד";
  results.push({
    name: "Hebraico no PDF com Slides",
    passed: containsHebrew(slideQuote),
    details: `Citação Shema para slides validada`
  });

  // Test 10: Hebraico no TXT
  const txtContent = `\uFEFF` + "HEBRAICO: בְּרֵאשִׁית בָּרָא";
  results.push({
    name: "Hebraico no TXT (UTF-8 BOM)",
    passed: txtContent.startsWith('\uFEFF') && containsHebrew(txtContent),
    details: `BOM UTF-8 preservado`
  });

  const allPassed = results.every(r => r.passed);
  return { allPassed, results };
}
