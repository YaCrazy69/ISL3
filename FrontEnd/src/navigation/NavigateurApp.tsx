/**
 * Navigateur principal de l'application (stack natif).
 * Configure les routes, les transitions et l'en-tête de chaque écran.
 */
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Accueil } from "@/screens/Accueil"
import { Resultat } from "@/screens/Resultat"
import { Simulation } from "@/screens/Simulation"
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

export function NavigateurApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Accueil"
        screenOptions={sharedHeaderOptions}
      >
        {/* Écran d'accueil : pas d'en-tête (logo intégré dans le contenu) */}
        <Stack.Screen
          name="Accueil"
          component={Accueil}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Simulation"
          component={Simulation}
          options={{ title: "Simulation" }}
        />

        <Stack.Screen
          name="Resultat"
          component={Resultat}
          options={{ title: "Résultats" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
