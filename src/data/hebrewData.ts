import { HebrewLetter, HebrewWord, HebrewActivity } from '../types';

export const HEBREW_ALPHABET: HebrewLetter[] = [
  { letter: 'א', name: 'Alef', transliteration: 'A / Silencioso', soundDescription: 'Gutural leve, toma a vogal associada', numericalValue: 1, exampleWordHebrew: 'אַבָּא', exampleWordTransliteration: 'Abba', exampleWordPt: 'Pai' },
  { letter: 'ב', name: 'Bet / Vet', transliteration: 'B / V', soundDescription: 'B (com ponto / Dagesh) ou V (sem ponto)', numericalValue: 2, exampleWordHebrew: 'בַּיִת', exampleWordTransliteration: 'Bayit', exampleWordPt: 'Casa' },
  { letter: 'ג', name: 'Gimel', transliteration: 'G', soundDescription: 'G duro como em "Gato"', numericalValue: 3, exampleWordHebrew: 'גַּן', exampleWordTransliteration: 'Gan', exampleWordPt: 'Jardim' },
  { letter: 'ד', name: 'Dalet', transliteration: 'D', soundDescription: 'D como em "Dado"', numericalValue: 4, exampleWordHebrew: 'דֶּרֶךְ', exampleWordTransliteration: 'Derekh', exampleWordPt: 'Caminho' },
  { letter: 'ה', name: 'Hei', transliteration: 'H', soundDescription: 'H aspirado como em "House" (Inglês)', numericalValue: 5, exampleWordHebrew: 'הֵיכָל', exampleWordTransliteration: 'Heikhal', exampleWordPt: 'Templo / Palácio' },
  { letter: 'ו', name: 'Vav', transliteration: 'V / O / U', soundDescription: 'V consonantal ou vogal O / U', numericalValue: 6, exampleWordHebrew: 'וְאָהַבְתָּ', exampleWordTransliteration: 'Ve-ahavta', exampleWordPt: 'E amarás' },
  { letter: 'ז', name: 'Zayin', transliteration: 'Z', soundDescription: 'Z como em "Zebra"', numericalValue: 7, exampleWordHebrew: 'זָהָב', exampleWordTransliteration: 'Zahav', exampleWordPt: 'Ouro' },
  { letter: 'ח', name: 'Chet', transliteration: 'Ch / Kh', soundDescription: 'R gutural forte como em "Carro" ou "Rios"', numericalValue: 8, exampleWordHebrew: 'חָכְמָה', exampleWordTransliteration: 'Chokhmah', exampleWordPt: 'Sabedoria' },
  { letter: 'ט', name: 'Tet', transliteration: 'T', soundDescription: 'T enfático como em "Terra"', numericalValue: 9, exampleWordHebrew: 'טוֹב', exampleWordTransliteration: 'Tov', exampleWordPt: 'Bom' },
  { letter: 'י', name: 'Yud', transliteration: 'Y / I', soundDescription: 'Y consonantal como em "Yes" ou vogal I', numericalValue: 10, exampleWordHebrew: 'יְרוּשָׁלַםִ', exampleWordTransliteration: 'Yerushalaim', exampleWordPt: 'Jerusalém' },
  { letter: 'כ', finalForm: 'ך', name: 'Khaf / Kaf', transliteration: 'K / Kh', soundDescription: 'K (com ponto) ou Kh gutural (sem ponto). Final: ך', numericalValue: 20, exampleWordHebrew: 'כָּבוֹד', exampleWordTransliteration: 'Kavod', exampleWordPt: 'Glória / Honra' },
  { letter: 'ל', name: 'Lamed', transliteration: 'L', soundDescription: 'L limpo como em "Luz"', numericalValue: 30, exampleWordHebrew: 'לֵב', exampleWordTransliteration: 'Lev', exampleWordPt: 'Coração' },
  { letter: 'מ', finalForm: 'ם', name: 'Mem', transliteration: 'M', soundDescription: 'M como em "Mãe". Forma final fechada: ם', numericalValue: 40, exampleWordHebrew: 'מֶלֶךְ', exampleWordTransliteration: 'Melekh', exampleWordPt: 'Rei' },
  { letter: 'נ', finalForm: 'ן', name: 'Nun', transliteration: 'N', soundDescription: 'N como em "Navio". Forma final: ן', numericalValue: 50, exampleWordHebrew: 'נֵר', exampleWordTransliteration: 'Ner', exampleWordPt: 'Luz / Lâmpada' },
  { letter: 'ס', name: 'Samekh', transliteration: 'S', soundDescription: 'S suave como em "Sol"', numericalValue: 60, exampleWordHebrew: 'סֵפֶר', exampleWordTransliteration: 'Sefer', exampleWordPt: 'Livro' },
  { letter: 'ע', name: 'Ayin', transliteration: 'Silencioso / Gutural', soundDescription: 'Vogal acompanhada de leve compressão na garganta', numericalValue: 70, exampleWordHebrew: 'עוֹלָם', exampleWordTransliteration: 'Olam', exampleWordPt: 'Mundo / Eternidade' },
  { letter: 'פ', finalForm: 'ף', name: 'Pei / Fei', transliteration: 'P / F', soundDescription: 'P (com ponto) ou F (sem ponto). Final: ף', numericalValue: 80, exampleWordHebrew: 'פָּנִים', exampleWordTransliteration: 'Panim', exampleWordPt: 'Face / Rosto' },
  { letter: 'צ', finalForm: 'ץ', name: 'Tzadi', transliteration: 'Tz / Ts', soundDescription: 'TS como em "Pizza". Final: ץ', numericalValue: 90, exampleWordHebrew: 'צَدִּיק', exampleWordTransliteration: 'Tzaddik', exampleWordPt: 'Justo' },
  { letter: 'ק', name: 'Kof', transliteration: 'K / Q', soundDescription: 'K posterior profundo', numericalValue: 100, exampleWordHebrew: 'קָדוֹשׁ', exampleWordTransliteration: 'Kadosh', exampleWordPt: 'Santo / Consagrado' },
  { letter: 'ר', name: 'Resh', transliteration: 'R', soundDescription: 'R suave alveolar', numericalValue: 200, exampleWordHebrew: 'רוּחַ', exampleWordTransliteration: 'Ruach', exampleWordPt: 'Espírito / Vento' },
  { letter: 'ש', name: 'Shin / Sin', transliteration: 'Sh / S', soundDescription: 'SH (ponto à direita שׁ) ou S (ponto à esquerda שׂ)', numericalValue: 300, exampleWordHebrew: 'שָׁלוֹם', exampleWordTransliteration: 'Shalom', exampleWordPt: 'Paz / Plenitude' },
  { letter: 'ת', name: 'Tav', transliteration: 'T', soundDescription: 'T limpo como em "Templo"', numericalValue: 400, exampleWordHebrew: 'תּוֹרָה', exampleWordTransliteration: 'Torah', exampleWordPt: 'Instrução / Lei' }
];

