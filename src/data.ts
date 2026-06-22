import { JobPosting, Recruiter, DiaryNote } from './types';

export const INITIAL_JOBS: JobPosting[] = [
  {
    id: "job-1",
    title: "Senior Full-Stack Developer",
    company: "HexaTech Solutions",
    companyId: "comp-a",
    location: "Milano / Remote",
    description: "Siamo alla ricerca di un leader tecnico appassionato per guidare il team di frontend e backend. Lavoriamo con architetture IoT, TypeScript, React e microservizi.",
    requiredSkills: ["TypeScript & React", "Node.js & Express", "Collaborazione Interdisciplinare"],
    responsivenessScore: 94,
    publishDate: "2026-06-01",
    ttlRemainingHours: 42,
    status: 'active'
  },
  {
    id: "job-2",
    title: "AI Product Designer",
    company: "Synapse Digital",
    companyId: "comp-b",
    location: "Torino / Ibrido",
    description: "Progetta interfacce utente incentrate sull'esperienza uomo-macchina. Cerchiamo designer capaci di integrare flussi di intelligenza artificiale valorizzando l'aspetto umano.",
    requiredSkills: ["Design System", "Figma", "Problem Solving Creativo", "Leadership Empatica"],
    responsivenessScore: 82,
    publishDate: "2026-06-03",
    ttlRemainingHours: 12,
    status: 'active'
  },
  {
    id: "job-3",
    title: "Cloud Infrastructure Architect",
    company: "Aether Cloud",
    companyId: "comp-c",
    location: "Roma / Remote",
    description: "Gestisci l'infrastruttura globale di microservizi in Cloud Run e Kubernetes. Esperienza di sicurezza e automazione con pipeline CI/CD.",
    requiredSkills: ["Docker & Kubernetes", "AWS/GCP Services", "Sicurezza Informatica", "Analisi Critica"],
    responsivenessScore: 68, // Warning boundary! If score < 70, this will warning and disappear eventually
    publishDate: "2026-06-04",
    ttlRemainingHours: 2, // Only 2 hours left or corporate score drops
    status: 'active'
  },
  {
    id: "job-4",
    title: "Junior HR Talent Specialist",
    company: "Delta Group",
    companyId: "comp-d",
    location: "Bologna / In Sede",
    description: "Aiutaci a reclutare i migliori talenti usando strumenti digitali di nuova generazione basati sulla gamification e sul rispetto dell'individuo.",
    requiredSkills: ["HR Management", "Comunicazione Persuasiva", "Rapporti Interpersonali"],
    responsivenessScore: 52, // Below penalty threshold!
    publishDate: "2026-06-02",
    ttlRemainingHours: 0, // Time is up! Already penalised or hiding in feed!
    status: 'active'
  }
];

export const INITIAL_RECRUITERS: Recruiter[] = [
  {
    id: "rec-1",
    name: "Elena Bianchi",
    company: "HexaTech Solutions",
    averageReplyTimeHours: 14,
    totalApplications: 45,
    unresolvedApplications: 2,
    unresolvedOverTTL: 0
  },
  {
    id: "rec-2",
    name: "Marco Pozzi",
    company: "Synapse Digital",
    averageReplyTimeHours: 28,
    totalApplications: 30,
    unresolvedApplications: 5,
    unresolvedOverTTL: 1
  },
  {
    id: "rec-3",
    name: "Sofia Gialli",
    company: "Aether Cloud",
    averageReplyTimeHours: 72,
    totalApplications: 18,
    unresolvedApplications: 6,
    unresolvedOverTTL: 3
  },
  {
    id: "rec-4",
    name: "Claudia Rossi",
    company: "Delta Group",
    averageReplyTimeHours: 120, // Very slow
    totalApplications: 24,
    unresolvedApplications: 14,
    unresolvedOverTTL: 10
  }
];

export const INITIAL_DIARY: DiaryNote[] = [
  {
    id: "note-2",
    title: "Riflessione sul rifiuto Synapse",
    content: "Purtroppo non sono stato selezionato per il ruolo di Designer. All'inizio ci sono rimasto male, ma Mirea AI mi ha offerto un supporto incredibilmente empatico. Mi ha fatto capire che il mio valore non è in discussione e mi ha dato spunti su come esaltare le mie soft skill di leadership nel prossimo incontro.",
    date: "2026-06-03",
    anxietyLevel: 7
  }
];

export const PRESET_RESUMES = [
  {
    label: "Profilo Tecnico (Mario Rossi, Developers)",
    text: `MARIO ROSSI
Email: mario.rossi@example.it
Telefono: +39 333 1234567

PROFILO PROFESSIONALE:
Sviluppatore Full-Stack Senior con oltre 6 anni di esperienza nello sviluppo di interfacce web reattive e architetture scalabili. Forte sostenitore dello Human-Centered Design e dell'integrazione di pipeline IA responsabili.

COMPETENZE:
- Sviluppo Web avanzato in TypeScript, React e Node.js
- Progettazione e manutenzione di API Express ad alte prestazioni
- Abilità di spacchettamento e scomposizione delle abilità teoriche in applicazioni liquide
- Ottima propensione alla risoluzione collaborativa di conflitti ed empatia nel guidare i team di sviluppo`
  },
  {
    label: "Profilo Umanistico/Design (Alice Bianchi, HR/UI/UX)",
    text: `ALICE BIANCHI
Email: alice.b@example.it
Telefono: +39 347 9876543

PROFILO PROFESSIONALE:
Talent Specialist & UI Designer appassionata di psicologia applicata allo sviluppo software. Coniuga competenze di Interaction Design con una profonda abilità di comunicazione persuasiva e problem solving creativo in contesti mutevoli (competenze liquide). 

COMPETENZE:
- Progettazione visiva con Figma e definizione di Design System rassicuranti e inclusivi
- Comunicazione empatica, negoziazione contrattuale e mitigazione dell'ansia da prestazione per i nuovi arrivati
- Gestione Agile di progetti interdisciplinari tra HR, Tech e Sviluppatori`
  }
];
