package com.mirea.app.ui.screens

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.animation.*
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.mirea.app.data.models.RiasecResult
import com.mirea.app.ui.components.SkillCard
import com.mirea.app.ui.theme.*
import com.mirea.app.viewmodel.CvUiState
import com.mirea.app.viewmodel.CvViewModel

private val PRESET_RESUMES = listOf(
    "Tecnico (Mario Rossi)" to """MARIO ROSSI — mario.rossi@example.it
Sviluppatore Full-Stack Senior con 6+ anni in TypeScript, React e Node.js.
Esperto di architetture scalabili, API RESTful e pipeline CI/CD.
Forte propensione alla collaborazione Agile e all'integrazione di pipeline AI.""",

    "Design/HR (Alice Bianchi)" to """ALICE BIANCHI — alice.b@example.it
Talent Specialist & UI Designer appassionata di psicologia applicata.
Competenze: Figma, Design System, UX Research, comunicazione empatica.
Gestione Agile di progetti interdisciplinari HR-Tech."""
)

@Composable
fun CvAnalysisScreen(
    viewModel: CvViewModel,
    riasecResult: RiasecResult?
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val cvText by viewModel.cvText.collectAsStateWithLifecycle()
    val context = LocalContext.current
    var showPresets by remember { mutableStateOf(false) }

    val pdfLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        uri?.let { viewModel.readPdfFromUri(context, it) }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MireaBeige)
            .verticalScroll(rememberScrollState())
    ) {
        // Header
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Brush.verticalGradient(listOf(MireaPurpleDark, MireaPurple)))
                .padding(24.dp)
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
                Text("📄 Analisi CV", style = MaterialTheme.typography.headlineMedium,
                    color = MireaWhite, fontWeight = FontWeight.Bold)
                Text(
                    if (riasecResult != null) "Test RIASEC completato ✅ — Analisi integrata attiva"
                    else "Completa il Test RIASEC per un'analisi più precisa",
                    style = MaterialTheme.typography.bodySmall, color = MireaCoralLight,
                    modifier = Modifier.padding(top = 4.dp)
                )
            }
        }

        Spacer(Modifier.height(20.dp))

        when (val state = uiState) {
            is CvUiState.Idle, is CvUiState.Error -> {
                // Input area
                Card(
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp),
                    shape = RoundedCornerShape(20.dp),
                    colors = CardDefaults.cardColors(containerColor = MireaWhite),
                    elevation = CardDefaults.cardElevation(4.dp)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text("Testo del CV", style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.SemiBold, color = MireaPurple)
                        Spacer(Modifier.height(10.dp))
                        OutlinedTextField(
                            value = cvText,
                            onValueChange = { viewModel.setCvText(it) },
                            modifier = Modifier.fillMaxWidth().height(160.dp),
                            placeholder = { Text("Incolla qui il tuo CV o usa un preset…",
                                style = MaterialTheme.typography.bodySmall) },
                            shape = RoundedCornerShape(12.dp),
                            colors = OutlinedTextFieldDefaults.colors(
                                focusedBorderColor = MireaPurple,
                                unfocusedBorderColor = MireaBeige
                            )
                        )

                        Spacer(Modifier.height(12.dp))

                        // Bottoni upload e preset
                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            OutlinedButton(
                                onClick = { pdfLauncher.launch("application/pdf") },
                                modifier = Modifier.weight(1f),
                                shape = RoundedCornerShape(12.dp),
                                colors = ButtonDefaults.outlinedButtonColors(contentColor = MireaPurple)
                            ) {
                                Icon(Icons.Default.Upload, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(Modifier.width(4.dp))
                                Text("PDF", fontSize = 13.sp)
                            }
                            OutlinedButton(
                                onClick = { showPresets = !showPresets },
                                modifier = Modifier.weight(1f),
                                shape = RoundedCornerShape(12.dp),
                                colors = ButtonDefaults.outlinedButtonColors(contentColor = MireaCoral)
                            ) {
                                Icon(Icons.Default.AutoAwesome, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(Modifier.width(4.dp))
                                Text("Preset", fontSize = 13.sp)
                            }
                        }

                        // Preset dropdown
                        AnimatedVisibility(visible = showPresets) {
                            Column(modifier = Modifier.padding(top = 8.dp)) {
                                PRESET_RESUMES.forEach { (label, text) ->
                                    TextButton(
                                        onClick = {
                                            viewModel.loadPresetResume(text)
                                            showPresets = false
                                        },
                                        modifier = Modifier.fillMaxWidth()
                                    ) {
                                        Icon(Icons.Default.Person, contentDescription = null,
                                            tint = MireaPurple, modifier = Modifier.size(16.dp))
                                        Spacer(Modifier.width(6.dp))
                                        Text(label, color = MireaPurple, fontSize = 13.sp)
                                    }
                                    HorizontalDivider(color = MireaBeige)
                                }
                            }
                        }
                    }
                }

                if (state is CvUiState.Error) {
                    Spacer(Modifier.height(8.dp))
                    Card(
                        modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp),
                        colors = CardDefaults.cardColors(containerColor = MireaRed.copy(alpha = 0.1f)),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Row(modifier = Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Warning, tint = MireaRed, contentDescription = null)
                            Spacer(Modifier.width(8.dp))
                            Text(state.message, style = MaterialTheme.typography.bodySmall, color = MireaRed)
                        }
                    }
                }

                Spacer(Modifier.height(16.dp))

                Button(
                    onClick = { viewModel.analyzeCV(riasecResult) },
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp).height(54.dp),
                    shape = RoundedCornerShape(16.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = MireaPurple),
                    enabled = cvText.isNotBlank()
                ) {
                    Icon(Icons.Default.AutoAwesome, contentDescription = null)
                    Spacer(Modifier.width(8.dp))
                    Text("Analizza CV", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                }
            }

            is CvUiState.Loading -> {
                Box(modifier = Modifier.fillMaxWidth().padding(60.dp), contentAlignment = Alignment.Center) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        CircularProgressIndicator(color = MireaPurple, strokeWidth = 4.dp, modifier = Modifier.size(64.dp))
                        Spacer(Modifier.height(20.dp))
                        Text("Mirea sta analizzando il tuo CV…", style = MaterialTheme.typography.bodyLarge,
                            color = MireaPurple, fontWeight = FontWeight.Medium)
                        Text("Incrociando competenze e profilo RIASEC",
                            style = MaterialTheme.typography.bodySmall, color = MireaOnSurfaceVar)
                    }
                }
            }

            is CvUiState.Success -> {
                val result = state.result
                // Nome e titolo
                Card(
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp),
                    shape = RoundedCornerShape(20.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = MireaPurple
                    ),
                    elevation = CardDefaults.cardElevation(6.dp)
                ) {
                    Column(modifier = Modifier.padding(20.dp)) {
                        Text("👤 ${result.candidateName}", style = MaterialTheme.typography.headlineMedium,
                            color = MireaWhite, fontWeight = FontWeight.Bold)
                        Text(result.email, style = MaterialTheme.typography.bodyMedium,
                            color = MireaWhite.copy(alpha = 0.8f))
                        Spacer(Modifier.height(8.dp))
                        Text(result.professionalTitle, style = MaterialTheme.typography.titleLarge,
                            color = MireaCoralLight, fontWeight = FontWeight.SemiBold)
                        if (result.summary.isNotBlank()) {
                            Spacer(Modifier.height(10.dp))
                            Text(result.summary, style = MaterialTheme.typography.bodySmall,
                                color = MireaWhite.copy(alpha = 0.85f))
                        }
                    }
                }

                Spacer(Modifier.height(16.dp))

                // Feedback RIASEC matching
                if (result.profileMatchingFeedback.isNotBlank()) {
                    Card(
                        modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp),
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = MireaCoral.copy(alpha = 0.08f)),
                        border = CardDefaults.outlinedCardBorder()
                    ) {
                        Row(modifier = Modifier.padding(16.dp)) {
                            Text("💡", fontSize = 22.sp)
                            Spacer(Modifier.width(10.dp))
                            Column {
                                Text("Match Psicometrico", style = MaterialTheme.typography.titleMedium,
                                    color = MireaCoral, fontWeight = FontWeight.Bold)
                                Spacer(Modifier.height(4.dp))
                                Text(result.profileMatchingFeedback, style = MaterialTheme.typography.bodySmall,
                                    color = MireaOnSurface, lineHeight = 20.sp)
                            }
                        }
                    }
                }

                // Titoli suggeriti
                if (result.matchedTitles.isNotEmpty()) {
                    Spacer(Modifier.height(16.dp))
                    Text("  💼 Ruoli suggeriti", style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold, color = MireaPurple)
                    Spacer(Modifier.height(8.dp))
                    result.matchedTitles.forEach { title ->
                        Card(
                            modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 4.dp),
                            shape = RoundedCornerShape(12.dp),
                            colors = CardDefaults.cardColors(containerColor = MireaWhite)
                        ) {
                            Row(modifier = Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                                Icon(Icons.Default.Star, tint = MireaAmber, contentDescription = null,
                                    modifier = Modifier.size(18.dp))
                                Spacer(Modifier.width(8.dp))
                                Text(title, style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Medium)
                            }
                        }
                    }
                }

                // Skill
                if (result.skills.isNotEmpty()) {
                    Spacer(Modifier.height(20.dp))
                    Text("  🎯 Competenze Estratte", style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold, color = MireaPurple)
                    Spacer(Modifier.height(8.dp))
                    result.skills.forEach { skill ->
                        SkillCard(skill = skill, modifier = Modifier.padding(horizontal = 16.dp, vertical = 5.dp))
                    }
                }

                Spacer(Modifier.height(20.dp))

                OutlinedButton(
                    onClick = { viewModel.reset() },
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp).height(50.dp),
                    shape = RoundedCornerShape(16.dp),
                    colors = ButtonDefaults.outlinedButtonColors(contentColor = MireaPurple)
                ) {
                    Icon(Icons.Default.Refresh, contentDescription = null)
                    Spacer(Modifier.width(6.dp))
                    Text("Nuova Analisi")
                }

                Spacer(Modifier.height(40.dp))
            }
        }
    }
}
