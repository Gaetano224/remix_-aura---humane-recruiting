package com.mirea.app.data.repository

import com.mirea.app.data.models.JobPosting
import com.mirea.app.data.models.RiasecQuestion

class JobRepository {

    fun getJobs(): List<JobPosting> = listOf(
        JobPosting(
            id = "job-1",
            title = "Senior Full-Stack Developer",
            company = "HexaTech Solutions",
            location = "Milano / Remote",
            description = "Siamo alla ricerca di un leader tecnico appassionato per guidare il team di frontend e backend. " +
                    "Lavoriamo con architetture IoT, TypeScript, React e microservizi.",
            requiredSkills = listOf("TypeScript & React", "Node.js & Express", "Collaborazione Interdisciplinare"),
            responsivenessScore = 94,
            publishDate = "2026-06-01",
            ttlRemainingHours = 42,
            status = "active"
        ),
        JobPosting(
            id = "job-2",
            title = "AI Product Designer",
            company = "Synapse Digital",
            location = "Torino / Ibrido",
            description = "Progetta interfacce utente incentrate sull'esperienza uomo-macchina. " +
                    "Cerchiamo designer capaci di integrare flussi di intelligenza artificiale valorizzando l'aspetto umano.",
            requiredSkills = listOf("Design System", "Figma", "Problem Solving Creativo", "Leadership Empatica"),
            responsivenessScore = 82,
            publishDate = "2026-06-03",
            ttlRemainingHours = 12,
            status = "active"
        ),
        JobPosting(
            id = "job-3",
            title = "Cloud Infrastructure Architect",
            company = "Aether Cloud",
            location = "Roma / Remote",
            description = "Gestisci l'infrastruttura globale di microservizi in Cloud Run e Kubernetes. " +
                    "Esperienza di sicurezza e automazione con pipeline CI/CD.",
            requiredSkills = listOf("Docker & Kubernetes", "AWS/GCP Services", "Sicurezza Informatica", "Analisi Critica"),
            responsivenessScore = 68,
            publishDate = "2026-06-04",
            ttlRemainingHours = 2,
            status = "active"
        ),
        JobPosting(
            id = "job-4",
            title = "Junior HR Talent Specialist",
            company = "Delta Group",
            location = "Bologna / In Sede",
            description = "Aiutaci a reclutare i migliori talenti usando strumenti digitali di nuova generazione " +
                    "basati sulla gamification e sul rispetto dell'individuo.",
            requiredSkills = listOf("HR Management", "Comunicazione Persuasiva", "Rapporti Interpersonali"),
            responsivenessScore = 52,
            publishDate = "2026-06-02",
            ttlRemainingHours = 0,
            status = "active"
        )
    )

    fun getRiasecQuestions(): List<RiasecQuestion> = listOf(
        RiasecQuestion(1, "Mi piace lavorare con strumenti, macchinari o attività fisiche concrete.", "R"),
        RiasecQuestion(2, "Preferisco compiti pratici e tangibili alle attività puramente teoriche.", "R"),
        RiasecQuestion(3, "Amo analizzare dati complessi e risolvere problemi logici profondi.", "I"),
        RiasecQuestion(4, "Mi interessa capire come funzionano le cose a livello fondamentale.", "I"),
        RiasecQuestion(5, "Sono fortemente attratto/a dalla creatività e dall'espressione artistica.", "A"),
        RiasecQuestion(6, "Mi piace creare cose originali e dare forma a idee innovative.", "A"),
        RiasecQuestion(7, "Aiutare le persone mi dà grande soddisfazione e significato.", "S"),
        RiasecQuestion(8, "Preferisco lavorare a diretto contatto con le persone piuttosto che da solo/a.", "S"),
        RiasecQuestion(9, "Mi piace convincere, influenzare e motivare gli altri verso un obiettivo.", "E"),
        RiasecQuestion(10, "Mi sento a mio agio assumendo ruoli di leadership e responsabilità.", "E"),
        RiasecQuestion(11, "Preferisco ambienti di lavoro strutturati, con regole e procedure chiare.", "C"),
        RiasecQuestion(12, "Mi piace lavorare con dati, numeri e analisi precise e metodiche.", "C"),
        RiasecQuestion(13, "Sono disponibile a spostarmi geograficamente o lavorare in modalità ibrida/remota.", "mobility"),
        RiasecQuestion(14, "Gestisco bene la pressione lavorativa e i momenti di forte stress.", "stress")
    )
}
