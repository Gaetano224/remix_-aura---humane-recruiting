# Proguard rules for Mirea

# Generative AI SDK
-keep class com.google.ai.client.generativeai.** { *; }

# Gson
-keep class com.google.gson.** { *; }
-keepattributes Signature
-keepattributes *Annotation*

# Kotlin Serialization
-keepattributes *Annotation*, InnerClasses
-dontnote kotlinx.serialization.AnnotationsKt

# Room
-keep class * extends androidx.room.RoomDatabase
-keep @androidx.room.Entity class *
