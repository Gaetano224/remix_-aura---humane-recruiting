import React from 'react';
import { Layout, Smartphone, Palette, ShieldAlert, Heart, Calendar } from 'lucide-react';

export default function WireframeView() {
  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      {/* Intro visual design philosophy */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Palette className="text-blue-500 w-6 h-6" />
          Filosofia di UI/UX Design & Branding
        </h3>
        <p className="text-slate-600 text-xs leading-relaxed">
          La ricerca di lavoro causa ansia, inadeguatezza e fatica psicologica. La UI/UX di Mirea ha l'obiettivo di **calmare, rassicurare, guidare ed empowering l'utente candidato**. L'uso rigoroso della palette cromatica è supportato da spaziature generose, curve morbide (24px) ed elementi rassicuranti.
        </p>

        {/* Color Palette visualization */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="h-10 rounded-lg w-full bg-[#3B82F6]"></div>
            <div>
              <div className="font-bold text-slate-800 text-xs">Primary: Modern Trust</div>
              <div className="font-mono text-[10px] text-slate-500">#3B82F6 (Trust Blue)</div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="h-10 rounded-lg w-full bg-[#E0F2FE]"></div>
            <div>
              <div className="font-bold text-slate-800 text-xs">Secondary: Ice Blue</div>
              <div className="font-mono text-[10px] text-slate-500">#E0F2FE (Ice Blue)</div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="h-10 rounded-lg w-full bg-[#10B981]"></div>
            <div>
              <div className="font-bold text-slate-800 text-xs">Accent: Mint Balance</div>
              <div className="font-mono text-[10px] text-slate-500">#10B981 (Mint Green)</div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="h-10 rounded-lg w-full bg-[#F0F4F8]"></div>
            <div>
              <div className="font-bold text-slate-800 text-xs">Background: Cool Slate</div>
              <div className="font-mono text-[10px] text-slate-500">#F0F4F8 (Cool Gray)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wireframe blueprints mock descriptions */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Layout className="text-blue-500 w-6 h-6" />
          I Wireframe delle Schermate Principali
        </h3>

        <div className="space-y-6">
          
          {/* Wireframe 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <h4 className="font-bold text-slate-800 text-sm">1. Schermata di Onboarding & Parsing</h4>
            <p className="text-[11px] text-slate-600 leading-normal">
              <strong>Struttura:</strong> Card centrale con fondo sfumato morbido #E0F2FE, area tratteggiata per il Drag-and-drop del CV (PDF o testo libero).
              <br />
              <strong>Interazione:</strong> Premendo "Scompatta", l'app attiva una micro-animazione vettoriale caricando i dati. Restituisce chip colorate con le competenze suddivise per tag (Hard in Blue, Soft in Mint, Liquide in Indigo).
            </p>
            <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-[9px] text-slate-400">
              [ HEADER: Saluto Personalizzato ]
              <br />
              [ CARD: Area File upload "Trascina il tuo CV" ]
              <br />
              [ BUTTON: Scompatta tramite IA con tag #3B82F6 ]
              <br />
              [ SEZIONE: Risultati con chip semantici e rating bar ]
            </div>
          </div>

          {/* Wireframe 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <h4 className="font-bold text-slate-800 text-sm">2. Schermata dei Test Psicometrici Ludici</h4>
            <p className="text-[11px] text-slate-600 leading-normal">
              <strong>Struttura:</strong> Prospettiva gamificata. Lo schermo presenta uno scenario alla volta, formulato sotto forma di fumetto illustrato o scelta multipla amichevole.
              <br />
              <strong>Interazione:</strong> Nessun timer ansiogeno. L'utente clicca sulle opzioni comportamentali; alla fine del test, una ruota o istogrammi colorati svelano i tratti di Apertura Mentale e Cooperazione.
            </p>
            <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-[9px] text-slate-400">
              [ STEPS: Indicatore di progresso orizzontale in alto ]
              <br />
              [ VIGNETTA: Illustrazione dello scenario lavorativo reale ]
              <br />
              [ OPZIONI: 3 pulsanti ad ampia area di tocco (&gt;44px) con hover verde mint ]
              <br />
              [ RISULTATI: Grafici radar dei tratti biologico-professionali ]
            </div>
          </div>

          {/* Wireframe 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <h4 className="font-bold text-slate-800 text-sm">3. Schermata Chatbot (Simulatore & Supporto Ematico)</h4>
            <p className="text-[11px] text-slate-600 leading-normal">
              <strong>Struttura:</strong> Flusso di messaggi tipo chat con bolle differenziate. Nella parte superiore si trova un selettore di modalità intuitivo.
              <br />
              <strong>Interazione:</strong> In modalità "Colloquio", l'IA simula domande d'ingaggio basate sulle soft/hard skill estratte dal parser. In modalità "Supporto Ematico" (attivabile dopo un esito negativo), l'IA si adatta con toni calorosi per alleviare lo stress e raddrizzare la rotta professionale con feedback pratici.
            </p>
            <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-[9px] text-slate-400">
              [ SELECTOR MODE: Info Mirea (slate) | Colloquio (blue) | Supporto Empatico (rose) ]
              <br />
              [ CHAT BODY: Bolla utente azzurra a destra, Bolla AI bianca a sinistra ]
              <br />
              [ INPUT BAR: Campo di testo arrotondato + Icona aeroplanino invio ]
            </div>
          </div>

          {/* Wireframe 4 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <h4 className="font-bold text-slate-800 text-sm">4. Diario di Bordo & OS Intent Integration</h4>
            <p className="text-[11px] text-slate-600 leading-normal">
              <strong>Struttura:</strong> Un raccoglitore di appunti personali dell'utente per tracciare lo stress, le note di riepilogo o le scadenze dei colloqui.
              <br />
              <strong>Interazione:</strong> Ogni nota mostra i bottoni di integrazione con il telefono del candidato (Calendario ed Esportazione). La pressione simula l'Intent di Android OS per agganciare le app native senza sforzo o login esterni.
            </p>
            <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-[9px] text-slate-400">
              [ HEADER: Diario dei pensieri e livello medio di ansia ]
              <br />
              [ CARD NOTE: Titolo, data, contenuto cifrato, slider del sentimento ]
              <br />
              [ BUTTONS: "Pianifica su Calendario (Intent iOS/Android)" | "Esporta su Note (Intent ACTION_SEND)" ]
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
