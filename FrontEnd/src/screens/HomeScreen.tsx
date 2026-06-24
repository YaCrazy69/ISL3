/**
 * Écran d'accueil : logo et actions principales (nouvelle simulation, historique).
 */
import { StyleSheet, Text, View } from "react-native"
import { Button } from "@/components/Button"
import { Logo } from "@/components/Logo"
import { Screen } from "@/components/Screen"
import { COLORS, FONT_SIZE, SPACING } from "@/constants/theme"
import type { AppScreenProps } from "@/types/navigation"

export function HomeScreen({ navigation }: AppScreenProps<"Home">) {
  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.header}>
        <Logo size={120} />
        <Text style={styles.tagline}>
          Simulez la trajectoire d&apos;un projectile avec différentes méthodes d&apos;intégration
          numérique.
        </Text>
      </View>

      <View style={styles.actions}>
        <Button label="Nouvelle Simulation" onPress={() => navigation.navigate("Simulation")} />
        <Button
          label="Historique"
          variant="secondary"
          onPress={() => navigation.navigate("History")}
        />
      </View>

      <Text style={styles.footer}>Euler · Point Milieu · Runge-Kutta 4</Text>
    </Screen>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: SPACING.xxl,
  },
  header: {
    alignItems: "center",
    marginTop: SPACING.xxl,
  },
  tagline: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.md,
    textAlign: "center",
    lineHeight: 24,
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  actions: {
    gap: SPACING.md,
  },
  footer: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
    textAlign: "center",
    letterSpacing: 1,
  },
})
