import { BibleBook, BibleVerse } from '../types';

export const BIBLE_BOOKS: BibleBook[] = [
  // Tora
  { id: 'genesis', name: 'Gênesis', hebrewName: 'בְּרֵאשִׁית', transliteration: 'Bereshit', category: 'tora', chaptersCount: 50, description: 'No princípio: Criação, Patriarcas, a promessa de Israel.' },
  { id: 'exodus', name: 'Êxodo', hebrewName: 'שְׁמוֹת', transliteration: 'Shemot', category: 'tora', chaptersCount: 40, description: 'Nomes: Libertação do Egito, Aliança no Sinai, o Tabernáculo.' },
  { id: 'leviticus', name: 'Levítico', hebrewName: 'וַיִּקְרָא', transliteration: 'Vayikra', category: 'tora', chaptersCount: 27, description: 'E chamou: Leis de santidade, sacrifícios, Yom Kippur, Festas.' },
  { id: 'numbers', name: 'Números', hebrewName: 'בְּמִדְבַּר', transliteration: 'Bamidbar', category: 'tora', chaptersCount: 36, description: 'No deserto: A jornada pelo deserto, censos, tribos de Israel.' },
  { id: 'deuteronomy', name: 'Deuteronômio', hebrewName: 'דְּבָרִים', transliteration: 'Devarim', category: 'tora', chaptersCount: 34, description: 'Palavras: Os discursos finais de Moisés, Shema Israel.' },

  // Nevi'im (Profetas)
  { id: 'joshua', name: 'Josué', hebrewName: 'יְהוֹשֻׁעַ', transliteration: 'Yehoshua', category: 'neviim', chaptersCount: 24, description: 'A conquista da Terra Prometida e divisão entre as tribos.' },
  { id: 'judges', name: 'Juízes', hebrewName: 'שֹׁפְטִים', transliteration: 'Shoftim', category: 'neviim', chaptersCount: 21, description: 'O período dos libertadores e líderes das tribos.' },
  { id: 'samuel', name: 'Samuel (1 e 2)', hebrewName: 'שְׁמוּאֵל', transliteration: 'Shmuel', category: 'neviim', chaptersCount: 55, description: 'Transição para a monarquia, Saul e o Rei Davi.' },
  { id: 'kings', name: 'Reis (1 e 2)', hebrewName: 'מְלָכִים', transliteration: 'Melakhim', category: 'neviim', chaptersCount: 47, description: 'O Templo de Salomão, o reino dividido e os profetas.' },
  { id: 'isaiah', name: 'Isaías', hebrewName: 'יְשַׁעְיָהוּ', transliteration: 'Yeshayahu', category: 'neviim', chaptersCount: 66, description: 'Visões messiânicas, consolação de Israel e justiça divina.' },
  { id: 'jeremiah', name: 'Jeremias', hebrewName: 'יִרְמְיָהוּ', transliteration: 'Yirmeyahu', category: 'neviim', chaptersCount: 52, description: 'A nova aliança, o exílio na Babilônia e a restauração.' },
  { id: 'ezekiel', name: 'Ezequiel', hebrewName: 'יְחֶזְקֵאל', transliteration: 'Yehezkel', category: 'neviim', chaptersCount: 48, description: 'A carruagem divina (Merkavah), o vale de ossos secos e o novo Templo.' },

  // Ketuvim (Escritos)
  { id: 'psalms', name: 'Salmos', hebrewName: 'תְּהִלִּים', transliteration: 'Tehillim', category: 'ketuvim', chaptersCount: 150, description: 'Orações, louvores, cânticos e poesias do Rei Davi.' },
  { id: 'proverbs', name: 'Provérbios', hebrewName: 'מִשְׁלֵי', transliteration: 'Mishlei', category: 'ketuvim', chaptersCount: 31, description: 'Sabedoria prática do Rei Salomão para a vida diária.' },
  { id: 'job', name: 'Jó', hebrewName: 'אִיּוֹב', transliteration: 'Iyov', category: 'ketuvim', chaptersCount: 42, description: 'O mistério do sofrimento do justo e a soberania divina.' },
  { id: 'song_of_songs', name: 'Cântico dos Cânticos', hebrewName: 'שִׁיר הַשִּׁירִים', transliteration: 'Shir HaShirim', category: 'ketuvim', chaptersCount: 8, description: 'O amor alegórico entre o Criador e Israel.' },
  { id: 'daniel', name: 'Daniel', hebrewName: 'דָּנִיֵּאל', transliteration: 'Daniyel', category: 'ketuvim', chaptersCount: 12, description: 'Visões dos reinos do mundo e a vinda do Filho do Homem.' },

  // Brit Hadasha
  { id: 'matthew', name: 'Mateus', hebrewName: 'מַתִּתְיָהוּ', transliteration: 'Mattityahu', category: 'brit_hadasha', chaptersCount: 28, description: 'O Evangelho do Reino no contexto hebraico do Primeiro Século.' },
  { id: 'mark', name: 'Marcos', hebrewName: 'מַרְקוֹס', transliteration: 'Markos', category: 'brit_hadasha', chaptersCount: 16, description: 'O Servo Sofrer e os milagres no poder de Elohim.' },
  { id: 'luke', name: 'Lucas', hebrewName: 'לוּקָס', transliteration: 'Luqas', category: 'brit_hadasha', chaptersCount: 24, description: 'A compilação histórica do ensinamento messiânico.' },
  { id: 'john', name: 'João', hebrewName: 'יוֹחָנָן', transliteration: 'Yohanan', category: 'brit_hadasha', chaptersCount: 21, description: 'O Verbo divino, a Luz e a vida eterna.' },
  { id: 'acts', name: 'Atos dos Apóstolos', hebrewName: 'מַעֲשֵׂי הַשְּׁלִיחִים', transliteration: 'Maasei HaShlichim', category: 'brit_hadasha', chaptersCount: 28, description: 'A expansão da comunidade de crentes em Jerusalém e nas nações.' },
  { id: 'romans', name: 'Romanos', hebrewName: 'אִגֶּרֶת אֶל-הָרוֹמִיִּים', transliteration: 'Igeret el-HaRomiyim', category: 'brit_hadasha', chaptersCount: 16, description: 'Justificação pela fé, a oliveira de Israel e a graça divina.' },
  { id: 'hebrews', name: 'Hebreus', hebrewName: 'אִגֶּרֶת אֶל-הָעִבְרִיִּים', transliteration: 'Igeret el-HaIvriyim', category: 'brit_hadasha', chaptersCount: 13, description: 'O sacerdócio de Melquisedeque e o santuário celestial.' },
  { id: 'revelation', name: 'Apocalipse / Revelação', hebrewName: 'חָזוֹן / הִתְגַּלּוּת', transliteration: 'Hitgalut', category: 'brit_hadasha', chaptersCount: 22, description: 'A consumação dos tempos, a Nova Jerusalém e o reino messiânico.' }
];