export const HEBREW_WORDS: HebrewWord[] = [
  { id: 'w1', hebrew: 'שָׁלוֹם', transliteration: 'Shalom', pronunciation: 'Sha-LOM', translationPt: 'Paz, plenitude, bem-estar, inteireza', category: 'termos_biblicos', root: 'ש-ל-מ', biblicalRef: 'Números 6:26', exampleSentenceHebrew: 'שָׁלוֹם עֲלֵיכֶם', exampleSentencePt: 'A paz esteja convosco' },
  { id: 'w2', hebrew: 'תּוֹרָה', transliteration: 'Torah', pronunciation: 'To-RAH', translationPt: 'Instrução, ensino, lei divina, direção', category: 'tora', root: 'י-ר-ה', biblicalRef: 'Deuteronômio 33:4', exampleSentenceHebrew: 'תּוֹרַת יְהוָה תְּמִימָה', exampleSentencePt: 'A instrução do Senhor é perfeita' },
  { id: 'w3', hebrew: 'שַׁבָּת', transliteration: 'Shabbat', pronunciation: 'Sha-BAT', translationPt: 'Cessação, descanso, dia sagrado da semana', category: 'shabbat', root: 'ש-ב-ת', biblicalRef: 'Gênesis 2:2-3', exampleSentenceHebrew: 'שַׁבָּת שָׁלוֹם', exampleSentencePt: 'Um Shabat de paz' },
  { id: 'w4', hebrew: 'חֶסֶד', transliteration: 'Chesed', pronunciation: 'CHE-sed', translationPt: 'Bondade leal, misericórdia, amor de aliança', category: 'termos_biblicos', root: 'ח-ס-ד', biblicalRef: 'Salmos 136:1', exampleSentenceHebrew: 'כִּי לְעוֹלָם חַסְדּוֹ', exampleSentencePt: 'Porque a sua misericórdia dura para sempre' },
  { id: 'w5', hebrew: 'אֱמֶת', transliteration: 'Emet', pronunciation: 'E-met', translationPt: 'Verdade, firmeza, fidelidade', category: 'termos_biblicos', root: 'א-מ-נ', biblicalRef: 'Salmos 119:160', exampleSentenceHebrew: 'רֹאשׁ-דְּבָרְךָ אֱמֶת', exampleSentencePt: 'A essência da tua palavra é a verdade' },
  { id: 'w6', hebrew: 'קָדוֹשׁ', transliteration: 'Kadosh', pronunciation: 'Ka-DOSH', translationPt: 'Santo, separado, consagrado, distinto', category: 'termos_biblicos', root: 'ק-ד-ש', biblicalRef: 'Isaías 6:3', exampleSentenceHebrew: 'קָדוֹשׁ קָדוֹשׁ קָדוֹשׁ יְהוָה צְבָאוֹת', exampleSentencePt: 'Santo, Santo, Santo é o Senhor dos Exércitos' },
  { id: 'w7', hebrew: 'רוּחַ', transliteration: 'Ruach', pronunciation: 'RU-ach', translationPt: 'Espírito, sopro, vento, alento de vida', category: 'termos_biblicos', root: 'ר-ו-ח', biblicalRef: 'Gênesis 1:2', exampleSentenceHebrew: 'וְרוּחַ אֱלֹהִים מְרַחֶפֶת', exampleSentencePt: 'E o Espírito de Deus pairava' },
  { id: 'w8', hebrew: 'אֲהָבָה', transliteration: 'Ahavah', pronunciation: 'A-ha-VAH', translationPt: 'Amor, afeiçoamento profundo, doação', category: 'familia', root: 'א-ה-ב', biblicalRef: 'Deuteronômio 6:5', exampleSentenceHebrew: 'וְאָהַבְתָּ אֵת יְהוָה אֱלֹהֶיךָ', exampleSentencePt: 'E amarás o Senhor teu Deus' },
  { id: 'w9', hebrew: 'מֶלֶךְ', transliteration: 'Melekh', pronunciation: 'ME-lekh', translationPt: 'Rei, soberano', category: 'termos_biblicos', root: 'מ-ל-ך', biblicalRef: 'Salmos 47:7', exampleSentenceHebrew: 'מֶלֶךְ הָעוֹלָם', exampleSentencePt: 'Rei do Universo' },
  { id: 'w10', hebrew: 'מָשִׁיחַ', transliteration: 'Mashiach', pronunciation: 'Ma-SHI-ach', translationPt: 'Ungido, Messias', category: 'termos_biblicos', root: 'מ-ש-ח', biblicalRef: 'Salmos 2:2', exampleSentenceHebrew: 'עַל-יְהוָה וְעַל-מְשִׁיחוֹ', exampleSentencePt: 'Contra o Senhor e contra o seu Ungido' },
  { id: 'w11', hebrew: 'אֶחָד', transliteration: 'Echad', pronunciation: 'E-CHAD', translationPt: 'Um, único, unido, indivisível', category: 'oracoes', root: 'א-ח-ד', biblicalRef: 'Deuteronômio 6:4', exampleSentenceHebrew: 'יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד', exampleSentencePt: 'O Senhor nosso Deus, o Senhor é Um' },
  { id: 'w12', hebrew: 'תְּשּׁוּבָה', transliteration: 'Teshuvah', pronunciation: 'Te-shu-VAH', translationPt: 'Arrependimento, retorno ao caminho, conversão', category: 'festas', root: 'ש-ו-ב', biblicalRef: 'Oséias 14:2', exampleSentenceHebrew: 'שׁוּבָה יִשְׂרָאֵל', exampleSentencePt: 'Retorna, ó Israel' },
  { id: 'w13', hebrew: 'צְדָקָה', transliteration: 'Tzedakah', pronunciation: 'Tze-da-KAH', translationPt: 'Justiça social, caridade obrigações de retidão', category: 'termos_biblicos', root: 'צ-ד-ק', biblicalRef: 'Deuteronômio 16:20', exampleSentenceHebrew: 'צֶדֶק צֶדֶק תִּרְדֹּף', exampleSentencePt: 'A justiça, a justiça perseguirás' },
  { id: 'w14', hebrew: 'מִצְוָה', transliteration: 'Mitzvah', pronunciation: 'Mitz-VAH', translationPt: 'Mandamento, preceito, boa ação', category: 'tora', root: 'צ-ו-ה', biblicalRef: 'Salmos 119:172', exampleSentenceHebrew: 'כָּל-מִצְוֹתֶיךָ צֶדֶק', exampleSentencePt: 'Todos os teus mandamentos são justiça' },
  { id: 'w15', hebrew: 'אֹר', transliteration: 'Or', pronunciation: 'OR', translationPt: 'Luz, iluminação', category: 'natureza', root: 'א-ו-ר', biblicalRef: 'Gênesis 1:3', exampleSentenceHebrew: 'יְהִי אוֹר וַיְהִי-אוֹר', exampleSentencePt: 'Haja luz, e houve luz' }
];

