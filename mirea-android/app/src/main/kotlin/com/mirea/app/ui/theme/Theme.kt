package com.mirea.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val MireaColorScheme = lightColorScheme(
    primary           = MireaPurple,
    onPrimary         = MireaWhite,
    primaryContainer  = MireaPurpleLight,
    onPrimaryContainer = MireaWhite,
    secondary         = MireaCoral,
    onSecondary       = MireaWhite,
    secondaryContainer = MireaCoralLight,
    onSecondaryContainer = MireaOnSurface,
    background        = MireaBeige,
    onBackground      = MireaOnSurface,
    surface           = MireaSurface,
    onSurface         = MireaOnSurface,
    surfaceVariant    = MireaBeige,
    onSurfaceVariant  = MireaOnSurfaceVar,
    error             = MireaRed,
    onError           = MireaWhite,
)

@Composable
fun MireaTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = MireaColorScheme,
        typography  = MireaTypography,
        content     = content
    )
}
