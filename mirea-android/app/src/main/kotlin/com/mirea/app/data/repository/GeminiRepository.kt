package com.mirea.app.data.repository

import com.mirea.app.data.models.CVParseResult
import com.mirea.app.data.models.ChatMessage
import com.mirea.app.data.models.Skill
import kotlinx.coroutines.delay

/**
 * Repository locale che fornisce risposte predefinite per l'analisi CV e la chat.
 * Nessuna dipendenza da servizi esterni o API.
 */
class MireaRepository {

    // ── Analisi CV ─────────────────────────────────────────────────────────
    suspend fun parseCV(cvText: String, answers: List<Int>): CVParseResult {
        // Simula un piccolo tempo di elaborazione per UX naturale
        delay(1500)
        return getParseResult(cvText, answers)
    }

    private fun getParseResult(cvText: String, answers: List<Int>): CVParseResult {
        val lower = cvText.lowercase()
        val hasTech = lower.contains("react") || lower.contains("typescript") ||
                lower.contains("python") || lower.contains("developer") ||
                lower.contains("sviluppatore") || lower.contains("backend")
        val hasDesign = lower.contains("design") || lower.contains("figma") || lower.contains("ux")
        val hasHR = lower.contains("hr") || lower.contains("risorse umane") || lower.contains("talent")

        val stressScore = if (answers.size >= 14) answers[13] else 75
        val summary = "Profilo calibrato su un indice di resilienza del $stressScore%. " +
                "Combina esperienza e propensioni psicometriche in modo armonico."

        return when {
            hasTech -> CVParseResult(
                candidateName = "Mario Rossi", email = "mario.rossi@example.it",
                summary = summary,
                professionalTitle = "Full-Stack Developer",
                matchedTitles = listOf("Frontend Engineer", "Software Architect", "Data Engineer"),
                profileMatchingFeedback = "Le tue competenze tecniche unite alla tua propensione analitica ti rendono " +
                        "un profilo eccezionale per ruoli di sviluppo ad alto impatto.",
                skills = listOf(
                    Skill("TypeScript & React", "hard", "Componenti riusabili e logica robusta.", 90),
                    Skill("Node.js & Express", "hard", "API RESTful scalabili.", 85),
                    Skill("Problem Solving", "creative", "Decomposizione di problemi complessi.", 92),
                    Skill("Collaborazione Agile", "soft", "Rituali Scrum e allineamento col team.", 80)
                ),
                careerPathSuggestions = listOf("Full-Stack Developer", "Software Architect", "Data Engineer")
            )
            hasDesign -> CVParseResult(
                candidateName = "Alice Bianchi", email = "alice.b@example.it",
                summary = summary,
                professionalTitle = "UX/UI Designer",
                matchedTitles = listOf("Product Designer", "UX Researcher", "Interaction Designer"),
                profileMatchingFeedback = "La tua forte vena artistica e le doti empatiche ti rendono " +
                        "insostituibile nel creare esperienze digitali che parlano alle persone.",
                skills = listOf(
                    Skill("UI/UX Design", "hard", "Interfacce inclusive e accessibili.", 93),
                    Skill("Figma & Wireframing", "hard", "Prototipi ad alta fedeltà.", 90),
                    Skill("Ascolto Empatico", "soft", "Ascolto del feedback utente.", 95)
                ),
                careerPathSuggestions = listOf("Product Designer", "UX Researcher", "Interaction Designer")
            )
            hasHR -> CVParseResult(
                candidateName = "Sara Verdi", email = "sara.verdi@example.it",
                summary = summary,
                professionalTitle = "Talent Acquisition Specialist",
                matchedTitles = listOf("HR Manager", "People & Culture Specialist", "Corporate Coach"),
                profileMatchingFeedback = "La tua spinta sociale e l'esperienza in HR ti rendono " +
                        "una figura chiave per attrarre talenti in ambienti sani e inclusivi.",
                skills = listOf(
                    Skill("Talent Acquisition", "hard", "Strategie di recruiting sulle soft skill.", 88),
                    Skill("Corporate Counseling", "soft", "Ascolto attivo e mediazione.", 92),
                    Skill("Percorsi Formativi", "creative", "Apprendimento su misura.", 85)
                ),
                careerPathSuggestions = listOf("HR Manager", "People & Culture Specialist", "Corporate Coach")
            )
            else -> CVParseResult(
                candidateName = "Alex Bianchi", email = "alex@example.it",
                summary = summary,
                professionalTitle = "Specialista Multidisciplinare",
                matchedTitles = listOf("Operations Associate", "Process Consultant", "Project Manager"),
                profileMatchingFeedback = "Il tuo profilo combina precisione organizzativa e flessibilità adattiva, " +
                        "rendendoti prezioso in ruoli trasversali e di coordinamento.",
                skills = listOf(
                    Skill("Gestione del Tempo", "hard", "Flussi complessi ottimizzati.", 80),
                    Skill("Problem Solving Adattivo", "creative", "Adattamento rapido a nuovi contesti.", 88),
                    Skill("Analisi di Scenari", "soft", "Scrutinio attento per miglioramenti.", 85)
                ),
                careerPathSuggestions = listOf("Operations Associate", "Process Consultant", "Project Manager")
            )
        }
    }

