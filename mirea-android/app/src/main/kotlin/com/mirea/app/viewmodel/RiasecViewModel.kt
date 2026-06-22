package com.mirea.app.viewmodel

import androidx.lifecycle.ViewModel
import com.mirea.app.data.models.RiasecQuestion
import com.mirea.app.data.models.RiasecResult
import com.mirea.app.data.repository.JobRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class RiasecViewModel : ViewModel() {

    private val jobRepository = JobRepository()
    val questions: List<RiasecQuestion> = jobRepository.getRiasecQuestions()

    // Risposte: un Int 0–100 per ciascuna delle 14 domande
    private val _answers = MutableStateFlow(List(14) { 65 })
    val answers: StateFlow<List<Int>> = _answers.asStateFlow()

    private val _currentStep = MutableStateFlow(0)
    val currentStep: StateFlow<Int> = _currentStep.asStateFlow()

    private val _result = MutableStateFlow<RiasecResult?>(null)
    val result: StateFlow<RiasecResult?> = _result.asStateFlow()

    val totalSteps: Int get() = questions.size

    fun setAnswer(index: Int, value: Int) {
        val updated = _answers.value.toMutableList()
        if (index in updated.indices) updated[index] = value
        _answers.value = updated
    }

    fun goNext() {
        if (_currentStep.value < totalSteps - 1) {
            _currentStep.value++
        } else {
            computeResult()
        }
    }

    fun goBack() {
        if (_currentStep.value > 0) _currentStep.value--
    }

    fun resetTest() {
        _answers.value = List(14) { 65 }
        _currentStep.value = 0
        _result.value = null
    }

    private fun computeResult() {
        val ans = _answers.value
        fun avg(i: Int, j: Int) = ((ans.getOrElse(i) { 65 } + ans.getOrElse(j) { 65 }) / 2)

        _result.value = RiasecResult(
            answers = ans,
            rScore = avg(0, 1),
            iScore = avg(2, 3),
            aScore = avg(4, 5),
            sScore = avg(6, 7),
            eScore = avg(8, 9),
            cScore = avg(10, 11),
            mobilityScore = ans.getOrElse(12) { 65 },
            stressScore = ans.getOrElse(13) { 65 }
        )
    }
}
