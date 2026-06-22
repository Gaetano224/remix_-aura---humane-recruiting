package com.mirea.app.ui.screens

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.mirea.app.data.models.RiasecResult
import com.mirea.app.ui.theme.*
import com.mirea.app.viewmodel.RiasecViewModel

@Composable
fun RiasecTestScreen(
    viewModel: RiasecViewModel,
    onTestComplete: (RiasecResult) -> Unit
) {
    val answers by viewModel.answers.collectAsStateWithLifecycle()
    val currentStep by viewModel.currentStep.collectAsStateWithLifecycle()
    val result by viewModel.result.collectAsStateWithLifecycle()

    LaunchedEffect(result) {
        result?.let { onTestComplete(it) }
    }

    if (result != null) {
        RiasecResultCard(result = result!!, onRetake = { viewModel.resetTest() })
        return
    }

    val question = viewModel.questions[currentStep]
    val progress = (currentStep + 1).toFloat() / viewModel.totalSteps

    val categoryEmoji = when (question.category) {
        "R" -> "🔧"; "I" -> "🔬"; "A" -> "🎨"
        "S" -> "🤝"; "E" -> "🚀"; "C" -> "📊"
        "mobility" -> "✈️"; "stress" -> "🧘"
        else -> "❓"
    }
    val categoryName = when (question.category) {
        "R" -> "Realistico"; "I" -> "Investigativo"; "A" -> "Artistico"
        "S" -> "Sociale"; "E" -> "Intraprendente"; "C" -> "Convenzionale"
        "mobility" -> "Mobilità"; "stress" -> "Gestione Stress"
        else -> ""
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MireaBeige)
            .verticalScroll(rememberScrollState())
    ) {
        // Header gradiente
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Brush.verticalGradient(listOf(MireaPurpleDark, MireaPurple)))
                .padding(24.dp)
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
                Text(
                    "Test RIASEC", style = MaterialTheme.typography.headlineMedium,
                    color = MireaWhite, fontWeight = FontWeight.Bold
                )
                Text(
                    "Scopri il tuo profilo professionale",
                    style = MaterialTheme.typography.bodyMedium, color = MireaCoralLight
                )
                Spacer(Modifier.height(16.dp))
                LinearProgressIndicator(
                    progress = { progress },
                    modifier = Modifier.fillMaxWidth().height(6.dp).clip(RoundedCornerShape(3.dp)),
                    color = MireaCoral,
                    trackColor = MireaWhite.copy(alpha = 0.3f)
                )
                Spacer(Modifier.height(6.dp))
                Text(
                    "Domanda ${currentStep + 1} di ${viewModel.totalSteps}",
                    style = MaterialTheme.typography.bodySmall, color = MireaWhite.copy(alpha = 0.8f)
                )
            }
        }

        Spacer(Modifier.height(24.dp))

        // Card domanda con animazione slide
        AnimatedContent(
            targetState = currentStep,
            transitionSpec = {
                if (targetState > initialState) {
                    (slideInHorizontally { it } + fadeIn()) togetherWith (slideOutHorizontally { -it } + fadeOut())
                } else {
                    (slideInHorizontally { -it } + fadeIn()) togetherWith (slideOutHorizontally { it } + fadeOut())
                }
            },
            label = "question_anim"
        ) { step ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = MireaWhite),
                elevation = CardDefaults.cardElevation(6.dp)
            ) {
                Column(
                    modifier = Modifier.padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    // Badge categoria
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(12.dp))
                            .background(MireaPurple.copy(alpha = 0.1f))
                            .padding(horizontal = 14.dp, vertical = 6.dp)
                    ) {
                        Text(
                            text = "$categoryEmoji $categoryName",
                            style = MaterialTheme.typography.labelLarge,
                            color = MireaPurple
                        )
                    }

                    Spacer(Modifier.height(20.dp))

                    Text(
                        text = viewModel.questions[step].text,
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.SemiBold,
                        textAlign = TextAlign.Center,
                        color = MireaPurpleDark,
                        lineHeight = 30.sp
                    )

                    Spacer(Modifier.height(32.dp))

                    Text(
                        text = "${answers[step]}",
                        fontSize = 56.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = MireaPurple
                    )
                    Text(
                        text = when {
                            answers[step] >= 80 -> "Fortemente d'accordo ✅"
                            answers[step] >= 60 -> "Abbastanza d'accordo 👍"
                            answers[step] >= 40 -> "Neutro 😐"
                            answers[step] >= 20 -> "Poco d'accordo 👎"
                            else -> "Per niente d'accordo ❌"
                        },
                        style = MaterialTheme.typography.bodyMedium,
                        color = MireaOnSurfaceVar
                    )

                    Spacer(Modifier.height(16.dp))

                    Slider(
                        value = answers[step].toFloat(),
                        onValueChange = { viewModel.setAnswer(step, it.toInt()) },
                        valueRange = 0f..100f,
                        steps = 9,
                        colors = SliderDefaults.colors(
                            thumbColor = MireaPurple,
                            activeTrackColor = MireaPurple,
                            inactiveTrackColor = MireaBeige
                        ),
                        modifier = Modifier.fillMaxWidth()
                    )

                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text("Per niente", style = MaterialTheme.typography.labelSmall)
                        Text("Moltissimo", style = MaterialTheme.typography.labelSmall)
                    }
                }
            }
        }

        Spacer(Modifier.height(24.dp))

        // Navigazione
        Row(
            modifier = Modifier.fillMaxWidth().padding(horizontal = 20.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            if (currentStep > 0) {
                OutlinedButton(
                    onClick = { viewModel.goBack() },
                    modifier = Modifier.weight(1f).height(52.dp),
                    shape = RoundedCornerShape(16.dp),
                    colors = ButtonDefaults.outlinedButtonColors(contentColor = MireaPurple)
                ) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = null)
                    Spacer(Modifier.width(6.dp))
                    Text("Indietro")
                }
            } else {
                Spacer(Modifier.weight(1f))
            }

            Button(
                onClick = { viewModel.goNext() },
                modifier = Modifier.weight(1f).height(52.dp),
                shape = RoundedCornerShape(16.dp),
                colors = ButtonDefaults.buttonColors(containerColor = MireaPurple)
            ) {
                Text(if (currentStep == viewModel.totalSteps - 1) "Calcola Profilo" else "Avanti")
                Spacer(Modifier.width(6.dp))
                Icon(
                    if (currentStep == viewModel.totalSteps - 1) Icons.Default.CheckCircle
                    else Icons.AutoMirrored.Filled.ArrowForward,
                    contentDescription = null
                )
            }
        }

        Spacer(Modifier.height(40.dp))
    }
}

