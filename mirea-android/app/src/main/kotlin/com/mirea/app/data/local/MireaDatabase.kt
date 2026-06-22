package com.mirea.app.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(
    entities = [DiaryNoteEntity::class],
    version = 1,
    exportSchema = false
)
abstract class MireaDatabase : RoomDatabase() {

    abstract fun diaryNoteDao(): DiaryNoteDao

    companion object {
        @Volatile
        private var INSTANCE: MireaDatabase? = null

        fun getInstance(context: Context): MireaDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    MireaDatabase::class.java,
                    "mirea_database"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
