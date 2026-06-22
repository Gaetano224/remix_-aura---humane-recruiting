package com.mirea.app.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.mirea.app.data.models.ChatMessage
import com.mirea.app.ui.theme.*

@Composable
fun ChatBubble(message: ChatMessage, modifier: Modifier = Modifier) {
    val isUser = message.sender == "user"

    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 12.dp, vertical = 4.dp),
        horizontalArrangement = if (isUser) Arrangement.End else Arrangement.Start,
        verticalAlignment = Alignment.Bottom
    ) {
        if (!isUser) {
            // Avatar Mirea
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .clip(RoundedCornerShape(18.dp))
                    .background(MireaPurple),
                contentAlignment = Alignment.Center
            ) {
                Text("🌸", fontSize = 18.sp)
            }
            Spacer(Modifier.width(8.dp))
        }

        Column(
            horizontalAlignment = if (isUser) Alignment.End else Alignment.Start
        ) {
            Box(
                modifier = Modifier
                    .widthIn(max = 280.dp)
                    .clip(
                        RoundedCornerShape(
                            topStart = 20.dp,
                            topEnd = 20.dp,
                            bottomStart = if (isUser) 20.dp else 4.dp,
                            bottomEnd = if (isUser) 4.dp else 20.dp
                        )
                    )
                    .background(if (isUser) BubbleUser else BubbleAssistant)
                    .padding(horizontal = 16.dp, vertical = 10.dp)
            ) {
                Text(
                    text = message.text,
                    style = MaterialTheme.typography.bodyMedium,
                    color = if (isUser) MireaWhite else MireaOnSurface,
                    lineHeight = 22.sp
                )
            }
            Spacer(Modifier.height(2.dp))
            Text(
                text = message.timestamp,
                fontSize = 10.sp,
                color = MireaOnSurfaceVar,
                modifier = Modifier.padding(horizontal = 4.dp)
            )
        }

        if (isUser) {
            Spacer(Modifier.width(8.dp))
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .clip(RoundedCornerShape(18.dp))
                    .background(MireaCoral),
                contentAlignment = Alignment.Center
            ) {
                Text("👤", fontSize = 18.sp)
            }
        }
    }
}
