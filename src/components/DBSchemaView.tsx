import React, { useState } from 'react';
import { Database, Table, KeyRound, HardDrive, CheckCircle } from 'lucide-react';

export default function DBSchemaView() {
  const [selectedTable, setSelectedTable] = useState<string>('candidates');

  const tableDetails: any = {
    candidates: {
      title: "Tabella / Collezione: candidates",
      desc: "Memorizza i profili dei talenti, le competenze scompattate e i tratti psicometrici.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", desc: "ID univoco del candidato." },
        { name: "name", type: "VARCHAR", desc: "Nome e cognome." },
        { name: "email", type: "VARCHAR", desc: "Contatto email univoco." },
        { name: "skills_creative", type: "JSONB / Nested Array", desc: "Array di oggetti contenente il nome della skill, categoria (hard/soft/creative) e il rating (0-100)." },
        { name: "psychometrics", type: "JSONB / Object", desc: "Risultati dei test di gamification (estroversione, resilienza, cooperazione)." },
        { name: "anxiety_index", type: "INTEGER", desc: "Indice di preoccupazione medio aggiornato dalle note del diario (1-10)." }
      ]
    },
    recruiters: {
      title: "Tabella / Collezione: recruiters",
      desc: "Profili dei selezionatori aziendali con tracciamento della responsiveness.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", desc: "ID univoco dell'HR." },
        { name: "name", type: "VARCHAR", desc: "Nome." },
        { name: "company_id", type: "UUID (Foreign Key)", desc: "Azienda associata." },
        { name: "responsiveness_rating", type: "DECIMAL(5,2)", desc: "Punteggio di reattività aziendale aggiornato (0.00-100.00%)." },
        { name: "applications_received", type: "INTEGER", desc: "Totale candidature ricevute." },
        { name: "applications_missed_ttl", type: "INTEGER", desc: "Candidature scadute senza spiegazione valida." }
      ]
    },
    job_postings: {
      title: "Tabella / Collezione: job_postings",
      desc: "Offerte lavorative esposte sul feed, regolate dall'algoritmo di penalizzazione TTL.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", desc: "ID univoco dell'annuncio." },
        { name: "recruiter_id", type: "UUID (Foreign Key)", desc: "FK relazionata a recruiters.id." },
        { name: "title", type: "VARCHAR", desc: "E.g. 'Senior React Developer'." },
        { name: "description", type: "TEXT", desc: "Caratteristiche e dettagli della mansione." },
        { name: "skills_required", type: "JSONB / Array", desc: "Elenco dei requisiti espliciti per il matching." },
        { name: "ttl_remaining_hours", type: "INTEGER", desc: "Tempo a disposizione (TTL) in ore per rispondere ai candidati candidati prima della penalizzazione." },
        { name: "status", type: "VARCHAR", desc: "Stato dell'annuncio ('active', 'expired_ttl', 'hidden')." }
      ]
    },
    diary_notes: {
      title: "Tabella / Collezione: diary_notes",
      desc: "Sezione privata e crittografata usata per raccogliere i feedback emotivi del candidato.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", desc: "ID nota." },
        { name: "candidate_id", type: "UUID (Foreign Key)", desc: "FK associata al proprietario." },
        { name: "title", type: "VARCHAR", desc: "Titolo dell'annotazione." },
        { name: "content", type: "TEXT", desc: "Testo crittografato client-side." },
        { name: "anxiety_level", type: "INTEGER", desc: "Livello di ansia/preoccupazione monitorato (1-10)." },
        { name: "interview_date", type: "TIMESTAMP", desc: "Data di un eventuale colloquio correlato (richiamato dagli Intent)." }
      ]
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* DB Decision & Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center gap-2">
            <Database className="text-blue-500 w-6 h-6" />
            <h3 className="text-lg font-bold text-slate-800">Scelta del Database: NoSQL (Firestore)</h3>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed">
            Per lo sviluppo mobile nativo (Android), la scelta ideale ricade su un **NoSQL orientato ai documenti tipo Google Cloud Firestore**. Offre sincronizzazione offline-first sui dispositivi, flessibilità strutturale e aggiornamenti reattivi per la chat di supporto.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 font-medium">
              <CheckCircle className="w-4 h-4" />
              Struttura documentale scalabile ed adattabile
            </div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 font-medium">
              <CheckCircle className="w-4 h-4" />
              Sincronizzazione automatica tramite SDK Firebase per Android
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center gap-2">
            <Table className="text-indigo-500 w-6 h-6" />
            <h3 className="text-lg font-bold text-slate-800">Alternativa: Relazionale (PostgreSQL)</h3>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed">
            Se l'applicazione deve eseguire complessi aggregati matematici sui punteggi di responsiveness di centinaia di migliaia di selezionatori o calcoli di prossimità delle competenze (tramite estensione `pgvector`), l'architettura relazionale con PostgreSQL e JSONB offre un controllo transazionale supremo e relazioni stabili tra i recruiter e gli annunci.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-indigo-600 font-medium">
              <CheckCircle className="w-4 h-4" />
              Integrità referenziale assoluta per la penalizzazione dei TTL
            </div>
            <div className="flex items-center gap-2 text-[11px] text-indigo-600 font-medium">
              <CheckCircle className="w-4 h-4" />
              Query SQL avanzate per calcolare medie ponderate in tempo reale
            </div>
          </div>
        </div>
      </div>

      {/* Schema Interactive Explorer */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 border-r border-slate-100 pr-4 space-y-2">
          <h4 className="font-bold text-slate-700 text-sm mb-4">Seleziona Oggetto Database</h4>
          {Object.keys(tableDetails).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedTable(key)}
              className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-between transition ${selectedTable === key ? 'bg-blue-500 text-white' : 'hover:bg-slate-50 text-slate-600'}`}
            >
              <span className="capitalize">{key.replace('_', ' ')}</span>
              {selectedTable === key && <KeyRound className="w-4 h-4" />}
            </button>
          ))}
        </div>

        <div className="md:col-span-2 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <HardDrive className="text-blue-500 w-5 h-5" />
              {tableDetails[selectedTable].title}
            </h3>
            <p className="text-slate-600 text-xs mt-1">{tableDetails[selectedTable].desc}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400">
                  <th className="py-2 font-semibold">Campo (Field Key)</th>
                  <th className="py-2 font-semibold">Tipo Dato</th>
                  <th className="py-2 font-semibold">Descrizione & Vincolo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableDetails[selectedTable].fields.map((field: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 font-mono font-bold text-blue-600">{field.name}</td>
                    <td className="py-2.5 text-slate-500 font-mono text-[11px]">{field.type}</td>
                    <td className="py-2.5 text-slate-600">{field.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SQL Script / DDL Proposal */}
      <div className="bg-slate-900 p-6 rounded-2xl text-slate-200 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-100">Script di Creazione DB - PostgreSQL (DDL ottimizzato)</h3>
          <span className="text-[10px] text-indigo-400 font-mono bg-slate-800 px-2 py-1 rounded-md">COMPATIBILE DRIZZLE / SUPABASE</span>
        </div>
        <pre className="text-xs bg-slate-950 p-4 rounded-xl text-emerald-400 font-mono overflow-x-auto leading-relaxed max-h-72 border border-slate-800">
{`-- 1. ABILITAZIONE ESTENSIONI PER IDENTIFICATIVI UNIVOCI
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. AZIENDE E RECRUITER (CON GESTIONE RESPONSIVENESS SCORE)
CREATE TABLE recruiters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    responsiveness_score NUMERIC(5,2) DEFAULT 100.00 CHECK (responsiveness_score >= 0.0 AND responsiveness_score <= 100.0),
    avg_reply_time_hours INTEGER DEFAULT 24,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. UTENTI CANDIDATI CON TRACCIAMENTO PSICOMETRICO E PREOCCUPAZIONE
CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    skills_liquids JSONB NOT NULL DEFAULT '[]',
    psychometrics JSONB NOT NULL DEFAULT '{}',
    avg_anxiety_index INTEGER DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. ANNUNCI DI LAVORO CON TEMPO-TO-LIVE (TTL) E REGOLA DI PENALIZZAZIONE
CREATE TABLE job_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recruiter_id UUID REFERENCES recruiters(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    skills_required JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ttl_remaining_hours INTEGER NOT NULL DEFAULT 48, -- ore rimaste prima della penalizzazione
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'expired_ttl', 'hidden'))
);

-- 5. CREAZIONE DI INDICE PARZIALE PER PERFORMANCE FEED
-- Un annuncio non deve mai apparire se lo status scende o il recruiter è sotto soglia
CREATE INDEX idx_active_jobs ON job_postings(status) WHERE status = 'active';`}
        </pre>
      </div>
    </div>
  );
}
