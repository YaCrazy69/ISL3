/**
 * Navigateur principal de l'application (stack natif).
 * Configure les routes, les transitions et l'en-tête de chaque écran.
 */
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HistoryScreen } from "@/screens/HistoryScreen"
import { HomeScreen } from "@/screens/HomeScreen"
import { ResultScreen } from "@/screens/ResultScreen"
import { SimulationScreen } from "@/screens/SimulationScreen"
import { COLORS, FONT_SIZE, FONT_WEIGHT } from "@/constants/theme"
import type { RootStackParamList } from "@/types/navigation"

const Stack = createNativeStackNavigator<RootStackParamList>()

/** Options d'en-tête communes à tous les écrans. */
const sharedHeaderOptions = {
  headerStyle: { backgroundColor: COLORS.background },
  headerTintColor: COLORS.primary,
  headerTitleStyle: {
    color: COLORS.text,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold as "600",
  },
  headerShadowVisible: false,
  headerBackTitle: "Retour",
} as const

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={sharedHeaderOptions}
      >
        {/* Écran d'accueil : pas d'en-tête (logo intégré dans le contenu) */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        {/* Formulaire de simulation */}
        <Stack.Screen
          name="Simulation"
          component={SimulationScreen}
          options={{ title: "Simulation" }}
        />

        {/* Résultats */}
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: "Résultats" }}
        />

        {/* Historique */}
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: "Historique" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
