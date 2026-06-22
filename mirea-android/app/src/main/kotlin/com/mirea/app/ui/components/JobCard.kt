package com.mirea.app.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.mirea.app.data.models.JobPosting
import com.mirea.app.ui.theme.*

@Composable
fun JobCard(
    job: JobPosting,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val scoreColor = when {
        job.responsivenessScore >= 80 -> MireaGreen
        job.responsivenessScore >= 60 -> MireaAmber
        else -> MireaRed
    }
    val scoreLabel = when {
        job.responsivenessScore >= 80 -> "Alta reattività"
        job.responsivenessScore >= 60 -> "Reattività media"
        else -> "Bassa reattività ⚠️"
    }

    Card(
        modifier = modifier
            .fillMaxWidth()
            .clickable { onClick() },
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = MireaWhite),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(modifier = Modifier.padding(18.dp)) {

            // Header: Titolo + score badge
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = job.title,
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                        color = MireaPurpleDark,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                    Spacer(Modifier.height(2.dp))
                    Text(
                        text = job.company,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MireaOnSurfaceVar,
                        fontWeight = FontWeight.Medium
                    )
                }
                Spacer(Modifier.width(8.dp))
                // Score badge
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Box(
                        modifier = Modifier
                            .size(52.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(scoreColor.copy(alpha = 0.15f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "${job.responsivenessScore}%",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            color = scoreColor
                        )
                    }
                    Spacer(Modifier.height(4.dp))
                    Text(
                        text = scoreLabel,
                        fontSize = 9.sp,
                        color = scoreColor,
                        fontWeight = FontWeight.Medium
                    )
                }
            }

            Spacer(Modifier.height(12.dp))
            HorizontalDivider(color = MireaBeige, thickness = 1.dp)
            Spacer(Modifier.height(10.dp))

            // Location
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.LocationOn, contentDescription = null,
                    tint = MireaCoral, modifier = Modifier.size(16.dp))
                Spacer(Modifier.width(4.dp))
                Text(job.location, style = MaterialTheme.typography.bodySmall)
            }

            Spacer(Modifier.height(6.dp))

            // TTL
            if (job.ttlRemainingHours > 0) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.Schedule, contentDescription = null,
                        tint = if (job.ttlRemainingHours <= 6) MireaRed else MireaAmber,
                        modifier = Modifier.size(16.dp))
                    Spacer(Modifier.width(4.dp))
                    Text(
                        text = "Risposta entro ${job.ttlRemainingHours}h",
                        style = MaterialTheme.typography.bodySmall,
                        color = if (job.ttlRemainingHours <= 6) MireaRed else MireaOnSurfaceVar
                    )
                }
            } else {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.Shield, contentDescription = null,
                        tint = MireaRed, modifier = Modifier.size(16.dp))
                    Spacer(Modifier.width(4.dp))
                    Text(
                        text = "Nessuna risposta — penalizzato",
                        style = MaterialTheme.typography.bodySmall,
                        color = MireaRed
                    )
                }
            }

            Spacer(Modifier.height(12.dp))

            // Skill chips
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                job.requiredSkills.take(3).forEach { skill ->
                    AssistChip(
                        onClick = {},
                        label = { Text(skill, fontSize = 11.sp, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                        colors = AssistChipDefaults.assistChipColors(
                            containerColor = MireaPurple.copy(alpha = 0.08f),
                            labelColor = MireaPurple
                        ),
                        border = AssistChipDefaults.assistChipBorder(enabled = true,
                            borderColor = MireaPurple.copy(alpha = 0.2f))
                    )
                }
            }
        }
    }
}
