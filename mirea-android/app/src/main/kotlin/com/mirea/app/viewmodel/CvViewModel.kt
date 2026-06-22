package com.mirea.app.viewmodel

import android.content.Context
import android.net.Uri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.mirea.app.data.models.CVParseResult
import com.mirea.app.data.models.RiasecResult
import com.mirea.app.data.repository.GeminiRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

sealed class CvUiState {
    object Idle : CvUiState()
    object Loading : CvUiState()
    data class Success(val result: CVParseResult) : CvUiState()
    data class Error(val message: String) : CvUiState()
}

class CvViewModel(private val geminiRepo: GeminiRepository) : ViewModel() {

    private val _uiState = MutableStateFlow<CvUiState>(CvUiState.Idle)
    val uiState: StateFlow<CvUiState> = _uiState.asStateFlow()

    private val _cvText = MutableStateFlow("")
    val cvText: StateFlow<String> = _cvText.asStateFlow()

    fun setCvText(text: String) { _cvText.value = text }

    fun loadPresetResume(text: String) { _cvText.value = text }

    fun readPdfFromUri(context: Context, uri: Uri) {
        viewModelScope.launch {
            try {
                val inputStream = context.contentResolver.openInputStream(uri)
                val bytes = inputStream?.readBytes() ?: return@launch
                inputStream.close()
                // Estrazione testo semplice dal PDF (byte → stringa ASCII leggibile)
                // Per una vera estrazione testo usare PdfRenderer o iText
                val rawText = String(bytes, Charsets.ISO_8859_1)
                val textContent = rawText.filter { it.isLetterOrDigit() || it.isWhitespace() || it in ".,;:@-_" }
                _cvText.value = textContent.take(3000)
            } catch (e: Exception) {
                _cvText.value = "Errore nella lettura del file: ${e.localizedMessage}"
            }
        }
    }

    fun analyzeCV(riasecResult: RiasecResult?) {
        if (_cvText.value.isBlank()) {
            _uiState.value = CvUiState.Error("Inserisci il testo del CV o carica un file PDF prima di procedere.")
            return
        }
        viewModelScope.launch {
            _uiState.value = CvUiState.Loading
            try {
                val answers = riasecResult?.answers ?: List(14) { 65 }
                val result = geminiRepo.parseCV(_cvText.value, answers)
                _uiState.value = CvUiState.Success(result)
            } catch (e: Exception) {
                _uiState.value = CvUiState.Error("Errore di analisi: ${e.localizedMessage}")
            }
        }
    }

    fun reset() {
        _uiState.value = CvUiState.Idle
        _cvText.value = ""
    }
}
