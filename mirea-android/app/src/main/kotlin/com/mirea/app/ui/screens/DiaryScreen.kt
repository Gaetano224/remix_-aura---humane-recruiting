package com.mirea.app.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.slideInVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.mirea.app.data.models.DiaryNote
import com.mirea.app.ui.theme.*
import com.mirea.app.viewmodel.DiaryViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DiaryScreen(viewModel: DiaryViewModel) {
    val notes by viewModel.notes.collectAsStateWithLifecycle()
    var showAddSheet by remember { mutableStateOf(false) }

    if (showAddSheet) {
        AddNoteBottomSheet(
            onDismiss = { showAddSheet = false },
            onSave = { title, content, anxiety, company, interviewDate ->
                viewModel.addNote(title, content, anxiety, company, interviewDate)
                showAddSheet = false
            }
        )
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MireaBeige)
    ) {
        // Header
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Brush.verticalGradient(listOf(MireaPurpleDark, MireaPurple)))
                .padding(24.dp)
        ) {
            Column(modifier = Modifier.fillMaxWidth(), horizontalAlignment = Alignment.CenterHorizontally) {
                Text("📓 Diario Personale", style = MaterialTheme.typography.headlineMedium,
                    color = MireaWhite, fontWeight = FontWeight.Bold)
                Text("Traccia il tuo percorso e le tue emozioni",
                    style = MaterialTheme.typography.bodySmall, color = MireaCoralLight)
            }
        }

        if (notes.isEmpty()) {
            Box(
                modifier = Modifier.weight(1f).fillMaxWidth(),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("📖", fontSize = 56.sp)
                    Spacer(Modifier.height(16.dp))
                    Text("Il diario è vuoto", style = MaterialTheme.typography.titleLarge,
                        color = MireaOnSurfaceVar, fontWeight = FontWeight.Medium)
                    Text("Aggiungi la tua prima nota",
                        style = MaterialTheme.typography.bodyMedium, color = MireaOnSurfaceVar)
                }
            }
        } else {
            LazyColumn(
                modifier = Modifier.weight(1f),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(notes, key = { it.id }) { note ->
                    DiaryNoteCard(note = note, onDelete = { viewModel.deleteNote(note.id) })
                }
            }
        }

        // FAB
        Box(modifier = Modifier.fillMaxWidth().padding(16.dp), contentAlignment = Alignment.CenterEnd) {
            ExtendedFloatingActionButton(
                onClick = { showAddSheet = true },
                containerColor = MireaPurple,
                contentColor = MireaWhite,
                icon = { Icon(Icons.Default.Add, contentDescription = null) },
                text = { Text("Nuova nota", fontWeight = FontWeight.SemiBold) }
            )
        }
    }
}

