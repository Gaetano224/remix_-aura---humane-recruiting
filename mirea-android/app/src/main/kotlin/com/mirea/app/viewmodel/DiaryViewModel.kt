package com.mirea.app.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.mirea.app.data.local.MireaDatabase
import com.mirea.app.data.models.DiaryNote
import com.mirea.app.data.repository.DiaryRepository
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

/**
 * AndroidViewModel: ottiene automaticamente il Context dell'Application.
 * Questo è il pattern corretto per accedere al database Room senza
 * dover passare Context manualmente nel factory.
 */
class DiaryViewModel(application: Application) : AndroidViewModel(application) {

    private val repository = DiaryRepository(
        MireaDatabase.getInstance(application).diaryNoteDao()
    )

    val notes: StateFlow<List<DiaryNote>> = repository.allNotes
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5_000),
            initialValue = emptyList()
        )

    fun addNote(
        title: String,
        content: String,
        anxietyLevel: Int,
        interviewCompany: String? = null,
        interviewDate: String? = null
    ) {
        viewModelScope.launch {
            val note = repository.newNote(title, content, anxietyLevel, interviewCompany, interviewDate)
            repository.insertNote(note)
        }
    }

    fun deleteNote(id: String) {
        viewModelScope.launch { repository.deleteNote(id) }
    }
}