    // ── Chat Mirea ─────────────────────────────────────────────────────────
    suspend fun sendChatMessage(
        messages: List<ChatMessage>,
        mode: String,
        jobTitle: String = "",
        company: String = "",
        skills: List<String> = emptyList()
    ): String {
        // Simula un piccolo tempo di risposta per UX naturale
        delay(800)
        return getChatResponse(messages, mode, jobTitle, company)
    }

    private fun getChatResponse(
        messages: List<ChatMessage>,
        mode: String,
        jobTitle: String,
        company: String
    ): String {
        val userMessageCount = messages.count { it.sender == "user" }
        val lastUserMessage = messages.lastOrNull { it.sender == "user" }?.text?.lowercase() ?: ""

        return when (mode) {
            "interview" -> getInterviewResponse(userMessageCount, lastUserMessage, jobTitle, company)
            "empathy" -> getEmpathyResponse(userMessageCount, lastUserMessage, jobTitle)
            else -> getGeneralResponse(userMessageCount, lastUserMessage)
        }
    }

    private fun getInterviewResponse(turn: Int, userMessage: String, jobTitle: String, company: String): String {
        return when (turn) {
            0 -> "Ciao! Sono Mirea 🌸, la tua intervistatrice virtuale. " +
                    "Oggi simuleremo un colloquio per la posizione di \"$jobTitle\" presso \"$company\". " +
                    "Rilassati e rispondi come faresti in un vero colloquio.\n\n" +
                    "Iniziamo: **Puoi presentarti brevemente e raccontarmi cosa ti ha spinto a candidarti per questo ruolo?**"
            1 -> "Grazie per la tua presentazione! È molto interessante il tuo percorso. 😊\n\n" +
                    "Ora vorrei approfondire: **Puoi raccontarmi una situazione lavorativa in cui hai dovuto affrontare " +
                    "un problema complesso? Come l'hai risolto?**"
            2 -> "Ottimo esempio! La capacità di problem solving è fondamentale. 💪\n\n" +
                    "Passiamo a un'altra area: **Come gestisci il lavoro sotto pressione e le scadenze strette? " +
                    "Hai un metodo particolare di organizzazione?**"
            3 -> "Apprezzo molto la tua organizzazione! 📋\n\n" +
                    "Un'ultima domanda: **Dove ti vedi professionalmente tra 3-5 anni? " +
                    "Quali competenze vorresti sviluppare?**"
            else -> "Grazie mille per questa simulazione! 🎉\n\n" +
                    "**Feedback complessivo:** Hai dimostrato buone capacità comunicative e una chiara visione professionale. " +
                    "Ti consiglio di preparare sempre degli esempi concreti dalle tue esperienze passate e di " +
                    "quantificare i risultati ottenuti quando possibile.\n\n" +
                    "Punti di forza emersi:\n" +
                    "• Buona capacità di auto-presentazione\n" +
                    "• Approccio strutturato ai problemi\n" +
                    "• Chiarezza negli obiettivi\n\n" +
                    "In bocca al lupo per il tuo prossimo colloquio! 🍀"
        }
    }

