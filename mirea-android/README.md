# Mirea Android App - Developer Guide

Questo modulo contiene l'applicazione nativa Android sviluppata in **Kotlin** e **Jetpack Compose** per la piattaforma **Mirea (Humane Recruiting)**.

## 🚀 Come iniziare lo Sviluppo con Android Studio

Segui questi passaggi per configurare ed avviare il progetto sul tuo dispositivo:

### 1. Prerequisiti
* **Android Studio**: Si consiglia **Android Studio Ladybug (2024.2.1)** o versioni successive.
* **JDK**: Java Development Kit **17** (incorporato in Android Studio).
* **SDK Android**: API 35 (Android 15) per la compilazione, con supporto a partire da API 26 (Android 8.0).

### 2. Apertura del Progetto
1. Apri **Android Studio**.
2. Seleziona **Open** (o *Import Project*).
3. Seleziona la cartella `mirea-android` (questa cartella) e fai clic su **OK**.
4. Android Studio avvierà automaticamente il Sync di Gradle utilizzando il Gradle Wrapper preconfigurato (Gradle 8.9).

### 3. Configurazione della API Key di Gemini
L'app utilizza le funzionalità di Intelligenza Artificiale Generativa di Google per analizzare i CV e simulare i colloqui.
Per abilitare le risposte reali (altrimenti l'app userà dei mock di fallback):
1. Apri il file [local.properties](local.properties) nella radice di questa cartella.
2. Inserisci la tua API Key di Gemini valorizzando la variabile `GEMINI_API_KEY`:
   ```properties
   GEMINI_API_KEY=LaTuaChiaveSegretaDiGemini
   ```
3. Fai un nuovo Sync di Gradle. La chiave verrà caricata in modo sicuro tramite `BuildConfig.GEMINI_API_KEY` senza essere committata sul repository Git.

---

## 🛠️ Stack Tecnologico & Librerie Utilizzate

L'applicazione è strutturata seguendo le linee guida ufficiali di Android sulla **Modern Android Development (MAD)** e l'architettura **MVVM**:

* **UI & Layout**: Jetpack Compose (Material 3) con supporto completo per Edge-to-Edge e animazioni avanzate.
* **Navigation**: Jetpack Navigation Compose per la gestione del flusso tra le schermate (Splash, RIASEC, CV, Chat, Job Board, Diario).
* **Database Locale**: Room Database per la persistenza delle note del diario dell'utente in modalità offline.
* **Local Storage (Key-Value)**: DataStore Preferences per salvare i risultati del test psicometrico RIASEC in modo persistente.
* **AI Generativa**: Libreria ufficiale di Google `generativeai` (`com.google.ai.client.generativeai`) per connettersi a Gemini 1.5 Flash.
* **Image Loading**: Coil Compose per il caricamento asincrono e performante delle immagini.
* **JSON Serialization**: Gson e Kotlinx Serialization per la manipolazione strutturata dei dati.
* **Dependency Management**: Gradle Version Catalogs (`libs.versions.toml`) per centralizzare le dipendenze.
