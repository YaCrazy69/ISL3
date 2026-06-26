/**
 * Écran de configuration d'une simulation.
 * Expose tous les paramètres numériques et le sélecteur de méthode.
 * La logique d'état et de validation est entièrement déléguée à `useSimulationForm`.
 */
import { Alert, StyleSheet, Text, View } from "react-native"
import { Bouton } from "@/components/Bouton"
import { EntreeNumerique } from "@/components/EntreeNumerique"
import { Ecran } from "@/components/Ecran"
import { FIELD_CONFIGS } from "@/constants/simulation"
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/theme"
import { useSimulationForm } from "@/hooks/useFormulaireSimulation"
import { simulate } from "@/services/api"
import type { AppScreenProps } from "@/types/navigation"

export function Simulation({ navigation }: AppScreenProps<"Simulation">) {
  const { values, errors, setField, touchField, validateAll, buildParams } =
    useSimulationForm()

  async function handleSimulate() {
    const valid = validateAll()
    if (!valid) return

    const params = buildParams()

    try {
      const result = await simulate(params)
      navigation.navigate("Resultat", { params, result })
    } catch (error) {
      console.error("Simulation error", error)
      Alert.alert(
        "Erreur",
        "Impossible d'exécuter la simulation. Vérifiez que le backend FastAPI est bien lancé.",
      )
    }
  }

  return (
    <Ecran scroll contentStyle={styles.content}>
      {/* Titre */}
      <View style={styles.header}>
        <Text style={styles.title}>Nouvelle Simulation</Text>
        <Text style={styles.subtitle}>Renseignez les paramètres du projectile</Text>
      </View>

      {/* Champs numériques générés à partir de la configuration déclarative */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paramètres physiques</Text>
        {FIELD_CONFIGS.map((config) => (
          <EntreeNumerique
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

      {/* Méthode d'intégration fixe */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Méthode numérique</Text>
        <Text style={styles.methodLabel}>Runge-Kutta 4</Text>
      </View>

      {/* Bouton de lancement */}
      <View style={styles.actions}>
        <Bouton label="Simuler" onPress={handleSimulate} />
        <Bouton
          label="Annuler"
          variant="ghost"
          onPress={() => navigation.goBack()}
        />
      </View>
    </Ecran>
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
  methodLabel: {
    color: COLORS.text,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
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
