/**
 * Écran de configuration d'une simulation.
 * Expose tous les paramètres numériques et le sélecteur de méthode.
 * La logique d'état et de validation est entièrement déléguée à `useSimulationForm`.
 */
import { StyleSheet, Text, View } from "react-native"
import { Button } from "@/components/Button"
import { MethodSelector } from "@/components/MethodSelector"
import { NumericInput } from "@/components/NumericInput"
import { Screen } from "@/components/Screen"
import { FIELD_CONFIGS } from "@/constants/simulation"
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/theme"
import { useSimulationForm } from "@/hooks/useSimulationForm"
import { computeSimulation } from "@/utils/mockEngine"
import type { AppScreenProps } from "@/types/navigation"

export function SimulationScreen({ navigation }: AppScreenProps<"Simulation">) {
  const { values, method, errors, setField, setMethod, touchField, validateAll, buildParams } =
    useSimulationForm()

  function handleSimulate() {
    const valid = validateAll()
    if (!valid) return

    const params = buildParams()
    const result = computeSimulation(params)
    navigation.navigate("Result", { params, result })
  }

  return (
    <Screen scroll contentStyle={styles.content}>
      {/* Titre */}
      <View style={styles.header}>
        <Text style={styles.title}>Nouvelle Simulation</Text>
        <Text style={styles.subtitle}>Renseignez les paramètres du projectile</Text>
      </View>

      {/* Champs numériques générés à partir de la configuration déclarative */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paramètres physiques</Text>
        {FIELD_CONFIGS.map((config) => (
          <NumericInput
            key={config.key}
            label={config.label}
            unit={config.unit}
            value={values[config.key]}
            placeholder={config.placeholder}
            error={errors[config.key]}
            onChangeText={(v) => setField(config.key, v)}
            onBlur={() => touchField(config.key)}
          />
        ))}
      </View>

      {/* Sélecteur de méthode d'intégration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Méthode numérique</Text>
        <MethodSelector value={method} onChange={setMethod} />
      </View>

      {/* Bouton de lancement */}
      <View style={styles.actions}>
        <Button label="Simuler" onPress={handleSimulate} />
        <Button
          label="Annuler"
          variant="ghost"
          onPress={() => navigation.goBack()}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: SPACING.xxl,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.sm,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: SPACING.md,
  },
  actions: {
    gap: SPACING.md,
    marginTop: SPACING.sm,
  },
})
