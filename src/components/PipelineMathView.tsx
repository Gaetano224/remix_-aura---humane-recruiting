import React, { useState } from 'react';
import { Award, BrainCircuit, Activity, HelpCircle, Variable, ShieldAlert } from 'lucide-react';

export default function PipelineMathView() {
  // Simulator State
  const [appsReceived, setAppsReceived] = useState<number>(20);
  const [appsOnTime, setAppsOnTime] = useState<number>(18);
  const [appsOverTTL, setAppsOverTTL] = useState<number>(2);
  const [lambdaDecay, setLambdaDecay] = useState<number>(0.05); // time decaying factor

  // Calculated variables
  const baseScore = appsReceived > 0 
    ? Math.round((appsOnTime / appsReceived) * 100) 
    : 100;
  
  // Custom non-linear penalty for unresolved TTLs:
  // P(N) = beta * N_over_TTL^1.2
  const beta = 8;
  const rawPenalty = Math.round(beta * Math.pow(appsOverTTL, 1.2));
  const finalCalculatedScore = Math.max(0, Math.min(100, baseScore - rawPenalty));

  let statusText = "Eccellente";
  let statusColor = "text-emerald-600 bg-emerald-50 border-emerald-200";
  let statusExplanation = "Azienda affidabile. Gli annunci godono della massima visibilità nel feed.";

  if (finalCalculatedScore < 85 && finalCalculatedScore >= 70) {
    statusText = "Attenzione (Warning)";
    statusColor = "text-amber-600 bg-amber-50 border-amber-200";
    statusExplanation = "Alcuni ritardi rilevati. Gli annunci mostrano il badge di avvertimento giallo.";
  } else if (finalCalculatedScore < 70 && finalCalculatedScore >= 50) {
    statusText = "Penalizzato";
    statusColor = "text-orange-600 bg-orange-50 border-orange-200";
    statusExplanation = "Punteggio basso. Gli annunci scendono in fondo al feed e subiscono una riduzione di visibilità del 50%.";
  } else if (finalCalculatedScore < 50) {
    statusText = "Oscurato (Shadow Ban)";
    statusColor = "text-red-600 bg-red-50 border-red-200";
    statusExplanation = "Tasso di risposta inaccettabile. Tutti gli annunci di questa azienda sono automaticamente SCOMPARSI dal feed utenti.";
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* CV Parsing details */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BrainCircuit className="text-blue-500 w-6 h-6" />
          La Pipeline ML di Competenza Liquida (Skill Unpacking)
        </h3>
        <p className="text-slate-600 text-xs leading-relaxed">
          Tradizionalmente, i parser di CV cercano corrispondenze esatte tra stringhe (es. cercano 'React' o 'Project Manager'). Se l'utente scrive 'coordinatore di team distribuiti' ma l'annuncio cerca 'Agile PM', il sistema li scarta. 
          Mirea implementa una **pipeline LLM semantica** con **Gemini-3.5-Flash** ed embeddings vettoriali per "spacchettare" ed estrarre il talento autentico:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-normal text-xs text-slate-600">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-800 text-xs mb-1">1. Embedding Vettoriale</h4>
            <p className="text-[11px] leading-relaxed">La stringa del CV viene convertita in un vettore denso. Questo posiziona la frase nello spazio multidimensionale del significato lavorativo.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-800 text-xs mb-1">2. Estrazione Tassonomica</h4>
            <p className="text-[11px] leading-relaxed">Il LLM interviene per estrapolare le <strong>competenze liquide</strong>: capacità trasferibili come il problem solving adattivo o l'autonomia euristica.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-800 text-xs mb-1">3. Normalizzazione Rating</h4>
            <p className="text-[11px] leading-relaxed">Le competenze vengono allineate su scala standardizzata d'impatto (0-100) calibrando gli anni dichiarati, i progetti completati e la semantica dei verbi d'azione.</p>
          </div>
        </div>
      </div>

      {/* Corporate Penalty Formula Explanation */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Award className="text-emerald-500 w-6 h-6" />
            L'Algoritmo di Responsabilità Aziendale & Penalizzazione
          </h3>
          <p className="text-slate-600 text-xs mt-1">
            Ogni annuncio pubblicato su Mirea impone un **Patto di Risposta**. Se l'azienda riceve una candidatura, ha un tempo limite di ingaggio (TTL, es. 48 ore). Se scade il TTL senza che l'HR fornisca un riscontro motivato di rifiuto (empatico e costruttivo) o di avanzamento, l'algoritmo riduce matematicamente lo score aziendale.
          </p>
        </div>

        {/* LaTeX Math Block style */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-mono text-center space-y-4">
          <div className="text-slate-800 text-xs font-bold font-sans">
            FORMULAZIONE MATEMATICA DEL RESPONSIVENESS SCORE:
          </div>
          <div className="text-blue-600 font-bold text-sm md:text-base py-2">
            {"R(t) = max ( 0 , [ (N_on_time / N_total) * 100 ] - β * ( N_expired )^1.2 )"}
          </div>
          <div className="text-[11px] text-slate-500 max-w-lg mx-auto leading-relaxed">
            Dove <code className="text-blue-600">N_total</code> è il totale delle candidature valutate, <code className="text-blue-600">N_on_time</code> indica le risposte fornite prima dello scadere del TTL, <code className="text-blue-600">N_expired</code> è il numero di applicazioni attualmente insolute e andate in scadenza (TTL scaduto), e <code className="text-blue-600">β</code> rappresenta il coefficiente di severità penale (default = 8.0).
          </div>
        </div>

        {/* Interactive Sandbox Simulator */}
        <div className="border border-slate-100 p-6 rounded-2xl bg-slate-50/50 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <Activity className="text-indigo-500 w-4.5 h-4.5" />
              Sandbox di Calcolo Algoritmico (Simula in tempo reale)
            </h4>
            <span className="text-[10px] bg-slate-200 text-slate-700 py-0.5 px-2 rounded-full font-mono">Modello Matematico</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Slider 1 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>Candidature Totali (N_total):</span>
                <span className="text-blue-600">{appsReceived}</span>
              </label>
              <input 
                type="range" 
                min="5" 
                max="100" 
                value={appsReceived} 
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setAppsReceived(val);
                  if (appsOnTime > val) setAppsOnTime(val);
                  if (appsOverTTL > val - appsOnTime) setAppsOverTTL(val - appsOnTime);
                }} 
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">Dimensione del pool campionario delle interazioni del recruiter.</p>
            </div>

            {/* Input Slider 2 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>Risposte in tempo (N_on_time):</span>
                <span className="text-emerald-600">{appsOnTime}</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max={appsReceived} 
                value={appsOnTime} 
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setAppsOnTime(val);
                  if (appsOverTTL > appsReceived - val) setAppsOverTTL(appsReceived - val);
                }} 
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">Candidature gestite e risolute entro i limiti di cortesia oraria (TTL).</p>
            </div>

            {/* Input Slider 3 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>Scadute e insolute (N_expired):</span>
                <span className="text-red-600">{appsOverTTL}</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max={appsReceived - appsOnTime} 
                value={appsOverTTL} 
                onChange={(e) => setAppsOverTTL(parseInt(e.target.value))} 
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">Applicazioni ignorate oltre il termine massimo impostato.</p>
            </div>
          </div>

          {/* Results Output Panel */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
            <div className="text-center md:text-left space-y-1">
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Responsiveness Index Risultante</div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <span className="text-3xl md:text-4xl font-extrabold text-slate-800">{finalCalculatedScore}%</span>
                <span className={`text-[11px] font-bold py-1 px-3 rounded-lg border ${statusColor}`}>
                  {statusText}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 italic max-w-md">{statusExplanation}</p>
            </div>

            <div className="flex items-start gap-2 bg-blue-50/50 p-4 rounded-xl border border-slate-100 max-w-sm">
              <ShieldAlert className="text-blue-500 w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-slate-800 text-xs">Azione Correttiva dell'Algoritmo:</h5>
                <p className="text-[10px] text-slate-600 leading-normal mt-0.5">
                  Mirea bilancia asimmetrie di potere. Quando il punteggio scende sotto il <strong>70%</strong>, l'app mobile riduce la visibilità dell'azienda nel feed. Sotto il <strong>50%</strong> (Shadow Ban), l'annuncio viene rimosso dal database lato utente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