@Composable
fun DiaryNoteCard(note: DiaryNote, onDelete: () -> Unit) {
    var showDeleteDialog by remember { mutableStateOf(false) }

    val anxietyColor = when {
        note.anxietyLevel <= 3 -> MireaGreen
        note.anxietyLevel <= 6 -> MireaAmber
        else -> MireaRed
    }
    val anxietyLabel = when {
        note.anxietyLevel <= 3 -> "Tranquillo 😊"
        note.anxietyLevel <= 6 -> "Un po' in ansia 😐"
        else -> "Alta ansia 😰"
    }

    if (showDeleteDialog) {
        AlertDialog(
            onDismissRequest = { showDeleteDialog = false },
            title = { Text("Elimina nota?") },
            text = { Text("Questa azione non può essere annullata.") },
            confirmButton = {
                TextButton(onClick = { onDelete(); showDeleteDialog = false },
                    colors = ButtonDefaults.textButtonColors(contentColor = MireaRed)) {
                    Text("Elimina")
                }
            },
            dismissButton = {
                TextButton(onClick = { showDeleteDialog = false }) { Text("Annulla") }
            }
        )
    }

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = MireaWhite),
        elevation = CardDefaults.cardElevation(3.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.Top) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(note.title, style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold, color = MireaPurpleDark)
                    Text(note.date, style = MaterialTheme.typography.bodySmall, color = MireaOnSurfaceVar)
                }
                // Ansia badge
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(10.dp))
                        .background(anxietyColor.copy(alpha = 0.12f))
                        .padding(horizontal = 8.dp, vertical = 4.dp)
                ) {
                    Text("${note.anxietyLevel}/10", fontSize = 12.sp,
                        fontWeight = FontWeight.Bold, color = anxietyColor)
                }
                Spacer(Modifier.width(6.dp))
                IconButton(onClick = { showDeleteDialog = true }, modifier = Modifier.size(28.dp)) {
                    Icon(Icons.Default.DeleteOutline, contentDescription = "Elimina",
                        tint = MireaRed.copy(alpha = 0.6f), modifier = Modifier.size(18.dp))
                }
            }

            Spacer(Modifier.height(6.dp))
            Text(note.content, style = MaterialTheme.typography.bodyMedium,
                maxLines = 4, color = MireaOnSurface, lineHeight = 20.sp)

            // Stato emotivo
            Spacer(Modifier.height(10.dp))
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(modifier = Modifier.size(8.dp).clip(RoundedCornerShape(4.dp)).background(anxietyColor))
                Spacer(Modifier.width(6.dp))
                Text(anxietyLabel, style = MaterialTheme.typography.bodySmall, color = anxietyColor,
                    fontWeight = FontWeight.Medium)
            }

            // Info colloquio (se presente)
            if (!note.interviewCompany.isNullOrBlank()) {
                Spacer(Modifier.height(8.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.Business, tint = MireaPurple, contentDescription = null,
                        modifier = Modifier.size(14.dp))
                    Spacer(Modifier.width(4.dp))
                    Text("${note.interviewCompany}${if (!note.interviewDate.isNullOrBlank()) " · ${note.interviewDate}" else ""}",
                        style = MaterialTheme.typography.bodySmall, color = MireaPurple)
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddNoteBottomSheet(
    onDismiss: () -> Unit,
    onSave: (title: String, content: String, anxiety: Int,
             interviewCompany: String?, interviewDate: String?) -> Unit
) {
    var title by remember { mutableStateOf("") }
    var content by remember { mutableStateOf("") }
    var anxiety by remember { mutableStateOf(5) }
    var company by remember { mutableStateOf("") }
    var interviewDate by remember { mutableStateOf("") }
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)

    ModalBottomSheet(
        onDismissRequest = onDismiss,
        sheetState = sheetState,
        containerColor = MireaWhite,
        shape = RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
                .padding(bottom = 32.dp)
        ) {
            Text("📝 Nuova Nota", style = MaterialTheme.typography.headlineMedium,
                color = MireaPurple, fontWeight = FontWeight.Bold)
            Spacer(Modifier.height(16.dp))

            OutlinedTextField(
                value = title, onValueChange = { title = it },
                label = { Text("Titolo") },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = MireaPurple)
            )
            Spacer(Modifier.height(10.dp))
            OutlinedTextField(
                value = content, onValueChange = { content = it },
                label = { Text("Come ti senti oggi?") },
                modifier = Modifier.fillMaxWidth().height(120.dp),
                shape = RoundedCornerShape(12.dp),
                maxLines = 5,
                colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = MireaPurple)
            )

            Spacer(Modifier.height(16.dp))
            Text("Livello di ansia: $anxiety/10",
                style = MaterialTheme.typography.bodyMedium, color = MireaOnSurface)
            Slider(
                value = anxiety.toFloat(),
                onValueChange = { anxiety = it.toInt() },
                valueRange = 1f..10f,
                steps = 8,
                colors = SliderDefaults.colors(
                    thumbColor = when {
                        anxiety <= 3 -> MireaGreen; anxiety <= 6 -> MireaAmber; else -> MireaRed
                    },
                    activeTrackColor = when {
                        anxiety <= 3 -> MireaGreen; anxiety <= 6 -> MireaAmber; else -> MireaRed
                    }
                )
            )

            Spacer(Modifier.height(10.dp))
            OutlinedTextField(
                value = company, onValueChange = { company = it },
                label = { Text("Azienda (opzionale)") },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                leadingIcon = { Icon(Icons.Default.Business, contentDescription = null) },
                colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = MireaPurple)
            )
            Spacer(Modifier.height(10.dp))
            OutlinedTextField(
                value = interviewDate, onValueChange = { interviewDate = it },
                label = { Text("Data colloquio (opzionale)") },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                placeholder = { Text("es. 2026-07-15") },
                leadingIcon = { Icon(Icons.Default.DateRange, contentDescription = null) },
                colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = MireaPurple)
            )

            Spacer(Modifier.height(20.dp))
            Button(
                onClick = {
                    if (title.isNotBlank() && content.isNotBlank()) {
                        onSave(title, content, anxiety,
                            company.ifBlank { null }, interviewDate.ifBlank { null })
                    }
                },
                modifier = Modifier.fillMaxWidth().height(52.dp),
                shape = RoundedCornerShape(16.dp),
                colors = ButtonDefaults.buttonColors(containerColor = MireaPurple),
                enabled = title.isNotBlank() && content.isNotBlank()
            ) {
                Icon(Icons.Default.Save, contentDescription = null)
                Spacer(Modifier.width(8.dp))
                Text("Salva Nota", fontWeight = FontWeight.Bold)
            }
        }
    }
}
