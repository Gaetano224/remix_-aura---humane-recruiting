package com.mirea.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.*
import androidx.compose.runtime.*
import com.mirea.app.ui.navigation.MireaNavGraph
import com.mirea.app.ui.screens.SplashScreen
import com.mirea.app.ui.theme.MireaTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            MireaTheme {
                var showSplash by remember { mutableStateOf(true) }

                AnimatedContent(
                    targetState = showSplash,
                    transitionSpec = {
                        fadeIn() togetherWith fadeOut()
                    },
                    label = "splash_to_main"
                ) { isSplash ->
                    if (isSplash) {
                        SplashScreen(onFinished = { showSplash = false })
                    } else {
                        MireaNavGraph()
                    }
                }
            }
        }
    }
}
