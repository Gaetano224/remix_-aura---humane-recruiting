package com.mirea.app.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "diary_notes")
data class DiaryNoteEntity(
    @PrimaryKey val id: String,
    val title: String,
    val content: String,
    val date: String,
    val anxietyLevel: Int,
    val interviewDate: String? = null,
    val interviewCompany: String? = null
)
