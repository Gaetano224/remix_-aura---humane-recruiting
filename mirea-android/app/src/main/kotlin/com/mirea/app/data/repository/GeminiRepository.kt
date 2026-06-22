package com.mirea.app.data.repository

import com.google.ai.client.generativeai.GenerativeModel
import com.google.ai.client.generativeai.type.content
import com.google.ai.client.generativeai.type.generationConfig
import com.google.gson.Gson
import com.google.gson.JsonObject
import com.mirea.app.data.models.CVParseResult
import com.mirea.app.data.models.ChatMessage
import com.mirea.app.data.models.Skill

class GeminiRepository(private val apiKey: String) {

    private val gson = Gson()
    private val hasValidKey get() = apiKey.isNotBlank() && apiKey != "INSERISCI_QUI_LA_TUA_GEMINI_API_KEY"

    // ── Crea un model con parametri specifici ──────────────────────────────
    private fun buildModel(
        systemInstruction: String,
        temperature: Float = 0.7f,
        jsonMode: Boolean = false
    ): GenerativeModel {
        return GenerativeModel(
            modelName = "gemini-1.5-flash",
            apiKey = apiKey,
            generationConfig = generationConfig {
                this.temperature = temperature
                if (jsonMode) responseMimeType = "application/json"
            },
            systemInstruction = content { text(systemInstruction) }
        )
    }

    // ── Analisi CV ─────────────────────────────────────────────────────────
    suspend fun parseCV(cvText: String, answers: List<Int>): CVParseResult {
        if (!hasValidKey) return getMockParseResult(cvText, answers)

        val systemInstruction = """Sei un esperto di orientamento di carriera e psicometria RIASEC.
Analizza il curriculum e i punteggi del test psicometrico per consigliare figure professionali reali.
Rispondi SOLO con JSON valido senza markdown."""

        val prompt = """Analizza questo curriculum combinato con il test RIASEC.
CV:
\"\"\"
$cvText
\"\"\"

Punteggi RIASEC (14 risposte, valori 0-100): ${answers.joinToString(",")}
Ordine: Realistico×2, Investigativo×2, Artistico×2, Sociale×2, Intraprendente×2, Convenzionale×2, Mobilità, Stress

Restituisci JSON con questa struttura:
{
  "candidateName": "string",
  "email": "string",
  "summary": "string",
  "professionalTitle": "string",
  "matchedTitles": ["string"],
  "profileMatchingFeedback": "string in italiano",
  "skills": [{"name":"string","category":"hard|soft|creative","description":"string","rating":0-100}],
  "careerPathSuggestions": ["string"]
}"""

        return try {
            val model = buildModel(systemInstruction, temperature = 0.3f, jsonMode = true)
            val response = model.generateContent(prompt)
            val text = response.text ?: return getMockParseResult(cvText, answers)
            parseCVResponse(text)
        } catch (e: Exception) {
            getMockParseResult(cvText, answers)
        }
    }

    private fun parseCVResponse(json: String): CVParseResult {
        return try {
            val obj = gson.fromJson(json, JsonObject::class.java)
            CVParseResult(
                candidateName = obj.get("candidateName")?.asString ?: "",
                email = obj.get("email")?.asString ?: "",
                summary = obj.get("summary")?.asString ?: "",
                professionalTitle = obj.get("professionalTitle")?.asString ?: "",
                matchedTitles = obj.getAsJsonArray("matchedTitles")?.map { it.asString } ?: emptyList(),
                profileMatchingFeedback = obj.get("profileMatchingFeedback")?.asString ?: "",
                skills = obj.getAsJsonArray("skills")?.map { el ->
                    val s = el.asJsonObject
                    Skill(
                        name = s.get("name")?.asString ?: "",
                        category = s.get("category")?.asString ?: "hard",
                        description = s.get("description")?.asString ?: "",
                        rating = s.get("rating")?.asInt ?: 50
                    )
                } ?: emptyList(),
                careerPathSuggestions = obj.getAsJsonArray("careerPathSuggestions")
                    ?.map { it.asString } ?: emptyList()
            )
        } catch (e: Exception) {
            CVParseResult()
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
        if (!hasValidKey) return getMockChatResponse(mode, jobTitle, company)

        val systemInstruction = when (mode) {
            "interview" -> """Sei Mirea, l'intervistatrice virtuale empatica.
Stai conducendo una simulazione di colloquio per la posizione di "$jobTitle" presso "$company".
Valuta le risposte in base a queste competenze: ${skills.joinToString(", ")}.
Fai UNA domanda alla volta. Tono caldo, professionale e incoraggiante."""

            "empathy" -> """Sei Mirea, il coach empatico della piattaforma.
Il candidato ha ricevuto un rifiuto per "$jobTitle".
Umanizza questo momento: sii sensibile, caldo, empatico.
Aiuta a sollevare il morale, spiega che un rifiuto non definisce il suo valore.
Dai suggerimenti costruttivi."""

            else -> """Sei Mirea, l'assistente virtuale della piattaforma di recruiting umano.
Supporta candidati e recruiter. Sii amichevole, calorosa e incoraggiante."""
        }

        return try {
            val model = buildModel(systemInstruction, temperature = 0.75f)
            // Ricostruisce la storia della chat
            val history = messages.dropLast(1).map { msg ->
                content(role = if (msg.sender == "user") "user" else "model") {
                    text(msg.text)
                }
            }
            val chat = model.startChat(history = history)
            val lastMessage = messages.last().text
            val response = chat.sendMessage(lastMessage)
            response.text ?: "Mi dispiace, non ho capito. Puoi ripetere?"
        } catch (e: Exception) {
            getMockChatResponse(mode, jobTitle, company)
        }
    }

    // ── Mock fallback (senza API key) ──────────────────────────────────────
    private fun getMockParseResult(cvText: String, answers: List<Int>): CVParseResult {
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

    private fun getMockChatResponse(mode: String, jobTitle: String, company: String): String {
        return when (mode) {
            "interview" -> "Ciao! Sono Mirea 🤖 (modalità demo). " +
                    "Per la posizione di \"$jobTitle\" presso \"$company\" ti chiedo: " +
                    "Puoi raccontarmi una situazione in cui hai risolto un problema complesso " +
                    "con risorse limitate? Come hai gestito la pressione del team?"
            "empathy" -> "Ciao... ho saputo del rifiuto per \"$jobTitle\" 💙 " +
                    "So che fa male, ma questo momento non definisce il tuo valore. " +
                    "Ogni porta chiusa ti avvicina a quella giusta. Vuoi che lavoriamo insieme " +
                    "sui punti di forza da valorizzare nella prossima candidatura?"
            else -> "Ciao! Sono Mirea 🌸, la tua alleata per un recruiting più umano. " +
                    "Posso aiutarti a simulare un colloquio, darti supporto emotivo " +
                    "o analizzare le tue competenze. Come posso aiutarti oggi?"
        }
    }
}
