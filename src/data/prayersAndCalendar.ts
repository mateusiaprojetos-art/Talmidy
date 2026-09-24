import { Holiday, Prayer } from '../types';

export const SHEMA_WORD_BY_WORD = [
  { hebrew: 'שְׁמַע', transliteration: 'Shema', pronunciation: 'She-MA', meaning: 'Ouve, atenta, escuta com obediência', note: 'Imperativo ordenando audição ativa e ação.' },
  { hebrew: 'יִשְׂרָאֵל', transliteration: 'Yisrael', pronunciation: 'Yis-ra-EL', meaning: 'Israel (Aquele que luta com Deus e prevalece)', note: 'O povo destinatário da revelação divina.' },
  { hebrew: 'יְהוָה', transliteration: 'Adonai', pronunciation: 'A-do-NAI', meaning: 'O Senhor (O Inefável YHVH, Ele que É, Era e Há de Vir)', note: 'Nome Sagrado lido tradicionalmente como Adonai.' },
  { hebrew: 'אֱלֹהֵינוּ', transliteration: 'Eloheinu', pronunciation: 'E-lo-HEI-nu', meaning: 'Nosso Deus (Nosso Soberano Juiz e Criador)', note: 'Elohim com sufixo "nu" (nosso).' },
  { hebrew: 'יְהוָה', transliteration: 'Adonai', pronunciation: 'A-do-NAI', meaning: 'O Senhor', note: 'Reiteração da soberania e compaixão.' },
  { hebrew: 'אֶחָד', transliteration: 'Echad', pronunciation: 'E-CHAD', meaning: 'Um, Único, Unido, Indivisível', note: 'Afirmação central do monoteísmo hebraico.' }
];

export const PRAYERS_LIST: Prayer[] = [
  {
    id: 'pr1',
    titlePt: 'Modeh Ani (Oração ao Acordar)',
    titleHebrew: 'מוֹדֶה אֲנִי',
    transliteration: 'Modeh ani lefanecha melech chai vekayam shehechezarta bi nishmati bechemlah, rabbah emunatecha.',
    hebrewText: 'מוֹדֶה אֲנִי לְפָנֶיךָ מֶלֶךְ חַי וְקַיָּם שֶׁהֶחֱזַרְתָּ בִּי נִשְׁמָתִי בְּחֶמְלָה רַבָּה אֱמוּנָתֶךָ׃',
    translationPt: 'Agradeço diante de Ti, Rei vivo e permanente, que devolveste em mim minha alma com compaixão; grande é a Tua fidelidade.',
    context: 'Primeira oração recitada ao abrir os olhos pela manhã, expressando gratidão pelo dom da vida restaurada.',
    sourceType: 'traditional',
    sourceName: 'Tradição Judaica Diária (Siddur)'
  },
  {
    id: 'pr2',
    titlePt: 'Shema Israel (A Declaração de Fé)',
    titleHebrew: 'שְׁמַע יִשְׂרָאֵל',
    transliteration: 'Shema Yisrael Adonai Eloheinu Adonai Echad. Baruch shem kavod malchuto le\'olam va\'ed.',
    hebrewText: 'שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד׃ בָּרוּךְ שֵׁם כְּבוֹד מַלְכוּתוֹ לְעוֹלָם וָעֶד׃',
    translationPt: 'Ouve, Israel: o Senhor nosso Deus é o único Senhor! Bendito seja o Nome da glória do Seu reino para todo o sempre.',
    context: 'Proclamação diária matutina e noturna da unicidade de Deus e entrega do coração.',
    sourceType: 'biblical',
    sourceName: 'Deuteronômio 6:4'
  },
  {
    id: 'pr3',
    titlePt: 'Birkat Kohanim (A Bênção Sacerdotal)',
    titleHebrew: 'בִּרְכַּת כֹּהֲנִים',
    transliteration: 'Yevarechecha Adonai veyishmerecha. Ya\'er Adonai panav eilecha viychuneka. Yissa Adonai panav eilecha veyaseim lecha shalom.',
    hebrewText: 'יְבָרֶכְךָ יְהוָה וְיִשְׁמְרֶךָ׃ יָאֵר יְהוָה פָּנָיו אֵלֶיךָ וִיחֻנֶּךָ׃ יִשָּׂא יְהוָה פָּנָיו אֵלֶיךָ וְיָשֵׂם לְךָ שָׁלוֹם׃',
    translationPt: 'O Senhor te abençoe e te guarde; o Senhor faça resplandecer o Seu rosto sobre ti e tenha misericórdia de ti; o Senhor sobre ti levante o Seu rosto e te dê a paz.',
    context: 'Bênção bíblica dada aos sacerdotes para pronunciar sobre a congregação de Israel.',
    sourceType: 'biblical',
    sourceName: 'Números 6:24-26'
  },
  {
    id: 'pr4',
    titlePt: 'Kiddush de Shabat (Santificação do Vinho)',
    titleHebrew: 'קִדּוּשׁ לְלֵיל שַׁבָּת',
    transliteration: 'Baruch atah Adonai Eloheinu melech ha\'olam, borei peri hagafen.',
    hebrewText: 'בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם בּוֹרֵא פְּרִי הַגָּפֶן׃',
    translationPt: 'Bendito és Tu, Senhor nosso Deus, Rei do Universo, que crias o fruto da videira.',
    context: 'Recitado na refeição de recepção do Shabat para separar o dia sagrado dos dias da semana.',
    sourceType: 'traditional',
    sourceName: 'Mishnah / Siddur de Shabat'
  }
];

