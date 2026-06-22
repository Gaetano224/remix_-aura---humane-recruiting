package com.mirea.app.data.local

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface DiaryNoteDao {

    @Query("SELECT * FROM diary_notes ORDER BY date DESC")
    fun getAllNotes(): Flow<List<DiaryNoteEntity>>

    @Query("SELECT * FROM diary_notes WHERE id = :id")
    suspend fun getNoteById(id: String): DiaryNoteEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertNote(note: DiaryNoteEntity)

    @Update
    suspend fun updateNote(note: DiaryNoteEntity)

    @Delete
    suspend fun deleteNote(note: DiaryNoteEntity)

    @Query("DELETE FROM diary_notes WHERE id = :id")
    suspend fun deleteNoteById(id: String)
}