@Composable
fun RiasecResultCard(result: RiasecResult, onRetake: () -> Unit) {
    val scores = listOf(
        Triple("🔧 Realistico", result.rScore, MireaPurple),
        Triple("🔬 Investigativo", result.iScore, Color(0xFF1565C0)),
        Triple("🎨 Artistico", result.aScore, Color(0xFFC62828)),
        Triple("🤝 Sociale", result.sScore, MireaGreenDark),
        Triple("🚀 Intraprendente", result.eScore, Color(0xFFE65100)),
        Triple("📊 Convenzionale", result.cScore, Color(0xFF4A148C))
    )
    val dominant = scores.maxByOrNull { it.second }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MireaBeige)
            .verticalScroll(rememberScrollState())
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Brush.verticalGradient(listOf(MireaPurpleDark, MireaPurple)))
                .padding(28.dp),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("🎉", fontSize = 40.sp)
                Spacer(Modifier.height(8.dp))
                Text(
                    "Il tuo Profilo RIASEC",
                    style = MaterialTheme.typography.headlineLarge,
                    color = MireaWhite, fontWeight = FontWeight.Bold
                )
                if (dominant != null) {
                    Spacer(Modifier.height(6.dp))
                    Text(
                        "Tipo dominante: ${dominant.first}",
                        style = MaterialTheme.typography.bodyLarge,
                        color = MireaCoralLight
                    )
                }
            }
        }

        Spacer(Modifier.height(24.dp))

        // Barre RIASEC
        scores.forEach { (label, score, color) ->
            val animProgress by animateFloatAsState(
                targetValue = score / 100f,
                animationSpec = tween(900),
                label = "bar_$label"
            )
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp, vertical = 7.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    label, modifier = Modifier.width(170.dp),
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.Medium
                )
                LinearProgressIndicator(
                    progress = { animProgress },
                    modifier = Modifier.weight(1f).height(10.dp).clip(RoundedCornerShape(5.dp)),
                    color = color,
                    trackColor = color.copy(alpha = 0.15f)
                )
                Spacer(Modifier.width(8.dp))
                Text(
                    "$score", style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.Bold, color = color
                )
            }
        }

        Spacer(Modifier.height(16.dp))

        // Card Stress + Mobilità
        Card(
            modifier = Modifier.fillMaxWidth().padding(horizontal = 20.dp),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = MireaWhite),
            elevation = CardDefaults.cardElevation(4.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth().padding(20.dp),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("✈️", fontSize = 28.sp)
                    Text("Mobilità", style = MaterialTheme.typography.bodySmall, color = MireaOnSurfaceVar)
                    Text(
                        "${result.mobilityScore}%",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold, color = MireaPurple
                    )
                }
                VerticalDivider(modifier = Modifier.height(60.dp), color = MireaBeige)
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("🧘", fontSize = 28.sp)
                    Text("Resilienza Stress", style = MaterialTheme.typography.bodySmall, color = MireaOnSurfaceVar)
                    Text(
                        "${result.stressScore}%",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold, color = MireaGreenDark
                    )
                }
            }
        }

        Spacer(Modifier.height(28.dp))

        Button(
            onClick = onRetake,
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
                .height(54.dp),
            shape = RoundedCornerShape(16.dp),
            colors = ButtonDefaults.buttonColors(containerColor = MireaCoral)
        ) {
            Text("🔄  Rifai il Test", fontWeight = FontWeight.Bold, fontSize = 16.sp)
        }

        Spacer(Modifier.height(40.dp))
    }
}