export const BIBLICAL_HOLIDAYS: Holiday[] = [
  {
    id: 'pessach',
    namePt: 'Pessach (Páscoa / Libertação)',
    nameHebrew: 'פֶּסַח',
    transliteration: 'Pessach',
    hebrewDate: '15 de Nisan',
    civilDateApprox: 'Março / Abril',
    originText: 'Êxodo 12:1-28; Levítico 23:5',
    significance: 'Memória da redenção de Israel da escravidão egípcia e a passagem do anjo destruidor.',
    biblicalRefs: ['Êxodo 12', 'Levítico 23:5', 'Deuteronômio 16:1-8'],
    practices: ['Remoção de fermento (Chametz)', 'Comer pão ázimo (Matzah)', 'Refeição do Seder'],
    pardesSummary: 'No Peshat é a saída física do Egito. No Sod é a libertação espiritual da alma das cadeias do egoísmo.',
    connectionsBritHadasha: 'Yeshua celebra o Seder de Pessach instituindo o pão e o vinho em memória de Sua entrega como o Cordeiro pascal.'
  },
  {
    id: 'shavuot',
    namePt: 'Shavuot (Festa das Semanas / Pentecostes)',
    nameHebrew: 'שָׁבוּעוֹת',
    transliteration: 'Shavuot',
    hebrewDate: '6 de Sivan',
    civilDateApprox: 'Maio / Junho',
    originText: 'Levítico 23:15-21; Deuteronômio 16:9-12',
    significance: 'Outorga da Torá no Monte Sinai e primícias das colheitas agrícolas.',
    biblicalRefs: ['Êxodo 19-20', 'Levítico 23:15-21'],
    practices: ['Estudo noturno da Torá (Tikkun Leil Shavuot)', 'Leitura do Livro de Rute', 'Alimentos lácteos'],
    pardesSummary: 'Conexão entre a liberdade física adquirida em Pessach e a liberdade espiritual recebida na Lei divina.',
    connectionsBritHadasha: 'Derramamento do Espírito Santo (Ruach HaKodesh) em Jerusalém em Atos 2, escrevendo a Torá no coração dos crentes.'
  },
  {
    id: 'rosh_hashanah',
    namePt: 'Yom Teruah / Rosh Hashaná (Dia de Toque do Shofar / Ano Novo)',
    nameHebrew: 'יוֹם תְּרוּעָה',
    transliteration: 'Yom Teruah',
    hebrewDate: '1 de Tishrei',
    civilDateApprox: 'Setembro / Outubro',
    originText: 'Levítico 23:23-25; Números 29:1-6',
    significance: 'Dia do despetar, toque do Shofar, início dos dez dias de arrependimento (Yamim Noraim).',
    biblicalRefs: ['Levítico 23:23-25', 'Salmos 81:3'],
    practices: ['Toque do Shofar', 'Comer maçã com mel', 'Oração e Teshuvá'],
    pardesSummary: 'O Shofar é a corneta do Rei chamando o povo ao julgamento amoroso e à renovação espiritual.',
    connectionsBritHadasha: 'O toque da última trombeta anunciando a vinda do Messias e a ressurreição (1 Tessalonicenses 4:16).'
  },
  {
    id: 'yom_kippur',
    namePt: 'Yom Kippur (Dia da Expiação / Perdão)',
    nameHebrew: 'יוֹם כִּפּוּר',
    transliteration: 'Yom Kippur',
    hebrewDate: '10 de Tishrei',
    civilDateApprox: 'Setembro / Outubro',
    originText: 'Levítico 16:1-34; Levítico 23:26-32',
    significance: 'O dia mais sagrado do ano: jejum total, purificação dos pecados e reconciliação.',
    biblicalRefs: ['Levítico 16', 'Isaías 58'],
    practices: ['Jejum de 25 horas', 'Oração intensa', 'Sabbath dos Sabbaths'],
    pardesSummary: 'O Sumo Sacerdote entra no Santo dos Santos para aspergir o sangue da expiação e purificar a congregação.',
    connectionsBritHadasha: 'A carta aos Hebreus apresenta o sacerdócio celestial de Yeshua entrando uma vez por todas no Santuário Celestial.'
  },
  {
    id: 'sukkot',
    namePt: 'Sukkot (Festa dos Tabernáculos / Cabañas)',
    nameHebrew: 'סֻכּוֹת',
    transliteration: 'Sukkot',
    hebrewDate: '15-21 de Tishrei',
    civilDateApprox: 'Outubro',
    originText: 'Levítico 23:33-43; Deuteronômio 16:13-15',
    significance: 'Celebração da proteção divina durante a peregrinação no deserto e a colheita final.',
    biblicalRefs: ['Levítico 23:33-43', 'Zacarias 14:16'],
    practices: ['Habitar na Sukkah (cabana)', 'Balançar as 4 espécies (Lulav e Etrog)', 'Alegria profunda'],
    pardesSummary: 'A Sukkah temporária lembra a fragilidade das estruturas humanas e a dependência da providência do Altíssimo.',
    connectionsBritHadasha: 'Yeshua no Templo no último dia de Sukkot proclama: "Se alguém tem sede, venha a mim e beba" (João 7:37).'
  }
];

