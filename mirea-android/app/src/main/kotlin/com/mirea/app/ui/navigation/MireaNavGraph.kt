package com.mirea.app.ui.navigation

import androidx.compose.animation.*
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.mirea.app.data.models.JobPosting
import com.mirea.app.data.models.RiasecResult
import com.mirea.app.ui.screens.*
import com.mirea.app.ui.theme.*
import com.mirea.app.viewmodel.*

sealed class Screen(val route: String, val label: String,
                    val icon: ImageVector, val iconSelected: ImageVector) {
    object Test    : Screen("test",  "Test",    Icons.Outlined.Psychology,  Icons.Filled.Psychology)
    object CV      : Screen("cv",    "CV",      Icons.Outlined.Description, Icons.Filled.Description)
    object Jobs    : Screen("jobs",  "Offerte", Icons.Outlined.Work,        Icons.Filled.Work)
    object Chat    : Screen("chat",  "Mirea",   Icons.Outlined.Chat,        Icons.Filled.Chat)
    object Diary   : Screen("diary", "Diario",  Icons.Outlined.Book,        Icons.Filled.Book)
}

private val BOTTOM_NAV_ITEMS = listOf(Screen.Test, Screen.CV, Screen.Jobs, Screen.Chat, Screen.Diary)

@Composable
fun MireaNavGraph() {
    val navController = rememberNavController()

    // Stato condiviso tra schermate
    var riasecResult by remember { mutableStateOf<RiasecResult?>(null) }
    var pendingInterviewJob by remember { mutableStateOf<JobPosting?>(null) }

    // ViewModels — nessuna factory custom necessaria
    val riasecViewModel: RiasecViewModel = viewModel()
    val cvViewModel: CvViewModel = viewModel()
    val chatViewModel: ChatViewModel = viewModel()
    val jobViewModel: JobViewModel = viewModel()
    val diaryViewModel: DiaryViewModel = viewModel()

    Scaffold(
        containerColor = MireaBeige,
        bottomBar = {
            NavigationBar(
                containerColor = MireaWhite,
                contentColor = MireaPurple
            ) {
                val navBackStackEntry by navController.currentBackStackEntryAsState()
                val currentDestination = navBackStackEntry?.destination
                BOTTOM_NAV_ITEMS.forEach { screen ->
                    val selected = currentDestination?.hierarchy?.any { it.route == screen.route } == true
                    NavigationBarItem(
                        selected = selected,
                        onClick = {
                            navController.navigate(screen.route) {
                                popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                                launchSingleTop = true
                                restoreState = true
                            }
                        },
                        icon = {
                            Icon(
                                if (selected) screen.iconSelected else screen.icon,
                                contentDescription = screen.label
                            )
                        },
                        label = { Text(screen.label) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = MireaPurple,
                            selectedTextColor = MireaPurple,
                            indicatorColor = MireaPurple.copy(alpha = 0.12f),
                            unselectedIconColor = MireaOnSurfaceVar,
                            unselectedTextColor = MireaOnSurfaceVar
                        )
                    )
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Test.route,
            modifier = Modifier.padding(innerPadding),
            enterTransition = { fadeIn() + slideInHorizontally { it / 4 } },
            exitTransition = { fadeOut() + slideOutHorizontally { -it / 4 } },
            popEnterTransition = { fadeIn() + slideInHorizontally { -it / 4 } },
            popExitTransition = { fadeOut() + slideOutHorizontally { it / 4 } }
        ) {
            composable(Screen.Test.route) {
                RiasecTestScreen(
                    viewModel = riasecViewModel,
                    onTestComplete = { result ->
                        riasecResult = result
                    }
                )
            }
            composable(Screen.CV.route) {
                CvAnalysisScreen(
                    viewModel = cvViewModel,
                    riasecResult = riasecResult
                )
            }
            composable(Screen.Jobs.route) {
                JobBoardScreen(
                    viewModel = jobViewModel,
                    onStartInterview = { job ->
                        pendingInterviewJob = job
                        navController.navigate(Screen.Chat.route) {
                            launchSingleTop = true
                        }
                    }
                )
            }
            composable(Screen.Chat.route) {
                val job = pendingInterviewJob
                ChatScreen(
                    viewModel = chatViewModel,
                    initialJob = job
                )
                // Dopo il lancio, resetta il job pendente
                LaunchedEffect(Unit) {
                    pendingInterviewJob = null
                }
            }
            composable(Screen.Diary.route) {
                DiaryScreen(viewModel = diaryViewModel)
            }
        }
    }
}
