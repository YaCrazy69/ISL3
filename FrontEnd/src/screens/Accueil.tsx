/**
 * Écran d'accueil : logo et action principale pour démarrer une simulation.
 */
import { StyleSheet, Text, View } from "react-native"
import { Bouton } from "@/components/Bouton"
import { Logo } from "@/components/Logo"
import { Ecran } from "@/components/Ecran"
import { COLORS, FONT_SIZE, SPACING } from "@/constants/theme"
import type { AppScreenProps } from "@/types/navigation"

export function Accueil({ navigation }: AppScreenProps<"Accueil">) {
  return (
    <Ecran contentStyle={styles.content}>
      <View style={styles.header}>
        <Logo size={120} />
        <Text style={styles.tagline}>
          Simulez la trajectoire d&apos;un projectile avec différentes méthodes d&apos;intégration
          numérique.
        </Text>
      </View>

      <View style={styles.actions}>
        <Bouton label="Nouvelle Simulation" onPress={() => navigation.navigate("Simulation")} />
      </View>

      <Text style={styles.footer}>Runge-Kutta 4</Text>
    </Ecran>
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