export const SAMPLE_VERSES: Record<string, BibleVerse[]> = {
  'genesis_1': [
    { bookId: 'genesis', chapter: 1, verse: 1, textPt: 'No princípio, criou Deus os céus e a terra.', textHebrew: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ׃', transliteration: 'Bereshit bara Elohim et hashamayim ve\'et ha\'aretz.' },
    { bookId: 'genesis', chapter: 1, verse: 2, textPt: 'A terra era sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava sobre as águas.', textHebrew: 'וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ וְחֹשֶׁךְ עַל-פְּנֵי תְהוֹם וְרוּחַ אֱלֹהִים מְרַחֶפֶת עַל-פְּנֵי הַמָּיִם׃', transliteration: 'Veha\'aretz hayetah tohu vavohu vechoshech al-penei tehom veruach Elohim merachefet al-penei hamayim.' },
    { bookId: 'genesis', chapter: 1, verse: 3, textPt: 'E disse Deus: Haja luz; e houve luz.', textHebrew: 'וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי-אוֹר׃', transliteration: 'Vayomer Elohim yehi or vayehi-or.' }
  ],
  'deuteronomy_6': [
    { bookId: 'deuteronomy', chapter: 6, verse: 4, textPt: 'Ouve, Israel, o Senhor nosso Deus é o único Senhor.', textHebrew: 'שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד׃', transliteration: 'Shema Yisrael Adonai Eloheinu Adonai Echad.' },
    { bookId: 'deuteronomy', chapter: 6, verse: 5, textPt: 'Amarás, pois, o Senhor teu Deus de todo o teu coração, e de toda a tua alma, e de todas as tuas forças.', textHebrew: 'וְאָהַבְתָּ אֵת יְהוָה אֱלֹהֶיךָ בְּכָל-לְבָבְךָ וּבְכָל-נַפְשְׁךָ וּבְכָל-מְאֹדֶךָ׃', transliteration: 'Ve-ahavta et Adonai Eloheicha bechol-levavcha uvechol-nafshecha uvechol-me\'odecha.' }
  ],
  'john_1': [
    { bookId: 'john', chapter: 1, verse: 1, textPt: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.', textHebrew: 'בְּרֵאשִׁית הָיָה הַדָּבָר וְהַדָּבָר הָיָה אֵצֶל הָאֱלֹהִים וֵאלֹהִים הָיָה הַדָּבָר׃', transliteration: 'Bereshit hayah haDavar vehaDavar hayah etzel haElohim veElohim hayah haDavar.' },
    { bookId: 'john', chapter: 1, verse: 14, textPt: 'E o Verbo se fez carne e habitou entre nós, e vimos a sua glória.', textHebrew: 'וְהַדָּבָר לָבַשׁ בָּשָׂר וַיִּשְׁכֹּן בְּתוֹכֵנוּ וַנֶּחֱזֶה אֶת-כְּבוֹדוֹ׃', transliteration: 'VehaDavar lavash basar vayishkon betochenu vanechezeh et-kevodo.' }
  ]
};

export const BIBLICAL_THEMES = [
  { id: 'alianca', title: 'Aliança (Brit)', description: 'O pacto sagrado e inquebrável de amor e responsabilidade entre Elohim e Seu povo.', refs: 'Gênesis 15:18, Jeremias 31:31' },
  { id: 'reino', title: 'O Reino de Deus (Malkhut Shamayim)', description: 'A soberania divina manifesta no coração humano e no Olam HaBa.', refs: 'Salmos 145:13, Mateus 6:10' },
  { id: 'messias', title: 'O Messias (Mashiach)', description: 'O Ungido de Israel enviado para libertar, ensinar e governar em justiça.', refs: 'Isaías 11:1-9, João 4:25-26' },
  { id: 'tora', title: 'A Torá e os Mandamentos (Mitzvot)', description: 'O mapa da instrução divina para a vida santa e pacífica.', refs: 'Salmos 19:7, Romanos 7:12' },
  { id: 'shabbat', title: 'O Shabat', description: 'O santuário no tempo, dia de cessação e comunhão com o Criador.', refs: 'Êxodo 20:8, Isaías 58:13-14' },
  { id: 'festas', title: 'As Festas Bíblicas (Moedim)', description: 'Os encontros proféticos marcados no calendário sagrado.', refs: 'Levítico 23:2, Colossenses 2:16-17' },
  { id: 'templo', title: 'O Templo e a Presença (Shekhinah)', description: 'A habitação da Glória Divina no meio de Seu povo.', refs: 'Êxodo 25:8, 1 Coríntios 3:16' },
  { id: 'teshuvah', title: 'Arrependimento e Retorno (Teshuvá)', description: 'O caminho de volta ao Pai através da contrição e transformação.', refs: 'Isaías 55:7, Atos 3:19' }
];

export const BIBLICAL_CHARACTERS = [
  { id: 'avraham', name: 'Abraão (Avraham)', hebrew: 'אַבְרָהָם', meaning: 'Pai de multidões', refs: 'Gênesis 12 - 25', summary: 'O pai da fé monoteísta, exemplo de hospitalidade e aliança.' },
  { id: 'moshe', name: 'Moisés (Moshe)', hebrew: 'מֹשֶׁה', meaning: 'Tirado das águas', refs: 'Êxodo - Deuteronômio', summary: 'O grande profeta e legislador de Israel que recebeu a Torá no Sinai.' },
  { id: 'david', name: 'Davi (David)', hebrew: 'דָּוִד', meaning: 'Amado', refs: '1 & 2 Samuel, Salmos', summary: 'O rei de coração terno, autor dos Salmos, ancestral do Messias.' },
  { id: 'yeshua', name: 'Jesus (Yeshua)', hebrew: 'יֵשׁוּעַ', meaning: 'O Senhor Salva', refs: 'Evangelhos, Brit Hadasha', summary: 'O Mestre de Nazaré, Messias de Israel e Luz para as Nações.' },
  { id: 'eliyahu', name: 'Elias (Eliyahu)', hebrew: 'אֵלִיָּהוּ', meaning: 'Meu Deus é o Senhor', refs: '1 & 2 Reis', summary: 'O profeta do zelo divino que precederá o Dia do Senhor.' }
];

export const HISTORICAL_TIMELINE = [
  { period: 'Patriarcas', dates: 'c. 2000 - 1500 a.E.C.', event: 'Abraão, Isaque e Jacó estabelecem a aliança e a família de Israel.' },
  { period: 'Êxodo e Sinai', dates: 'c. 1446 / 1250 a.E.C.', event: 'Libertação do Egito, outorga da Torá no Monte Sinai e 40 anos no deserto.' },
  { period: 'Monarquia Unificada', dates: 'c. 1020 - 930 a.E.C.', event: 'Reinos de Saul, Davi e Salomão; construção do Primeiro Templo em Jerusalém.' },
  { period: 'Exílio Babilônico', dates: '586 - 538 a.E.C.', event: 'Destruição do Primeiro Templo e exílio da nação em Babilônia.' },
  { period: 'Segundo Templo', dates: '516 a.E.C. - 70 E.C.', event: 'Reconstrução do Templo, período de Esdras/Neemias, influência helenística e romana.' },
  { period: 'Primeiro Século e Brit Hadasha', dates: 'c. 4 a.E.C. - 100 E.C.', event: 'Vida, ministério e ensinamento de Yeshua, surgimento da comunidade apostólica.' }
];
