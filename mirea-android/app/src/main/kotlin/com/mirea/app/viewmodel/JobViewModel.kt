package com.mirea.app.viewmodel

import androidx.lifecycle.ViewModel
import com.mirea.app.data.models.JobPosting
import com.mirea.app.data.repository.JobRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class JobViewModel : ViewModel() {
    private val repository = JobRepository()

    private val _jobs = MutableStateFlow<List<JobPosting>>(emptyList())
    val jobs: StateFlow<List<JobPosting>> = _jobs.asStateFlow()

    private val _selectedJob = MutableStateFlow<JobPosting?>(null)
    val selectedJob: StateFlow<JobPosting?> = _selectedJob.asStateFlow()

    init {
        _jobs.value = repository.getJobs()
    }

    fun selectJob(job: JobPosting?) { _selectedJob.value = job }

    fun getResponsivenessColor(score: Int): Long = when {
        score >= 80 -> 0xFF7BC67AL   // verde
        score >= 60 -> 0xFFF5A623L   // ambra
        else        -> 0xFFE05252L   // rosso
    }

    fun getResponsivenessLabel(score: Int): String = when {
        score >= 80 -> "Alta reattività"
        score >= 60 -> "Reattività media"
        else        -> "Bassa reattività ⚠️"
    }
}