export const HEBREW_ACTIVITIES: HebrewActivity[] = [
  {
    id: 'act1',
    type: 'letter_match',
    question: 'Qual é o nome e transliteração da letra "ש"?',
    options: ['Shin (Sh / S)', 'Samekh (S)', 'Sinai (S)', 'Sod (S)'],
    correctAnswer: 'Shin (Sh / S)',
    explanation: 'A letra ש chama-se Shin quando possui ponto à direita (שׁ = Sh) ou Sin quando o ponto fica à esquerda (שׂ = S).'
  },
  {
    id: 'act2',
    type: 'translation_quiz',
    question: 'O que significa a palavra "תּוֹרָה" (Torah)?',
    options: ['Instrução / Lei Divina', 'Reino Sagrado', 'Cidade de Paz', 'Livro de Oração'],
    correctAnswer: 'Instrução / Lei Divina',
    explanation: 'Torah vem da raiz י-ר-ה (Yarah) que significa lançar uma flecha no alvo, ensinar ou instruir.'
  },
  {
    id: 'act3',
    type: 'word_assembly',
    question: 'Como se escreve "Shalom" em caracteres hebraicos?',
    options: ['שָׁלוֹם', 'שַׁבָּת', 'שְׁמַע', 'שָׁמַיִם'],
    correctAnswer: 'שָׁלוֹם',
    explanation: 'שָׁלוֹם é composto por Shin (ש), Lamed (ל), Vav (ו) e Mem final (ם).'
  },
  {
    id: 'act4',
    type: 'pronunciation_listen',
    question: 'Qual é a pronúncia correta do Shema: "יְהוָה אֶחָד"?',
    options: ['Adonai Echad', 'Adonai Shalom', 'Adonai Kadosh', 'Adonai Eloheinu'],
    correctAnswer: 'Adonai Echad',
    explanation: 'Echad (אֶחָד) significa "Um", ressaltando a unicidade indivisível do Criador.'
  }
];
