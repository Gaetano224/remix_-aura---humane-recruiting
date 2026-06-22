package com.mirea.app

import android.app.Application

class MireaApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        // Inizializzazioni globali (se necessario in futuro: DI, analytics, ecc.)
    }
}
