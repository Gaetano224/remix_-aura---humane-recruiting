package com.mirea.app.ui.screens

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.mirea.app.ui.theme.*
import kotlinx.coroutines.delay

@Composable
fun SplashScreen(onFinished: () -> Unit) {
    var visible by remember { mutableStateOf(false) }
    var subtitleVisible by remember { mutableStateOf(false) }

    val scale by animateFloatAsState(
        targetValue = if (visible) 1f else 0.4f,
        animationSpec = spring(dampingRatio = Spring.DampingRatioMediumBouncy, stiffness = Spring.StiffnessMedium),
        label = "logo_scale"
    )
    val alpha by animateFloatAsState(
        targetValue = if (visible) 1f else 0f,
        animationSpec = tween(700),
        label = "logo_alpha"
    )

    LaunchedEffect(Unit) {
        delay(200)
        visible = true
        delay(600)
        subtitleVisible = true
        delay(1800)
        onFinished()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    colors = listOf(MireaPurpleDark, MireaPurple, MireaPurpleLight)
                )
            ),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            // Logo cerchio con M + cuore
            Box(
                modifier = Modifier
                    .scale(scale)
                    .size(120.dp)
                    .clip(CircleShape)
                    .background(MireaWhite.copy(alpha = 0.15f)),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("M", fontSize = 52.sp, fontWeight = FontWeight.ExtraBold, color = MireaWhite)
                    Text("🌸", fontSize = 20.sp)
                }
            }

            Spacer(Modifier.height(28.dp))

            // Nome app
            Text(
                text = "Mirea",
                fontSize = 42.sp,
                fontWeight = FontWeight.ExtraBold,
                color = MireaWhite.copy(alpha = alpha),
                letterSpacing = 2.sp
            )

            Spacer(Modifier.height(8.dp))

            // Tagline animata
            AnimatedVisibility(
                visible = subtitleVisible,
                enter = fadeIn(tween(600)) + slideInVertically { it / 2 }
            ) {
                Text(
                    text = "Il recruiting che ti rispetta",
                    fontSize = 16.sp,
                    color = MireaCoralLight,
                    fontWeight = FontWeight.Medium,
                    letterSpacing = 0.5.sp,
                    textAlign = TextAlign.Center
                )
            }
        }

        // Versione in basso
        AnimatedVisibility(
            visible = subtitleVisible,
            enter = fadeIn(tween(800)),
            modifier = Modifier.align(Alignment.BottomCenter).padding(bottom = 40.dp)
        ) {
            Text(
                text = "Humane Recruiting ✨",
                fontSize = 12.sp,
                color = MireaWhite.copy(alpha = 0.5f)
            )
        }
    }
}