    private fun getEmpathyResponse(turn: Int, userMessage: String, jobTitle: String): String {
        return when (turn) {
            0 -> "Ciao... ho saputo del rifiuto per \"$jobTitle\" 💙\n\n" +
                    "So che può essere un momento difficile, ma voglio che tu sappia una cosa importante: " +
                    "**un rifiuto non definisce il tuo valore professionale.** Ogni percorso di carriera " +
                    "ha i suoi alti e bassi, e spesso le porte che si chiudono ci guidano verso " +
                    "opportunità ancora migliori.\n\n" +
                    "Come ti senti in questo momento?"
            1 -> "È completamente normale sentirsi così, e ti ringrazio per la sincerità. 🌿\n\n" +
                    "Spesso i rifiuti dipendono da fattori che non hanno nulla a che fare con le tue capacità: " +
                    "budget interni, tempistiche, candidati interni già in lista... " +
                    "Non è quasi mai una questione di \"non essere abbastanza\".\n\n" +
                    "**Vuoi che lavoriamo insieme sui tuoi punti di forza da valorizzare nella prossima candidatura?**"
            2 -> "Assolutamente! Ecco alcuni suggerimenti concreti: 📝\n\n" +
                    "1. **Rivedi il tuo CV** con occhi freschi, evidenziando i risultati misurabili\n" +
                    "2. **Prepara una \"storia\" per ogni competenza chiave** con il metodo STAR\n" +
                    "3. **Fai networking attivo** — il 70% delle assunzioni avviene tramite contatti\n" +
                    "4. **Dedica tempo alla cura di te stesso** — corpo e mente riposati performano meglio\n\n" +
                    "Ricorda: ogni colloquio, anche quelli andati male, ti rendono più preparato per il prossimo. 💪"
            else -> "Sono qui per te in ogni momento del tuo percorso! 🌸\n\n" +
                    "Ti lascio con un pensiero: le persone di maggior successo non sono quelle che non hanno " +
                    "mai ricevuto un rifiuto, ma quelle che hanno saputo rialzarsi ogni volta.\n\n" +
                    "Quando ti sentirai pronto, possiamo fare una simulazione di colloquio insieme per " +
                    "prepararti al meglio. Non sei solo in questo percorso! 🍀"
        }
    }

    private fun getGeneralResponse(turn: Int, userMessage: String): String {
        return when {
            turn == 0 -> "Ciao! Sono Mirea 🌸, la tua alleata per un recruiting più umano.\n\n" +
                    "Ecco cosa posso fare per te:\n" +
                    "• **Simulazione colloquio** — Preparati con domande realistiche\n" +
                    "• **Supporto emotivo** — Gestire lo stress della ricerca lavoro\n" +
                    "• **Analisi competenze** — Scopri i tuoi punti di forza\n\n" +
                    "Come posso aiutarti oggi?"
            userMessage.contains("colloquio") || userMessage.contains("intervista") ->
                "Ottima scelta! La simulazione di colloquio è uno degli strumenti più efficaci per prepararsi. 🎯\n\n" +
                        "Per iniziare, vai nella sezione **Offerte di lavoro** e seleziona una posizione " +
                        "che ti interessa. Da lì potrai avviare una simulazione personalizzata!\n\n" +
                        "Alcuni consigli generali:\n" +
                        "• Prepara sempre 2-3 domande da fare al recruiter\n" +
                        "• Studia l'azienda e i suoi valori\n" +
                        "• Pratica il metodo STAR per le risposte comportamentali"
            userMessage.contains("cv") || userMessage.contains("curriculum") ->
                "Il CV è il tuo biglietto da visita! 📄\n\n" +
                        "Vai nella sezione **CV** per caricare e analizzare il tuo curriculum. " +
                        "Il sistema analizzerà le tue competenze e ti suggerirà i ruoli più adatti.\n\n" +
                        "Ricorda: un buon CV è conciso (max 2 pagine), quantifica i risultati " +
                        "e usa parole chiave del settore!"
            userMessage.contains("stress") || userMessage.contains("ansia") || userMessage.contains("paura") ->
                "È completamente normale sentirsi stressati durante la ricerca di lavoro. 💙\n\n" +
                        "Ecco alcune strategie che possono aiutarti:\n" +
                        "1. **Stabilisci una routine** — Dedica orari fissi alla ricerca\n" +
                        "2. **Celebra i piccoli traguardi** — Ogni candidatura inviata è un passo avanti\n" +
                        "3. **Usa il Diario** — Scrivi i tuoi pensieri nella sezione Diario dell'app\n" +
                        "4. **Prenditi delle pause** — Il burnout da ricerca lavoro è reale\n\n" +
                        "Sei più forte di quanto pensi! 💪"
            else -> "Grazie per il tuo messaggio! 😊\n\n" +
                    "Posso aiutarti con diverse cose:\n" +
                    "• **Test RIASEC** — Scopri il tuo profilo psicometrico\n" +
                    "• **Analisi CV** — Fai analizzare le tue competenze\n" +
                    "• **Offerte di lavoro** — Esplora le posizioni disponibili\n" +
                    "• **Diario** — Tieni traccia del tuo percorso\n\n" +
                    "Cosa ti interessa approfondire?"
        }
    }
}
