package com.mirea.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.mirea.app.data.models.ChatMessage
import com.mirea.app.data.repository.MireaRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.UUID

class ChatViewModel(private val mireaRepo: MireaRepository = MireaRepository()) : ViewModel() {

    private val _messages = MutableStateFlow<List<ChatMessage>>(emptyList())
    val messages: StateFlow<List<ChatMessage>> = _messages.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    private val _mode = MutableStateFlow("general") // "general" | "interview" | "empathy"
    val mode: StateFlow<String> = _mode.asStateFlow()

    private val _jobTitle = MutableStateFlow("")
    private val _company = MutableStateFlow("")
    private val _skills = MutableStateFlow<List<String>>(emptyList())

    fun setMode(mode: String, jobTitle: String = "", company: String = "", skills: List<String> = emptyList()) {
        _mode.value = mode
        _jobTitle.value = jobTitle
        _company.value = company
        _skills.value = skills
        _messages.value = emptyList()
        // Messaggio di benvenuto automatico
        sendWelcomeMessage()
    }

    private fun sendWelcomeMessage() {
        viewModelScope.launch {
            _isLoading.value = true
            try {
                val welcomePrompt = when (_mode.value) {
                    "interview" -> "Inizia la simulazione di colloquio presentandoti e facendo la prima domanda."
                    "empathy" -> "Inizia con un messaggio empatico di supporto per il rifiuto ricevuto."
                    else -> "Presentati e chiedi come puoi aiutare l'utente oggi."
                }
                val tempMsg = ChatMessage(
                    id = UUID.randomUUID().toString(),
                    sender = "user", text = welcomePrompt,
                    timestamp = now(), mode = _mode.value
                )
                val response = mireaRepo.sendChatMessage(
                    listOf(tempMsg), _mode.value, _jobTitle.value, _company.value, _skills.value
                )
                addAssistantMessage(response)
            } catch (e: Exception) {
                addAssistantMessage("Ciao! Sono Mirea 🌸. Come posso aiutarti oggi?")
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun sendMessage(text: String) {
        if (text.isBlank() || _isLoading.value) return
        val userMsg = ChatMessage(
            id = UUID.randomUUID().toString(),
            sender = "user", text = text,
            timestamp = now(), mode = _mode.value
        )
        _messages.value = _messages.value + userMsg

        viewModelScope.launch {
            _isLoading.value = true
            try {
                val response = mireaRepo.sendChatMessage(
                    _messages.value, _mode.value, _jobTitle.value, _company.value, _skills.value
                )
                addAssistantMessage(response)
            } catch (e: Exception) {
                addAssistantMessage("Mi dispiace, si è verificato un errore. Riprova.")
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun clearChat() {
        _messages.value = emptyList()
        _mode.value = "general"
    }

    private fun addAssistantMessage(text: String) {
        val msg = ChatMessage(
            id = UUID.randomUUID().toString(),
            sender = "assistant", text = text,
            timestamp = now(), mode = _mode.value
        )
        _messages.value = _messages.value + msg
    }

    private fun now(): String =
        LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm"))
}
