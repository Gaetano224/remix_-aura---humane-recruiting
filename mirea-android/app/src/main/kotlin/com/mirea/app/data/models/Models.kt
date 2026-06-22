package com.mirea.app.data.models

import com.google.gson.annotations.SerializedName

// ── Skill ──────────────────────────────────────────────────────────────────
data class Skill(
    val name: String,
    val category: String,      // "hard" | "soft" | "creative"
    val description: String = "",
    val rating: Int = 50       // 0–100
)

// ── CV Parse Result ────────────────────────────────────────────────────────
data class CVParseResult(
    val candidateName: String = "",
    val email: String = "",
    val summary: String = "",
    val professionalTitle: String = "",
    val matchedTitles: List<String> = emptyList(),
    val profileMatchingFeedback: String = "",
    val skills: List<Skill> = emptyList(),
    val careerPathSuggestions: List<String> = emptyList()
)

// ── Job Posting ────────────────────────────────────────────────────────────
data class JobPosting(
    val id: String,
    val title: String,
    val company: String,
    val location: String,
    val description: String,
    val requiredSkills: List<String>,
    val responsivenessScore: Int,   // 0–100
    val publishDate: String,
    val ttlRemainingHours: Int,
    val status: String = "active"   // "active" | "expired"
)

// ── Recruiter ──────────────────────────────────────────────────────────────
data class Recruiter(
    val id: String,
    val name: String,
    val company: String,
    val averageReplyTimeHours: Int,
    val totalApplications: Int,
    val unresolvedApplications: Int,
    val unresolvedOverTTL: Int
)

// ── Chat Message ───────────────────────────────────────────────────────────
data class ChatMessage(
    val id: String,
    val sender: String,   // "user" | "assistant"
    val text: String,
    val timestamp: String,
    val mode: String      // "interview" | "empathy" | "general"
)

// ── RIASEC / Psicometrico ──────────────────────────────────────────────────
data class RiasecQuestion(
    val id: Int,
    val text: String,
    val category: String  // "R" | "I" | "A" | "S" | "E" | "C" | "mobility" | "stress"
)

data class RiasecResult(
    val answers: List<Int>,         // 14 valori 0–100
    val rScore: Int,
    val iScore: Int,
    val aScore: Int,
    val sScore: Int,
    val eScore: Int,
    val cScore: Int,
    val mobilityScore: Int,
    val stressScore: Int
)

// ── Diary Note ─────────────────────────────────────────────────────────────
data class DiaryNote(
    val id: String,
    val title: String,
    val content: String,
    val date: String,           // ISO date: "2026-06-22"
    val anxietyLevel: Int,      // 1–10
    val interviewDate: String? = null,
    val interviewCompany: String? = null
)
