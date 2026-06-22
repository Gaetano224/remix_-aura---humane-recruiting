import React, { useState } from 'react';
import { Smartphone, Server, Database, BrainCircuit, ArrowRight, Share2, ClipboardList, CalendarDays, Key } from 'lucide-react';

export default function SystemBlueprintView() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const stepsList = [
    {
      id: 1,
      title: "1. Caricamento & Dispositivo Native UI",
      desc: "L'utente carica il CV o fa un test psicometrico sulla UI Android scritta in Jetpack Compose.",
      impact: "L'app compila una payload JSON ed esegue una chiamata POST HTTPS multipart."
    },
    {
      id: 2,
      title: "2. Gateway Backend & Sicurezza API",
      desc: "L'API Gateway (Express su Cloud Run) valida il JWT dell'utente e filtra le chiavi sensibili.",
      impact: "Inoltra in sicurezza la stringa o il documento filtrato verso la pipeline di Machine Learning."
    },
    {
      id: 3,
      title: "3. ML Logic (Gemini 3.5 Flash / Embeddings)",
      desc: "La pipeline estrae i testi, ne effettua l'allineamento semantico e spacchetta le competenze liquide.",
      impact: "Produce un payload JSON strutturato con rating quantitativo delle abilità."
    },
    {
      id: 4,
      title: "4. Allineamento nel Database NoSQL/Relazionale",
      desc: "I profili delle competenze scompattate e i match aziendali vengono indicizzati e memorizzati.",
      impact: "Si aggiorna automaticamente l'indice di selezione del job feed."
    },
    {
      id: 5,
      title: "5. Azioni e Integrazioni OS (Android Intent)",
      desc: "L'app Android sfrutta gli Intent nativi per inserire i colloqui sul Calendario e per salvare note.",
      impact: "Piena integrazione offline-first senza violare la privacy dell'utente."
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Intro Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">1. Architettura del Sistema & Flusso Dati</h2>
        <p className="text-slate-600 leading-relaxed text-sm">
          Mirea è concepita con un'architettura **Full-Stack decantata**, pensata per operare nativamente su un'applicazione **Android mobile (Kotlin/Compose)** assistita da un robusto **Backend server-side in Node.js** ospitato in ambiente Cloud sicuro, che garantisce l'isolamento dei dati e l'esecuzione super-veloce dei modelli generativi di Intelligenza Artificiale (Gemini-3.5-Flash).
        </p>
      </div>

      {/* Interactive System Diagram */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
          <BrainCircuit className="text-blue-500 w-5 h-5" />
          Mappa Interattiva dell'Architettura
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Box 1: Android Client */}
          <div 
            onClick={() => setActiveStep(0)}
            className={`cursor-pointer p-5 rounded-2xl transition duration-300 border text-center ${activeStep === 0 ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-100' : 'bg-slate-50 border-slate-100 hover:border-blue-300'}`}
          >
            <Smartphone className={`w-8 h-8 mx-auto mb-2 ${activeStep === 0 ? 'text-blue-600' : 'text-slate-600'}`} />
            <h4 className="font-bold text-slate-800 text-sm">Android App (Client)</h4>
            <div className="text-[11px] text-slate-500 mt-1 font-mono">Jetpack Compose / Intents</div>
          </div>

          <div className="hidden md:flex justify-center text-slate-300">
            <ArrowRight className="w-5 h-5 animate-pulse" />
          </div>

          {/* Box 2: Node.js/Express Backend */}
          <div 
            onClick={() => setActiveStep(1)}
            className={`cursor-pointer p-5 rounded-2xl transition duration-300 border text-center ${activeStep === 1 ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-100' : 'bg-slate-50 border-slate-100 hover:border-blue-300'}`}
          >
            <Server className={`w-8 h-8 mx-auto mb-2 ${activeStep === 1 ? 'text-blue-600' : 'text-slate-600'}`} />
            <h4 className="font-bold text-slate-800 text-sm">Express API (Backend)</h4>
            <div className="text-[11px] text-slate-500 mt-1 font-mono">Node.js / Cloud Run</div>
          </div>

          <div className="hidden md:flex justify-center text-slate-300">
            <ArrowRight className="w-5 h-5 animate-pulse" />
          </div>

          {/* Box 3: LLM & ML Engine (Gemini) */}
          <div 
            onClick={() => setActiveStep(2)}
            className={`cursor-pointer p-5 rounded-2xl transition duration-300 border text-center ${activeStep === 2 ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-100' : 'bg-indigo-50/50 border-slate-100 hover:border-indigo-300'}`}
          >
            <BrainCircuit className={`w-8 h-8 mx-auto mb-2 ${activeStep === 2 ? 'text-blue-600' : 'text-indigo-600'}`} />
            <h4 className="font-bold text-slate-800 text-sm">AI Pipeline (Gemini)</h4>
            <div className="text-[11px] text-indigo-500 mt-1 font-mono">Unpacking / Empathy</div>
          </div>

          <div className="hidden md:flex justify-center text-slate-300">
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* Box 4: Database Store */}
          <div 
            onClick={() => setActiveStep(3)}
            className={`cursor-pointer p-5 rounded-2xl transition duration-300 border text-center ${activeStep === 3 ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-100' : 'bg-slate-50 border-slate-100 hover:border-blue-300'}`}
          >
            <Database className={`w-8 h-8 mx-auto mb-2 ${activeStep === 3 ? 'text-blue-600' : 'text-slate-600'}`} />
            <h4 className="font-bold text-slate-800 text-sm">Database Central</h4>
            <div className="text-[11px] text-slate-500 mt-1 font-mono">Firestore / NoSQL</div>
          </div>
        </div>

        {/* Dynamic step info panel */}
        <div className="bg-slate-50 p-4 rounded-xl mt-6 border border-slate-100 text-xs">
          {activeStep === null ? (
            <div className="text-slate-500 text-center italic">Clicca sulle box dell'architettura per scoprire come fluisce il dato.</div>
          ) : (
            <div>
              {activeStep === 0 && (
                <p><strong>[Client-Side]</strong> L'interfaccia utente raccoglie i documenti in input, avvia i test psicometrici locali della gamification e inoltra le risposte. Gestisce con transizioni fluide l'integrazione con il Calendario o l'app Note.</p>
              )}
              {activeStep === 1 && (
                <p><strong>[Proxy sicuro]</strong> Consente il disaccoppiamento totale dell'applicazione da chiavi di terze parti (come la chiave dell'IA). Gestisce il calcolo del Responsiveness Score e notifica i recruiter quando il TTL sta per scadere.</p>
              )}
              {activeStep === 2 && (
                <p><strong>[Gemini-3.5-Flash]</strong> Converte testi caotici dei CV in competenze quantitative categorizzate in hard, soft e liquide. Inoltre anima il chatbot con due profili distinti: Simulazione di Interviste e Supporto Empatico.</p>
              )}
              {activeStep === 3 && (
                <p><strong>[Persistent Store]</strong> Strutturato in modo ottimale per scalare con milioni di candidati e annunci. Memorizza la cronologia degli aggiornamenti aziendali penalizzando chi non risponde nei tempi limite.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Flow Steps List */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Dettaglio Flusso Dati End-to-End</h3>
        <div className="space-y-4">
          {stepsList.map((step) => (
            <div key={step.id} className="p-4 rounded-xl hover:bg-slate-50 transition border border-slate-50 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-sm">{step.title}</h4>
                <p className="text-slate-600 text-xs">{step.desc}</p>
              </div>
              <div className="bg-blue-50/50 border border-blue-100 text-blue-800 py-1 px-3 rounded-lg text-xs self-start md:self-center font-medium max-w-xs md:text-right">
                {step.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OS Integration Panel */}
      <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <Smartphone className="text-blue-400 w-6 h-6" />
          <div>
            <h3 className="text-lg font-bold">Integrazione con lo Smartphone (Android OS Intents)</h3>
            <p className="text-slate-400 text-xs">Umanizzare la UX significa anche ridurre la barriera di inserimento permettendo all'utente di rimanere nel proprio ecosistema nativo di organizzazione personale.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/80 p-4 rounded-xl space-y-3 border border-slate-700/50">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs">
              <CalendarDays className="w-4 h-4" />
              Sincronizzazione Calendario di Sistema
            </div>
            <p className="text-xs text-slate-300">
              Quando l'utente definisce una data di colloquio o una scadenza di test, l'app Android non forza l'utente a rimanere impantanato nell'interfaccia. Tramite un **Intent implicito**, stimola il componente nativo del sistema operativo ad aprire il Calendario Google predisponendo già titolo, orario e descrizione.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl space-y-3 border border-slate-700/50">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <Share2 className="w-4 h-4" />
              Azione Condivisione / Bozza Note
            </div>
            <p className="text-xs text-slate-300">
              L'utente può voler salvare bozze, riflessioni personali scritte nel proprio Diario privato di Mirea, sul client nativo di note del telefono. L'Intent di condivisione `ACTION_SEND` passa un testo strutturato garantendo l'interoperabilità ideale e trasparente d'uso.
            </p>
          </div>
        </div>

        {/* Kotlin Code Snippet */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
            <span>Kotlin (Android Studio / Jetpack Compose)</span>
            <span className="text-blue-400 font-bold">PRONTO ALL'USO</span>
          </div>
          <pre className="bg-slate-950 p-4 rounded-lg text-xs overflow-x-auto text-emerald-400 font-mono leading-relaxed border border-slate-800">
{`// 1. INTENT PER AGGIUNGERE UN COLLOQUIO AL CALENDARIO DI SISTEMA
fun pianificaColloquioSuAndroid(context: Context, titolo: String, descrizione: String, timestampMs: Long) {
    val intent = Intent(Intent.ACTION_INSERT).apply {
        data = CalendarContract.Events.CONTENT_URI
        putExtra(CalendarContract.Events.TITLE, "Mirea: Colloquio con $titolo")
        putExtra(CalendarContract.Events.DESCRIPTION, descrizione)
        putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, timestampMs)
        putExtra(CalendarContract.EXTRA_EVENT_END_TIME, timestampMs + 3600000) // 1 ora
        putExtra(CalendarContract.Events.EVENT_LOCATION, "Piattaforma Video Mirea")
    }
    context.startActivity(intent)
}

// 2. INTENT PER CONDIVIDERE/ESPORTARE LA NOTA DEL DIARIO DEL CANDIDATO
fun esportaNotaDiario(context: Context, titolo: String, contenuto: String) {
    val sendIntent = Intent().apply {
        action = Intent.ACTION_SEND
        putExtra(Intent.EXTRA_TEXT, "$titolo\\n\\n$contenuto\\n\\nScritto con amore nel mio Diario di Mirea.")
        type = "text/plain"
    }
    val shareIntent = Intent.createChooser(sendIntent, "Copia diario su Note locali o invia a:")
    context.startActivity(shareIntent)
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
