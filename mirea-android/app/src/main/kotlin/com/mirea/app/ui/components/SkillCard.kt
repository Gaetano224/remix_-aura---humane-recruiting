package com.mirea.app.ui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.mirea.app.data.models.Skill
import com.mirea.app.ui.theme.*

@Composable
fun SkillCard(skill: Skill, modifier: Modifier = Modifier) {
    val (bgColor, labelColor, emoji) = when (skill.category.lowercase()) {
        "hard"     -> Triple(Color(0xFFE8EAF6), MireaPurple, "⚙️")
        "soft"     -> Triple(Color(0xFFF3E5F5), Color(0xFF7B1FA2), "🤝")
        "creative" -> Triple(Color(0xFFFFF3E0), Color(0xFFE65100), "✨")
        else       -> Triple(MireaSurface, MireaOnSurface, "📌")
    }

    val animatedProgress by animateFloatAsState(
        targetValue = skill.rating / 100f,
        animationSpec = tween(durationMillis = 800),
        label = "skill_progress"
    )

    Card(
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = bgColor),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(emoji, fontSize = 18.sp)
                    Spacer(Modifier.width(8.dp))
                    Text(
                        text = skill.name,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.SemiBold,
                        color = labelColor
                    )
                }
                Text(
                    text = "${skill.rating}%",
                    style = MaterialTheme.typography.labelLarge,
                    color = labelColor,
                    fontWeight = FontWeight.Bold
                )
            }

            if (skill.description.isNotBlank()) {
                Spacer(Modifier.height(6.dp))
                Text(
                    text = skill.description,
                    style = MaterialTheme.typography.bodySmall,
                    color = labelColor.copy(alpha = 0.7f)
                )
            }

            Spacer(Modifier.height(10.dp))
            LinearProgressIndicator(
                progress = { animatedProgress },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(8.dp)
                    .clip(RoundedCornerShape(4.dp)),
                color = labelColor,
                trackColor = labelColor.copy(alpha = 0.2f)
            )
        }
    }
}
