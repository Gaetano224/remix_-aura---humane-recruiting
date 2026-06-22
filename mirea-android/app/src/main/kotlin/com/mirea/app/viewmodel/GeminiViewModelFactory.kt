package com.mirea.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.mirea.app.data.repository.GeminiRepository

/**
 * Factory generico per i ViewModel che richiedono GeminiRepository.
 * Usato per CvViewModel e ChatViewModel nella navigation.
 */
class GeminiViewModelFactory(
    private val geminiRepository: GeminiRepository
) : ViewModelProvider.Factory {

    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return when {
            modelClass.isAssignableFrom(CvViewModel::class.java) ->
                CvViewModel(geminiRepository) as T

            modelClass.isAssignableFrom(ChatViewModel::class.java) ->
                ChatViewModel(geminiRepository) as T

            else -> throw IllegalArgumentException("Unknown ViewModel: ${modelClass.name}")
        }
    }
}
