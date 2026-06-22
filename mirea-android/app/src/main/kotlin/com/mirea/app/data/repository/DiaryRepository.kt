package com.mirea.app.data.repository

import com.mirea.app.data.local.DiaryNoteDao
import com.mirea.app.data.local.DiaryNoteEntity
import com.mirea.app.data.models.DiaryNote
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import java.util.UUID

class DiaryRepository(private val dao: DiaryNoteDao) {

    val allNotes: Flow<List<DiaryNote>> = dao.getAllNotes().map { list ->
        list.map { it.toDomain() }
    }

    suspend fun insertNote(note: DiaryNote) {
        dao.insertNote(note.toEntity())
    }

    suspend fun updateNote(note: DiaryNote) {
        dao.updateNote(note.toEntity())
    }

    suspend fun deleteNote(id: String) {
        dao.deleteNoteById(id)
    }

    fun newNote(
        title: String,
        content: String,
        anxietyLevel: Int,
        interviewCompany: String? = null,
        interviewDate: String? = null
    ) = DiaryNote(
        id = UUID.randomUUID().toString(),
        title = title,
        content = content,
        date = java.time.LocalDate.now().toString(),
        anxietyLevel = anxietyLevel,
        interviewDate = interviewDate,
        interviewCompany = interviewCompany
    )

    // ── Mappers ──────────────────────────────────────────────────────────────
    private fun DiaryNoteEntity.toDomain() = DiaryNote(
        id = id, title = title, content = content,
        date = date, anxietyLevel = anxietyLevel,
        interviewDate = interviewDate, interviewCompany = interviewCompany
    )

    private fun DiaryNote.toEntity() = DiaryNoteEntity(
        id = id, title = title, content = content,
        date = date, anxietyLevel = anxietyLevel,
        interviewDate = interviewDate, interviewCompany = interviewCompany
    )
}
