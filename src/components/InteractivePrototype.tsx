import React, { useState, useEffect } from 'react';
import { 
  Smartphone, Upload, Sparkles, Brain, MessageSquare, BookOpen, Briefcase, 
  Send, User, Calendar, Share2, Plus, CalendarIcon, AlertTriangle, RefreshCw, 
  LogIn, CheckCircle2, Heart, Activity, Smile, ShieldAlert, BadgeInfo, Users, Check, Clock,
  Wifi, Battery, Signal, ArrowLeft, ChevronLeft, X, Settings, Mic, Volume2, Play, Pause,
  Bell, ThumbsUp, ThumbsDown, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Skill, PsychometricTrait, DiaryNote, JobPosting, ChatMessage } from '../types';
import { INITIAL_JOBS, INITIAL_DIARY, INITIAL_RECRUITERS, PRESET_RESUMES } from '../data';

const ROLE_DESCRIPTIONS: Record<string, string> = {
  "Frontend Engineer & UI Developer": "Progetta e sviluppa l'interfaccia visiva e l'esperienza utente delle applicazioni web, garantendo accessibilità, velocità e interattività fluida.",
  "Frontend Engineer": "Crea la parte visibile delle applicazioni web scrivendo codice pulito, ottimizzato e reattivo per computer e smartphone.",
  "Creative Web Developer": "Combina programmazione avanzata ed estetica artistica per realizzare siti web unici, animati e di grande impatto visivo.",
  "UI/UX Engineer": "Il ponte ideale tra design e sviluppo: crea interfacce digitali intuitive e le trasforma in codice performante.",
  "Sviluppatore Software Full-Stack": "Gestisce l'intera applicazione digitale, lavorando sia sul lato visivo (frontend) sia sulla logica e i server (backend).",
  "Full-Stack Developer": "Sviluppa e connette tutte le parti di un software completo, dall'interfaccia utente fino alla gestione dei database.",
  "Software Architect": "Pianifica e progetta la struttura, la sicurezza e la scalabilità ad alta efficienza di sistemi software complessi.",
  "Data Engineer": "Progetta e mantiene l'infrastruttura di dati, consentendo un flusso organizzato e sicuro di informazioni di valore per l'azienda.",
  "Software Developer Collaborativo": "Scrive programmi integrandosi attivamente con i colleghi, promuovendo comunicazione chiara e buone pratiche nel team.",
  "Software Developer": "Progetta, scrive e corregge codice per creare applicazioni stabili ed efficienti destinate agli utenti.",
  "IT Systems Coordinator": "Supervisiona l'infrastruttura tecnologica aziendale, facilitando l'adozione delle soluzioni migliori per il team.",
  "Technical Consultant": "Fornisce pareri esperti alle aziende per aiutarle a scegliere e implementare le migliori tecnologie sul mercato.",
  "UX Researcher & Interaction Designer": "Studia i bisogni reali degli utenti per disegnare flussi e pulsanti che rendono l'app semplice da usare e priva di stress.",
  "UX Researcher": "Intervista gli utenti e conduce test di usabilità per scoprire come migliorare prodotti digitali e servizi reali.",
  "Product Experience Manager": "Cura l'esperienza complessiva offerta da un prodotto, assicurando l'allineamento tra bisogni del cliente ed evoluzione del software.",
  "Interaction Designer": "Crea le dinamiche di risposta tra l'utente e il prodotto, definendo come gli elementi visivi rispondono ai gesti in modo naturale.",
  "Visual & Product Designer": "Modella l'aspetto grafico e funzionale di un prodotto digitale, allineando utilità pratica e purezza estetica.",
  "Product Designer": "Cura la gestazione e il design di prodotti digitali o fisici, equilibrando bisogni di business, tecnologia ed estetica.",
  "Digital Artist": "Realizza contenuti grafici, illustrazioni ed elementi visivi creativi per arricchire l'universo comunicativo di un brand.",
  "UI Designer": "Disegna layout, schermate, colori, pulsanti e tipografie per rendere le interfacce digitali belle e facili da guardare.",
  "Talent Acquisition & Employee Happiness Lead": "Seleziona i nuovi talenti promuovendo una cultura aziendale sana, distesa e attenta alle emozioni delle persone.",
  "Talent Recruiter": "Cerca e individua le persone giuste per le posizioni aperte, curando la comunicazione e l'empatia durante il processo.",
  "HR Manager": "Coordina il personale aziendale, gestendo con equilibrio contratti, benessere dei dipendenti e carriere interne.",
  "People & Culture Specialist": "Coltiva l'armonia sul posto di lavoro, organizzando percorsi formativi ed eventi per facilitare la cooperazione e l'ascolto.",
  "Business Development & Growth Manager": "Trova nuove opportunità commerciali, definisce partnership strategiche e accelera l'espansione dei servizi sul mercato.",
  "Business Developer": "Sviluppa relazioni commerciali stabili e profittevoli, identificando nuovi clienti e mercati per l'azienda.",
  "Growth Marketer": "Sfrutta dati e canali digitali per testare rapidamente campagne che aumentano la popolarità di un servizio o di un'app.",
  "Startup Operations Specialist": "Gestisce con elasticità e determinazione le attività quotidiane e organizzative di una realtà aziendale emergente.",
  "Operations & Project Manager": "Definisce tempi e risorse per i progetti aziendali di successo, proteggendo il team dal burnout operativo.",
  "Project Manager": "Il direttore delle scadenze: coordina gruppi di lavoro affinché le tappe di un progetto si concludano con precisione.",
  "Operations Specialist": "Ottimizza i processi interni per consentire all'azienda di erogare i propri servizi in modo veloce ed organizzato.",
  "Strategy Consultant": "Aiuta il management aziendale a definire una chiara visione di lungo termine e riforme strategiche solide.",
  "Data Analyst & Research Specialist": "Interpreta trend e statistiche complesse per tradurli in suggerimenti strategici adatti a guidare le scelte del domani.",
  "Data Analyst": "Raccoglie ed elabora report numerici per estrarre informazioni chiave che aiutano le aziende a decidere in modo scientifico.",
  "Market Researcher": "Conduce indagini di mercato per comprendere desideri dei clienti, trend del settore e punti di forza dei concorrenti.",
  "Policy Analyst": "Analizza regole, scenari normativi e direttive legali per valutare l'impatto di nuove riforme sui progetti in corso.",
  "Creative Specialist & Content Strategist": "Definisce la linea editoriale e i formati di comunicazione, facendo leva su contenuti di qualità.",
  "Content Specialist": "Scrive articoli, crea video o post informativi per coinvolgere e istruire il pubblico con semplicità.",
  "Social Media Coordinator": "Organizza e diffonde la voce e la presenza digitale del brand su tutti i principali social network.",
  "Creative Copywriter": "Disegna con le parole messaggi di impatto, slogan pubblicitari e testi capaci di emozionare e convincere chi legge.",
  "HR Consultant & Customer Facilitator": "Assiste le aziende nella selezione interna ed esterna e ne facilita l'assistenza clienti attraverso doti di mediazione empatica.",
  "Customer Success Specialist": "Accompagna i clienti nell'uso di un prodotto, risolvendo difficoltà e migliorando la loro fiducia nel servizio.",
  "HR Consultant": "Consiglia direttori ed uffici HR su come ottimizzare la gestione delle carriere e la felicità dei propri team.",
  "Community Facilitator": "Anima, modera e sostiene gruppi e comunità di professionisti o clienti, tenendo vivo l'interesse e la fiducia reciproca.",
  "Specialista Operativo Multidisciplinare": "Gestisce un ventaglio di attività amministrative ed organizzative con incredibile versatilità ed efficacia.",
  "Operations Associate": "Supporta i flussi di lavoro aziendali quotidiani, garantendo la rapida evasione di ordini e pratiche aperte.",
  "Process Consultant": "Analizza come lavora l'azienda e riduce i passaggi burocratici o lenti, liberando tempo prezioso per le persone.",
  "Administrative Specialist": "Garantisce precisione contabile, organizzazione documentale ordinata e risposte veloci ai partner commerciali."
};

