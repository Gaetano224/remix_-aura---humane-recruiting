package com.mirea.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.mirea.app.data.models.JobPosting
import com.mirea.app.ui.components.JobCard
import com.mirea.app.ui.theme.*
import com.mirea.app.viewmodel.JobViewModel

@Composable
fun JobBoardScreen(
    viewModel: JobViewModel,
    onStartInterview: (JobPosting) -> Unit
) {
    val jobs by viewModel.jobs.collectAsStateWithLifecycle()
    val selectedJob by viewModel.selectedJob.collectAsStateWithLifecycle()

    if (selectedJob != null) {
        JobDetailScreen(
            job = selectedJob!!,
            onBack = { viewModel.selectJob(null) },
            onStartInterview = {
                viewModel.selectJob(null)
                onStartInterview(selectedJob!!)
            }
        )
        return
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
                Text("💼 Offerte di Lavoro", style = MaterialTheme.typography.headlineMedium,
                    color = MireaWhite, fontWeight = FontWeight.Bold)
                Text("Solo recruiter con alta reattività e rispetto dei tempi",
                    style = MaterialTheme.typography.bodySmall, color = MireaCoralLight)
            }
        }

        // Legenda responsiveness
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 12.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            listOf(
                Triple(MireaGreen, "≥80%", "Alta"),
                Triple(MireaAmber, "60–79%", "Media"),
                Triple(MireaRed, "<60%", "Bassa")
            ).forEach { (color, range, label) ->
                Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.weight(1f)) {
                    Box(modifier = Modifier.size(10.dp).clip(RoundedCornerShape(5.dp)).background(color))
                    Spacer(Modifier.width(4.dp))
                    Column {
                        Text(label, fontSize = 10.sp, fontWeight = FontWeight.Bold, color = color)
                        Text(range, fontSize = 9.sp, color = MireaOnSurfaceVar)
                    }
                }
            }
        }

        HorizontalDivider(color = MireaPurple.copy(alpha = 0.1f))

        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(jobs, key = { it.id }) { job ->
                JobCard(job = job, onClick = { viewModel.selectJob(job) })
            }
        }
    }
}

@Composable
fun JobDetailScreen(
    job: JobPosting,
    onBack: () -> Unit,
    onStartInterview: () -> Unit
) {
    val scoreColor = when {
        job.responsivenessScore >= 80 -> MireaGreen
        job.responsivenessScore >= 60 -> MireaAmber
        else -> MireaRed
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MireaBeige)
            .verticalScroll(rememberScrollState())
    ) {
        // Header con back button
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Brush.verticalGradient(listOf(MireaPurpleDark, MireaPurple)))
                .padding(16.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                IconButton(onClick = onBack) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Indietro",
                        tint = MireaWhite)
                }
                Spacer(Modifier.width(8.dp))
                Column {
                    Text(job.title, style = MaterialTheme.typography.titleLarge,
                        color = MireaWhite, fontWeight = FontWeight.Bold, maxLines = 2)
                    Text(job.company, style = MaterialTheme.typography.bodyMedium,
                        color = MireaCoralLight)
                }
            }
        }

        Spacer(Modifier.height(16.dp))

        // Score card
        Card(
            modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = scoreColor.copy(alpha = 0.08f)),
            border = CardDefaults.outlinedCardBorder()
        ) {
            Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Shield, tint = scoreColor, contentDescription = null, modifier = Modifier.size(32.dp))
                Spacer(Modifier.width(12.dp))
                Column {
                    Text("Indice di Reattività Recruiter", style = MaterialTheme.typography.bodySmall,
                        color = MireaOnSurfaceVar)
                    Text("${job.responsivenessScore}%", fontSize = 28.sp,
                        fontWeight = FontWeight.ExtraBold, color = scoreColor)
                }
                Spacer(Modifier.weight(1f))
                if (job.ttlRemainingHours > 0) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(Icons.Default.Timer, tint = if (job.ttlRemainingHours <= 6) MireaRed else MireaAmber,
                            contentDescription = null)
                        Text("${job.ttlRemainingHours}h", fontWeight = FontWeight.Bold,
                            color = if (job.ttlRemainingHours <= 6) MireaRed else MireaAmber)
                        Text("rimaste", fontSize = 10.sp, color = MireaOnSurfaceVar)
                    }
                }
            }
        }

        Spacer(Modifier.height(16.dp))

        // Info
        Card(
            modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MireaWhite)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.LocationOn, tint = MireaCoral, contentDescription = null,
                        modifier = Modifier.size(18.dp))
                    Spacer(Modifier.width(6.dp))
                    Text(job.location, style = MaterialTheme.typography.bodyMedium)
                }
                Spacer(Modifier.height(12.dp))
                Text("Descrizione", style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold, color = MireaPurple)
                Spacer(Modifier.height(6.dp))
                Text(job.description, style = MaterialTheme.typography.bodyMedium, lineHeight = 22.sp)
                Spacer(Modifier.height(14.dp))
                Text("Competenze richieste", style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold, color = MireaPurple)
                Spacer(Modifier.height(8.dp))
                job.requiredSkills.forEach { skill ->
                    Row(modifier = Modifier.padding(vertical = 3.dp), verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.CheckCircle, tint = MireaGreen, contentDescription = null,
                            modifier = Modifier.size(16.dp))
                        Spacer(Modifier.width(8.dp))
                        Text(skill, style = MaterialTheme.typography.bodyMedium)
                    }
                }
            }
        }

        Spacer(Modifier.height(24.dp))

        Button(
            onClick = onStartInterview,
            modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp).height(56.dp),
            shape = RoundedCornerShape(18.dp),
            colors = ButtonDefaults.buttonColors(containerColor = MireaPurple)
        ) {
            Icon(Icons.Default.RecordVoiceOver, contentDescription = null)
            Spacer(Modifier.width(10.dp))
            Text("Simula Colloquio con Mirea AI", fontWeight = FontWeight.Bold, fontSize = 16.sp)
        }

        Spacer(Modifier.height(40.dp))
    }
}
