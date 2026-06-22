package com.mirea.app.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

// Usa il font di sistema (sans-serif) con pesi personalizzati.
// Per aggiungere Inter/Nunito: scarica i .ttf in res/font/ e referenziali qui.
val MireaFontFamily = FontFamily.Default

val MireaTypography = Typography(
    displayLarge = TextStyle(
        fontFamily = MireaFontFamily,
        fontWeight = FontWeight.Bold,
        fontSize = 32.sp,
        lineHeight = 40.sp,
        color = MireaPurpleDark
    ),
    displayMedium = TextStyle(
        fontFamily = MireaFontFamily,
        fontWeight = FontWeight.Bold,
        fontSize = 26.sp,
        lineHeight = 34.sp,
        color = MireaPurpleDark
    ),
    headlineLarge = TextStyle(
        fontFamily = MireaFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 22.sp,
        lineHeight = 30.sp,
        color = MireaPurple
    ),
    headlineMedium = TextStyle(
        fontFamily = MireaFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 18.sp,
        lineHeight = 26.sp,
        color = MireaPurple
    ),
    titleLarge = TextStyle(
        fontFamily = MireaFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 16.sp,
        lineHeight = 24.sp,
        color = MireaOnSurface
    ),
    titleMedium = TextStyle(
        fontFamily = MireaFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 20.sp,
        color = MireaOnSurface
    ),
    bodyLarge = TextStyle(
        fontFamily = MireaFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp,
        color = MireaOnSurface
    ),
    bodyMedium = TextStyle(
        fontFamily = MireaFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp,
        color = MireaOnSurfaceVar
    ),
    bodySmall = TextStyle(
        fontFamily = MireaFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 12.sp,
        lineHeight = 18.sp,
        color = MireaOnSurfaceVar
    ),
    labelLarge = TextStyle(
        fontFamily = MireaFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        letterSpacing = 0.5.sp,
        color = MireaWhite
    ),
    labelSmall = TextStyle(
        fontFamily = MireaFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 11.sp,
        letterSpacing = 0.5.sp,
        color = MireaOnSurfaceVar
    )
)