export const HEBREW_MONTHS = [
  { name: 'Nisan', season: 'Primavera', notes: 'Mês do Éxodo e Pessach' },
  { name: 'Iyar', season: 'Primavera', notes: 'Mês do início da colheita e cura' },
  { name: 'Sivan', season: 'Primavera', notes: 'Mês de Shavuot e outorga da Torá' },
  { name: 'Tammuz', season: 'Verão', notes: 'Mês do jejum de 17 de Tammuz' },
  { name: 'Av', season: 'Verão', notes: 'Mês de Tisha B\'Av (destruição do Templo)' },
  { name: 'Elul', season: 'Verão / Outono', notes: 'Mês de preparação espiritual e Teshuvá' },
  { name: 'Tishrei', season: 'Outono', notes: 'Mês das Festas Solenes (Rosh Hashaná, Kippur, Sukkot)' },
  { name: 'Cheshvan', season: 'Outono', notes: 'Mês das chuvas de outono' },
  { name: 'Kislev', season: 'Inverno', notes: 'Mês de Chanucá e da luz' },
  { name: 'Tevet', season: 'Inverno', notes: 'Mês do cerco de Jerusalém' },
  { name: 'Shevat', season: 'Inverno', notes: 'Mês de Tu BiShvat (Ano novo das árvores)' },
  { name: 'Adar', season: 'Inverno / Primavera', notes: 'Mês de Purim e da alegria' }
];
