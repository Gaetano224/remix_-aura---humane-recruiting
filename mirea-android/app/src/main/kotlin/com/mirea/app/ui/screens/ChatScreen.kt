package com.mirea.app.ui.screens

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Send
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.mirea.app.data.models.JobPosting
import com.mirea.app.ui.components.ChatBubble
import com.mirea.app.ui.theme.*
import com.mirea.app.viewmodel.ChatViewModel
import kotlinx.coroutines.launch

@Composable
fun ChatScreen(
    viewModel: ChatViewModel,
    initialJob: JobPosting? = null
) {
    val messages by viewModel.messages.collectAsStateWithLifecycle()
    val isLoading by viewModel.isLoading.collectAsStateWithLifecycle()
    val mode by viewModel.mode.collectAsStateWithLifecycle()
    val listState = rememberLazyListState()
    val coroutineScope = rememberCoroutineScope()
    var inputText by remember { mutableStateOf("") }
    var showModeSelector by remember { mutableStateOf(messages.isEmpty() && initialJob == null) }

    // Se arriva da Job Board, avvia automaticamente in modalità interview
    LaunchedEffect(initialJob) {
        if (initialJob != null) {
            showModeSelector = false
            viewModel.setMode(
                mode = "interview",
                jobTitle = initialJob.title,
                company = initialJob.company,
                skills = initialJob.requiredSkills
            )
        } else if (messages.isEmpty()) {
            viewModel.setMode("general")
        }
    }

    // Scroll automatico all'ultimo messaggio
    LaunchedEffect(messages.size) {
        if (messages.isNotEmpty()) {
            coroutineScope.launch {
                listState.animateScrollToItem(messages.size - 1)
            }
        }
    }

    Column(modifier = Modifier.fillMaxSize().background(MireaBeige)) {

        // Header
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Brush.verticalGradient(listOf(MireaPurpleDark, MireaPurple)))
                .padding(16.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
                // Avatar Mirea
                Box(
                    modifier = Modifier
                        .size(44.dp)
                        .background(MireaWhite.copy(alpha = 0.2f), RoundedCornerShape(22.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Text("🌸", fontSize = 22.sp)
                }
                Spacer(Modifier.width(12.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text("Mirea AI", style = MaterialTheme.typography.titleLarge,
                        color = MireaWhite, fontWeight = FontWeight.Bold)
                    Text(
                        text = when (mode) {
                            "interview" -> "🎤 Simulazione Colloquio"
                            "empathy" -> "💙 Supporto Empatico"
                            else -> "🌸 Assistente Personale"
                        },
                        style = MaterialTheme.typography.bodySmall, color = MireaCoralLight
                    )
                }
                // Bottone cambia modalità
                if (initialJob == null) {
                    IconButton(onClick = {
                        showModeSelector = !showModeSelector
                        viewModel.clearChat()
                    }) {
                        Icon(Icons.Default.Tune, contentDescription = "Cambia modalità", tint = MireaWhite)
                    }
                }
            }
        }

        // Selettore modalità
        AnimatedVisibility(visible = showModeSelector) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(MireaWhite)
                    .padding(16.dp)
            ) {
                Text("Scegli la modalità:", style = MaterialTheme.typography.titleMedium,
                    color = MireaPurple, fontWeight = FontWeight.SemiBold)
                Spacer(Modifier.height(12.dp))
                listOf(
                    Triple("general", "🌸 Assistente Generale", "Supporto e consigli di carriera"),
                    Triple("interview", "🎤 Simula Colloquio", "Preparati con un colloquio virtuale"),
                    Triple("empathy", "💙 Supporto Empatico", "Hai ricevuto un rifiuto? Parliamone")
                ).forEach { (modeKey, label, desc) ->
                    Card(
                        onClick = {
                            showModeSelector = false
                            viewModel.setMode(modeKey)
                        },
                        modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = if (mode == modeKey) MireaPurple.copy(alpha = 0.1f) else MireaSurface
                        ),
                        border = if (mode == modeKey) CardDefaults.outlinedCardBorder() else null
                    ) {
                        Row(modifier = Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                            Text(label.take(2), fontSize = 24.sp)
                            Spacer(Modifier.width(12.dp))
                            Column {
                                Text(label.drop(3), style = MaterialTheme.typography.titleMedium,
                                    color = MireaPurple, fontWeight = FontWeight.SemiBold)
                                Text(desc, style = MaterialTheme.typography.bodySmall, color = MireaOnSurfaceVar)
                            }
                        }
                    }
                }
            }
        }

        // Lista messaggi
        LazyColumn(
            state = listState,
            modifier = Modifier.weight(1f).fillMaxWidth(),
            contentPadding = PaddingValues(vertical = 12.dp)
        ) {
            items(messages, key = { it.id }) { msg ->
                ChatBubble(message = msg)
            }
            if (isLoading) {
                item {
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp),
                        horizontalArrangement = Arrangement.Start,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        CircularProgressIndicator(
                            modifier = Modifier.size(20.dp),
                            strokeWidth = 2.dp,
                            color = MireaPurple
                        )
                        Spacer(Modifier.width(10.dp))
                        Text("Mirea sta scrivendo…", style = MaterialTheme.typography.bodySmall,
                            color = MireaOnSurfaceVar)
                    }
                }
            }
        }

        // Input bar
        Surface(
            modifier = Modifier.fillMaxWidth(),
            color = MireaWhite,
            shadowElevation = 8.dp
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 12.dp, vertical = 8.dp),
                verticalAlignment = Alignment.Bottom
            ) {
                OutlinedTextField(
                    value = inputText,
                    onValueChange = { inputText = it },
                    modifier = Modifier.weight(1f),
                    placeholder = { Text("Scrivi un messaggio…", style = MaterialTheme.typography.bodySmall) },
                    shape = RoundedCornerShape(24.dp),
                    maxLines = 4,
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = MireaPurple,
                        unfocusedBorderColor = MireaBeige
                    )
                )
                Spacer(Modifier.width(8.dp))
                FloatingActionButton(
                    onClick = {
                        if (inputText.isNotBlank() && !isLoading) {
                            viewModel.sendMessage(inputText.trim())
                            inputText = ""
                        }
                    },
                    containerColor = if (inputText.isNotBlank()) MireaPurple else MireaBeige,
                    modifier = Modifier.size(50.dp)
                ) {
                    Icon(
                        Icons.AutoMirrored.Filled.Send,
                        contentDescription = "Invia",
                        tint = if (inputText.isNotBlank()) MireaWhite else MireaOnSurfaceVar
                    )
                }
            }
        }
    }
}