export default function InteractivePrototype() {
  const [isDebugOpen, setIsDebugOpen] = useState<boolean>(false);
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3400); // 3.4 seconds of display, enough to appreciate the fade-in, logo layout, and loader transition
      return () => clearTimeout(timer);
    }
  }, [showSplash]);
  // Navigation states: 
  // 'login_selection' | 'candidate_onboarding' | 'candidate_test' | 'candidate_result' | 'candidate_home' | 'recruiter_home'
  const [appState, setAppState] = useState<string>('login_selection');
  const [candidatePhoto, setCandidatePhoto] = useState<string | null>(null);

   // Candidate DB Profile State
   const [candidateProfile, setCandidateProfile] = useState<{
    name: string;
    surname: string;
    birthDate: string;
    professionalTitle: string;
    matchedTitles: string[];
    profileMatchingFeedback: string;
    email: string;
    summary: string;
    skills: Skill[];
    careerSuggestions: string[];
    psychometrics: PsychometricTrait[];
    avg_anxiety_index: number;
    searchCity: string;
    personalPresentation: string;
  }>({
    name: "",
    surname: "",
    birthDate: "",
    professionalTitle: "",
    matchedTitles: [],
    profileMatchingFeedback: "",
    email: "",
    summary: "",
    skills: [],
    careerSuggestions: [],
    psychometrics: [],
    avg_anxiety_index: 0,
    searchCity: "",
    personalPresentation: ""
  });

  // Home tabs for logged-in Utente: 'work', 'avatar', 'diary', 'chat'
  const [candidateHomeTab, setCandidateHomeTab] = useState<'work' | 'avatar' | 'diary' | 'chat'>('work');

  // Recruiter Company selection & post-job state
  const [selectedRecruiterComp, setSelectedRecruiterComp] = useState<string>('comp-a');
  const [recruiterEmail, setRecruiterEmail] = useState<string>('hr@hexatech.com');
  const [recruiterPassword, setRecruiterPassword] = useState<string>('password123');
  const [recruiterJobForm, setRecruiterJobForm] = useState({
    title: '',
    location: '',
    description: '',
    requiredSkills: ''
  });

  const [recruiterApplications, setRecruiterApplications] = useState<any[]>([
    {
      id: "appl-1",
      companyId: "comp-a", // HexaTech Solutions
      companyName: "HexaTech Solutions",
      jobTitle: "Senior Full-Stack Developer",
      candidateName: "Elisa",
      candidateSurname: "Cascianini",
      professionalTitle: "Humanistic Engineer & Sviluppatrice Full-Stack",
      summary: "Programmatrice appassionata di tecnologia etica. Unisco solida logica backend con un approccio collaborativo orientato al benessere umano.",
      skills: ["React", "TypeScript", "Node.js", "Express", "D3.js", "Empatia"],
      riasecProfile: "S - Sociale (65%), I - Investigativo (55%)",
      replyText: "",
      isReplied: false,
      date: "Oggi, 10:14"
    },
    {
      id: "appl-2",
      companyId: "comp-b", // Synapse Digital
      companyName: "Synapse Digital",
      jobTitle: "AI Product Designer",
      candidateName: "Matteo",
      candidateSurname: "Morelli",
      professionalTitle: "UX Designer & Product Researcher",
      summary: "Uso la ricerca qualitativa e i test di usabilità per progettare flussi inclusivi ed eticamente trasparenti.",
      skills: ["Figma", "User Research", "Inclusività", "Problem Solving Creativo"],
      riasecProfile: "A - Artistico (72%), S - Sociale (48%)",
      replyText: "",
      isReplied: false,
      date: "Ieri, 15:30"
    }
  ]);

  const [activeRecruiterReplyId, setActiveRecruiterReplyId] = useState<string | null>(null);
  const [recruiterFreeTextReply, setRecruiterFreeTextReply] = useState<string>('');

  const handleRecruiterReply = (applId: string, text: string) => {
    if (!text.trim()) return;

    setRecruiterApplications(prev => prev.map(app => {
      if (app.id === applId) {
        return { ...app, isReplied: true, replyText: text };
      }
      return app;
    }));

    const app = recruiterApplications.find(a => a.id === applId);
    if (app) {
      setActiveRecruiterReplyId(null);
      setRecruiterFreeTextReply('');

      triggerToast(
        "Risposta inviata!", 
        `La tua comunicazione è stata trasmessa con successo a ${app.candidateName}.`, 
        "success"
      );

      if (app.candidateName.toLowerCase() === (candidateProfile.name || "elisa").toLowerCase()) {
        const newNotif = {
          id: `rec-reply-${Date.now()}`,
          company: app.companyName,
          role: app.jobTitle,
          type: "post_interview",
          status: "positive",
          bodyText: text,
          date: "Appena adesso"
        };
        setCompanyNotifications(prev => [newNotif, ...prev]);
      }
    }
  };

  // CV parsing loader & inputs
  const [cvInputText, setCvInputText] = useState<string>('');
  const [parsingLoading, setParsingLoading] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [showCvTipsModal, setShowCvTipsModal] = useState<boolean>(false);
  const [showCvCorrectionTipsModal, setShowCvCorrectionTipsModal] = useState<boolean>(false);
  const [uploadedPdfName, setUploadedPdfName] = useState<string | null>(null);
  const [uploadedPdfBase64, setUploadedPdfBase64] = useState<string | null>(null);
  
  // Custom interactive explainer banners
  const [showResponsivenessExplainer, setShowResponsivenessExplainer] = useState<boolean>(false);
  const [showMatchExplainer, setShowMatchExplainer] = useState<boolean>(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState<boolean>(false);
  const [toastNotification, setToastNotification] = useState<{ message: string; subMessage?: string; type: 'success' | 'warning' | 'info' } | null>(null);
  const [applicationSuccessCompany, setApplicationSuccessCompany] = useState<string | null>(null);
  const [resultStep, setResultStep] = useState<'profile_ready' | 'mixing' | 'feedback'>('profile_ready');
  const [mixingStepText, setMixingStepText] = useState<string>('Estrazione dei tratti psicometrici RIASEC...');

  // Mirea AI Psychological Support States
  const [openMireaSupport, setOpenMireaSupport] = useState<boolean>(false);
  const [mireaSessionStep, setMireaSessionStep] = useState<'disclaimer' | 'chat'>('disclaimer');
  const [supportInput, setSupportInput] = useState<string>('');
  const [isRecordingSupportVocal, setIsRecordingSupportVocal] = useState<boolean>(false);
  const [supportRecordingSeconds, setSupportRecordingSeconds] = useState<number>(0);
  const [supportVocalPlayingId, setSupportVocalPlayingId] = useState<string | null>(null);
  const [supportMessages, setSupportMessages] = useState<Array<{
    id: string;
    sender: 'user' | 'assistant';
    text?: string;
    isVocal?: boolean;
    duration?: string;
    timestamp: string;
  }>>([]);
  const [isSupportTyping, setIsSupportTyping] = useState<boolean>(false);

  // Vocal recording timer effect
  useEffect(() => {
    let interval: any = null;
    if (isRecordingSupportVocal) {
      interval = setInterval(() => {
        setSupportRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setSupportRecordingSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecordingSupportVocal]);
  
  const triggerToast = (message: string, subMessage?: string, type: 'success' | 'warning' | 'info' = 'success') => {
    setToastNotification({ message, subMessage, type });
    setTimeout(() => {
      setToastNotification(prev => {
        if (prev?.message === message) {
          return null;
        }
        return prev;
      });
    }, 4500);
  };
  const [tempName, setTempName] = useState<string>('');
  const [tempSurname, setTempSurname] = useState<string>('');
  const [tempBirthDate, setTempBirthDate] = useState<string>('');
  const [tempSearchCity, setTempSearchCity] = useState<string>('');
  const [tempEmail, setTempEmail] = useState<string>('');
  const [tempSummary, setTempSummary] = useState<string>('');

  // Psychometric Game / Scenario States
  const [showTestIntro, setShowTestIntro] = useState<boolean>(true);
  const [gameStep, setGameStep] = useState<number>(0);
  const [gameAnswers, setGameAnswers] = useState<number[]>([]);
  
  const gameScenarios = [
    {
      category: "R - Realistico (I Pratici)",
      q: "Quando affronti un problema, preferisci risolverlo agendo concretamente con le mani o con strumenti pratici, piuttosto che scriverci sopra una relazione?",
      options: [
        { text: "A: Sì, ho bisogno di vedere subito un risultato pratico e tangibile.", score: 95 },
        { text: "B: Dipende dalla situazione, ma preferisco l'azione alla teoria.", score: 75 },
        { text: "C: No, preferisco pianificare, scrivere o analizzare prima di fare qualunque cosa.", score: 55 }
      ]
    },
    {
      category: "R - Realistico (I Pratici)",
      q: "Ti sentiresti a tuo agio in un lavoro che richiede di muoversi, stare all'aperto o creare oggetti fisici e digitali visibili?",
      options: [
        { text: "A: Assolutamente sì, l'idea di stare ferma a una scrivania tutto il giorno mi spaventa.", score: 95 },
        { text: "B: Mi piacerebbe un equilibrio tra lavoro dinamico e lavoro d'ufficio.", score: 75 },
        { text: "C: Preferisco un ambiente d'ufficio stabile, strutturato e tranquillo.", score: 55 }
      ]
    },
    {
      category: "I - Investigativo (I Pensatori)",
      q: "Ti capita spesso di voler scavare a fondo nei problemi, analizzando dati o concetti complessi per capire il perché nascosto delle cose?",
      options: [
        { text: "A: Sì, non mi fermo mai alla superficie e amo indagare i dettagli.", score: 95 },
        { text: "B: Lo faccio se l'argomento mi appassiona particolarmente.", score: 75 },
        { text: "C: No, preferisco concentrarmi sulle soluzioni pratiche ed immediate.", score: 55 }
      ]
    },
    {
      category: "I - Investigativo (I Pensatori)",
      q: "Trovi stimolante passare ore a fare ricerca, collegare idee astratte o formulare ipotesi per risolvere un enigma teorico?",
      options: [
        { text: "A: Moltissimo, la ricerca intellettuale e lo studio mi rigenerano.", score: 95 },
        { text: "B: Mi piace la ricerca, purché abbia una rapida applicazione nel mondo reale.", score: 75 },
        { text: "C: Trovo questo tipo di attività faticosa e poco produttiva.", score: 55 }
      ]
    },
    {
      category: "A - Artistico (I Creativi)",
      q: "Ti senti soffocare se devi seguire regole troppo rigide o schemi fissi? Preferisci inventare il tuo modo di fare le cose?",
      options: [
        { text: "A: Sì, ho bisogno di flessibilità e di esprimere la mia originalità.", score: 95 },
        { text: "B: Riesco ad adattarmi alle regole, ma cerco sempre uno spazio di manovra personale.", score: 75 },
        { text: "C: No, le regole e le procedure chiare mi danno sicurezza e mi aiutano a lavorare meglio.", score: 55 }
      ]
    },
    {
      category: "A - Artistico (I Creativi)",
      q: "Hai bisogno che il tuo lavoro rifletta la tua sensibilità, la tua estetica o la tua capacità di comunicare in modo originale ed emotivo?",
      options: [
        { text: "A: È fondamentale, non potrei fare un lavoro privo di una componente espressiva.", score: 95 },
        { text: "B: È importante, ma posso mettere la mia creatività anche in compiti più standard.", score: 75 },
        { text: "C: No, preferisco che il lavoro sia basato su fatti oggettivi e criteri logici.", score: 55 }
      ]
    },
    {
      category: "S - Sociale (Gli Aiutanti)",
      q: "In un gruppo, sei la persona a cui gli altri si affidano naturalmente per sfogarsi, cercare consigli o trovare un punto d'incontro pacifico?",
      options: [
        { text: "A: Sì, mi viene naturale mettermi nei panni degli altri e ascoltarli.", score: 95 },
        { text: "B: Succede a volte, soprattutto con i colleghi o gli amici più stretti.", score: 75 },
        { text: "C: Di solito preferisco concentrarmi sui compiti da svolgere piuttosto che sulle dinamiche interpersonali.", score: 55 }
      ]
    },
    {
      category: "S - Sociale (Gli Aiutanti)",
      q: "Ti dà un senso di profonda gratificazione sapere che il tuo lavoro quotidiano sta migliorando direttamente la vita o il benessere di un'altra persona?",
      options: [
        { text: "A: Sì, è la motivazione principale che cerco in una carriera.", score: 95 },
        { text: "B: È un aspetto positivo, ma valuto anche altri fattori come la crescita professionale.", score: 75 },
        { text: "C: Mi gratifica di più raggiungere obiettivi tecnici, economici o di efficienza.", score: 55 }
      ]
    },
    {
      category: "E - Intraprendente (I Persuasori)",
      q: "Se c'è da prendere in mano una situazione o lanciare una nuova iniziativa, ti viene naturale guidare il gruppo e motivare gli altri a seguirti?",
      options: [
        { text: "A: Sì, mi piace prendere l'iniziativa e assumersi la responsabilità delle decisioni.", score: 95 },
        { text: "B: Posso farlo se nessuno si fa avanti, ma non lo cerco attivamente.", score: 75 },
        { text: "C: Preferisco che sia qualcun altro a guidare, io mi occupo della mia parte.", score: 55 }
      ]
    },
    {
      category: "E - Intraprendente (I Persuasori)",
      q: "Ti affascina l'idea di vendere un'idea, negoziare, parlare in pubblico o assumerti la responsabilità di un progetto importante?",
      options: [
        { text: "A: Sì, trovo queste sfide stimolanti e piene di adrenalina.", score: 95 },
        { text: "B: Mi piace l'idea di gestire progetti, ma preferisco evitare l'esposizione pubblica o la negoziazione diretta.", score: 75 },
        { text: "C: No, preferisco ruoli specialistici e con meno pressione competitiva.", score: 55 }
      ]
    },
    {
      category: "C - Convenzionale (Gli Organizzatori)",
      q: "Trovi una sensazione di calma e controllo nel riorganizzare dati, catalogare informazioni o seguire passaggi metodici e ben strutturati?",
      options: [
        { text: "A: Sì, l'ordine e la precisione mi trasmettono serenità.", score: 95 },
        { text: "B: Mi piace l'organizzazione, ma mantengo un certo margine di tolleranza per il disordine.", score: 75 },
        { text: "C: No, trovo le attività ripetitive o di catalogazione estremamente noiose.", score: 55 }
      ]
    },
    {
      category: "C - Convenzionale (Gli Organizzatori)",
      q: "Preferisci ricevere linee guida chiare e scadenze precise su cui lavorare in autonomia, piuttosto che muoverti nel caos dell'incertezza?",
      options: [
        { text: "A: Assolutamente sì, l'ambiguità sui compiti da svolgere mi blocca.", score: 95 },
        { text: "B: Mi piacciono le linee guida, ma apprezzo anche una quota di imprevisto o autonomia totale.", score: 75 },
        { text: "C: Preferisco definire da sola i miei obiettivi e i miei tempi, l'incertezza non mi spaventa.", score: 55 }
      ]
    },
    {
      category: "Mobilità Geografica",
      q: "Come consideri l'idea di viaggiare frequentemente o di trasferirti per motivi di lavoro?",
      options: [
        { text: "A: Lo vedo come uno stimolo e un'opportunità di crescita a cui non vorrei rinunciare.", score: 95 },
        { text: "B: Sono disponibile a viaggiare occasionalmente, ma ho bisogno di mantenere una base stabile per i miei affetti.", score: 75 },
        { text: "C: Preferisco una posizione stabile nella mia città; la routine e la vicinanza ai miei punti di riferimento sono fondamentali per il mio benessere.", score: 55 }
      ]
    },
    {
      category: "Gestione dello Stress (AI Coach Calibration)",
      q: "Quando vivi un periodo di forte pressione o stress nello studio o nel lavoro, riesci a non farlo pesare sulla tua vita privata?",
      options: [
        { text: "A: Sì, riesco a staccare mentalmente e a proteggere i miei spazi personali e il mio tempo libero.", score: 95 },
        { text: "B: Faccio fatica, a volte i pensieri legati ai doveri compromettono il mio sonno o i miei momenti di relax.", score: 75 },
        { text: "C: No, lo stress assorbe quasi totalmente le mie energie, portandomi a ripensare continuamente ai problemi anche quando sono in famiglia o con gli amici.", score: 55 }
      ]
    }
  ];

  // Chatbot states
  const [chatMode, setChatMode] = useState<'interview' | 'empathy' | 'general'>('general');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>('');
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  // Diary and Interviews
  const [diaryNotes, setDiaryNotes] = useState<DiaryNote[]>(INITIAL_DIARY);
  const [newNoteTitle, setNewNoteTitle] = useState<string>('');
  const [newNoteContent, setNewNoteContent] = useState<string>('');
  const [newNoteAnxiety, setNewNoteAnxiety] = useState<number>(4);
  const [newNoteInterviewCo, setNewNoteInterviewCo] = useState<string>('');
  const [newNoteInterviewDate, setNewNoteInterviewDate] = useState<string>('');
  const [isInterviewReminder, setIsInterviewReminder] = useState<boolean>(false);
  const [showAddNote, setShowAddNote] = useState<boolean>(false);

  // Implicit Android Intents simulation
  const [activeIntentPopup, setActiveIntentPopup] = useState<{
    type: 'calendar' | 'share';
    title: string;
    description: string;
    data: any;
  } | null>(null);

  // General Simulation states
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(INITIAL_JOBS);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(INITIAL_JOBS[0]);
  const [showJobsList, setShowJobsList] = useState<boolean>(true);
  const [showCalendar, setShowCalendar] = useState<boolean>(true);
  const [candidateSubPage, setCandidateSubPage] = useState<'home' | 'jobs' | 'calendar' | 'notifications'>('home');
  const [companyNotifications, setCompanyNotifications] = useState<any[]>([
    {
      id: "notif-1",
      company: "HexaTech Solutions",
      role: "Senior Full-Stack Developer",
      type: "post_interview",
      status: "positive",
      bodyText: "Ciao Elisa, l'intervista tecnica di ieri è andata alla perfezione! Siamo rimasti colpiti e affascinati dalle tue risposte reali e dal forte allineamento sulle soft skill. Vorremmo invitarti ad accedere alla fase di colloquio finale con il nostro Board la prossima settimana.",
      date: "Oggi, 11:30"
    },
    {
      id: "notif-2",
      company: "Aether Cloud",
      role: "Cloud Infrastructure Architect",
      type: "cv_review",
      status: "negative",
      bodyText: "Gentile Elisa, ti ringraziamo molto per l'invio del tuo CV adattivo. Purtroppo per la posizione corrente richiediamo competenze sistemistiche avanzate sui cluster distribuiti più complesse di quelle documentate. Conserveremo il tuo profilo con molto piacere per le prossime selezioni.",
      date: "Ieri, 16:45"
    },
    {
      id: "notif-3",
      company: "Synapse Digital",
      role: "AI Product Designer",
      type: "cv_review",
      status: "positive",
      bodyText: "Ciao Elisa! Abbiamo analizzato il tuo curriculum vitae unito ai tratti RIASEC dal test di orientamento Mirea. Troviamo eccezionale la tua combinazione di sensibilità umana e doti grafiche. Ti andrebbe di fare due chiacchiere informali lunedì alle 14:00?",
      date: "10 giu, 10:15"
    }
  ]);
  const [activeReplyNotifId, setActiveReplyNotifId] = useState<string | null>(null);
  const [replyInputText, setReplyInputText] = useState<string>('');
  const [activeFeedbackNotifId, setActiveFeedbackNotifId] = useState<string | null>(null);
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackComment, setFeedbackComment] = useState<string>('');
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState<boolean>(false);
  const [penaltyLog, setPenaltyLog] = useState<string[]>(["Patto di Responsabilità (Shadow Ban Engine) attivo."]);
  const [selectedRoleExplainName, setSelectedRoleExplainName] = useState<string | null>(null);

  // Avatar Mirea comforting quotes, breathing states
  const [avatarSpeech, setAvatarSpeech] = useState<string>("Ciao! Sono Mirea, la tua alleata e la tua guida fidata. Fai un respiro profondo con me. Sei infinitamente più importante di un semplice curriculum!");
  const [breathingState, setBreathingState] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [breathingTimer, setBreathingTimer] = useState<number>(0);

  // Breathing Loop simulation effect
  useEffect(() => {
    let interval: any;
    if (breathingState !== 'idle') {
      interval = setInterval(() => {
        setBreathingTimer(t => {
          if (t >= 3) {
            // cycle: inhale (0-3) -> hold (4-6) -> exhale (7-9) -> inhale
            if (breathingState === 'inhale') {
              setBreathingState('hold');
              setAvatarSpeech("Trattieni il respiro... percepisci la quiete.");
            } else if (breathingState === 'hold') {
              setBreathingState('exhale');
              setAvatarSpeech("Espira lentamente... lascia andare l'ansia.");
            } else {
              setBreathingState('inhale');
              setAvatarSpeech("Inspira... accogli energia e fiducia.");
            }
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingState]);

  // Start breathing exercise helper
  const startBreathing = () => {
    setBreathingState('inhale');
    setBreathingTimer(0);
    setAvatarSpeech("Inspira con me... raccogli calma interiore.");
  };

  const stopBreathing = () => {
    setBreathingState('idle');
    setAvatarSpeech("Ottimo lavoro. Ricorda che la tua salute mentale conta più di qualsiasi scadenza lavorativa.");
  };

  // Preset loading helpers (Onboarding helper)
  const handleLoadPresetCV = (text: string) => {
    setCvInputText(text);
    setUploadedPdfName(null);
    setUploadedPdfBase64(null);
  };

  // Drag and drop events for real PDF files
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const processPdfFile = (file: File) => {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      alert("Seleziona o trascina un file in formato PDF.");
      return;
    }
    setUploadedPdfName(file.name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      if (base64String) {
        const parts = base64String.split(",");
        const rawBase64 = parts[1] || parts[0];
        setUploadedPdfBase64(rawBase64);
        setCvInputText(`[File PDF Caricato]: ${file.name}`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processPdfFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processPdfFile(file);
    } else {
      setCvInputText(PRESET_RESUMES[0].text);
      setUploadedPdfName(null);
      setUploadedPdfBase64(null);
    }
  };

  // Algorithm to compute Professional Title based on Psychometrics + CV Text
  const calculateProfessionalTitle = (nome: string, textCV: string, answerScores: number[]) => {
    const raw = (textCV + " " + nome).toLowerCase();
    
    // Base area
    let area = "Specialista";
    if (raw.includes("react") || raw.includes("typescript") || raw.includes("code") || raw.includes("web") || raw.includes("developer")) {
      area = "Software Alchemist & Dev";
    } else if (raw.includes("design") || raw.includes("figma") || raw.includes("ux") || raw.includes("ui")) {
      area = "Interaction Designer Empatico";
    } else if (raw.includes("talent") || raw.includes("hr") || raw.includes("comm") || raw.includes("people")) {
      area = "Harmonic Talent Specialist";
    } else if (raw.includes("cloud") || raw.includes("docker") || raw.includes("architect")) {
      area = "Cloud System Guardian";
    }

    // Dynamic Modifier based on test answers (representing human qualities)
    const avgScore = answerScores.length > 0 ? (answerScores.reduce((a, b) => a + b, 0) / answerScores.length) : 75;
    
    let modifier = "Adattabile";
    if (avgScore >= 85) {
      modifier = "Ad Alto Impatto Umano";
    } else if (avgScore >= 70) {
      modifier = "Liquido-Collaborativo";
    } else {
      modifier = "Analitico Riflessivo";
    }

    return `${area} ${modifier}`;
  };

  // Submits onboarding form 
  const submitOnboardingForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateProfile.name || !candidateProfile.surname || !candidateProfile.birthDate) {
      return;
    }
    // Proceed directly to the interactive psychometric test
    setGameStep(0);
    setGameAnswers([]);
    setShowTestIntro(true);
    setAppState('candidate_test');
  };

  // Complete psychometric test scenario
  const handleTestOptionClick = (score: number) => {
    const nextAnswers = [...gameAnswers, score];
    setGameAnswers(nextAnswers);

    if (gameStep < gameScenarios.length - 1) {
      setGameStep(gameStep + 1);
    } else {
      // Calculate final results
      triggerFinalProfiling(nextAnswers);
    }
  };

  // Triggering CV parsing + test integration to output assigned professional title
  const triggerFinalProfiling = async (answers: number[]) => {
    setAppState('candidate_result');
    setResultStep('profile_ready');
    setParsingLoading(false);

    // High fidelity local analysis algorithm defined inline as ultimate local fallback
    const calculateLocalProfileFallback = (textCV: string, answerScores: number[]) => {
      const cleanInput = textCV.toLowerCase();
      
      const rScore = answerScores.length >= 2 ? ((answerScores[0] || 75) + (answerScores[1] || 75)) / 2 : 75;
      const iScore = answerScores.length >= 4 ? ((answerScores[2] || 75) + (answerScores[3] || 75)) / 2 : 75;
      const aScore = answerScores.length >= 6 ? ((answerScores[4] || 75) + (answerScores[5] || 75)) / 2 : 75;
      const sScore = answerScores.length >= 8 ? ((answerScores[6] || 75) + (answerScores[7] || 75)) / 2 : 75;
      const eScore = answerScores.length >= 10 ? ((answerScores[8] || 75) + (answerScores[9] || 75)) / 2 : 75;
      const cScore = answerScores.length >= 12 ? ((answerScores[10] || 75) + (answerScores[11] || 75)) / 2 : 75;
      const stressScore = answerScores[13] || 75;

      const profiles = [
        { name: "R", score: rScore },
        { name: "I", score: iScore },
        { name: "A", score: aScore },
        { name: "S", score: sScore },
        { name: "E", score: eScore },
        { name: "C", score: cScore }
      ];
      profiles.sort((a, b) => b.score - a.score);
      const primaryId = profiles[0].name;
      const secondaryId = profiles[1].name;

      let hasTech = cleanInput.includes("react") || cleanInput.includes("typescript") || cleanInput.includes("code") || cleanInput.includes("web") || cleanInput.includes("developer") || cleanInput.includes("sviluppatore") || cleanInput.includes("programmatore") || cleanInput.includes("python") || cleanInput.includes("backend");
      let hasDesign = cleanInput.includes("design") || cleanInput.includes("figma") || cleanInput.includes("ux") || cleanInput.includes("ui") || cleanInput.includes("grafic") || cleanInput.includes("psd");
      let hasHR = cleanInput.includes("hr") || cleanInput.includes("human resources") || cleanInput.includes("risorse umane") || cleanInput.includes("recruiter") || cleanInput.includes("talent") || cleanInput.includes("psicolog");
      let hasBusiness = cleanInput.includes("manager") || cleanInput.includes("progett") || cleanInput.includes("sales") || cleanInput.includes("commerciale") || cleanInput.includes("marketing") || cleanInput.includes("business");

      let pTitle = "";
      let mTitles: string[] = [];
      let pSkills: Skill[] = [];
      let fback = "";

      if (hasTech) {
        pSkills = [
          { name: "TypeScript & React", category: "hard", description: "Progettazione di componenti riusabili e logica applicativa robusta.", rating: 90 },
          { name: "Node.js & Express", category: "hard", description: "Creazione di API RESTful e gestione del database in modo modulare.", rating: 85 },
          { name: "Problem Solving Algoritmico", category: "creative", description: "Scomposizione di problemi complessi in passi logici eleganti.", rating: 92 },
          { name: "Collaborazione Agile", category: "soft", description: "Partecipazione proattiva ai rituali Scrum e allineamento emotivo col team.", rating: 80 }
        ];
        if (primaryId === "A" || secondaryId === "A") {
          pTitle = "Frontend Engineer & UI Developer";
          mTitles = ["Frontend Engineer", "Creative Web Developer", "UI/UX Engineer"];
          fback = "La tua forte vena Creativa (modulo Artistico) unita alle solide competenze tecniche nel tuo CV evidenzia un profilo ideale per dare vita a interfacce web stupende ed interattive. Sei la figura che trasforma il design astratto in codice fluido!";
        } else if (primaryId === "I" || secondaryId === "I") {
          pTitle = "Sviluppatore Software Full-Stack";
          mTitles = ["Full-Stack Developer", "Software Architect", "Data Engineer"];
          fback = "La tua spiccata propensione Investigativa e la maestria tecnica nel codice ti portano naturalmente ad eccellere nello studio di architetture solide e nella risoluzione di bug complessi. Ami scalare i sistemi e risolvere enigmi logici strutturati.";
        } else {
          pTitle = "Software Developer Collaborativo";
          mTitles = ["Software Developer", "IT Systems Coordinator", "Technical Consultant"];
          fback = "Unisci le competenze informatiche a tratti organizzativi ed empatici. Questo ti rende eccezionale sia nello sviluppo che nel coordinamento di team tecnici intermedi.";
        }
      } else if (hasDesign) {
        pSkills = [
          { name: "UI/UX Design", category: "hard", description: "Creazione di interfacce digitali con forte cura dell'accessibilità e dell'esperienza utente.", rating: 93 },
          { name: "Figma & Wireframing", category: "hard", description: "Progettazione di prototipi interattivi ad alta fedeltà.", rating: 90 },
          { name: "Creative Experience Mapping", category: "creative", description: "Capacità di mappare flussi complessi con pensiero laterale.", rating: 88 },
          { name: "Ascolto Empatico", category: "soft", description: "Ascolto sensibile del feedback degli utenti per migliorare il prodotto.", rating: 95 }
        ];
        if (primaryId === "S" || secondaryId === "S") {
          pTitle = "UX Researcher & Interaction Designer";
          mTitles = ["UX Researcher", "Product Experience Manager", "Interaction Designer"];
          fback = "Il tuo test rivela una forte componente Sociale ed Empatica, che abbinata alle tue eccellenti doti di design sul CV, ti porta ad essere insostituibile nel ruolo di UX Researcher. Capisci i dolori degli utenti e li traduci in flussi visivi limpidi.";
        } else {
          pTitle = "Visual & Product Designer";
          mTitles = ["Product Designer", "Digital Artist", "UI Designer"];
          fback = "La forte attitudine Artistica del tuo test psicometrico si sposa in sinergia col tuo portfolio di Design sui canali digitali. Sei orientato all'estetica d'impatto e alla purezza della user experience.";
        }
      } else if (hasHR) {
        pSkills = [
          { name: "Talent Acquisition", category: "hard", description: "Strategie di recruiting e selezione incentrate sulle soft skill.", rating: 88 },
          { name: "Corporate Counseling", category: "soft", description: "Ascolto attivo e mediazione dei conflitti aziendali.", rating: 92 },
          { name: "Progettazione Percorsi Formativi", category: "creative", description: "Creazione di modalità d'apprendimento su misura.", rating: 85 }
        ];
        pTitle = "Talent Acquisition & Employee Happiness Lead";
        mTitles = ["Talent Recruiter", "HR Manager", "People & Culture Specialist"];
        fback = "La forte spinta Sociale riscontrata nel tuo test si rispecchia meravigliosamente nell'esperienza in Risorse Umane presente nel tuo CV. Sei una figura chiave per attrarre talenti e coltivare un ambiente lavorativo sano, inclusivo e rilassante, riducendo l'ansia di chi si candida.";
      } else if (hasBusiness) {
        pSkills = [
          { name: "Project Management", category: "hard", description: "Pianificazione strategica delle milestone e allocazione risorse.", rating: 85 },
          { name: "Business Negotiation", category: "hard", description: "Negoziazione di proposte commerciali e allineamento di partnership.", rating: 80 },
          { name: "Growth Strategy", category: "creative", description: "Analisi di mercato per scoprire opportunità di posizionamento.", rating: 88 },
          { name: "Public Speaking", category: "soft", description: "Presentazione efficace e collaborazione aziendale.", rating: 90 }
        ];
        if (primaryId === "E" || secondaryId === "E") {
          pTitle = "Business Development & Growth Manager";
          mTitles = ["Business Developer", "Growth Marketer", "Startup Operations Specialist"];
          fback = "L'animo Intraprendente ed energico emerso dal test psicometrico cavalca perfettamente la tua esperienza commerciale e manageriale. Ami governare i cambiamenti, negoziare accordi e spingere l'azienda verso nuovi orizzonti competitivi.";
        } else {
          pTitle = "Operations & Project Manager";
          mTitles = ["Project Manager", "Operations Specialist", "Strategy Consultant"];
          fback = "La tua spiccata abilità Organizzativa (tratto Convenzionale) e le competenze manageriali ti qualificano come un eccezionale Project Manager in grado di domare il caos operativo con precisione e calma.";
        }
      } else {
        pSkills = [
          { name: "Analisi di Scenari", category: "soft", description: "Scrutinio attento delle dinamiche lavorative alla ricerca di miglioramenti.", rating: 85 },
          { name: "Problem Solving Adattivo", category: "creative", description: "Adattamento rapido a piattaforme o linee guida nuove.", rating: 88 },
          { name: "Gestione del Tempo", category: "hard", description: "Capacità organizzative applicate a flussi complessi.", rating: 80 }
        ];
        if (primaryId === "I" || secondaryId === "I") {
          pTitle = "Data Analyst & Research Specialist";
          mTitles = ["Data Analyst", "Market Researcher", "Policy Analyst"];
          fback = "Grazie alla tua profonda indole Investigativa (i Pensatori), ami sviscerare problemi complessi e connettere puntini invisibili a molti. Nel tuo curriculum emerge un'accuratezza metodica ideale per ruoli analitici e quantitativi.";
        } else if (primaryId === "A" || secondaryId === "A") {
          pTitle = "Creative Specialist & Content Strategist";
          mTitles = ["Content Specialist", "Social Media Coordinator", "Creative Copywriter"];
          fback = "Sotto la spinta di una forte inclinazione Artistica, rifiuti gli schemi rigidi per dare spazio a idee originali ed accattivanti. Mirea ha rilevato che le tue competenze si abbinano a ruoli di comunicazione e creazione di valore visivo.";
        } else if (primaryId === "S" || secondaryId === "S") {
          pTitle = "HR Consultant & Customer Facilitator";
          mTitles = ["Customer Success Specialist", "HR Consultant", "Community Facilitator"];
          fback = "Sei dominato dal profilo Sociale: per te le persone e il loro benessere sono al primo posto. Il tuo curriculum bilancia la tua predisposizione interpersonale rendendoti un profilo ideale per unire e coordinare dinamiche relazionali ricche.";
        } else {
          pTitle = "Specialista Operativo Multidisciplinare";
          mTitles = ["Operations Associate", "Process Consultant", "Administrative Specialist"];
          fback = "Il tuo profilo risalta per precisione organizzativa (Convenzionale) ed efficienza pratica. Sai definire flussi lineari e ordinati, proteggendo il tuo benessere e quello dei tuoi collaboratori.";
        }
      }

      return {
        professionalTitle: pTitle,
        matchedTitles: mTitles,
        profileMatchingFeedback: fback,
        skills: pSkills,
        summary: `Profilo di spicco calibrato su un indice di resilienza all'ansia del ${stressScore}%. Combina in modo armonico ed integrato l'esperienza del curriculum con le risposte del test psicometrico.`,
        careerPathSuggestions: mTitles
      };
    };

    try {
      // Trigger API fetch for CV parser OR local parsing fallback
      let parsedSkills: Skill[] = [];
      let summaryText = "";
      let careerSuggs: string[] = [];
      let primaryTitle = "";
      let matchedTitlesList: string[] = [];
      let matchesFeedback = "";

      if (cvInputText.trim() || uploadedPdfBase64) {
        const response = await fetch("/api/parse-cv", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            cvText: cvInputText,
            cvBase64: uploadedPdfBase64,
            mimeType: "application/pdf",
            answers: answers
          })
        });
        if (response.ok) {
          const data = await response.json();
          parsedSkills = data.skills || [];
          summaryText = data.summary || "";
          careerSuggs = data.careerPathSuggestions || [];
          primaryTitle = data.professionalTitle || "";
          matchedTitlesList = data.matchedTitles || [];
          matchesFeedback = data.profileMatchingFeedback || "";
        }
      }

      // If network failed or no CV input text or incomplete result, fallback with high-fidelity local profiling
      if (parsedSkills.length === 0 || !primaryTitle) {
        const localData = calculateLocalProfileFallback(cvInputText, answers);
        parsedSkills = localData.skills;
        summaryText = localData.summary;
        careerSuggs = localData.careerPathSuggestions;
        primaryTitle = localData.professionalTitle;
        matchedTitlesList = localData.matchedTitles;
        matchesFeedback = localData.profileMatchingFeedback;
      }

      // Construct psychometric traits scores
      const avgGame = answers.reduce((a, b) => a + b, 0) / answers.length;
      const openness = Math.round(avgGame * 1.02);
      const cooperation = Math.round(avgGame * 1.08);
      const resilience = Math.round(avgGame * 0.95);

      const computedTraits: PsychometricTrait[] = [
        { name: "Apertura Mentale", score: Math.min(100, openness), description: "Predisposizione alle sfide ed innovazione fluida." },
        { name: "Cooperatività Empatica", score: Math.min(100, cooperation), description: "Capacità spontanea d'alleviare e fare squadra." },
        { name: "Resilienza all'Ansia", score: Math.min(100, resilience), description: "Capacità di assorbire dinamicamente ritardi e risposte." }
      ];

      setCandidateProfile(prev => ({
        ...prev,
        professionalTitle: primaryTitle,
        matchedTitles: matchedTitlesList.length > 0 ? matchedTitlesList : [primaryTitle],
        profileMatchingFeedback: matchesFeedback,
        skills: parsedSkills,
        summary: summaryText,
        careerSuggestions: careerSuggs,
        psychometrics: computedTraits
      }));

    } catch (err) {
      console.error(err);
      // Fallback in catch block
      const localData = calculateLocalProfileFallback(cvInputText, answers);
      setCandidateProfile(prev => ({
        ...prev,
        professionalTitle: localData.professionalTitle,
        matchedTitles: localData.matchedTitles,
        profileMatchingFeedback: localData.profileMatchingFeedback,
        skills: localData.skills,
        summary: localData.summary,
        careerSuggestions: localData.careerPathSuggestions,
        psychometrics: [
          { name: "Apertura Mentale", score: 80, description: "Predisposizione alle sfide ed innovazione fluida." },
          { name: "Cooperatività Empatica", score: 85, description: "Capacità spontanea d'alleviare e fare squadra." },
          { name: "Resilienza all'Ansia", score: 75, description: "Capacità di assorbire dinamicamente ritardi e risposte." }
        ]
      }));
    } finally {
      setParsingLoading(false);
    }
  };

  // Handles the mixing flow between test completion and main home access
  const handleProceedToMixing = () => {
    setResultStep('feedback');
  };

  // Helper: compute dynamic match percentage 
  const getJobMatchPercent = (job: JobPosting) => {
    // Math matching based on skills we parsed
    const matched = job.requiredSkills.filter(req => 
      candidateProfile.skills.some(cs => cs.name.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(cs.name.toLowerCase()))
    ).length;
    
    // and title modifier
    let bonus = 0;
    if (candidateProfile.professionalTitle.toLowerCase().includes("designer") && job.title.toLowerCase().includes("design")) {
      bonus = 15;
    } else if (candidateProfile.professionalTitle.toLowerCase().includes("software") && job.title.toLowerCase().includes("developer")) {
      bonus = 15;
    } else if (candidateProfile.professionalTitle.toLowerCase().includes("talent") && job.title.toLowerCase().includes("talent")) {
      bonus = 15;
    }

    // Add unique offsets to vary the output percentages naturally
    let baseOffset = 0;
    if (job.id === "job-1") baseOffset = 18;
    else if (job.id === "job-2") baseOffset = 8;
    else if (job.id === "job-3") baseOffset = -4;
    else if (job.id === "job-4") baseOffset = -12;
    else {
      const hash = job.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      baseOffset = (hash % 15) - 7;
    }

    const calculated = Math.round((matched / Math.max(1, job.requiredSkills.length)) * 65) + 60 + baseOffset + bonus;
    return Math.min(99, Math.max(35, calculated));
  };

  // Recruiter: add custom job posting dynamically
  const handleRecruiterPostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recruiterJobForm.title || !recruiterJobForm.location || !recruiterJobForm.description) return;

    const skillsArr = recruiterJobForm.requiredSkills.split(',').map(s => s.trim()).filter(Boolean);

    const companyNames: Record<string, string> = {
      'comp-a': 'HexaTech Solutions',
      'comp-b': 'Synapse Digital',
      'comp-c': 'Aether Cloud',
      'comp-d': 'Delta Group'
    };

    const newJob: JobPosting = {
      id: `job-${Date.now()}`,
      title: recruiterJobForm.title,
      company: companyNames[selectedRecruiterComp] || "Azienda Partner",
      companyId: selectedRecruiterComp,
      location: recruiterJobForm.location,
      description: recruiterJobForm.description,
      requiredSkills: skillsArr.length > 0 ? skillsArr : ["TypeScript", "Sviluppo Liquido", "Empatia"],
      responsivenessScore: 92,
      publishDate: new Date().toISOString().split('T')[0],
      ttlRemainingHours: 48,
      status: 'active'
    };

    setJobPostings([newJob, ...jobPostings]);
    setPenaltyLog(prev => [`[Recruiter]: Pubblicata nuova offerta "${newJob.title}" presso ${newJob.company}.`, ...prev]);
    
    // Auto-generate candidate applications for this posted job so they appear in Recruiter's notifications
    const simulatedApp = {
      id: `appl-sim-${Date.now()}`,
      companyId: selectedRecruiterComp,
      companyName: companyNames[selectedRecruiterComp] || "Azienda Partner",
      jobTitle: newJob.title,
      candidateName: "Francesca",
      candidateSurname: "Vanni",
      professionalTitle: `Specialista Jr in ${newJob.title}`,
      summary: `Ho letto la vostra nuova offerta etica e mi rispecchia moltissimo. Ho maturato un anno di esperienza nel settore unendo sensibilità e competenza.`,
      skills: skillsArr.length > 0 ? skillsArr.slice(0, 3) : ["React", "TypeScript", "Problem Solving"],
      riasecProfile: "I - Investigativo (60%), A - Artistico (52%)",
      replyText: "",
      isReplied: false,
      date: "Appena adesso"
    };

    const actualCandidateApp = {
      id: `appl-actual-${Date.now()}`,
      companyId: selectedRecruiterComp,
      companyName: companyNames[selectedRecruiterComp] || "Azienda Partner",
      jobTitle: newJob.title,
      candidateName: candidateProfile.name || "Elisa",
      candidateSurname: candidateProfile.surname || "Cascianini",
      professionalTitle: candidateProfile.professionalTitle || "Humanistic Sviluppatore React",
      summary: candidateProfile.personalPresentation || "Sviluppatrice orientata all'etica, all'inclusione e al benessere personale.",
      skills: candidateProfile.skills.map(s => s.name).length > 0 ? candidateProfile.skills.map(s => s.name) : ["React", "TypeScript", "Empatia"],
      riasecProfile: candidateProfile.matchedTitles && candidateProfile.matchedTitles.length > 0
        ? `Profilo RIASEC di ${candidateProfile.name || "Elisa"}`
        : "S - Sociale (65%), I - Investigativo (55%)",
      replyText: "",
      isReplied: false,
      date: "Appena adesso",
      isLoggedCandidate: true
    };

    setRecruiterApplications(prev => [actualCandidateApp, simulatedApp, ...prev]);

    // Reset form
    setRecruiterJobForm({ title: '', location: '', description: '', requiredSkills: '' });
    
    // Use non-blocking custom toast
    triggerToast(
      "Offerta pubblicata!", 
      `La posizione "${newJob.title}" è attiva nel feed e sono già arrivate delle candidature!`, 
      "success"
    );
  };

  // Recruiter: simulate answering instantly to boost responsiveness score
  const recruiterAnswerInTime = (companyId: string) => {
    setJobPostings(prev => prev.map(job => {
      if (job.companyId === companyId) {
        const nextScore = Math.min(100, job.responsivenessScore + 8);
        return {
          ...job,
          responsivenessScore: nextScore,
          status: nextScore >= 50 ? 'active' : job.status,
          ttlRemainingHours: 48
        };
      }
      return job;
    }));
    setPenaltyLog(prev => [`[Patto]: L'azienda ${companyId} ha evaso le pendenze in 24 ore. Responsiveness incrementata!`, ...prev]);
  };

  // Latenza Recruiter Trigger
  const triggerRecruiterLatency = (companyId: string) => {
    setJobPostings(prevJobs => {
      return prevJobs.map(job => {
        if (job.companyId === companyId) {
          const newScore = Math.max(0, job.responsivenessScore - 20);
          const shouldExpire = newScore < 50; 
          
          let alertMsg = `[Algoritmo]: L'azienda ${job.company} ignora i candidati. Responsiveness cala a ${newScore}%.`;
          if (shouldExpire) {
            alertMsg += ` [SHADOW BAN] Annuncio OSCURATO per aver infranto il Patto di Responsabilità!`;
          }
          setPenaltyLog(prev => [alertMsg, ...prev]);

          return {
            ...job,
            responsivenessScore: newScore,
            status: shouldExpire ? 'hidden' as any : 'active' as any,
            ttlRemainingHours: 0
          };
        }
        return job;
      });
    });
  };

  // Chatbot transition from Avatar
  const launchMockInterview = (job: JobPosting | null) => {
    setCandidateHomeTab('chat');
    setChatMode('interview');
    const company = job ? job.company : "HexaTech Solutions";

    const introText = `Ciao ${candidateProfile.name || "Candidato"}! Parliamo a viva voce del ruolo in ${company}. \n\n"Raccontami di una volta in cui hai dovuto riadattare il tuo lavoro per un imprevisto salvaguardando il riposo di tutti. Come ti sei sentito?"`;
    
    setChatMessages([
      { id: `init-${Date.now()}`, sender: 'assistant', text: introText, timestamp: new Date().toLocaleTimeString(), mode: 'interview' }
    ]);
  };

  const handleSendChatMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString(),
      mode: chatMode
    };

    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatInput('');
    setChatLoading(true);

    try {
      const messagesHistory = updatedMessages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messagesHistory,
          mode: chatMode,
          context: {
            jobTitle: selectedJob?.title || candidateProfile.professionalTitle,
            company: selectedJob?.company || "Mirea SafeSpace",
            skills: candidateProfile.skills.map(s => s.name),
            candidateName: candidateProfile.name
          }
        })
      });
      const data = await response.json();

      setChatMessages(prev => [
        ...prev,
        {
          id: `msg-ai-${Date.now()}`,
          sender: 'assistant',
          text: data.text,
          timestamp: new Date().toLocaleTimeString(),
          mode: chatMode
        }
      ]);
    } catch (err) {
      console.error(err);
      // Fallback response and reassurance if no API key
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            id: `msg-ai-${Date.now()}`,
            sender: 'assistant',
            text: `${candidateProfile.name || "Candidato"}, apprezzo molto la tua risposta. Dimostra un'eccellente attitudine al "${candidateProfile.skills[0]?.name || "Problem Solving"}". Ricorda che l'autenticità vale più di formule preconfezionate. Ti va di continuare la conversazione o preferisci riposare?`,
            timestamp: new Date().toLocaleTimeString(),
            mode: chatMode
          }
        ]);
        setChatLoading(false);
      }, 1000);
    } finally {
      if (chatLoading) setChatLoading(false);
    }
  };

  // Reset all
  const resetSimulation = () => {
    setAppState('login_selection');
    setCandidateProfile({
      name: "",
      surname: "",
      birthDate: "",
      professionalTitle: "Candidato",
      email: "candidato@mira.it",
      summary: "",
      skills: [{ name: "Problem Solving", category: "soft", rating: 70 }],
      careerSuggestions: [],
      psychometrics: [
        { name: "Apertura Mentale", score: 60, description: "Predisposizione alle nuove sfide." },
        { name: "Cooperatività Empatica", score: 65, description: "Predisposizione al lavoro di team." },
        { name: "Resilienza all'Ansia", score: 50, description: "Capacità di assorbire feedback." }
      ],
      avg_anxiety_index: 4,
      searchCity: "",
      personalPresentation: ""
    });
    setJobPostings(INITIAL_JOBS);
    setDiaryNotes(INITIAL_DIARY);
    setIsInterviewReminder(false);
    setPenaltyLog(["Ambiente di simulazione resettato."]);
  };

  // Diary Add note
  const handleAddDiaryNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const newNote: DiaryNote = {
      id: `note-${Date.now()}`,
      title: newNoteTitle,
      content: newNoteContent,
      date: new Date().toISOString().split('T')[0],
      anxietyLevel: newNoteAnxiety,
      interviewCompany: isInterviewReminder ? (newNoteInterviewCo || undefined) : undefined,
      interviewDate: isInterviewReminder ? (newNoteInterviewDate || undefined) : undefined
    };

    setDiaryNotes([newNote, ...diaryNotes]);

    // calculate average anxiety levels
    const totalAnx = [newNote, ...diaryNotes].reduce((sum, item) => sum + item.anxietyLevel, 0);
    const avgAnx = Math.round(totalAnx / ([newNote, ...diaryNotes].length));
    setCandidateProfile(prev => ({
      ...prev,
      avg_anxiety_index: avgAnx
    }));

    // Update Avatar rassicurante text based on high anxiety
    if (avgAnx >= 7) {
      setAvatarSpeech(`Ho notato che il tuo stress medio è alto (${avgAnx}/10). Ti va di respirare profondamente per un istante? Facciamo un piccolo esercizio di respirazione guidata qui con me su Mirea. Forza, sono al tuo fianco!`);
    } else {
      setAvatarSpeech(`Il tuo livello di ansia medio è di ${avgAnx}/10, fantastico! Mirea è orgogliosa del tuo cammino. Ricorda sempre di dedicarti dei piccoli momenti di decompressione.`);
    }

    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteInterviewCo('');
    setNewNoteInterviewDate('');
    setIsInterviewReminder(false);
    setShowAddNote(false);
  };

  const handleApplyToJob = (job: JobPosting) => {
    const isAlreadyApplied = diaryNotes.some(note => note.title.includes(job.company) && note.title.includes("Candidatura"));
    if (isAlreadyApplied) {
      triggerToast(
        "Candidatura già inviata", 
        `Hai già inviato la tua candidatura per questa posizione in ${job.company}!`, 
        "warning"
      );
      return;
    }

    // Auto calculate tentative interview date: 3 days from now
    const interviewDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + "T10:00";
    
    const newNote: DiaryNote = {
      id: `note-auto-${Date.now()}`,
      title: `Candidatura: ${job.title}`,
      content: `Si attende una risposta da parte dell'azienda per poter procedere al colloquio.`,
      date: new Date().toISOString().split('T')[0],
      anxietyLevel: 2,
      interviewCompany: job.company,
      interviewDate: interviewDate
    };

    setDiaryNotes([newNote, ...diaryNotes]);
    
    setChatMessages([
      { id: `apply-${Date.now()}`, sender: 'assistant', text: `Complimenti ${candidateProfile.name || "Elisa"}! Il tuo curriculum per la posizione di ${job.title} in ${job.company} è stato inviato con successo. Se l'azienda pensa che la tua figura possa essere adeguata, riceverai una notifica nella sezione calendario per fissare un colloquio.`, timestamp: new Date().toLocaleTimeString(), mode: 'general' }
    ]);
    
    setApplicationSuccessCompany(job.company);
  };

  // Initialize Mirea Psychological Support Session
  const handleStartMireaSupport = () => {
    setMireaSessionStep('disclaimer');
    setOpenMireaSupport(true);
  };

  const handleConfirmStartSupportSession = () => {
    setMireaSessionStep('chat');
    setIsSupportTyping(true);
    
    // Determine context based on upcoming interviews
    const upcoming = diaryNotes.find(note => {
      if (!note.interviewDate) return false;
      const iDate = new Date(note.interviewDate);
      const now = new Date();
      
      const dateStr = note.interviewDate;
      const isMockUpcoming = dateStr.includes("2026-06-11") || dateStr.includes("2026-06-12") || dateStr.includes("2026-06-10");
      const diffMs = iDate.getTime() - now.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      return (diffHours >= -24 && diffHours <= 48) || isMockUpcoming;
    });

    setTimeout(() => {
      let greeting = "";
      if (upcoming) {
        greeting = `Ciao ${candidateProfile.name || "Elisa"}! Ho notato in agenda l'imminente colloquio con **${upcoming.interviewCompany || "HexaTech_Solutions"}**. È normale sentire agitazione, ma respiriamo insieme. 🧘‍♀️ Come ti senti all'idea di affrontarlo oggi o domani? Parliamo a cuore aperto!`;
      } else {
        greeting = `Ciao ${candidateProfile.name || "Elisa"}! Sono Mirea, il tuo spazio sicuro di ascolto emotivo. 🌸 La ricerca di lavoro può essere un percorso faticoso e pieno d'ansia. Come ti senti oggi all'idea di cercare lavoro? Raccontami se vuoi mandare una candidatura o se ti senti stanco.`;
      }

      setSupportMessages([
        {
          id: `support-init-${Date.now()}`,
          sender: 'assistant',
          text: greeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsSupportTyping(false);
    }, 1000);
  };

  // Send message to Mirea Support Assistant (text or vocal)
  const handleSendSupportMessage = (inputText: string, isVocalArg = false, durationStr?: string) => {
    const textToSend = isVocalArg ? "" : inputText.trim();
    if (!isVocalArg && !textToSend) return;

    // Add user message to chat
    const userMsgId = `support-user-${Date.now()}`;
    const newMsg = {
      id: userMsgId,
      sender: 'user' as const,
      text: isVocalArg ? undefined : textToSend,
      isVocal: isVocalArg,
      duration: durationStr,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...supportMessages, newMsg];
    setSupportMessages(updatedMessages);
    if (!isVocalArg) {
      setSupportInput('');
    }

    // Trigger Mirea Assistant Answer
    setIsSupportTyping(true);

    setTimeout(() => {
      let responseText = "";
      const lowercaseText = textToSend.toLowerCase();

      // Check for interviews
      const upcoming = diaryNotes.find(note => note.interviewDate);

      if (isVocalArg) {
        responseText = `Ascolto il calore e l'intonazione del tuo messaggio vocale. ❤️ Sento la tua sensibilità. Ricorda che è del tutto lecito provare agitazione. Respiriamo insieme: inspira per 4 secondi, trattieni, espira per 6. Sei molto più grande di qualunque timore di oggi.`;
      } else if (lowercaseText.includes("ansia") || lowercaseText.includes("ansioso") || lowercaseText.includes("paura") || lowercaseText.includes("panico") || lowercaseText.includes("stress") || lowercaseText.includes("agitato")) {
        responseText = `Ti accolgo e ti abbraccio in questo momento di tensione. ❤️ L'ansia non è un tuo difetto: è solo il tuo sistema nervoso che cerca di proteggerti dall'incertezza. Proviamo una respirazione controllata: espira tutta l'aria, inspira per 4 secondi, trattieni per 4, ed espira dolcemente per 6. Sei al sicuro.`;
      } else if (lowercaseText.includes("colloquio") || lowercaseText.includes("incontro") || lowercaseText.includes("parlare")) {
        if (upcoming) {
          responseText = `A proposito del colloquio con **${upcoming.interviewCompany || "HexaTech_Solutions"}**: preparati con cura ma togliti il mantello della perfezione. Spesso crediamo di dover recitare un copione ideale, ma l'autenticità e le soft skill liquide (come l'adattabilità) valgono dieci volte di più. Loro hanno bisogno di te e del tuo benessere!`;
        } else {
          responseText = `I colloqui spaventano perché ci mettono a nudo, ma ribalta la prospettiva: anche tu stai esaminando loro! Se l'ambiente non ti rispetta o non ha empatia, non è il posto giusto per te. Cammina con dignità lavorativa, sempre a testa alta.`;
        }
      } else if (lowercaseText.includes("candidatura") || lowercaseText.includes("candidato") || lowercaseText.includes("mandare") || lowercaseText.includes("inviare")) {
        responseText = `Ad ogni candidatura che invii stai dicendo al mondo: 'Io ci sono, ho del valore da esprimere'. È un atto coraggioso! Se non riceverai risposta immediata o riceverai un rifiuto, ricorda che Mirea sanziona il ghosting aziendale e protegge il tuo tempo. Continua a seminare con fede e fiducia.`;
      } else if (lowercaseText.includes("rifiuto") || lowercaseText.includes("no") || lowercaseText.includes("bocciato") || lowercaseText.includes("scartato") || lowercaseText.includes("triste") || lowercaseText.includes("demotivato")) {
        responseText = `I rifiuti fanno male, è inutile negarlo. Ma un rifiuto descrive solo una mancata compatibilità temporanea tra due pezzi di puzzle, non dice nulla sul tuo valore personale. Concediti di essere triste oggi, ma domani torna a risplendere. La strada giusta è là fuori che ti aspetta.`;
      } else if (lowercaseText.includes("positivo") || lowercaseText.includes("bene") || lowercaseText.includes("carico") || lowercaseText.includes("felice")) {
        responseText = `Che meraviglia sentire questa splendida energia positiva! 🌟 Coltiva questa sensazione e portala con te come scudo di luce per le prossime candidature. Condividere la gioia raddoppia la forza del percorso! Meriti ogni successo.`;
      } else {
        responseText = `Grazie per avermelo confidato. Sentirsi ascoltati e potersi esprimere senza maschere è il primo passo per alleggerire il carico mentale. Qualunque sia il tuo obiettivo oggi (mandare un CV o preparare un colloquio), procedi a piccoli passi sostenibili. Come posso supportarti ulteriormente adesso?`;
      }

      setSupportMessages(prev => [
        ...prev,
        {
          id: `support-reply-${Date.now()}`,
          sender: 'assistant',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsSupportTyping(false);
    }, 1200);
  };

  // Toggle active playing state of voice note
  const togglePlaySupportVocal = (msgId: string) => {
    if (supportVocalPlayingId === msgId) {
      setSupportVocalPlayingId(null);
    } else {
      setSupportVocalPlayingId(msgId);
      // Simulate completion after a few seconds
      setTimeout(() => {
        setSupportVocalPlayingId(prev => (prev === msgId ? null : prev));
      }, 4000);
    }
  };

  // Trigger Action Intents for Android
  const triggerCalendarIntent = (note: DiaryNote) => {
    if (!note.interviewDate) return;
    setActiveIntentPopup({
      type: 'calendar',
      title: 'Intent implicito: CalendarContract.Events.CONTENT_URI',
      description: 'L\'app Mirea invoca l\'Intent di sistema per inserire il colloquio nel calendario nativo del telefono Android, alleviando lo sforzo di inserimento manuale.',
      data: {
        ACTION: "android.intent.action.INSERT",
        TITLE: `Colloquio con ${note.interviewCompany}`,
        BEGIN_TIME: new Date(note.interviewDate).getTime(),
        LOCATION: "Mirea Meet SafeSpace",
        DESCRIPTION: `Colloquio di lavoro rassicurante. ${note.content}`
      }
    });
  };

  const triggerShareIntent = (note: DiaryNote) => {
    setActiveIntentPopup({
      type: 'share',
      title: 'Intent implicito: android.content.Intent.ACTION_SEND',
      description: 'Condividi o esporta i pensieri cifrati dal tuo diario locale verso l\'app di note nativa (Google Keep, Samsung Notes) o la messaggistica rassicurante di un amico.',
      data: {
        ACTION: "android.intent.action.SEND",
        MIME_TYPE: "text/plain",
        EXTRA_TEXT: `DIARIO AURA - NOTA DEL ${note.date}\nTitolo: ${note.title}\nLivello di Stress registrato: ${note.anxietyLevel}/10.\nContenuto: ${note.content}`
      }
    });
  };

  const latestMireaSpeech = [...chatMessages].reverse().find(msg => msg.sender === 'assistant')?.text || "Iniziamo la nostra conversazione...";

  return (
    <div style={{ backgroundColor: '#E5D8CF' }} className="min-h-screen w-full flex flex-col items-center justify-start relative font-sans">
      
      {/* Decorative colored ambient blobs hidden for plain web app */}
      
      {/* Showcase header bar hidden */}
      <div className="hidden">
        <div className="w-full max-w-5xl flex items-center justify-between mb-8 z-20 shrink-0 select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-teal-500 via-emerald-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-sm tracking-widest shadow-md shadow-teal-100">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xs font-black text-slate-900 tracking-tight font-display">MIREA</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main active zone: Centers web app nicely with a beautiful max-width */}
      <div className={`w-full ${appState === 'candidate_home' ? 'max-w-5xl' : 'max-w-xl'} mx-auto flex flex-col z-10 min-h-screen transition-all duration-300`}>
        
        {/* Web App Main Container */}
        <div className="w-full flex-1 flex flex-col">
          <div className="relative w-full flex-1 flex flex-col">
            
            {/* PHYSICAL BUTTON DETAILS HIDDEN */}
            <div className="hidden">
              <div className="absolute top-[90px] -left-[4px] w-[4px] h-[16px] bg-[#2a2a2d] border-l border-neutral-600 rounded-l-[3px] shadow-sm pointer-events-none"></div>
              <div className="absolute top-[125px] -left-[4px] w-[4px] h-[32px] bg-[#2a2a2d] border-l border-neutral-600 rounded-l-[3px] shadow-sm pointer-events-none"></div>
              <div className="absolute top-[165px] -left-[4px] w-[4px] h-[32px] bg-[#2a2a2d] border-l border-neutral-600 rounded-l-[3px] shadow-sm pointer-events-none"></div>
              <div className="absolute top-[125px] -right-[4px] w-[4px] h-[38px] bg-[#2a2a2d] border-r border-neutral-600 rounded-r-[3px] shadow-sm pointer-events-none"></div>
              <div className="absolute top-[205px] -right-[3px] w-[3px] h-[30px] bg-neutral-900 border-r border-t border-b border-neutral-750 rounded-r-[2px] opacity-75 shadow-inner pointer-events-none"></div>
            </div>

            {/* Main Screen viewport with Pantone #E5D8CF background for the whole app */}
            <div 
              style={{ backgroundColor: '#E5D8CF' }}
              className="w-full flex-1 overflow-hidden flex flex-col relative transition-all duration-300"
            >
              
              {/* Splash Screen Overlay Transition */}
              <AnimatePresence>
                {showSplash && (
                  <motion.div
                    key="splash-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 select-none"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
                      className="flex items-center justify-center"
                    >
                      <div className="relative w-40 h-40 flex items-center justify-center">
                        <img 
                          src="/src/assets/images/logo_mirea.png" 
                          alt="LOGO MIREA" 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const el = document.getElementById('mirea-splash-fallback');
                            if (el) el.classList.remove('hidden');
                          }}
                        />
                        {/* Fallback elegant, high-impact aesthetic logo icon without a border box or square enclosing cover */}
                        <div id="mirea-splash-fallback" className="hidden absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 bg-gradient-to-tr from-teal-50 via-emerald-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md shadow-teal-500/25">
                            <span className="text-white font-extrabold text-3xl font-display tracking-widest translate-x-[2px]">M</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* iPhone Dynamic Island and iOS Status Bar OS hidden for plain responsive web app */}
              <div className="hidden">
                <div className="absolute top-[8px] left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none">
                  <motion.div 
                    initial={{ width: 85, height: 21 }}
                    whileHover={{ width: 145, height: 26 }}
                    className="bg-black rounded-full flex items-center justify-between px-2 w-[85px] h-[21px] transition-all duration-300 group cursor-pointer shadow-md shadow-black/30 border border-neutral-900"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="w-1.5 h-1.5 bg-[#0a0a14] rounded-full flex items-center justify-center border border-zinc-900 shrink-0">
                        <div className="w-0.5 h-0.5 bg-indigo-900/40 rounded-full"></div>
                      </div>
                      <span className="text-[7.5px] text-zinc-350 font-extrabold tracking-tight opacity-0 group-hover:opacity-100 w-0 group-hover:w-auto h-0 group-hover:h-auto overflow-hidden transition-all duration-300 whitespace-nowrap text-center flex-1 leading-none">
                        Mirea Active • Secure
                      </span>
                      <div className="w-1 h-1 bg-[#101017] rounded-full shrink-0 border border-neutral-950"></div>
                    </div>
                  </motion.div>
                </div>

                <div id="ios-status-bar" className={`h-[35px] pt-1.5 px-[18px] pb-1 text-[10px] font-sans font-bold flex justify-between items-center z-30 select-none transition-colors duration-300 relative ${
                  (appState === 'login_selection' || appState === 'candidate_onboarding') ? 'bg-transparent text-slate-850' : 'bg-slate-900 text-slate-200'
                }`}>
                  <span className="z-10 text-[12.5px] font-black tracking-tight leading-none">{currentTime}</span>
                  <div className="flex items-center gap-[3px] z-10">
                    <Signal className="w-2.5 h-2.5 shrink-0" />
                    <span className="text-[7.5px] font-black tracking-tighter shrink-0 leading-none mr-0.5">5G</span>
                    <Wifi className="w-2.5 h-2.5 shrink-0" />
                    <div className="relative w-[14px] h-[8px] border border-current rounded-[2px] p-[1px] flex items-center justify-start shrink-0 ml-[1px]">
                      <div className="bg-current h-full w-[85%] rounded-[0.5px]"></div>
                      <div className="bg-current absolute top-1/2 -right-[1.5px] -translate-y-1/2 w-[1px] h-[2px] rounded-r-xs opacity-90"></div>
                    </div>
                  </div>
                </div>
              </div>




              {/* SCREEN VIEWPORT SCROLLABLE ZONE */}
              <div className={`flex-1 overflow-y-auto p-3.5 space-y-4 ${(appState === 'candidate_result' || appState === 'login_selection') ? 'flex flex-col justify-center' : ''}`}>

              {/* VIEW 1: LOGIN SELECTION SCREEN */}
              {appState === 'login_selection' && (
                <div className="space-y-4 pt-1 text-center animate-fade-in w-full max-w-sm mx-auto flex flex-col justify-center">
                  <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    {/* Brand Logo replaced directly in the main content card, without a surrounding circle or box */}
                    <div className="relative w-16 h-16 flex items-center justify-center mx-auto">
                      <img 
                        src="/src/assets/images/icona.png" 
                        alt="Mirea Icona" 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const f = document.getElementById('login-main-icon-fallback');
                          if (f) f.classList.remove('hidden');
                        }}
                      />
                      <div id="login-main-icon-fallback" className="hidden absolute inset-0 bg-transparent flex items-center justify-center text-[#0F4C83] animate-pulse">
                        <LogIn className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-black text-[18px] text-slate-800 tracking-tight font-display">Accedi a Mirea</h3>
                      <div style={{ fontSize: '10px', lineHeight: '1.3' }} className="text-slate-500 max-w-[240px] mx-auto">
                        Entra nello spazio sicuro in cui la dignità lavorativa, la salute mentale e il rispetto reciproco sono al centro.
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 max-w-[280px] w-full mx-auto">
                    <button
                      onClick={() => setAppState('candidate_onboarding')}
                      style={{ backgroundColor: '#0F4C83' }}
                      className="w-full hover:shadow-md hover:shadow-blue-900/30 text-white p-3.5 rounded-2xl text-[11px] font-bold flex items-center justify-between gap-2 shadow-xs transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-white" />
                        <span>Cerco lavoro</span>
                      </div>
                      <ChevronRightIcon className="w-3.5 h-3.5 text-white shrink-0" />
                    </button>

                    <button
                      onClick={() => setAppState('recruiter_login')}
                      style={{ backgroundColor: '#D8864E' }}
                      className="w-full hover:shadow-md hover:shadow-amber-900/30 text-white p-3.5 rounded-2xl text-[11px] font-bold flex items-center justify-between gap-2 transition-all cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-white/90" />
                        <span>Sono un Recruiter Aziendale</span>
                      </div>
                      <ChevronRightIcon className="w-3.5 h-3.5 text-white shrink-0" />
                    </button>
                  </div>
                </div>
              )}

              {/* VIEW 2: UTENTE ONBOARDING FORM */}
              {appState === 'candidate_onboarding' && (
                <div className="relative">
                  <form onSubmit={submitOnboardingForm} className="space-y-3 pt-1 animate-fade-in text-black">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-0.5">
                      <h3 className="font-extrabold text-[11px] text-black uppercase tracking-widest flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-black" />
                        1. Profilo & Competenze
                      </h3>
                      <div className="text-[7.5px] text-black font-semibold leading-tight">
                        Registra le tue informazioni essenziali e analizza le tue competenze.
                      </div>
                    </div>

                    {/* Form Inputs */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[9px] font-black text-black uppercase tracking-wider block mb-0.5">Nome:</label>
                          <input
                            type="text"
                            required
                            value={candidateProfile.name}
                            onChange={(e) => setCandidateProfile({ ...candidateProfile, name: e.target.value })}
                            placeholder="Es: Francesco"
                            className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-[10.5px] font-bold text-black focus:border-black outline-none transition"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] font-black text-black uppercase tracking-wider block mb-0.5">Cognome:</label>
                          <input
                            type="text"
                            required
                            value={candidateProfile.surname}
                            onChange={(e) => setCandidateProfile({ ...candidateProfile, surname: e.target.value })}
                            placeholder="Es: Rossi"
                            className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-[10.5px] font-bold text-black focus:border-black outline-none transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[9px] font-black text-black uppercase tracking-wider block mb-0.5">Nascita:</label>
                          <input
                            type="date"
                            required
                            value={candidateProfile.birthDate}
                            onChange={(e) => setCandidateProfile({ ...candidateProfile, birthDate: e.target.value })}
                            className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-[10.5px] font-bold text-black focus:border-black outline-none transition"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] font-black text-black uppercase tracking-wider block mb-0.5">Città dove cerchi lavoro:</label>
                          <input
                            type="text"
                            required
                            value={candidateProfile.searchCity}
                            onChange={(e) => setCandidateProfile({ ...candidateProfile, searchCity: e.target.value })}
                            placeholder="Es: Milano, Remote"
                            className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-[10.5px] font-bold text-black focus:border-black outline-none transition"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-0.5">
                          <label className="text-[9px] font-black text-black uppercase tracking-wider block">CV o Esperienze (Testo o PDF):</label>
                        </div>
                        
                        <label 
                          htmlFor="pdf-upload-input"
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={`border-2 border-dashed rounded-xl p-3 transition text-center block cursor-pointer select-none ${isDragOver ? 'border-[#0F4C83] bg-[#0F4C83]/5' : 'border-slate-300 bg-white hover:border-slate-400'}`}
                        >
                          <input 
                            type="file" 
                            id="pdf-upload-input" 
                            accept=".pdf" 
                            className="hidden" 
                            onChange={handlePdfFileChange} 
                          />
                          
                          {uploadedPdfName ? (
                            <div className="space-y-2 py-2 flex flex-col items-center">
                              <div className="p-3 bg-red-50 text-red-600 rounded-xl w-10 h-10 flex items-center justify-center border border-red-200">
                                <span className="font-sans font-black text-[10px] uppercase tracking-wider">PDF</span>
                              </div>
                              <div className="text-center">
                                <p className="text-[10px] font-black text-slate-800 tracking-tight leading-snug max-w-[220px] truncate mx-auto">{uploadedPdfName}</p>
                                <p className="text-[6px] text-teal-600 font-extrabold uppercase mt-0.5 tracking-wider">File Caricato con Successo</p>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setUploadedPdfName(null);
                                  setUploadedPdfBase64(null);
                                  setCvInputText('');
                                }}
                                className="text-[8px] underline text-red-500 hover:text-red-700 font-black tracking-wider uppercase cursor-pointer"
                              >
                                Rimuovi File
                              </button>
                            </div>
                          ) : (
                            <div>
                              <textarea
                                placeholder="Incolla qui le tue esperienze o trascina qui il tuo CV..."
                                value={cvInputText}
                                onClick={(e) => e.stopPropagation()} // don't open file dialog when typing or clicking textarea
                                onChange={(e) => setCvInputText(e.target.value)}
                                className="w-full h-16 text-[8.5px] font-bold text-black placeholder:text-[8px] placeholder:text-zinc-500 bg-transparent resize-none border-none outline-none leading-relaxed"
                              />
                              <div className="text-[8px] text-slate-500 font-black mt-0.5 flex items-center justify-center gap-1.5 border-t border-slate-100 pt-1.5">
                                <Upload className="w-2.5 h-2.5 text-slate-500" />
                                <span>Trascina un file PDF o clicca per caricare</span>
                              </div>
                            </div>
                          )}
                        </label>
                      </div>

                        {/* Europass CV Tips helper Link */}
                        <div 
                          onClick={() => setShowCvTipsModal(true)}
                          className="mt-2.5 p-2 bg-white/90 border border-slate-300/80 rounded-xl flex items-center justify-between gap-1.5 cursor-pointer hover:bg-white transition shadow-2xs group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-[18px] h-[18px] rounded-full bg-black flex items-center justify-center shrink-0">
                               <span className="text-white font-extrabold text-[11px] font-serif leading-none italic">i</span>
                            </div>
                            <span className="text-[8px] font-black text-black group-hover:underline tracking-wider uppercase whitespace-nowrap block">
                              Alcuni consigli per la compilazione del CV
                            </span>
                          </div>
                        </div>

                        {/* NEW: Correggi il mio CV with clickable checkmark */}
                        <div 
                          onClick={() => setShowCvCorrectionTipsModal(true)}
                          className="mt-2 p-2 bg-white/90 border border-slate-300/80 rounded-xl flex items-center justify-between gap-1.5 cursor-pointer hover:bg-white transition shadow-2xs group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-[18px] h-[18px] rounded-full bg-teal-600 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-white stroke-[3.5]" />
                            </div>
                            <span className="text-[8.5px] font-black text-black group-hover:underline tracking-wider uppercase whitespace-nowrap block">
                              Correggi il mio CV
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 font-sans">
                            <div className="text-[7px] font-black text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200/50 block shrink-0">
                              Europass Checklist
                            </div>
                            <div className="w-4.5 h-4.5 rounded-md border border-neutral-400 bg-white flex items-center justify-center transition group-hover:border-teal-600">
                              <Check className="w-3 h-3 text-teal-600 stroke-[2.5]" />
                            </div>
                          </div>
                        </div>

                      </div>

                    <button
                      type="submit"
                      disabled={!candidateProfile.name || !candidateProfile.surname || !candidateProfile.birthDate || !candidateProfile.searchCity}
                      className="w-full bg-black hover:bg-neutral-900 disabled:bg-slate-300 text-white font-black py-2 rounded-xl text-xs flex items-center justify-center gap-1 shadow-sm transition cursor-pointer"
                    >
                      Inizia Test Psicometrico
                    </button>

                    <button
                      type="button"
                      onClick={() => setAppState('login_selection')}
                      className="w-full text-black hover:bg-white/40 text-[10px] py-1.5 rounded-lg font-black transition cursor-pointer"
                    >
                      Torna al Selettore di Ruolo
                    </button>
                  </form>

                  {/* EUROPASS CV TIPS BOTTOM SHEET OVERLAY */}
                  <AnimatePresence>
                    {showCvTipsModal && (
                      <div className="absolute -inset-x-3.5 -bottom-4 top-[-100px] bg-black/60 z-50 flex items-end justify-center pointer-events-auto backdrop-blur-[1px]">
                        {/* Backdrop dismiss */}
                        <div className="absolute inset-0" onClick={() => setShowCvTipsModal(false)}></div>
                        
                        {/* Sheet */}
                        <motion.div 
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          exit={{ y: "100%" }}
                          transition={{ type: "spring", damping: 25, stiffness: 220 }}
                          className="relative w-full h-[88%] bg-white rounded-t-[32px] p-5 pb-8 shadow-2xl flex flex-col z-50 pointer-events-auto border-t border-slate-100"
                        >
                          {/* Pull Indicator */}
                          <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-3.5 shrink-0"></div>

                          {/* Header */}
                          <div className="flex items-start justify-between mb-4 shrink-0 text-left mt-1">
                            <div>
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block font-mono">GUIDA</span>
                              <h4 className="font-extrabold text-[17.5px] text-black tracking-tight flex items-center gap-1.5 font-display mt-0.5">
                                Scrivere un CV Europass Corretto
                              </h4>
                            </div>
                            <button 
                              type="button"
                              onClick={() => setShowCvTipsModal(false)}
                              className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-[10px] cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Scrollable Tips Content */}
                          <div className="flex-1 overflow-y-auto space-y-4 text-left text-black pr-1 font-sans">
                            <p className="text-[13px] text-neutral-800 leading-relaxed font-semibold">
                              Il formato <strong>Europass CV</strong> è lo standard europeo ufficiale. Segui questi consigli chiave:
                            </p>

                            <div className="space-y-4">
                              <div className="flex gap-2.5 items-start">
                                <span className="w-5 h-5 rounded-full bg-[#E5D8CF] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 text-black">1</span>
                                <div>
                                  <h5 className="font-bold text-[14.5px] leading-tight text-black">Cronologia Inversa</h5>
                                  <p className="text-[13px] text-neutral-700 leading-relaxed mt-1">
                                    Elenca prima le esperienze lavorative e di studio più recenti, indicando in modo esplicito mese e anno.
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-2.5 items-start">
                                <span className="w-5 h-5 rounded-full bg-[#E5D8CF] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 text-black">2</span>
                                <div>
                                  <h5 className="font-bold text-[14.5px] leading-tight text-black">Sintesi ed Elenchi Puntati</h5>
                                  <p className="text-[13px] text-neutral-700 leading-relaxed mt-1">
                                    Non dilungarti troppo. Usa punti elenco concisi per descrivere le mansioni e i traguardi raggiunti.
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-2.5 items-start">
                                <span className="w-5 h-5 rounded-full bg-[#E5D8CF] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 text-black">3</span>
                                <div>
                                  <h5 className="font-bold text-[14.5px] leading-tight text-black">Lingue e Livelli CEFR</h5>
                                  <p className="text-[13px] text-neutral-700 leading-relaxed mt-1">
                                    Dichiara le lingue straniere specificando i livelli standard europei di autovalutazione (es. A1, B2, C1).
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-2.5 items-start">
                                <span className="w-5 h-5 rounded-full bg-[#E5D8CF] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 text-black">4</span>
                                <div>
                                  <h5 className="font-bold text-[14.5px] leading-tight text-black">Competenze Digitali & Soft</h5>
                                  <p className="text-[13px] text-neutral-700 leading-relaxed mt-1">
                                    Inserisci i software che sai usare e le tue competenze comunicative ed empatiche.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 flex items-start gap-2 mt-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <p className="text-[13px] text-emerald-900 leading-relaxed font-semibold">
                                <strong>Consiglio Mirea:</strong> Rileggi accuratamente per eliminare errori di battitura e mantieni sempre la trasparenza etica.
                              </p>
                            </div>
                          </div>

                          {/* Footer Close Button */}
                          <button 
                            type="button"
                            onClick={() => setShowCvTipsModal(false)}
                            style={{ backgroundColor: '#E5D8CF' }}
                            className="w-full text-black font-black py-3 rounded-xl text-[12px] shadow-xs hover:opacity-90 transition shrink-0 mt-3 cursor-pointer"
                          >
                            Chiudi e Torna al Form
                          </button>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>

                  {/* EUROPASS CV CORRECTION TIPS BOTTOM SHEET OVERLAY */}
                  <AnimatePresence>
                    {showCvCorrectionTipsModal && (
                      <div className="absolute -inset-x-3.5 -bottom-4 top-[-100px] bg-black/60 z-50 flex items-end justify-center pointer-events-auto backdrop-blur-[1px]">
                        {/* Backdrop dismiss */}
                        <div className="absolute inset-0" onClick={() => setShowCvCorrectionTipsModal(false)}></div>
                        
                        {/* Sheet */}
                        <motion.div 
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          exit={{ y: "100%" }}
                          transition={{ type: "spring", damping: 25, stiffness: 220 }}
                          className="relative w-full h-[88%] bg-white rounded-t-[32px] p-5 pb-8 shadow-2xl flex flex-col z-50 pointer-events-auto border-t border-slate-100"
                        >
                          {/* Pull Indicator */}
                          <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-3.5 shrink-0"></div>

                          {/* Header */}
                          <div className="flex items-start justify-between mb-4 shrink-0 text-left mt-1">
                            <div>
                              <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest block font-mono">CHECKLIST UFFICIALE</span>
                              <h4 className="font-extrabold text-[17.5px] text-black tracking-tight flex items-center gap-1.5 font-display mt-0.5">
                                Correggi & Ottimizza il mio CV (Europass)
                              </h4>
                            </div>
                            <button 
                              type="button"
                              onClick={() => setShowCvCorrectionTipsModal(false)}
                              className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-[10px] cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Scrollable Tips Content */}
                          <div className="flex-1 overflow-y-auto space-y-4 text-left text-black pr-1 font-sans">
                            <p className="text-[13px] text-neutral-800 leading-relaxed font-semibold">
                              Prima di procedere, verifica che il tuo documento rispetti questi parametri strutturali ufficiali Europass per massimizzare la leggibilità ed efficacia:
                            </p>

                            <div className="space-y-4">
                              <div className="flex gap-2.5 items-start">
                                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 text-teal-800">✓</div>
                                <div>
                                  <h5 className="font-bold text-[14.5px] leading-tight text-neutral-900 border-b border-slate-100 pb-1">1. Clausola Privacy GDPR (FONDAMENTALE)</h5>
                                  <p className="text-[13px] text-neutral-700 leading-relaxed mt-1">
                                    Molti CV vengono subito scartati se manca il consenso legale. Assicurati di inserire in fondo al CV una dichiarazione esplicita per l'autorizzazione:
                                  </p>
                                  <div className="bg-slate-50 p-2.5 rounded-lg text-[13px] font-mono text-slate-600 border border-slate-200/80 mt-2 leading-relaxed select-all">
                                    "Autorizzo il trattamento dei miei dati personali ai sensi del D.Lgs. 196/2003 e del GDPR (Regolamento UE 2016/679)."
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2.5 items-start">
                                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 text-teal-800">✓</div>
                                <div>
                                  <h5 className="font-bold text-[14.5px] leading-tight text-neutral-900 border-b border-slate-100 pb-1">2. Competenze Linguistiche CEFR</h5>
                                  <p className="text-[13px] text-neutral-700 leading-relaxed mt-1">
                                    Non usare grafiche con percentuali arbitrarie (es. "Inglese 80%"). Utilizza i codici ufficiali QCER Europei per ciascuna abilità linguistica: <strong>A1/A2</strong> (Base), <strong>B1/B2</strong> (Autonomo), <strong>C1/C2</strong> (Avanzato).
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-2.5 items-start">
                                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 text-teal-800">✓</div>
                                <div>
                                  <h5 className="font-bold text-[14.5px] leading-tight text-neutral-900 border-b border-slate-100 pb-1">3. Informazioni di Contatto Necessarie</h5>
                                  <p className="text-[13px] text-neutral-700 leading-relaxed mt-1">
                                    Verifica che siano presenti un'email professionale pulita (es. nome.cognome@email.com), numero di cellulare con prefisso (+39) e città di domicilio. Un collegamento ipertestuale al proprio profilo LinkedIn curato aggiunge notevole valore.
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-2.5 items-start">
                                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 text-teal-800">✓</div>
                                <div>
                                  <h5 className="font-bold text-[14.5px] leading-tight text-neutral-900 border-b border-slate-100 pb-1">4. Struttura e Leggibilità ATS</h5>
                                  <p className="text-[13px] text-neutral-700 leading-relaxed mt-1">
                                    I sistemi automatici di screening aziendali (ATS) non leggono bene layout troppo fantasiosi, immagini pesanti o tabelle annidate. Usa un'impaginazione logica standard a colonna singola o doppia con testo nativo selezionabile.
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-2.5 items-start">
                                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 text-teal-800">✓</div>
                                <div>
                                  <h5 className="font-bold text-[14.5px] leading-tight text-neutral-900 border-b border-slate-100 pb-1">5. Foto Professionale Lineare</h5>
                                  <p className="text-[13px] text-neutral-700 leading-relaxed mt-1">
                                    Scegli un'immagine recente con inquadratura frontale a mezzo busto, ben illuminata e con uno sfondo neutro. Evita assolutamente selfie informali, pose ritagliate da scatti di vacanza o foto non professionali.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="bg-teal-50 rounded-xl p-3 border border-teal-100 flex items-start gap-2 mt-2">
                              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                              <p className="text-[13px] text-teal-900 leading-relaxed font-semibold">
                                <strong>Consiglio Mirea:</strong> Quando inserisci o correggi le tue esperienze, la nostra AI verificherà la conformità a questi requisiti prima di guidarti al test.
                              </p>
                            </div>
                          </div>

                          {/* Footer Close Button */}
                          <button 
                            type="button"
                            onClick={() => setShowCvCorrectionTipsModal(false)}
                            style={{ backgroundColor: '#E5D8CF' }}
                            className="w-full text-black font-black py-3 rounded-xl text-[12px] shadow-xs hover:opacity-90 transition shrink-0 mt-3 cursor-pointer"
                          >
                            Ho capito, applica le correzioni
                          </button>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* VIEW 3: CANDIDATE PSYCHOMETRIC TEST */}
              {appState === 'candidate_test' && (
                <div className="space-y-4 pt-1 animate-fade-in text-xs text-left">
                  {showTestIntro ? (
                    <div className="space-y-4">
                      {/* Intro Header */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                        <div className="flex items-center gap-1.5 text-blue-600 font-extrabold text-[12px] uppercase tracking-wider mb-1.5">
                          <Brain className="w-4 h-4 text-blue-500 animate-pulse" />
                          Introduzione al Test Psicometrico
                        </div>
                        <p className="text-[10px] text-slate-600 leading-relaxed font-semibold">
                          Questo test psicometrico esclusivo di Mirea si basa sul rinomato <strong>Modello RIASEC (Codici di Holland)</strong> per l'orientamento di carriera, che descrive sei grandi tipologie di personalità e ambienti di lavoro cooperativi.
                        </p>
                      </div>

                      {/* RIASEC Info Card */}
                      <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm space-y-3.5">
                        <div className="border-b border-slate-100 pb-2">
                          <h4 className="font-black text-[11px] text-slate-800 tracking-tight">
                            I 6 Tratti del Modello RIASEC:
                          </h4>
                          <p className="text-[9px] text-slate-500 mt-0.5 leading-relaxed">
                            L'analisi valuterà la tua corrispondenza rispetto a ognuno di questi profili:
                          </p>
                        </div>

                        {/* Divided into sections as requested */}
                        <div className="grid grid-cols-1 gap-2">
                          <div className="p-2.5 rounded-lg bg-red-50/50 border border-red-100/60 text-left">
                            <span className="font-black text-red-800 text-[10px] block">R - Realistico (I Pratici)</span>
                            <span className="text-[9px] text-slate-600 mt-0.5 block leading-snug">
                              Pragmatici che prediligono attività concrete e manuali, usando strumenti reali per ottenere risultati tangibili.
                            </span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100/60 text-left">
                            <span className="font-black text-blue-800 text-[10px] block">I - Investigativo (I Pensatori)</span>
                            <span className="text-[9px] text-slate-600 mt-0.5 block leading-snug">
                              Guidati da curiosità intellettuale, amano scavare a fondo nei problemi analizzando concetti e dati complessi.
                            </span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-100/60 text-left">
                            <span className="font-black text-amber-800 text-[10px] block">A - Artistico (I Creativi)</span>
                            <span className="text-[9px] text-slate-600 mt-0.5 block leading-snug">
                              Sensibili e inclini all'espressione originale ed estetica, desiderano flessibilità e l'assenza di regole rigide.
                            </span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100/60 text-left">
                            <span className="font-black text-emerald-800 text-[10px] block">S - Sociale (Gli Aiutanti)</span>
                            <span className="text-[9px] text-slate-600 mt-0.5 block leading-snug">
                              Incline all'ascolto benevolo e alla cura del prossimo, traggono profonda motivazione dal migliorare il benessere altrui.
                            </span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-purple-50/50 border border-purple-100/60 text-left">
                            <span className="font-black text-purple-800 text-[10px] block">E - Intraprendente (I Persuasori)</span>
                            <span className="text-[9px] text-slate-600 mt-0.5 block leading-snug">
                              Leader naturali interessati a lanciare iniziative strategiche, gestire progetti ambiziosi e motivare gli altri.
                            </span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-teal-50/50 border border-teal-100/60 text-left">
                            <span className="font-black text-teal-800 text-[10px] block">C - Convenzionale (Gli Organizzatori)</span>
                            <span className="text-[9px] text-slate-600 mt-0.5 block leading-snug">
                              Metodici e precisi, preferiscono lavorare con dati strutturati, catalogazione e flussi organizzativi chiari.
                            </span>
                          </div>
                        </div>

                        {/* Extra sections explanation */}
                        <div className="p-2.5 bg-slate-50 rounded-lg text-[9px] text-slate-500 leading-normal border border-slate-100 text-left">
                          <p className="font-extrabold text-[9.5px] text-slate-700 mb-1">Struttura del test (14 domande totali):</p>
                          <ul className="list-disc pl-3.5 space-y-0.5">
                            <li>Il test sarà diviso in sezioni per indagare ognuna di queste <strong>skills RIASEC</strong> (2 domande per profilo).</li>
                            <li>Troverai una sezione rivolta alla <strong>mobilità lavorativa</strong>.</li>
                            <li>Si concluderà con una fondamentale domanda sulla <strong>gestione dello stress</strong> per l'AI Coach di Mirea.</li>
                          </ul>
                        </div>

                        {/* Start Button */}
                        <button
                          type="button"
                          onClick={() => setShowTestIntro(false)}
                          className="w-full bg-blue-650 hover:bg-blue-700 bg-blue-600 text-white font-black py-2.5 rounded-xl text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                        >
                          <Brain className="w-4 h-4 text-white" />
                          Comincia il Test Psicometrico
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Active Test Screen */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-1.5 text-blue-600 font-extrabold text-[11px] uppercase tracking-wider mb-1">
                          <Brain className="w-4 h-4 text-blue-500" />
                          Test Psicometrico in corso
                        </div>
                        <p className="text-[9.5px] text-slate-500 leading-normal">
                          Rispondi pensando alle tue reali propensioni lavorative e personali.
                        </p>
                      </div>

                      {/* Test step info */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex justify-between items-center text-[9px] text-slate-400 font-semibold font-mono">
                          <span>Sezione: <strong className="text-blue-600 font-black">{gameScenarios[gameStep].category}</strong></span>
                          <span>Domanda {gameStep + 1} di {gameScenarios.length}</span>
                        </div>

                        {/* Dynamic Progress Bar */}
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 transition-all duration-300" 
                            style={{ width: `${((gameStep + 1) / gameScenarios.length) * 100}%` }}
                          ></div>
                        </div>

                        <div className="text-[11px] font-bold text-slate-800 leading-relaxed font-sans bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                          {gameScenarios[gameStep].q}
                        </div>

                        <div className="space-y-2">
                          {gameScenarios[gameStep].options.map((opt, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleTestOptionClick(opt.score)}
                              className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition text-[9px] leading-relaxed font-medium text-slate-700 block bg-white cursor-pointer"
                            >
                              {opt.text}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* VIEW 4: CANDIDATE RESULTS SUMMARY */}
              {appState === 'candidate_result' && (
                <div className="space-y-4 pt-1 animate-fade-in text-center text-xs w-full">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-5">
                    {parsingLoading ? (
                      <div className="py-8 space-y-4 text-slate-500">
                        <RefreshCw className="w-10 h-10 animate-spin text-blue-500 mx-auto" />
                        <div className="space-y-1">
                          <p className="font-extrabold text-xs">Elaborando la tua Mappa dei Talenti...</p>
                          <p className="text-[9px] text-slate-400">Analizziamo le parole chiave del tuo CV ed integriamo i tratti dei test psicometrici.</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {resultStep === 'profile_ready' && (
                          <div className="space-y-5">
                            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 animate-bounce">
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                            
                            <div className="space-y-1.5">
                              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest font-mono block">Onboarding completato</span>
                              <h3 className="font-black text-[15px] text-slate-800 tracking-tight">Profilo generato con successo!</h3>
                            </div>

                            <button
                              type="button"
                              onClick={handleProceedToMixing}
                              style={{ backgroundColor: '#0F4C83' }}
                              className="w-full text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-sm transition cursor-pointer hover:opacity-90"
                            >
                              Procedi
                            </button>
                          </div>
                        )}

                        {resultStep === 'mixing' && (
                          <div className="py-8 space-y-6 text-center">
                            <div className="relative w-16 h-16 mx-auto">
                              <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                              <div className="absolute inset-0 rounded-full border-4 border-[#0F4C83] border-t-transparent animate-spin"></div>
                              <div className="absolute inset-2 rounded-full border-4 border-indigo-400 border-b-transparent animate-[spin_1.5s_linear_infinite_reverse]"></div>
                            </div>
                            
                            <div className="space-y-3 px-2">
                              <span className="text-[9.5px] font-black text-[#0F4C83] uppercase tracking-widest font-mono block animate-pulse">Incrocio dei dati in corso...</span>
                              <h3 className="font-black text-[13.5px] text-slate-800 tracking-tight leading-snug">
                                Stiamo calcolando i tuoi match integrando il test psicometrico col tuo CV
                              </h3>
                              <div className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl max-w-xs mx-auto">
                                <p className="text-[10.5px] text-slate-500 font-sans leading-relaxed font-semibold italic">
                                  {mixingStepText}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {resultStep === 'feedback' && (
                          <div className="space-y-4 text-left pt-1">
                            <div className="w-11 h-11 bg-indigo-50 text-indigo-650 rounded-full flex items-center justify-center mx-auto mb-1">
                              <Sparkles className="w-5.5 h-5.5 text-indigo-600 animate-pulse" />
                            </div>
                            
                            <div className="space-y-1 text-center mb-3">
                              <span className="text-[9.5px] font-black text-indigo-600 uppercase tracking-widest font-mono block">Feedback di Allineamento</span>
                              <h3 className="font-black text-[15px] text-slate-800 tracking-tight">Perfetta Corrispondenza Rilevata!</h3>
                            </div>

                            <div className="space-y-3 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-150">
                              <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                                Il mix tra il tuo curriculum vitae ed i tratti psicometrici del test <strong className="text-slate-900">RIASEC</strong> ha rivelato una eccezionale corrispondenza come:
                              </p>
                              
                              <div 
                                onClick={() => setSelectedRoleExplainName(
                                  selectedRoleExplainName === candidateProfile.professionalTitle 
                                    ? null 
                                    : candidateProfile.professionalTitle
                                )}
                                className={`p-3 rounded-xl border shadow-xs text-center cursor-pointer transition-all duration-155 relative group ${
                                  selectedRoleExplainName === candidateProfile.professionalTitle 
                                    ? 'bg-indigo-100 border-indigo-300 text-indigo-950 ring-1 ring-indigo-200' 
                                    : 'bg-white hover:bg-slate-50 border-indigo-100'
                                }`}
                              >
                                <h4 className="font-extrabold text-[#0F4C83] text-[13px] uppercase tracking-tight font-display flex items-center justify-center gap-1.5">
                                  {candidateProfile.professionalTitle}
                                  <BadgeInfo className="w-3.5 h-3.5 text-indigo-500 hover:text-[#0F4C83] transition-colors shrink-0" />
                                </h4>
                                <span className="text-[8px] font-mono text-slate-400 block mt-1 uppercase tracking-wider">Clicca per spiegazione</span>
                              </div>

                              {candidateProfile.matchedTitles && candidateProfile.matchedTitles.length > 0 && (
                                <div className="space-y-1.5 pt-1">
                                  <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider block">Ruoli Professionali Alternativi Rilevati (clicca per info):</span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {candidateProfile.matchedTitles.map((title, idx) => (
                                      <button 
                                        type="button"
                                        key={idx} 
                                        onClick={() => setSelectedRoleExplainName(
                                          selectedRoleExplainName === title ? null : title
                                        )}
                                        className={`text-left text-[#0F4C83] font-bold text-[9.5px] px-2.5 py-1 rounded-lg border uppercase tracking-tight shadow-2xs cursor-pointer transition-all duration-150 flex items-center gap-1 shrink-0 ${
                                          selectedRoleExplainName === title 
                                            ? 'bg-indigo-150 border-indigo-300 text-indigo-900 shadow-inner' 
                                            : 'bg-white hover:bg-slate-50 border-indigo-100'
                                        }`}
                                      >
                                        <span>{title}</span>
                                        <BadgeInfo className="w-3 h-3 text-[#0F4C83] shrink-0" />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {selectedRoleExplainName && (
                                <div className="bg-white p-3.5 rounded-xl border border-indigo-200 shadow-2xs space-y-2 animate-fade-in text-left">
                                  <div className="flex items-center justify-between border-b border-indigo-50 pb-1">
                                    <div className="flex items-center gap-1 text-[#0F4C83]">
                                      <Activity className="w-3 h-3 text-[#0F4C83] shrink-0 animate-pulse" />
                                      <span className="text-[9.5px] uppercase font-black tracking-wider leading-none text-slate-800">{selectedRoleExplainName}</span>
                                    </div>
                                    <button 
                                      type="button" 
                                      onClick={() => setSelectedRoleExplainName(null)}
                                      className="p-0.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                  <p className="text-[10.5px] text-slate-600 leading-normal font-sans font-medium">
                                    {ROLE_DESCRIPTIONS[selectedRoleExplainName] || "Un ruolo professionale avanzato calcolato integrando la tua storia lavorativa con i tratti RIASEC del test psicometrico."}
                                  </p>
                                </div>
                              )}

                              <p className="text-[10.5px] text-slate-600 leading-relaxed font-sans whitespace-pre-wrap pt-1.5 border-t border-indigo-100/50">
                                {candidateProfile.profileMatchingFeedback || `Le tue spiccate doti di Cooperatività Empatica e Apertura Mentale si sposano meravigliosamente con le competenze chiave e l'esperienza del tuo percorso. Mirea ha personalizzato le tue proposte di lavoro nella Dashboard.`}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setCandidateSubPage('home');
                                setAppState('candidate_home');
                              }}
                              style={{ backgroundColor: '#0F4C83' }}
                              className="w-full text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-sm transition cursor-pointer hover:opacity-90 block text-center"
                            >
                              Accedi alla tua home
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* VIEW 5: CANDIDATE HOME DASHBOARD (Main candidate active view!) */}
              {appState === 'candidate_home' && (
                <div className="space-y-5 pt-2 animate-fade-in text-xs w-full">
                  
                  {/* Top user banner - big centered banner ("mezzo schermo e posto al centro") */}
                  <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center justify-center gap-4 text-center transition-all duration-300">
                    
                    {/* Interactive avatar circle for candidate profile photo */}
                    <div className="relative group shrink-0">
                      <label 
                        className="w-20 h-20 rounded-full bg-white border border-slate-200 flex flex-col items-center justify-center font-bold text-[#0F4C83] text-[12px] overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#0f4c83]/40 transition-all relative shadow-xs"
                        title="Carica foto profilo"
                      >
                        {candidatePhoto ? (
                          <img src={candidatePhoto} alt="Profilo" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[18px] font-black tracking-tighter">
                            {((candidateProfile.name?.[0] || 'E') + (candidateProfile.surname?.[0] || 'C')).toUpperCase()}
                          </span>
                        )}
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  setCandidatePhoto(event.target.result as string);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[9px] font-sans transition-opacity">
                          Carica
                        </div>
                      </label>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      {/* Name candidateProfile on top centered perfectly to the sub-text, settings icon pushed further right */}
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <h2 className="font-black text-slate-800 text-[30px] tracking-tight font-display leading-none">
                          {candidateProfile.name || "Candidato"} {candidateProfile.surname || ""}
                        </h2>
                        <button
                          type="button"
                          onClick={() => {
                            setTempName(candidateProfile.name);
                            setTempSurname(candidateProfile.surname);
                            setTempBirthDate(candidateProfile.birthDate);
                            setTempSearchCity(candidateProfile.searchCity);
                            setTempEmail(candidateProfile.email);
                            setTempSummary(candidateProfile.personalPresentation);
                            setShowEditProfileModal(true);
                          }}
                          title="Modifica Profilo"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#0F4C83] hover:bg-slate-150 bg-slate-100/60 transition cursor-pointer flex items-center justify-center border border-slate-200 shadow-xs shrink-0"
                        >
                          <Settings className="w-4 h-4 animate-[spin_10s_linear_infinite]" />
                        </button>
                      </div>
                      {/* "profilo candidato attivo" below name */}
                      <span className="text-[11px] text-[#0F4C83] uppercase font-extrabold tracking-widest block text-center w-full">
                        profilo candidato attivo
                      </span>
                      {candidateProfile.personalPresentation && (
                        <p className="text-[11.5px] italic text-[#0F4C83] mt-2.5 max-w-sm mx-auto text-center font-sans font-semibold leading-relaxed px-4 animate-fade-in break-words">
                          "{candidateProfile.personalPresentation}"
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Navigation State based content */}
                  {candidateSubPage === 'home' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 items-stretch w-full max-w-3xl mx-auto pt-2 animate-fade-in">
                      {/* LEFT closed button */}
                      <div 
                        onClick={() => setCandidateSubPage('jobs')}
                        className="bg-white p-4.5 rounded-2xl border border-slate-200 hover:border-[#0F4C83] hover:shadow-md transition-all duration-300 cursor-pointer text-left flex flex-col justify-between h-[155px] group"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8.5 h-8.5 rounded-xl bg-[#0F4C83]/5 text-[#0F4C83] flex items-center justify-center transition-all group-hover:scale-105 shrink-0">
                              <Briefcase className="w-4.5 h-4.5 animate-pulse-subtle" />
                            </div>
                            <h4 className="font-extrabold text-[12.5px] text-[#0F4C83] uppercase tracking-wider font-sans leading-snug">
                              Proposte selezionate
                            </h4>
                          </div>
                          <p className="text-[13px] text-slate-500 font-sans leading-relaxed pl-1 font-semibold">
                            Opportunità calcolate sulle tue corrispondenze reali di skill.
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-[12px] uppercase tracking-widest font-bold text-[#0F4C83] mt-1.5 group-hover:translate-x-1 transition-transform self-start pl-1">
                          <span>Accedi</span>
                          <ChevronRightIcon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* MIDDLE closed button */}
                      <div 
                        onClick={() => setCandidateSubPage('calendar')}
                        className="bg-white p-4.5 rounded-2xl border border-slate-200 hover:border-[#0F4C83] hover:shadow-md transition-all duration-300 cursor-pointer text-left flex flex-col justify-between h-[155px] group"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8.5 h-8.5 rounded-xl bg-[#0F4C83]/5 text-[#0F4C83] flex items-center justify-center transition-all group-hover:scale-105 shrink-0">
                              <Calendar className="w-4.5 h-4.5 animate-pulse-subtle" />
                            </div>
                            <h4 className="font-extrabold text-[12.5px] text-[#0F4C83] uppercase tracking-wider font-sans leading-snug">
                              Calendario & Agenda
                            </h4>
                          </div>
                          <p className="text-[13px] text-slate-500 font-sans leading-relaxed pl-1 font-semibold">
                            Gestisci pianificazione, annotazioni e promemoria esportabili.
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-[12px] uppercase tracking-widest font-bold text-[#0F4C83] mt-1.5 group-hover:translate-x-1 transition-transform self-start pl-1">
                          <span>Accedi</span>
                          <ChevronRightIcon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* RIGHT closed button - NOTIFICATIONS (New request!) */}
                      <div 
                        onClick={() => setCandidateSubPage('notifications')}
                        className="bg-white p-4.5 rounded-2xl border border-slate-200 hover:border-[#0F4C83] hover:shadow-md transition-all duration-300 cursor-pointer text-left flex flex-col justify-between h-[155px] group relative"
                      >
                        {companyNotifications.filter(n => !n.replyText).length > 0 && (
                          <span className="absolute top-3.5 right-3.5 bg-rose-500 text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded-full animate-pulse shadow-2xs font-mono">
                            {companyNotifications.filter(n => !n.replyText).length} nuov{companyNotifications.filter(n => !n.replyText).length === 1 ? 'a' : 'e'}
                          </span>
                        )}
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8.5 h-8.5 rounded-xl bg-[#0F4C83]/5 text-[#0F4C83] flex items-center justify-center transition-all group-hover:scale-105 shrink-0">
                              <Bell className="w-4.5 h-4.5 animate-pulse-subtle" />
                            </div>
                            <h4 className="font-extrabold text-[12.5px] text-[#0F4C83] uppercase tracking-wider font-sans leading-snug">
                              Notifiche & Feedback
                            </h4>
                          </div>
                          <p className="text-[13px] text-slate-500 font-sans leading-relaxed pl-1 flex-1 font-semibold">
                            Messaggi delle aziende post-invio CV. Rispondi o lascia un feedback.
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-[12px] uppercase tracking-widest font-bold text-[#0F4C83] mt-1.5 group-hover:translate-x-1 transition-transform self-start pl-1">
                          <span>Apri</span>
                          <ChevronRightIcon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  )}

                  {candidateSubPage === 'jobs' && (
                    <div className="w-full max-w-2xl mx-auto space-y-4 animate-fade-in text-left">
                      {/* Back button */}
                      <button 
                        onClick={() => setCandidateSubPage('home')}
                        className="flex items-center gap-2 text-[#0F4C83] hover:text-[#0f4c83]/80 transition duration-155 group px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-xs font-bold text-[11px] uppercase tracking-wider cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#0F4C83]" />
                        <span>Torna alla home</span>
                      </button>
                      
                      {/* Content title header card */}
                      <div className="bg-[#0F4C83] text-white p-6 rounded-3xl text-left space-y-1 shadow-sm">
                        <div className="flex items-center gap-2 text-white/80 font-mono tracking-widest font-black uppercase text-[9px]">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>Sezione Attiva</span>
                        </div>
                        <h3 className="font-black text-[18px] tracking-tight font-display">Proposte Lavorative Selezionate</h3>
                        <p className="text-[10px] text-white/85 leading-normal">
                          Ogni azienda calcola le reali corrispondenze di soft ed hard skill. Seleziona una proposta per candidarti o simulare un colloquio con l'avatar.
                        </p>
                      </div>

                      {/* Listings Container for jobs */}
                      <div className="space-y-3">
                        {jobPostings.filter(j => j.status === 'active').map((job) => {
                          const matchVal = getJobMatchPercent(job);
                          const isSelected = selectedJob?.id === job.id;
                          return (
                            <div 
                              key={job.id}
                              onClick={() => setSelectedJob(job)}
                              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left space-y-3 ${
                                isSelected 
                                  ? 'bg-white border-[#0F4C83] ring-4 ring-[#0f4c83]/5 shadow-sm' 
                                  : 'bg-white border-slate-200/90 hover:border-slate-350 shadow-xs'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-extrabold text-slate-800 text-[13px] tracking-tight">{job.title}</h5>
                                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{job.company} • {job.location}</p>
                                </div>
                                <span 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowMatchExplainer(true);
                                  }}
                                  title="Clicca per capire come viene calcolato"
                                  className="bg-[#0f4c83]/10 text-[#0f4c83] hover:bg-[#0f4c83]/20 border border-[#0f4c83]/15 font-bold px-2.5 py-1 rounded-full text-[9px] font-mono shrink-0 cursor-help transition duration-155 select-none"
                                >
                                  Match: {matchVal}% ℹ️
                                </span>
                              </div>

                              <p className="text-[10.5px] text-slate-600 leading-relaxed font-sans">
                                {job.description}
                              </p>

                              {/* Responsiveness Score */}
                              <div className="flex items-center justify-center text-[9px] pt-3 border-t border-slate-100/80 font-mono">
                                <div 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowResponsivenessExplainer(true);
                                  }}
                                  title="Clicca per capire questa percentuale"
                                  className="flex items-center gap-1.5 cursor-help hover:opacity-80 transition duration-155 select-none"
                                >
                                  <span className={`w-2 h-2 rounded-full ${job.responsivenessScore >= 80 ? 'bg-emerald-500 animate-pulse' : job.responsivenessScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                                  <span className={`font-semibold ${job.responsivenessScore >= 80 ? 'text-emerald-600' : job.responsivenessScore >= 60 ? 'text-amber-500' : 'text-red-650'}`}>
                                    Responsiveness: {job.responsivenessScore}% ℹ️
                                  </span>
                                </div>
                              </div>

                              {/* Action buttons inside the selected job */}
                              {isSelected && (
                                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100/80 justify-between items-stretch sm:items-center animate-slide-up">
                                  {/* Left action button: Pantone #DD8C8C */}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      launchMockInterview(job);
                                      setIsInterviewModalOpen(true);
                                    }}
                                    style={{ backgroundColor: '#DD8C8C' }}
                                    className="flex-1 text-white hover:opacity-90 font-extrabold text-[11px] py-3 px-4 rounded-xl transition duration-155 transform active:scale-95 shadow-sm text-center font-display cursor-pointer"
                                  >
                                    Simula un colloquio con l'avatar
                                  </button>

                                  {/* Right action button: Pantone #678DC7 */}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleApplyToJob(job);
                                    }}
                                    style={{ backgroundColor: '#678DC7' }}
                                    className="flex-1 text-white hover:opacity-90 font-extrabold text-[11px] py-3 px-4 rounded-xl transition duration-155 transform active:scale-95 shadow-sm text-center font-display cursor-pointer"
                                  >
                                    Candidati
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {candidateSubPage === 'calendar' && (
                    <div className="w-full max-w-2xl mx-auto space-y-4 animate-fade-in text-left">
                      {/* Back button */}
                      <button 
                        onClick={() => setCandidateSubPage('home')}
                        className="flex items-center gap-2 text-[#0F4C83] hover:text-[#0f4c83]/80 transition duration-155 group px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-xs font-bold text-[11px] uppercase tracking-wider cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#0F4C83]" />
                        <span>Torna alla home</span>
                      </button>
                      
                      {/* Calendar title header card */}
                      <div className="bg-[#0F4C83] text-white p-6 rounded-3xl text-left space-y-2 shadow-sm flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2 text-white/80 font-mono tracking-widest font-black uppercase text-[9px]">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Sezione Attiva</span>
                          </div>
                          <h3 className="font-black text-[18px] tracking-tight font-display">Il tuo Calendario</h3>
                          <p className="text-[10px] text-white/85 leading-normal">
                            Gestisci gli appuntamenti, registra lo stress ed esporta i tuoi promemoria.
                          </p>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => setShowAddNote(!showAddNote)}
                          className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition shrink-0 cursor-pointer"
                          title="Aggiungi nota manuale"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>

                      {/* BANNER RICORDO COLLOQUIO & DIALOGO CON AGENTE */}
                      {(() => {
                        const upcomingNote = diaryNotes.find(note => note.interviewCompany);
                        const companyName = upcomingNote ? upcomingNote.interviewCompany : "HexaTech Solutions";

                        return (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#0F4C83]/5 border border-[#0F4C83]/20 p-5 rounded-3xl flex items-start gap-4 shadow-xs animate-fade-in text-left"
                          >
                            <div className="w-10 h-10 rounded-2xl bg-[#0F4C83]/10 text-[#0F4C83] flex items-center justify-center shrink-0 animate-bounce">
                              <Heart className="w-5 h-5 text-[#0F4C83]" />
                            </div>
                            <div className="flex-1 space-y-2.5 text-slate-700 leading-relaxed font-sans text-left">
                              <p className="font-semibold text-slate-800 text-[11px] leading-relaxed">
                                Ti ricordiamo che domani avrai un colloquio con <strong className="text-[#0F4C83] font-black">{companyName}</strong>, se ti trovi in uno stato di ansia o hai bisogno di parlarne con qualcuno, parlane con <strong className="text-[#0F4C83] font-black">Mirea AI</strong>.
                              </p>
                              <div>
                                <button
                                  type="button"
                                  onClick={handleStartMireaSupport}
                                  style={{ backgroundColor: '#0F4C83' }}
                                  className="text-white hover:opacity-90 font-black px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider transition duration-150 cursor-pointer flex items-center gap-1.5 shadow-sm"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  Parla con Mirea AI 💬
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })()}

                      {/* Manual Note Form */}
                      {showAddNote && (
                        <form onSubmit={handleAddDiaryNote} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md space-y-4 animate-slide-up text-left text-[10px]">
                          <h5 className="font-bold text-slate-800 text-[11px] border-b border-slate-100 pb-2">Nuovo Appunto in Agenda</h5>
                          
                          <div>
                            <label className="font-bold text-slate-500 block mb-1">Titolo Annotazione:</label>
                            <input
                              type="text"
                              required
                              value={newNoteTitle}
                              onChange={(e) => setNewNoteTitle(e.target.value)}
                              placeholder="Es: Preparazione colloquio, Note di stress..."
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 outline-none focus:border-blue-500 focus:bg-white text-xs"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-500 block mb-1">Annotazione / Note di Dettaglio:</label>
                            <textarea
                              required
                              value={newNoteContent}
                              onChange={(e) => setNewNoteContent(e.target.value)}
                              placeholder="Inserisci dettagli, pensieri liberi o appunti rassicuranti..."
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 outline-none focus:border-blue-500 focus:bg-white h-20 text-xs"
                            />
                          </div>

                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                            <label className="font-bold text-slate-600 block mb-1">Livello di ansia correlato (1-10):</label>
                            <div className="flex items-center gap-3">
                              <input
                                type="range"
                                min="1"
                                max="10"
                                value={newNoteAnxiety}
                                onChange={(e) => setNewNoteAnxiety(parseInt(e.target.value))}
                                className="flex-1 cursor-pointer h-1.5 bg-slate-200 rounded-lg outline-none accent-[#0F4C83]"
                              />
                              <span className="font-mono font-bold text-[#0F4C83] text-xs shrink-0 bg-white px-2.5 py-1 rounded border border-slate-250">
                                {newNoteAnxiety}/10
                              </span>
                            </div>
                          </div>

                          {/* Toggle Reminder di Colloquio */}
                          <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <input
                              type="checkbox"
                              id="isInterviewReminder"
                              checked={isInterviewReminder}
                              onChange={(e) => setIsInterviewReminder(e.target.checked)}
                              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                            />
                            <label htmlFor="isInterviewReminder" className="font-bold text-slate-700 cursor-pointer select-none text-[10.5px]">
                              Associa a un Evento / Azienda
                            </label>
                          </div>

                          {isInterviewReminder && (
                            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100/65 space-y-3 animate-fade-in text-left">
                              <div>
                                <label className="font-bold text-blue-800 block mb-1 text-[10px]">Nome Azienda / Servizio:</label>
                                <input
                                  type="text"
                                  required={isInterviewReminder}
                                  value={newNoteInterviewCo}
                                  onChange={(e) => setNewNoteInterviewCo(e.target.value)}
                                  placeholder="Es: HexaTech Solutions, Apple..."
                                  className="w-full bg-white border border-slate-200 rounded-lg p-2 outline-none text-xs"
                                />
                              </div>
                              <div>
                                <label className="font-bold text-blue-800 block mb-1 text-[10px]">Pianifica Data & Ora:</label>
                                <input
                                  type="datetime-local"
                                  required={isInterviewReminder}
                                  value={newNoteInterviewDate}
                                  onChange={(e) => setNewNoteInterviewDate(e.target.value)}
                                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                                />
                              </div>
                            </div>
                          )}

                          <button
                            type="submit"
                            className="w-full bg-[#0F4C83] text-white hover:bg-opacity-90 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
                          >
                            Salva Note in Agenda
                          </button>
                        </form>
                      )}

                      {/* Mini Monthly Calendar Box */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-left space-y-2">
                        <h5 className="font-extrabold text-slate-700 text-[10px] uppercase tracking-wider font-mono font-sans">Vista Mensile (Giugno 2026)</h5>
                        
                        <div className="bg-slate-50 p-3 rounded-xl text-[10px] font-mono text-center">
                          <div className="grid grid-cols-7 gap-1 font-bold text-slate-400 mb-1 border-b border-slate-200 pb-1 text-[9.5px]">
                            <span>L</span><span>M</span><span>M</span><span>G</span><span>V</span><span>S</span><span>D</span>
                          </div>
                          <div className="grid grid-cols-7 gap-1.5 font-semibold text-slate-700">
                            <span className="text-slate-300">1</span><span className="text-slate-300">2</span><span className="text-slate-300">3</span>
                            <span>4</span><span>5</span><span>6</span><span>7</span>
                            <span>8</span><span>9</span>
                            {/* Dynamic Highlights or default ones */}
                            <span className="relative font-black bg-[#678DC7] text-white rounded-full flex items-center justify-center w-5 h-5 mx-auto cursor-pointer text-[10px] shadow-xs" title="Colloquio pianificato!">
                              10
                            </span>
                            <span>11</span><span>12</span><span>13</span><span>14</span>
                            <span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span>
                            <span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span>
                          </div>
                        </div>
                      </div>

                      {/* List of active interviews / reminders */}
                      <div className="space-y-3 text-left">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono font-sans">Promemoria dell'Agenda:</span>
                        {diaryNotes.some(n => !!n.interviewCompany) ? (
                          diaryNotes.filter(n => !!n.interviewCompany).map(note => {
                            const isApplicationCV = note.title.toLowerCase().includes("candidatura");
                            return (
                              <div key={note.id} className={`${isApplicationCV ? 'bg-indigo-50/70 border-indigo-200' : 'bg-blue-50/55 border-blue-100/85'} p-4 rounded-2xl border text-left space-y-2 transition-all duration-150`}>
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-1.5">
                                    <span className={`w-2 h-2 rounded-full ${isApplicationCV ? 'bg-indigo-500' : 'bg-blue-500'}`}></span>
                                    <span className="font-extrabold text-slate-800 text-[11.5px]">
                                      {isApplicationCV ? `Invio CV: ${note.interviewCompany}` : note.interviewCompany}
                                    </span>
                                  </div>
                                  <span className={`text-[9px] font-bold bg-white px-2.5 py-0.5 rounded-full border font-sans ${isApplicationCV ? 'text-indigo-700 border-indigo-200' : 'text-blue-700 border-blue-100'}`}>
                                    {isApplicationCV ? 'In attesa' : (note.interviewDate ? new Date(note.interviewDate).toLocaleString([], {month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'}) : 'Pianificato')}
                                  </span>
                                </div>
                                
                                {isApplicationCV ? (
                                  <p className="text-[10.5px] text-slate-700 leading-relaxed font-sans font-medium">
                                    Hai inviato con successo il CV a <strong className="text-slate-900">{note.interviewCompany}</strong>. Si attende una risposta da parte dell'azienda per poter procedere al colloquio.
                                  </p>
                                ) : (
                                  <p className="text-[10.5px] text-slate-600 leading-relaxed italic">"{note.content}"</p>
                                )}
                                
                                {!isApplicationCV && (
                                  <div className="flex gap-1.5 justify-end">
                                    <button
                                      type="button"
                                      onClick={() => triggerCalendarIntent(note)}
                                      className="bg-white hover:bg-slate-50 text-blue-700 text-[9px] font-extrabold py-1.5 px-3 rounded-lg border border-blue-200 flex items-center gap-1 transition-all cursor-pointer"
                                    >
                                      <CalendarIcon className="w-3 h-3 text-blue-600" />
                                      esporta su calendario
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-[10px] text-slate-400 italic">Nessun colloquio programmato. Candidati o segna un appunto per impostarlo.</p>
                        )}
                      </div>

                      {/* Complete Notes Section */}
                      <div className="space-y-3.5 text-left bg-slate-50 p-4 rounded-2xl border border-slate-150">
                        <span className="text-[10px] font-extrabold text-[#000000] uppercase tracking-widest block font-mono font-sans">Note & Appunti di {candidateProfile.name || "Elisa"}:</span>
                        <div className="max-h-[380px] overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                          {diaryNotes.map(note => (
                            <div key={note.id} className="bg-white p-4 rounded-xl border border-slate-200 text-left space-y-2.5 shadow-xs">
                              <div className="flex justify-between items-start">
                                <h5 className="font-extrabold text-slate-800 text-[11.5px] leading-tight">{note.title}</h5>
                                <span className="text-[9px] text-slate-400 font-mono font-medium">{note.date}</span>
                              </div>
                              <p className="text-[10.5px] text-slate-650 leading-normal">{note.content}</p>
                              
                              <div className="flex justify-between items-center pt-2.5 border-t border-slate-100/60 text-[9px] font-semibold text-amber-700">
                                <div>Livello d'Ansia: {note.anxietyLevel}/10</div>
                                <button
                                  type="button"
                                  onClick={() => triggerShareIntent(note)}
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-1 px-2.5 rounded-lg transition flex items-center gap-1 text-[8.5px] cursor-pointer"
                                >
                                  <Share2 className="w-3 h-3" />
                                  Condividi Nota
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {candidateSubPage === 'notifications' && (
                    <div className="w-full max-w-2xl mx-auto space-y-4 animate-fade-in text-left pb-12">
                      {/* Back button */}
                      <button 
                        onClick={() => setCandidateSubPage('home')}
                        className="flex items-center gap-2 text-[#0F4C83] hover:text-[#0f4c83]/80 transition duration-155 group px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-xs font-bold text-[11px] uppercase tracking-wider cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#0F4C83]" />
                        <span>Torna alla home</span>
                      </button>

                      {/* Header card with gradient */}
                      <div className="bg-gradient-to-br from-[#0F4C83] to-[#2E6B9E] text-white p-6 rounded-3xl text-left space-y-3/2 shadow-sm flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-white/85 font-mono tracking-widest font-black uppercase text-[9px]">
                            <Bell className="w-3.5 h-3.5 text-rose-300 animate-pulse animate-[bounce_2s_infinite]" />
                            <span>Area Riservata</span>
                          </div>
                          <h3 className="font-black text-[18px] tracking-tight font-display">Centro Notifiche & Feedback</h3>
                          <p className="text-[10px] text-white/90 leading-normal">
                            Consulta i messaggi ricevuti dalle aziende dopo l'invio del tuo CV o a seguito di un colloquio. Rispondi ed esprimi la tua opinione.
                          </p>
                        </div>
                        <div className="bg-white/10 px-3.5 py-2.5 rounded-2xl border border-white/15 text-center shrink-0">
                          <span className="text-[14px] font-black block text-rose-200 font-mono">
                            {companyNotifications.filter(n => !n.replyText).length}
                          </span>
                          <span className="text-[7.5px] uppercase font-bold tracking-wider text-white/70 font-mono">In sospeso</span>
                        </div>
                      </div>

                      {/* Notifications Feed */}
                      <div className="space-y-4">
                        {companyNotifications.map((notif) => {
                          const isPositive = notif.status === 'positive';
                          const isPostInterview = notif.type === 'post_interview';
                          return (
                            <div key={notif.id} className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:shadow-sm">
                              {/* Header Bar */}
                              <div className={`px-5 py-3 border-b flex justify-between items-center ${isPositive ? 'bg-emerald-50/40 border-emerald-100/50' : 'bg-rose-50/10 border-rose-100/30'}`}>
                                <div className="flex items-center gap-2">
                                  <span className={`w-2.5 h-2.5 rounded-full ${isPositive ? 'bg-emerald-500' : 'bg-rose-400'}`}></span>
                                  <span className="font-black text-slate-800 text-[12px]">{notif.company}</span>
                                </div>
                                <span className={`text-[8.5px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${isPositive ? 'bg-emerald-100/30 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-650 border-red-100'}`}>
                                  {notif.type === 'post_interview' ? 'Post-Colloquio' : 'Lettura CV'}
                                </span>
                              </div>

                              {/* Card Body content */}
                              <div className="p-5 space-y-4">
                                <div className="space-y-1.5">
                                  <div className="flex justify-between items-center text-[9.5px]">
                                    <span className="text-slate-400 font-mono font-bold">{notif.date}</span>
                                    <span className="font-extrabold text-slate-500">Ruolo: {notif.role}</span>
                                  </div>
                                  <p className="text-[11.5px] text-slate-700 leading-relaxed font-sans font-medium whitespace-pre-wrap">
                                    {notif.bodyText}
                                  </p>
                                </div>

                                {/* Reply Section */}
                                <div className="pt-3.5 border-t border-slate-100 space-y-2">
                                  {notif.replyText ? (
                                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-[10.5px] space-y-1">
                                      <div className="flex items-center justify-between text-[8px] uppercase tracking-wider font-extrabold text-indigo-700">
                                        <span>Il tuo messaggio di risposta:</span>
                                        <span className="text-emerald-600 font-bold">Inviato con successo</span>
                                      </div>
                                      <p className="text-slate-700 leading-relaxed italic">"{notif.replyText}"</p>
                                    </div>
                                  ) : (
                                    <div>
                                      {activeReplyNotifId === notif.id ? (
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 animate-slide-down">
                                          <label className="text-[9.5px] uppercase font-black tracking-wider text-slate-500 flex items-center gap-1.5">
                                            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                                            <span>Componi la tua risposta:</span>
                                          </label>
                                          <textarea
                                            value={replyInputText}
                                            onChange={(e) => setReplyInputText(e.target.value)}
                                            placeholder="Es: Vi ringrazio per lo splendido riscontro! Sarei molto felice di incontrare il Board e approfondire questa opportunità. A presto."
                                            className="w-full text-[11px] p-3 rounded-xl border border-slate-300 focus:ring-1 focus:ring-[#0F4C83] bg-white outline-none min-h-[75px] resize-none leading-relaxed font-sans"
                                          />
                                          <div className="flex items-center gap-2 bg-[#0F4C83]/5 p-2 rounded-xl border border-[#0F4C83]/10">
                                            <Sparkles className="w-3.5 h-3.5 text-[#0F4C83] shrink-0" />
                                            <p className="text-[8.5px] text-slate-650 leading-normal font-sans text-left">
                                              <strong>Consiglio di Mirea:</strong> Rispondi esprimendo gratitudine e sottolineando la tua attitudine elastica o competenze di autogoverno.
                                            </p>
                                          </div>
                                          <div className="flex gap-2 justify-end">
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setActiveReplyNotifId(null);
                                                setReplyInputText('');
                                              }}
                                              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition text-[9px] font-bold cursor-pointer"
                                            >
                                              Annulla
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                if (replyInputText.trim()) {
                                                  setCompanyNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, replyText: replyInputText } : n));
                                                  setActiveReplyNotifId(null);
                                                  setReplyInputText('');
                                                }
                                              }}
                                              className="px-3.5 py-1.5 rounded-lg bg-[#0F4C83] text-white hover:opacity-90 transition text-[9px] font-bold cursor-pointer"
                                            >
                                              Invia risposta
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setActiveReplyNotifId(notif.id);
                                            setReplyInputText('');
                                          }}
                                          className="text-[9.5px] font-black text-[#0F4C83] hover:underline flex items-center gap-1 cursor-pointer"
                                        >
                                          <MessageSquare className="w-3.5 h-3.5" />
                                          <span>Invia messaggio all'azienda</span>
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>

                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* INTERACTIVE MATCH EXPLAINER BANNER */}
                  <AnimatePresence>
                    {showMatchExplainer && (
                      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 block" onClick={() => setShowMatchExplainer(false)}></div>
                        <motion.div 
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.95, opacity: 0 }}
                          className="relative bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full border border-slate-100 text-left space-y-4 z-50 pointer-events-auto"
                        >
                          <button 
                            type="button"
                            onClick={() => setShowMatchExplainer(false)}
                            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#0F4C83]/10 text-[#0F4C83] flex items-center justify-center shrink-0">
                              <Sparkles className="w-5 h-5 text-[#0F4C83]" />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-[13px] text-slate-900 tracking-tight font-display mb-0.5 animate-pulse">Cos'è il Match?</h4>
                              <p className="text-[8px] text-slate-400 font-mono uppercase tracking-wider leading-none">Indicatore di Corrispondenza</p>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                            <p className="text-[11px] text-slate-850 font-extrabold leading-relaxed font-sans">
                              "Questa percentuale indica quanto il tuo profilo sia adeguato a quello che questa azienda sta ricercando".
                            </p>
                          </div>
                          
                          <p className="text-[10px] text-slate-500 leading-relaxed font-sans font-medium">
                            Questo valore viene ricalcolato in tempo reale non appena completi l'onboarding e scompatto il tuo CV. L'IA analizza le soft skill, le hard skill e il test psicometrico per stabilire la compatibilità autentica.
                          </p>
                          
                          <button
                            type="button"
                            onClick={() => setShowMatchExplainer(false)}
                            className="w-full bg-[#0F4C83] text-white font-extrabold py-2.5 rounded-xl text-xs hover:bg-[#0f4c83]/90 transition"
                          >
                            Ho Capito!
                          </button>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>

                  {/* INTERACTIVE RESPONSIVENESS EXPLAINER BANNER */}
                  <AnimatePresence>
                    {showResponsivenessExplainer && (
                      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 block" onClick={() => setShowResponsivenessExplainer(false)}></div>
                        <motion.div 
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.95, opacity: 0 }}
                          className="relative bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full border border-slate-100 text-left space-y-4 z-50 pointer-events-auto"
                        >
                          <button 
                            type="button"
                            onClick={() => setShowResponsivenessExplainer(false)}
                            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                              <Activity className="w-5 h-5 text-teal-600" />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-[13px] text-slate-900 tracking-tight font-display mb-0.5 animate-pulse">Cos'è la Responsiveness?</h4>
                              <p className="text-[8px] text-slate-400 font-mono uppercase tracking-wider leading-none">Trasparenza Aziendale</p>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                            <p className="text-[11px] text-slate-850 font-extrabold leading-relaxed font-sans">
                              "Questa percentuale indica quanto questa azienda fornisce feedback positivi o negativi al candidato."
                            </p>
                          </div>
                          
                          <p className="text-[10px] text-slate-500 leading-relaxed font-sans font-medium">
                            Su Mirea, le aziende che lasciano i candidati nel silenzio ("ghosting") subiscono una decrescita di questo punteggio. Più alto è il numero, più l'azienda è trasparente e tempestiva nel dare riscontri (esiti positivi o negativi).
                          </p>
                          
                          <button
                            type="button"
                            onClick={() => setShowResponsivenessExplainer(false)}
                            className="w-full bg-[#0F4C83] text-white font-extrabold py-2.5 rounded-xl text-xs hover:bg-[#0f4c83]/90 transition"
                          >
                            Ho Capito!
                          </button>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>



                  {/* MODAL: APPLICATION SUCCESS FEEDBACK */}
                  <AnimatePresence>
                    {applicationSuccessCompany && (
                      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
                        <div className="absolute inset-0 block" onClick={() => setApplicationSuccessCompany(null)}></div>
                        <motion.div 
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.95, opacity: 0 }}
                          className="relative bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full border border-slate-100 text-left space-y-4 z-50 pointer-events-auto"
                        >
                          <button 
                            type="button"
                            onClick={() => setApplicationSuccessCompany(null)}
                            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          
                          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-650 flex items-center justify-center shrink-0">
                              <Check className="w-5 h-5 text-emerald-650" />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-[13px] text-slate-900 tracking-tight font-display mb-0.5">Invio Curriculum Completato!</h4>
                              <p className="text-[8px] text-slate-400 font-mono uppercase tracking-wider leading-none">{applicationSuccessCompany}</p>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-emerald-50 border border-emerald-100/60 rounded-2xl">
                            <p className="text-[11px] text-slate-800 leading-relaxed font-sans font-semibold">
                              Il tuo curriculum è stato inviato con successo! Se l'azienda pensa che la tua figura possa essere adeguata, riceverai una notifica nella sezione calendario per fissare un colloquio.
                            </p>
                          </div>
                          
                          <p className="text-[10px] text-slate-500 leading-relaxed font-sans mt-2">
                            Mirea ha aggiunto un promemoria nel calendario della tua area riservata. Se ti senti in ansia nell'attesa dell'esito, puoi parlarne subito con l'assistente virtuale!
                          </p>

                          <div className="flex gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                setApplicationSuccessCompany(null);
                                handleStartMireaSupport();
                              }}
                              className="flex-1 bg-[#0F4C83] hover:bg-[#0F4C83]/90 text-white font-extrabold py-2.5 rounded-xl text-[10px] uppercase tracking-wider transition text-center cursor-pointer flex items-center justify-center gap-1"
                            >
                              Parla con Mirea AI 💬
                            </button>
                            <button
                              type="button"
                              onClick={() => setApplicationSuccessCompany(null)}
                              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold py-2.5 rounded-xl text-[10px] uppercase tracking-wider transition text-center cursor-pointer"
                            >
                              Chiudi
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>



                  {/* MODAL: EDIT PROFILE FORM */}
                  <AnimatePresence>
                    {showEditProfileModal && (
                      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 block" onClick={() => setShowEditProfileModal(false)}></div>
                        <motion.div 
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.95, opacity: 0 }}
                          className="relative bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full border border-slate-100 text-left space-y-4 z-50 pointer-events-auto max-h-[90vh] overflow-y-auto"
                        >
                          <button 
                            type="button"
                            onClick={() => setShowEditProfileModal(false)}
                            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          
                          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                            <div className="w-9 h-9 rounded-xl bg-[#0F4C83]/10 text-[#0F4C83] flex items-center justify-center shrink-0">
                              <Settings className="w-5 h-5 text-[#0F4C83]" />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-[13px] text-slate-900 tracking-tight font-display">Modifica Profilo</h4>
                              <p className="text-[8px] text-slate-400 font-mono uppercase tracking-wider leading-none">Impostazioni Personali</p>
                            </div>
                          </div>

                          <form 
                            onSubmit={(e) => {
                              e.preventDefault();
                              setCandidateProfile({
                                ...candidateProfile,
                                name: tempName,
                                surname: tempSurname,
                                birthDate: tempBirthDate,
                                searchCity: tempSearchCity,
                                email: tempEmail,
                                personalPresentation: tempSummary
                              });
                              setShowEditProfileModal(false);
                            }}
                            className="space-y-3 pt-1 text-xs"
                          >
                            <div className="grid grid-cols-2 gap-3.5">
                              <div>
                                <label className="text-[9px] font-black text-black uppercase tracking-wider block mb-1">Nome:</label>
                                <input
                                  type="text"
                                  value={tempName}
                                  onChange={(e) => setTempName(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[11px] font-bold text-slate-850 focus:bg-white focus:ring-1 focus:ring-[#0F4C83] focus:border-[#0F4C83] outline-none transition"
                                  required
                                />
                              </div>
                              <div>
                                <label className="text-[9px] font-black text-black uppercase tracking-wider block mb-1">Cognome:</label>
                                <input
                                  type="text"
                                  value={tempSurname}
                                  onChange={(e) => setTempSurname(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[11px] font-bold text-slate-850 focus:bg-white focus:ring-1 focus:ring-[#0F4C83] focus:border-[#0F4C83] outline-none transition"
                                  required
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3.5">
                              <div>
                                <label className="text-[9px] font-black text-black uppercase tracking-wider block mb-1">Nascita:</label>
                                <input
                                  type="text"
                                  value={tempBirthDate}
                                  onChange={(e) => setTempBirthDate(e.target.value)}
                                  placeholder="GG/MM/AAAA"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[11px] font-bold text-slate-850 focus:bg-white focus:ring-1 focus:ring-[#0F4C83] focus:border-[#0F4C83] outline-none transition"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] font-black text-black uppercase tracking-wider block mb-1">Città:</label>
                                <input
                                  type="text"
                                  value={tempSearchCity}
                                  onChange={(e) => setTempSearchCity(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[11px] font-bold text-slate-850 focus:bg-white focus:ring-1 focus:ring-[#0F4C83] focus:border-[#0F4C83] outline-none transition"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-[9px] font-black text-black uppercase tracking-wider block mb-1">E-mail di Contatto:</label>
                              <input
                                type="email"
                                value={tempEmail}
                                onChange={(e) => setTempEmail(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[11px] font-bold text-slate-850 focus:bg-white focus:ring-1 focus:ring-[#0F4C83] focus:border-[#0F4C83] outline-none transition"
                              />
                            </div>

                            <div>
                              <label className="text-[9px] font-black text-black uppercase tracking-wider block mb-1">Presentazione / Bio Breve:</label>
                              <textarea
                                value={tempSummary}
                                onChange={(e) => setTempSummary(e.target.value)}
                                rows={4}
                                placeholder="Scrivi liberamente la tua presentazione o bio personale..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] font-bold text-slate-850 focus:bg-white focus:ring-1 focus:ring-[#0F4C83] focus:border-[#0F4C83] outline-none transition resize-y min-h-[80px] leading-relaxed"
                              />
                            </div>

                            <div className="flex gap-3 pt-2">
                              <button
                                type="button"
                                onClick={() => setShowEditProfileModal(false)}
                                className="flex-1 bg-slate-100 text-slate-700 font-extrabold py-2.5 rounded-xl text-xs hover:bg-slate-200 transition uppercase tracking-wider"
                              >
                                Annulla
                              </button>
                              <button
                                type="submit"
                                className="flex-1 bg-[#0F4C83] text-white font-extrabold py-2.5 rounded-xl text-xs hover:bg-[#0f4c83]/90 transition uppercase tracking-wider"
                              >
                                Salva
                              </button>
                            </div>
                          </form>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>

                  {/* FLOATING SUCCESS/WARNING TOAST SYSTEM */}
                  <AnimatePresence>
                    {toastNotification && (
                      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] max-w-sm w-full px-4 text-center pointer-events-none">
                        <motion.div
                          initial={{ opacity: 0, y: 30, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 20, scale: 0.95 }}
                          className={`p-4 rounded-2xl shadow-2xl border flex items-start gap-3 backdrop-blur-md pointer-events-auto ${
                            toastNotification.type === 'success' 
                              ? 'bg-emerald-900/95 border-emerald-500/30 text-white' 
                              : toastNotification.type === 'warning' 
                                ? 'bg-amber-950/95 border-amber-500/30 text-white' 
                                : 'bg-slate-900/95 border-slate-700/30 text-white'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            toastNotification.type === 'success' 
                              ? 'bg-emerald-500/20 text-emerald-300' 
                              : toastNotification.type === 'warning' 
                                ? 'bg-amber-500/20 text-amber-300' 
                                : 'bg-indigo-500/20 text-indigo-300'
                          }`}>
                            {toastNotification.type === 'success' ? <Check className="w-4.5 h-4.5" /> : <ShieldAlert className="w-4.5 h-4.5" />}
                          </div>
                          <div className="text-left flex-1 min-w-0">
                            <h4 className="font-extrabold text-[12px] leading-snug tracking-tight uppercase font-display">{toastNotification.message}</h4>
                            {toastNotification.subMessage && (
                              <p className="text-[10px] text-slate-200 mt-1 leading-normal font-sans font-medium">{toastNotification.subMessage}</p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => setToastNotification(null)}
                            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition shrink-0 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>

                </div>
              )}

              {/* VIEW: RECRUITER LOGIN */}
              {appState === 'recruiter_login' && (
                <div className="space-y-4 pt-1 animate-fade-in text-left">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                    <span 
                      style={{ color: '#D8864E', backgroundColor: '#D8864E1A' }} 
                      className="text-[8.5px] font-black py-0.5 px-2 rounded-md uppercase tracking-wider block w-fit"
                    >
                      Mirea Recruiter Access
                    </span>
                    <h3 className="font-extrabold text-[12.5px] text-slate-800 uppercase tracking-tight">Area Riservata Recruiter</h3>
                    <p className="text-[10px] text-slate-500 leading-normal font-sans font-medium">
                      In conformità con il Patto di Responsabilità Mirea, seleziona la tua azienda partner e inserisci le credenziali di accesso per gestire le offerte e valutare i candidati.
                    </p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!recruiterEmail.trim() || !recruiterPassword.trim()) {
                        triggerToast("Errore di compilazione", "Tutti i campi sono obbligatori per accedere.", "warning");
                        return;
                      }
                      setAppState('recruiter_home');
                      
                      const compName = selectedRecruiterComp === 'comp-a' ? 'HexaTech Solutions' :
                                       selectedRecruiterComp === 'comp-b' ? 'Synapse Digital' :
                                       selectedRecruiterComp === 'comp-c' ? 'Aether Cloud' : 
                                       'Delta Group';
                      
                      triggerToast(
                        "Accesso Effettuato", 
                        `Benvenuto nel pannello amministrativo di ${compName}.`, 
                        "success"
                      );
                    }} 
                    className="space-y-3"
                  >
                    {/* Select Company */}
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5 shadow-xs">
                      <label className="text-[8.5px] font-black text-[#0F4C83] uppercase tracking-widest block font-mono">
                        Scegli la tua Azienda
                      </label>
                      <select
                        value={selectedRecruiterComp}
                        required
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedRecruiterComp(val);
                          // Auto prefill domain to make it feel authentic & realistic
                          const domain = val === 'comp-a' ? 'hexatech.com' :
                                         val === 'comp-b' ? 'synapsedigital.com' :
                                         val === 'comp-c' ? 'aethercloud.com' : 'deltagroup.com';
                          setRecruiterEmail(`hr@${domain}`);
                        }}
                        className="w-full bg-slate-50 border border-slate-300 p-2 rounded-xl text-xs outline-none focus:bg-white focus:ring-1 focus:ring-[#D8864E]/50 focus:border-[#D8864E] transition-all text-slate-800 font-bold"
                      >
                        <option value="comp-a">HexaTech Solutions</option>
                        <option value="comp-b">Synapse Digital</option>
                        <option value="comp-c">Aether Cloud</option>
                        <option value="comp-d">Delta Group</option>
                      </select>
                    </div>

                    {/* Email & Password */}
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 space-y-3 shadow-xs">
                      <div className="space-y-1">
                        <label className="text-[8.5px] font-black text-[#0F4C83] uppercase tracking-widest block font-mono">
                          Email Aziendale
                        </label>
                        <input
                          type="email"
                          required
                          value={recruiterEmail}
                          onChange={(e) => setRecruiterEmail(e.target.value)}
                          placeholder="hr@hexatech.com"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 outline-none focus:bg-white focus:ring-1 focus:ring-[#D8864E]/50 focus:border-[#D8864E] transition-all text-xs text-slate-800 font-medium"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[8.5px] font-black text-[#0F4C83] uppercase tracking-widest block font-mono">
                          Password Aziendale
                        </label>
                        <input
                          type="password"
                          required
                          value={recruiterPassword}
                          onChange={(e) => setRecruiterPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 outline-none focus:bg-white focus:ring-1 focus:ring-[#D8864E]/50 focus:border-[#D8864E] transition-all text-xs text-slate-800 font-medium font-mono"
                        />
                      </div>
                    </div>

                    {/* Submit & Back Action button */}
                    <div className="space-y-2 pt-1">
                      <button
                        type="submit"
                        style={{ backgroundColor: '#D8864E' }}
                        className="w-full hover:shadow-md hover:shadow-amber-900/30 text-white p-3 rounded-xl text-[11px] font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs animate-pulse-subtle"
                      >
                        <LogIn className="w-4 h-4 text-white" />
                        <span>Accedi alla Home Aziendale</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAppState('login_selection')}
                        className="w-full text-slate-500 hover:text-slate-800 text-[10px] font-bold py-1.5 px-2 rounded hover:bg-slate-100 block text-center"
                      >
                        Torna alla Selezione di Accesso
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* VIEW 6: RECRUITER ACTIVE HOME DASHBOARD */}
              {/* VIEW 6: RECRUITER ACTIVE HOME DASHBOARD */}
              {appState === 'recruiter_home' && (() => {
                const relevantApps = recruiterApplications.filter(app => app.companyId === selectedRecruiterComp);
                return (
                  <div className="space-y-3.5 pt-1 animate-fade-in text-xs text-left">
                    
                    {/* Logged in Company Widget */}
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 text-sans">
                      <div className="space-y-0.5">
                        <span className="text-[8px] bg-emerald-50 text-emerald-700 font-extrabold py-0.5 px-1.5 rounded uppercase tracking-wider block w-fit">
                          Connesso • Portale Mirea Partner
                        </span>
                        <h4 className="font-extrabold text-[12px] text-slate-800">
                          {selectedRecruiterComp === 'comp-a' ? 'HexaTech Solutions' :
                           selectedRecruiterComp === 'comp-b' ? 'Synapse Digital' :
                           selectedRecruiterComp === 'comp-c' ? 'Aether Cloud' : 'Delta Group'}
                        </h4>
                        <p className="text-[9.5px] text-slate-500">
                          Sessione attiva per: <strong className="text-slate-700 font-semibold">{recruiterEmail}</strong>
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setAppState('recruiter_login');
                          triggerToast("Disconnessione", "Sessione aziendale chiusa con successo.", "info");
                        }}
                        className="text-[9px] font-bold text-slate-500 hover:text-red-650 hover:bg-red-50 px-2 py-1.5 rounded-lg border border-slate-200/60 hover:border-red-200 transition shrink-0 cursor-pointer"
                      >
                        Esci
                      </button>
                    </div>

                    {/* Add listing inline form */}
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <h5 className="font-extrabold text-[10px] text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b pb-1">
                        <Plus className="w-4 h-4 text-emerald-500" />
                        Pubblica Nuova Offerta Mirea
                      </h5>

                      <form onSubmit={handleRecruiterPostJob} className="space-y-2.5 text-[9.5px]">
                        <div>
                          <label className="font-bold text-slate-500 block mb-0.5">Qualifica / Ruolo:</label>
                          <input
                            type="text"
                            required
                            value={recruiterJobForm.title}
                            onChange={(e) => setRecruiterJobForm({ ...recruiterJobForm, title: e.target.value })}
                            placeholder="Es: Junior React Engineer"
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1.5 outline-none focus:bg-white text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="font-bold text-slate-500 block mb-0.5">Sede:</label>
                            <input
                              type="text"
                              required
                              value={recruiterJobForm.location}
                              onChange={(e) => setRecruiterJobForm({ ...recruiterJobForm, location: e.target.value })}
                              placeholder="Es: Milano / Remote"
                              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1.5 outline-none focus:bg-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-slate-500 block mb-0.5">Skill Chiave (separate da virgola):</label>
                            <input
                              type="text"
                              value={recruiterJobForm.requiredSkills}
                              onChange={(e) => setRecruiterJobForm({ ...recruiterJobForm, requiredSkills: e.target.value })}
                              placeholder="Es: Figma, Sviluppo Liquido"
                              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1.5 outline-none focus:bg-white text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-bold text-slate-500 block mb-0.5">Descrizione dell'Incarico:</label>
                          <textarea
                            required
                            value={recruiterJobForm.description}
                            onChange={(e) => setRecruiterJobForm({ ...recruiterJobForm, description: e.target.value })}
                            placeholder="Racconta brevemente gli obiettivi con trasparenza, evitando requisiti esorbitanti fuori luogo..."
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1.5 outline-none h-14 text-xs resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-2 rounded-xl text-[10.5px] transition shadow-sm"
                        >
                          Pubblica Posizione
                        </button>
                      </form>
                    </div>

                    {/* SEZIONE NOTIFICHE: CANDIDATURE RICEVUTE */}
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b pb-2">
                        <h5 className="font-extrabold text-[10.5px] text-[#0F4C83] uppercase tracking-wider flex items-center gap-1.5">
                          <Bell className="w-4 h-4 text-[#0F4C83] animate-pulse-subtle" />
                          Notifiche Candidature Ricevute ({relevantApps.length})
                        </h5>
                      </div>

                      {relevantApps.length === 0 ? (
                        <div className="p-4 text-center text-slate-400 font-sans space-y-1">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                            <Bell className="w-4 h-4 stroke-[1.5]" />
                          </div>
                          <p className="text-[10px] font-semibold">Nessuna candidatura per questa azienda.</p>
                          <p className="text-[9px] text-slate-400">Pubblica un'offerta di lavoro etica per simulare l'arrivo immediato di nuovi talenti.</p>
                        </div>
                      ) : (
                        <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                          {relevantApps.map((appl) => {
                            const isReplyingThis = activeRecruiterReplyId === appl.id;
                            return (
                              <div key={appl.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 relative space-y-3 transition-colors hover:bg-slate-50/80">
                                
                                {/* Candidate Header */}
                                <div className="flex items-start justify-between">
                                  <div className="space-y-0.5">
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse-subtle shrink-0"></span>
                                      <h6 className="font-extrabold text-slate-800 text-[11.5px] leading-tight">
                                        {appl.candidateName} {appl.candidateSurname}
                                      </h6>
                                      {appl.isLoggedCandidate && (
                                        <span className="text-[7.5px] px-1 bg-teal-50 border border-teal-200 text-teal-750 rounded font-black font-mono uppercase shrink-0">Live</span>
                                      )}
                                    </div>
                                    <p className="text-[9.5px] text-indigo-700 font-bold leading-none">{appl.professionalTitle}</p>
                                    <p className="text-[8.5px] text-slate-400">Posizione: <strong className="text-slate-600">{appl.jobTitle}</strong></p>
                                  </div>
                                  <span className="text-[8px] text-slate-400 bg-slate-200/50 px-1.5 py-0.5 rounded font-mono shrink-0">{appl.date}</span>
                                </div>

                                {/* Personal presentation text */}
                                <p className="text-[10px] text-slate-600 italic bg-white/80 p-2 rounded-lg border border-slate-100 font-sans leading-relaxed">
                                  "{appl.summary}"
                                </p>

                                {/* Skills Tags */}
                                <div className="space-y-1">
                                  <span className="block text-[8px] uppercase tracking-wider font-bold text-slate-400 leading-none">Corrispondenze Real Skill:</span>
                                  <div className="flex flex-wrap gap-1">
                                    {appl.skills.map((skill: string, index: number) => (
                                      <span key={index} className="text-[8px] px-1.5 py-0.5 rounded-md font-bold bg-[#0F4C83]/5 text-[#0F4C83] border border-[#0F4C83]/10">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* RIASEC Psychometrics */}
                                <div className="bg-amber-50/70 border border-amber-200/40 p-2 rounded-lg text-[9.5px] text-slate-700 flex items-center gap-1.5 leading-tight">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  <div>
                                    <span className="font-extrabold text-amber-800 uppercase tracking-widest text-[7.5px] block leading-none">Corrispondenza Mirea RIASEC:</span>
                                    <span className="font-semibold text-slate-600">{appl.riasecProfile}</span>
                                  </div>
                                </div>

                                {/* Reply Output or Input form */}
                                {appl.isReplied ? (
                                  <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-[#0F4C83] space-y-1">
                                    <div className="flex items-center gap-1 text-emerald-800 text-[9px] font-extrabold uppercase tracking-wider">
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>Risposta inviata ed elaborata</span>
                                    </div>
                                    <p className="text-[9.5px] leading-relaxed italic text-indigo-950 font-semibold text-slate-700">"{appl.replyText}"</p>
                                  </div>
                                ) : (
                                  <div className="space-y-2 pt-1 border-t border-slate-200/50">
                                    {!isReplyingThis ? (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setActiveRecruiterReplyId(appl.id);
                                          setRecruiterFreeTextReply('');
                                        }}
                                        className="w-full bg-[#0F4C83] hover:bg-[#0F4C83]/95 text-white font-extrabold py-1.5 rounded-lg text-[9.5px] transition flex items-center justify-center gap-1 shadow-sm"
                                      >
                                        <Send className="w-3 h-3" />
                                        Rispondi al Candidato
                                      </button>
                                    ) : (
                                      <div className="space-y-2.5 p-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                                        
                                        {/* Predefined replies selector panel */}
                                        <div className="space-y-1 bg-slate-50/40 p-1.5 rounded-lg border border-slate-100">
                                          <span className="block text-[8px] uppercase tracking-wider font-extrabold text-[#0F4C83] mb-1">Scorciatoie template predefiniti:</span>
                                          <div className="grid grid-cols-2 gap-1">
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setRecruiterFreeTextReply(`Ciao ${appl.candidateName}, il tuo profilo RIASEC è complementare al nostro mindset aziendale. Vorremmo invitarti ad accedere alla prima sessione di colloquio con il nostro Team. Ti invieremo a breve uno slot orario nel tuo calendario Mirea.`);
                                              }}
                                              className="text-[8px] text-left p-1 bg-blue-50 hover:bg-blue-100 rounded border border-blue-105 font-bold text-blue-800 transition leading-tight"
                                            >
                                              Colloquio Finale
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setRecruiterFreeTextReply(`Ciao ${appl.candidateName}, ti ringraziamo infinitamente per l'autenticità dimostrata. Vorremmo chiederti un colloquio di approfondimento per parlare del ruolo e per capire quali contesti ti valorizzano al meglio.`);
                                              }}
                                              className="text-[8px] text-left p-1 bg-amber-50 hover:bg-amber-100 rounded border border-amber-105 font-bold text-amber-800 transition leading-tight"
                                            >
                                              Approfondimento Soft-Skill
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setRecruiterFreeTextReply(`Ciao ${appl.candidateName}, abbiamo correttamente ricevuto il tuo CV. In conformità con il Patto di Responsabilità Mirea, stiamo esaminando attentamente la tua figura e avrai un responso definitivo entro 48 ore.`);
                                              }}
                                              className="text-[8px] text-left p-1 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-105 font-bold text-emerald-800 transition leading-tight"
                                            >
                                              Presa in Carico (48 h)
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setRecruiterFreeTextReply(`Gentile ${appl.candidateName}, ti ringraziamo di cuore per aver applicato. Purtroppo per questo ruolo specifico stiamo procedendo con un profilo più verticale, ma terremo con massima cura il tuo percorso per il futuro.`);
                                              }}
                                              className="text-[8px] text-left p-1 bg-rose-50 hover:bg-rose-100 rounded border border-rose-105 font-bold text-rose-800 transition leading-tight"
                                            >
                                              Feedback Costruttivo
                                            </button>
                                          </div>
                                        </div>

                                        {/* Free Text Input */}
                                        <div className="space-y-1">
                                          <label className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-400">Modifica Messaggio Risposta (Campo Libero):</label>
                                          <textarea
                                            value={recruiterFreeTextReply}
                                            onChange={(e) => setRecruiterFreeTextReply(e.target.value)}
                                            placeholder={`Es: Ciao ${appl.candidateName}, vorremmo conoscerti meglio...`}
                                            className="w-full text-[10px] p-2 bg-slate-50 border border-slate-200 rounded-lg h-14 resize-none focus:bg-white outline-none font-medium leading-relaxed"
                                          />
                                        </div>

                                        {/* Form Confirm Buttons */}
                                        <div className="grid grid-cols-2 gap-1.5">
                                          <button
                                            type="button"
                                            onClick={() => setActiveRecruiterReplyId(null)}
                                            className="text-center font-bold text-slate-500 hover:bg-slate-50 p-1 rounded-lg text-[9px] border border-slate-200 transition"
                                          >
                                            Annulla
                                          </button>
                                          <button
                                            type="button"
                                            disabled={!recruiterFreeTextReply.trim()}
                                            onClick={() => handleRecruiterReply(appl.id, recruiterFreeTextReply)}
                                            className="text-center font-black bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 text-white p-1 rounded-lg text-[9px] transition shadow-sm"
                                          >
                                            Invia Messaggio
                                          </button>
                                        </div>

                                      </div>
                                    )}
                                  </div>
                                )}

                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setAppState('login_selection')}
                      className="w-full text-slate-500 hover:text-slate-800 text-[10px] font-bold py-1.5 px-2 rounded hover:bg-slate-150 block text-center bg-slate-50 border border-slate-200"
                    >
                      Torna al Selettore di Accesso
                    </button>

                  </div>
                );
              })()}

            </div>

            {/* LOWER PHONE TAB NAVIGATION BAR FOR LOGGED CANDIDATE */}
            {appState === 'candidate_home' && (
              <div style={{ backgroundColor: '#0F4C83' }} className="text-white h-16 flex justify-center items-center select-none z-10 shrink-0 py-2 border-t border-[#0F4C83]">
                <button
                  type="button"
                  onClick={handleStartMireaSupport}
                  title="Parla con Mirea AI"
                  className="h-12 px-6 bg-transparent border-0 cursor-pointer outline-none active:scale-95 transition-all duration-200 flex items-center justify-center relative group"
                >
                  <img 
                    src="/src/logo con bianco.png"
                    alt="Mirea Logo" 
                    className="h-10 w-auto object-contain group-hover:scale-105 transition-all duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/src/icona con bianco.png";
                      e.currentTarget.onerror = () => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/src/assets/images/logo_mirea.png";
                      };
                    }}
                  />
                </button>
              </div>
            )}

            {/* INTERVIEW MODAL OVERLAY */}
            {isInterviewModalOpen && (
              <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                <div 
                  style={{ backgroundColor: '#FFFFFF' }}
                  className="border border-[#0F4C83]/30 text-[#0F4C83] w-full max-w-lg rounded-[28px] p-5 space-y-4 shadow-2xl flex flex-col h-[580px] overflow-hidden text-xs text-left"
                >
                  
                  {/* Header inside Modal */}
                  <div className="flex justify-between items-center border-b border-[#0F4C83]/20 pb-3 shrink-0">
                    <div className="flex items-center gap-2">
                      <img 
                        src="/src/assets/images/mirea_avatar_1780664963560.png" 
                        alt="Mirea AI" 
                        className="w-8 h-8 rounded-full object-cover border border-[#0F4C83]/20 bg-[#0F4C83]/10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left font-sans">
                        <h4 className="font-extrabold text-[12px] text-[#0F4C83] tracking-tight">Mirea AI Recruiter Coach</h4>
                        <span className="text-[8.5px] text-[#0F4C83]/80 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Simulazione attiva con {candidateProfile.name || "Elisa"}
                        </span>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setIsInterviewModalOpen(false)}
                      className="bg-slate-100 hover:bg-slate-200 text-[#0F4C83] w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Live Avatar Presence Area inside Modal */}
                  <div 
                    style={{ backgroundColor: '#0F4C83' }}
                    className="flex flex-col items-center justify-center space-y-1 py-2.5 shrink-0 text-white p-3 rounded-2xl border border-[#0F4C83]/30 shadow-xs"
                  >
                    <span className="text-[7.5px] font-extrabold text-white font-mono uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                      AUDIO BIDIREZIONALE ATTIVO
                    </span>

                    {/* Large Glowing Face Ring */}
                    <div className="relative mt-1">
                      <div className="absolute inset-0 bg-white/15 rounded-full blur-md animate-pulse"></div>
                      <div className="p-0.5 bg-white rounded-full shadow-lg">
                        <img 
                          src="/src/assets/images/mirea_avatar_1780664963560.png" 
                          alt="Mirea AI" 
                          className="w-13 h-13 rounded-full object-cover border border-slate-100 bg-[#0F4C83]"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Waveform */}
                    <div className="flex items-center gap-1 h-3.5 justify-center mt-1">
                      <span className="w-0.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                      <span className="w-0.5 h-2.5 bg-white/90 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-0.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                      <span className="w-0.5 h-3 bg-white/90 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                      <span className="w-0.5 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></span>
                    </div>
                  </div>

                  {/* Message Flow Area */}
                  <div className="flex-1 overflow-y-auto space-y-2.5 p-1 text-left scrollbar-thin">
                    {chatMessages.map((msg) => {
                      const isUser = msg.sender === 'user';
                      return (
                        <div 
                          key={msg.id} 
                          className={`max-w-[85%] p-2.5 rounded-2xl leading-normal text-[10px] ${
                            isUser 
                              ? 'bg-[#0F4C83] text-white ml-auto shadow-xs' 
                              : 'bg-[#0F4C83]/5 text-[#0F4C83] border border-[#0F4C83]/10'
                          }`}
                        >
                          <div className={`font-bold text-[8px] uppercase tracking-widest mb-0.5 ${
                            isUser ? 'text-white/80' : 'text-[#0F4C83]/70'
                          }`}>
                            {isUser ? (candidateProfile.name || 'Elisa') : 'Mirea'}
                          </div>
                          <p className="font-sans whitespace-pre-wrap font-semibold leading-relaxed">{msg.text}</p>
                        </div>
                      );
                    })}
                    {chatLoading && (
                      <div className="bg-[#0F4C83]/5 border border-[#0F4C83]/10 text-[#0F4C83] p-2.5 rounded-2xl max-w-[85%] italic text-[10px] animate-pulse font-semibold">
                        Mirea sta analizzando la tua risposta...
                      </div>
                    )}
                  </div>

                  {/* Sound rescue/stress-release support buttons inside modal */}
                  <div 
                    style={{ backgroundColor: '#0F4C83' }}
                    className="p-3 rounded-2xl border border-[#0F4C83]/30 text-white space-y-2 text-left shrink-0 shadow-xs"
                  >
                    <span className="text-[8px] text-white/90 font-extrabold uppercase tracking-widest font-mono">Feedback & Aiuto Rapido:</span>
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => {
                          setChatInput("Ho un po' di timore ad esprimere il mio talento... Come posso sconfiggere questa ansia?");
                        }}
                        className="bg-white/10 hover:bg-white/20 border border-white/25 text-white rounded-lg text-[9px] px-2.5 py-1.5 flex-1 text-center font-bold transition cursor-pointer"
                      >
                        😰 Consiglio Ansia
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          setChatInput("Suggeriscimi 3 paroli chiave sulle mie Soft Skill da evidenziare");
                        }}
                        className="bg-white/10 hover:bg-white/20 border border-white/25 text-white rounded-lg text-[9px] px-2.5 py-1.5 flex-1 text-center font-bold transition cursor-pointer"
                      >
                        💡 Spunti Soft Skill
                      </button>
                    </div>
                  </div>

                  {/* Input Text / Submit Form */}
                  <div className="flex gap-2 shrink-0 border-t border-[#0F4C83]/10 pt-3">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => { if(e.key === 'Enter') handleSendChatMessage(); }}
                      placeholder="Rispondi a Mirea o fai una domanda..."
                      className="flex-1 bg-white border border-[#0F4C83]/20 text-[#0F4C83] placeholder-[#0F4C83]/50 rounded-xl px-3 outline-none focus:border-[#0F4C83]/60 text-[10.5px] font-semibold"
                    />
                    <button 
                      type="button"
                      onClick={handleSendChatMessage}
                      style={{ backgroundColor: '#0F4C83' }}
                      className="hover:opacity-90 text-white rounded-xl px-3 py-2 transition flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom Quit Button */}
                  <button
                    type="button"
                    onClick={() => setIsInterviewModalOpen(false)}
                    className="bg-slate-100 hover:bg-slate-200 transition text-[#0F4C83] font-extrabold py-2.5 rounded-xl text-[10.5px] tracking-wide mt-1 shrink-0 cursor-pointer"
                  >
                    Chiudi e Torna Indietro
                  </button>

                </div>
              </div>
            )}

            {/* iOS Bottom Home Indicator Bar - Hidden for plain web app */}
            <div className="hidden">
              <div className="w-[90px] h-[4px]"></div>
            </div>

          </div>

          {/* SYSTEM OVERLAY DIALOGS (e.g. sharing triggers) */}
          {activeIntentPopup && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="bg-slate-900 border border-slate-800 text-white w-full max-w-sm rounded-[24px] p-5 space-y-4 shadow-2xl text-xs font-sans">
                
                <div className="flex justify-between items-start border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-1.5 text-teal-400">
                    <Smartphone className="w-4 h-4" />
                    <span className="font-extrabold text-[9px] tracking-widest font-mono uppercase">Notifica di Sistema</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setActiveIntentPopup(null)}
                    className="text-slate-400 hover:text-white font-bold text-sm"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-1 text-left">
                  <h4 className="font-bold text-slate-150 text-xs">{activeIntentPopup.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-normal">{activeIntentPopup.description}</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 font-mono text-[9px] text-teal-400 overflow-x-auto text-left">
                  <div className="text-slate-500 font-bold italic mb-1">// Dati transitati:</div>
                  <pre className="whitespace-pre-wrap">{JSON.stringify(activeIntentPopup.data, null, 2)}</pre>
                </div>

                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => setActiveIntentPopup(null)}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-xl text-[10.5px] transition"
                  >
                    OK / Chiudi
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MIREA AI PSYCHOLOGICAL SUPPORT OVERLAY */}
          {openMireaSupport && (
            <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
              <div 
                style={{ backgroundColor: '#FFFFFF' }} 
                className="border border-[#0F4C83]/30 text-[#0F4C83] w-full max-w-sm rounded-[32px] p-5 shadow-2xl flex flex-col h-[580px] overflow-hidden text-xs text-left"
              >
                
                {/* HEAD MODULE */}
                <div className="flex justify-between items-center border-b border-[#0F4C83]/20 pb-3 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="/src/logo con bianco.png" 
                      alt="Mirea AI" 
                      className="h-8 w-auto object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/src/icona con bianco.png";
                        e.currentTarget.onerror = () => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/src/assets/images/logo_mirea.png";
                        };
                      }}
                    />
                    <div className="text-left font-sans">
                      <h4 className="font-extrabold text-[12.5px] text-[#0F4C83] tracking-tight flex items-center gap-1.5">
                        Mirea AI - Spazio d'Ascolto
                      </h4>
                      <span className="text-[8.5px] text-[#0F4C83]/80 font-semibold uppercase tracking-wider flex items-center gap-1">
                        Supporto Psicologico Virtuale
                      </span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setOpenMireaSupport(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-[#0F4C83] w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* STEP 1: DISCLAIMER (MUST NOT REPLACE HUMAN FIGURE) */}
                {mireaSessionStep === 'disclaimer' && (
                  <div className="flex-1 flex flex-col justify-between pt-4 overflow-y-auto text-left space-y-4">
                    <div className="space-y-3.5">
                      <div 
                        style={{ backgroundColor: '#D8864E' }}
                        className="p-4 rounded-2xl space-y-2 text-white border border-[#D8864E]/30"
                      >
                        <div className="flex items-center gap-1.5 text-white">
                          <AlertTriangle className="w-5 h-5 shrink-0 text-white" />
                          <span className="font-black text-[10px] uppercase tracking-widest font-mono text-white">AVVISO IMPORTANTE</span>
                        </div>
                        <p className="text-white/95 text-[11px] leading-relaxed font-semibold">
                          Questo è un assistente virtuale Mirea AI di supporto emotivo guidato. 
                          <strong className="text-white block mt-1.5 font-extrabold">Non si deve e non si può in alcun modo sostituire a una figura umana professionale o medica (come psicologi, psicoterapeuti o psichiatri).</strong>
                        </p>
                      </div>

                      <div className="space-y-2.5 text-[#0F4C83] leading-relaxed text-[11px]">
                        <p>
                          Il percorso di ricerca del lavoro può essere stancante e generare forte stress psicologico ed ansia. Mirea AI ti offre uno spazio sicuro per:
                        </p>
                        <ul className="list-disc list-inside space-y-1.5 text-[#0F4C83]/85 pr-1 pl-1">
                          <li>Sfogarti liberamente e ricevere comprensione rassicurante.</li>
                          <li>Essere supportato e spronato prima di inviare un curriculum o fare un colloquio imminente.</li>
                          <li>Svolgere semplici esercizi di rilassamento respiratorio.</li>
                        </ul>
                        <p className="text-[#0F4C83]/70 text-[10px] mt-2 italic border-l-2 border-[#0F4C83]/30 pl-2">
                          Utilizzando l'assistente, dichiari di comprendere la natura puramente informativa e di auto-aiuto della sessione.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#0F4C83]/10 shrink-0">
                      <button
                        type="button"
                        onClick={handleConfirmStartSupportSession}
                        style={{ backgroundColor: '#0F4C83' }}
                        className="w-full hover:opacity-90 text-white font-extrabold py-3 rounded-xl text-xs transition shadow-lg shadow-[#0F4C83]/20 tracking-wider uppercase cursor-pointer"
                      >
                        Comprendo e voglio iniziare 🧘‍♀️
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpenMireaSupport(false)}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-[#0F4C83] py-2.5 rounded-xl text-xs transition font-bold cursor-pointer"
                      >
                        Annulla
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: EMPATHETIC CHAT & VOCALS SESSION */}
                {mireaSessionStep === 'chat' && (
                  <div className="flex-1 flex flex-col justify-between pt-3 overflow-hidden">
                    
                    {/* Message Box Scrollable Area */}
                    <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-left mb-2 scrollbar-thin">
                      {supportMessages.map((msg) => {
                        const isAssistant = msg.sender === 'assistant';
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} animate-fade-in`}
                          >
                            <div className="max-w-[85%] flex gap-2 items-start">
                              {isAssistant && (
                                <img
                                  src="/src/assets/images/icona.png"
                                  alt="M/AI"
                                  className="w-6 h-6 rounded-full object-cover shrink-0 border border-[#0F4C83]/20 bg-[#0F4C83]/10"
                                  referrerPolicy="no-referrer"
                                />
                              )}
                              
                              <div className={`p-3 rounded-2xl text-[11px] leading-relaxed ${
                                isAssistant 
                                  ? 'bg-[#0F4C83]/5 text-[#0F4C83] border border-[#0F4C83]/10 rounded-tl-sm' 
                                  : 'bg-[#0F4C83] text-white rounded-tr-sm'
                              }`}>
                                
                                {/* Vocal Message Card Player */}
                                {msg.isVocal ? (
                                  <div className="flex items-center gap-3 py-1 px-1">
                                    <button
                                      type="button"
                                      onClick={() => togglePlaySupportVocal(msg.id)}
                                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition cursor-pointer ${
                                        isAssistant ? 'bg-[#0F4C83]/20 hover:bg-[#0F4C83]/30 text-[#0F4C83]' : 'bg-white/20 hover:bg-white/30 text-white'
                                      }`}
                                      title="Riproduci messaggio vocale"
                                    >
                                      {supportVocalPlayingId === msg.id ? (
                                        <Pause className={`w-4 h-4 ${isAssistant ? 'fill-[#0F4C83]' : 'fill-white'}`} />
                                      ) : (
                                        <Play className={`w-4 h-4 ml-0.5 ${isAssistant ? 'fill-[#0F4C83]' : 'fill-white'}`} />
                                      )}
                                    </button>
                                    
                                    <div className="flex-1 min-w-[124px] space-y-1">
                                      <div className={`text-[9.5px] font-bold uppercase tracking-widest flex items-center gap-1 ${
                                        isAssistant ? 'text-[#0F4C83]' : 'text-white/90'
                                      }`}>
                                        <Mic className={`w-3 h-3 ${isAssistant ? 'text-[#0F4C83] animate-pulse' : 'text-teal-300 animate-pulse'}`} />
                                        <span>Messaggio Vocale</span>
                                      </div>
                                      
                                      {/* Sound waves visualization */}
                                      <div className="h-6 flex items-center gap-0.5 pt-1">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((bar) => {
                                          const isActive = supportVocalPlayingId === msg.id;
                                          return (
                                            <span 
                                              key={bar}
                                              className={`w-0.75 rounded-full transition-all duration-300 ${
                                                isAssistant ? (isActive ? 'bg-[#0F4C83]' : 'bg-[#0F4C83]/30') : (isActive ? 'bg-white/75' : 'bg-white/30')
                                              } ${
                                                isActive ? 'animate-vocal-pulse' : 'h-1.5'
                                              }`}
                                              style={{
                                                height: isActive ? `${Math.floor(Math.random() * 16) + 4}px` : '4px',
                                                animationDelay: `${bar * 0.05}s`
                                              }}
                                            ></span>
                                          );
                                        })}
                                      </div>
                                    </div>
                                    
                                    <span className={`font-mono text-[9px] self-end shrink-0 ${isAssistant ? 'text-[#0F4C83]/70' : 'text-white/70'}`}>
                                      {msg.duration || "0:04"}
                                    </span>
                                  </div>
                                ) : (
                                  /* Standard text with basic formatting support */
                                  <div className="space-y-1">
                                    <p className="whitespace-pre-line">{msg.text}</p>
                                  </div>
                                )}

                                <div className={`text-[8px] mt-1.5 font-mono text-right ${
                                  isAssistant ? 'text-[#0F4C83]/60' : 'text-white/70'
                                }`}>
                                  {msg.timestamp}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Typing indicator */}
                      {isSupportTyping && (
                        <div className="flex gap-2 items-center text-[#0F4C83]/85 text-[10px] pl-2 animate-pulse font-semibold">
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C83] animate-bounce"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C83] animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C83] animate-bounce [animation-delay:0.4s]"></span>
                          </div>
                          <span>Mirea sta formulando un consiglio...</span>
                        </div>
                      )}
                    </div>

                    {/* Pre-made interactive feeling triggers */}
                    <div className="py-2.5 overflow-x-auto whitespace-nowrap flex gap-1.5 border-t border-[#0F4C83]/10 shrink-0 scrollbar-none scroll-smooth">
                      <button
                        type="button"
                        onClick={() => handleSendSupportMessage("Mi sento ansioso ed insicuro oggi")}
                        className="bg-slate-50 text-[#0F4C83] hover:bg-slate-100 border border-[#0F4C83]/10 px-3 py-1.5 rounded-full text-[9px] font-bold shrink-0 transition-all cursor-pointer"
                      >
                        😨 Mi sento in ansia
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendSupportMessage("Devo mandare delle candidature ed ho paura del rifiuto")}
                        className="bg-slate-50 text-[#0F4C83] hover:bg-slate-100 border border-[#0F4C83]/10 px-3 py-1.5 rounded-full text-[9px] font-bold shrink-0 transition-all cursor-pointer"
                      >
                        💼 Mandare Candidature
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendSupportMessage("Ho un colloquio fissato in giornata!")}
                        className="bg-slate-50 text-[#0F4C83] hover:bg-slate-100 border border-[#0F4C83]/10 px-3 py-1.5 rounded-full text-[9px] font-bold shrink-0 transition-all cursor-pointer"
                      >
                        🗓️ Ho un colloquio oggi!
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendSupportMessage("Voglio calmarmi con un esercizio di respirazione")}
                        className="bg-[#0F4C83] text-[#FFFFFF] border border-[#0F4C83]/50 px-3 py-1.5 rounded-full text-[9px] font-bold shrink-0 transition-all cursor-pointer animate-pulse-subtle"
                      >
                        🧘‍♀️ Esercizio Respiratorio
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendSupportMessage("Oggi sono triste e demotivato")}
                        className="bg-slate-50 text-[#0F4C83] hover:bg-slate-100 border border-[#0F4C83]/10 px-3 py-1.5 rounded-full text-[9px] font-bold shrink-0 transition-all cursor-pointer"
                      >
                        😔 Triste e Demotivato
                      </button>
                    </div>

                    {/* Submit Bar (Text message + Audio vocals trigger) */}
                    <div className="flex gap-2 border-t border-[#0F4C83]/10 pt-2.5 pb-1 shrink-0 items-center">
                      
                      {/* TEXT MESSAGE INPUT */}
                      {!isRecordingSupportVocal ? (
                        <input
                          type="text"
                          value={supportInput}
                          onChange={(e) => setSupportInput(e.target.value)}
                          onKeyDown={(e) => { 
                            if(e.key === 'Enter') {
                              handleSendSupportMessage(supportInput);
                            }
                          }}
                          placeholder="Scrivi qui... oppure registra un vocale"
                          className="flex-1 bg-white border border-[#0F4C83]/20 text-[#0F4C83] placeholder-[#0F4C83]/50 rounded-xl px-3 py-2 outline-none focus:border-[#0F4C83]/60 text-[10.5px]"
                        />
                      ) : (
                        <div className="flex-1 bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-[10.5px] text-red-650 flex items-center justify-between animate-pulse font-bold">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                            STAI REGISTRANDO IL VOCALE...
                          </span>
                          <span className="font-mono font-bold">
                            0:{String(supportRecordingSeconds).padStart(2, '0')}
                          </span>
                        </div>
                      )}

                      {/* MICROPHONE AUDIO VOCAL BUTTON */}
                      <button 
                        type="button"
                        onClick={() => {
                          if (isRecordingSupportVocal) {
                            // Stop recording and send
                            setIsRecordingSupportVocal(false);
                            const durationSeconds = supportRecordingSeconds || 6;
                            handleSendSupportMessage("", true, `0:${String(durationSeconds).padStart(2, '0')}`);
                          } else {
                            // Start recording
                            setSupportRecordingSeconds(0);
                            setIsRecordingSupportVocal(true);
                          }
                        }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition duration-150 cursor-pointer ${
                          isRecordingSupportVocal 
                            ? 'bg-red-650 hover:bg-red-700 text-white shadow-md shadow-red-950' 
                            : 'bg-slate-100 hover:bg-slate-200 text-[#0F4C83]'
                        }`}
                        title={isRecordingSupportVocal ? "Rilascia per fermare la registrazione" : "Inizia messaggio vocale"}
                      >
                        <Mic className="w-4 h-4" />
                      </button>

                      {/* STANDARD SEND TEXT BUTTON */}
                      {!isRecordingSupportVocal && (
                        <button 
                          type="button"
                          onClick={() => handleSendSupportMessage(supportInput)}
                          className="bg-[#0F4C83] hover:opacity-90 text-white rounded-xl w-9 h-9 transition flex items-center justify-center shrink-0 cursor-pointer"
                          title="Invia messaggio di testo"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <p className="text-[7.5px] text-[#0F4C83]/80 font-bold text-center mt-1">
                      Mirea AI • Spazio Protettivo d'Ascolto • Crittografia Attiva
                    </p>

                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      </div>

      {/* COLUMN RIGHT: Control console allowed to trigger timeout and watch listing change (Grid Cols 7) */}
      {isDebugOpen && (
        <div className="flex-1 w-full max-w-[540px] space-y-6 animate-fade-in transition-all duration-300">
        
        {/* Welcome Block Candidate and control console */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4 text-left">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div className="space-y-1">
              <span className="text-[9px] bg-blue-100 text-blue-800 py-0.5 px-2.5 rounded-full font-extrabold uppercase tracking-widest">Mirea Control Center</span>
              <h3 className="text-xl font-black text-slate-800 mt-1">Console di Sviluppo Ambientale & Simulatore</h3>
              <p className="text-slate-600 text-xs">Testa l'applicazione e inietta flussi in formato mobile sulla sinistra.</p>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setShowSplash(true)}
                className="bg-teal-50 hover:bg-teal-100 border border-teal-100 text-teal-800 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
                Riproduci Splash Screen
              </button>
              <button
                onClick={resetSimulation}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-1.5 px-3 rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
              >
                Reset Totale Sim
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Quick Presets for Parser */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
              <h4 className="font-bold text-xs text-slate-700 flex items-center gap-1">
                <Sparkles className="text-blue-500 w-4 h-4" />
                Modelli di CV Pronti per il Parser Client/Server
              </h4>
              <p className="text-[11px] text-slate-500">Usa un preset qui sotto per incollarlo istantaneamente nel lettore dell'app Android a sinistra:</p>
              
              <div className="space-y-2">
                {PRESET_RESUMES.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      handleLoadPresetCV(r.text);
                      setAppState('candidate_onboarding');
                    }}
                    className="w-full text-left bg-white text-slate-710 hover:border-blue-400 border border-slate-200 p-2.5 rounded-lg text-[10px] leading-tight font-semibold transition flex items-center justify-between"
                  >
                    <span>{r.label}</span>
                    <span className="text-[9px] text-blue-500 font-bold font-mono shrink-0">Incolla preset</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recruiter Lateness Controls */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
              <h4 className="font-bold text-xs text-slate-700 flex items-center gap-1.5">
                <ShieldAlert className="text-amber-500 w-4 h-4" />
                Simulatore Responsiveness Score & Ban
              </h4>
              <p className="text-[11px] text-slate-500">
                Patto di Responsabilità: simula una latenza del recruiter (ritardo). Osserva il calo prestazionale e la scomparsa (Shadow Ban) dall'annuncio a sinistra!
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                {INITIAL_RECRUITERS.map((rec) => (
                  <button
                    key={rec.id}
                    onClick={() => triggerRecruiterLatency(rec.id.replace('rec-', 'comp-'))}
                    className="bg-white hover:bg-red-50 hover:border-red-300 text-slate-700 font-bold border border-slate-200 p-1.5 rounded-lg text-[9px] leading-tight text-center transition"
                  >
                    Raddoppia Latenza {rec.company}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Ecosystem Style & Color Palette Guide ('palette_pantone.png') */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3 text-left">
            <h4 className="font-extrabold text-xs text-slate-800 flex items-center gap-1.5 font-display uppercase tracking-wider">
              <Activity className="text-teal-600 w-4 h-4 animate-pulse" />
              Palette Colori dell'Ecosistema Mirea (palette_pantone.png)
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              L'intera interfaccia utente di Mirea segue rigorosamente la palette d'impatto caricata nel file <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[9px] text-slate-600 font-bold">palette_pantone.png</code>:
            </p>
            <div className="relative w-full h-24 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-105">
              <img 
                src="/src/assets/images/palette_pantone.png" 
                alt="Palette Colori Mirea" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallbackPalette = document.getElementById('mirea-palette-swatches-fallback');
                  if (fallbackPalette) fallbackPalette.classList.remove('hidden');
                }}
              />
              {/* High-fidelity CSS Swatches fallback representing our official premium palette */}
              <div id="mirea-palette-swatches-fallback" className="hidden absolute inset-0 p-3.5 flex flex-col justify-between">
                <div className="grid grid-cols-5 gap-2 h-10">
                  <div className="bg-teal-600 rounded-lg flex items-center justify-center text-[9px] font-black text-white shadow-xs" title="#0D9488">Teal</div>
                  <div className="bg-emerald-500 rounded-lg flex items-center justify-center text-[9px] font-black text-white shadow-xs" title="#10B981">Emerald</div>
                  <div className="bg-indigo-600 rounded-lg flex items-center justify-center text-[9px] font-black text-white shadow-xs" title="#4F46E5">Indigo</div>
                  <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg flex items-center justify-center text-[9px] font-black text-slate-800 shadow-xs" title="#F8FAFC">White</div>
                  <div className="bg-slate-900 rounded-lg flex items-center justify-center text-[9px] font-black text-slate-100 shadow-xs" title="#0F172A">Dark</div>
                </div>
                <div className="text-[9px] font-mono text-slate-400 text-center uppercase tracking-widest font-semibold">Tavolozza di Sintonia Attiva</div>
              </div>
            </div>
            <div className="flex gap-2 text-[9.5px] font-mono text-slate-400 justify-center">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> #0D9488</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> #10B981</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> #4F46E5</span>
            </div>
          </div>

        </div>

        {/* Real-time Algorithmic Log Monitor */}
        <div className="bg-slate-900 text-indigo-300 p-5 rounded-2xl shadow-lg space-y-3 font-mono text-xs text-left">
          <div className="flex justify-between items-center text-slate-100 border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold font-sans flex items-center gap-1.5">
              <Activity className="text-emerald-400 w-4 h-4 animate-pulse animate-bounce" />
              Monitor dell'Algoritmo di Scomparsa degli Annunci (Shadow Ban Engine)
            </h4>
            <span className="text-[10px] font-mono text-indigo-400">STATO: ONLINE</span>
          </div>

          <div className="space-y-1.5 max-h-32 overflow-y-auto leading-normal text-[10px] text-slate-300">
            {penaltyLog.map((log, idx) => (
              <div key={idx} className="flex gap-2 text-[11px] border-b border-slate-800/40 pb-1">
                <span className="text-indigo-400 shrink-0 select-none">[{new Date().toLocaleTimeString()}]</span>
                <span className={log.includes('SHADOW BAN') ? 'text-red-400 font-black' : log.includes('nuova offerta') ? 'text-emerald-400 font-bold' : 'text-slate-300'}>{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic DB Visualizer card showing current Candidate's calculated values representing our algorithm */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4 text-left">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <BadgeInfo className="w-4.5 h-4.5 text-blue-500" />
              Informazioni Profilo Utente (Analisi di Mappatura Professionale)
            </h3>
            <span className="text-[9px] bg-slate-100 text-slate-600 font-extrabold py-0.5 px-2 rounded-full uppercase">
              DB LIVE
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px]">
              <div>
                <span className="text-slate-400 block font-semibold text-[8px] uppercase">Nominativo:</span>
                <span className="font-extrabold text-slate-800 text-xs">
                  {candidateProfile.name ? `${candidateProfile.name} ${candidateProfile.surname}` : "Ancora non registrato"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold text-[8px] uppercase">Data di nascita:</span>
                <span className="font-mono text-slate-700">
                  {candidateProfile.birthDate ? candidateProfile.birthDate : "N/D"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold text-[8px] uppercase">Titolo Calcolato:</span>
                <span className="font-bold text-blue-600 font-sans">
                  {candidateProfile.name ? candidateProfile.professionalTitle : "In attesa di onboarding"}
                </span>
              </div>
            </div>

            <div className="space-y-1 bg-blue-50/10 p-3 rounded-xl border border-slate-100 font-medium italic">
              <span className="text-[9px] text-slate-400 font-bold block uppercase not-italic">Sintesi dei Talenti IA:</span>
              <p className="text-xs text-slate-600">
                "{candidateProfile.summary}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="space-y-2">
                <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider block">Competenze Spacchettate (Unpacking CV):</span>
                <div className="flex flex-wrap gap-1.5">
                  {candidateProfile.skills.map((skill, index) => (
                    <div 
                      key={index} 
                      className={`text-[9.5px] font-bold py-1 px-2.5 rounded-lg border flex items-center gap-1.5 ${skill.category === 'hard' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : skill.category === 'soft' ? 'bg-teal-50 text-teal-700 border-teal-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}
                      title={skill.description}
                    >
                      <span className="capitalize">{skill.name}</span>
                      <span className="opacity-90 font-mono text-[9px]">{skill.rating}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider block">Suggerimenti di Carriera IA:</span>
                {candidateProfile.careerSuggestions.length > 0 ? (
                  <ul className="space-y-1.5 text-xs font-semibold text-slate-700">
                    {candidateProfile.careerSuggestions.map((s, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-blue-600">
                        <Sparkles className="w-3.5 h-3.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[10px] text-slate-400 italic">Completa l'onboarding e scompatta il CV per vedere i suggerimenti di carriera.</p>
                )}
              </div>
            </div>
          </div>
        </div>

          </div>
        )}

      </div>
    </div>
  );
}

// Inline icons definition to prevent any compiling or missing import errors
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function PlusCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  );
}
