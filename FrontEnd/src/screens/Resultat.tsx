/**
 * Écran de résultats d'une simulation.
 * Affiche les métriques, le graphique SVG de la trajectoire et le tableau détaillé.
 * Permet de sauvegarder, relancer une simulation ou comparer (stub).
 */
import { Alert, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { Carte } from "@/components/Carte"
import { Bouton } from "@/components/Bouton"
import { CarteMetrique } from "@/components/CarteMetrique"
import { TableauResultats } from "@/components/TableauResultats"
import { Ecran } from "@/components/Ecran"
import { GraphiqueTrajectoire } from "@/components/GraphiqueTrajectoire"
import { METHOD_LABELS } from "@/constants/simulation"
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/theme"
import { formatNumber } from "@/utils/format"
import { sampleTrajectory } from "@/utils/trajectoire"
import type { AppScreenProps } from "@/types/navigation"

export function Resultat({ navigation, route }: AppScreenProps<"Resultat">) {
  const { params, result } = route.params
  const { metrics, trajectory } = result
  const { width } = useWindowDimensions()

  // Largeur disponible pour le graphe (écran moins les paddings).
  const chartWidth = width - SPACING.lg * 2 - SPACING.lg * 2 // écran - padding screen - padding card

  // Sous-échantillonnage pour ne pas surcharger le rendu SVG et le tableau.
  const sampledTrajectory = sampleTrajectory(trajectory, 60)

  function handleCompare() {
    Alert.alert("Comparer", "La comparaison de simulations sera disponible prochainement.")
  }

  return (
    <Ecran scroll contentStyle={styles.content}>
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.title}>Résultats</Text>
        <Text style={styles.method}>{METHOD_LABELS[params.method]}</Text>
      </View>

      {/* Métriques clés */}
      <Carte style={styles.metricsCard}>
        <Text style={styles.sectionTitle}>Indicateurs clés</Text>
        <View style={styles.metricsGrid}>
          <CarteMetrique
            label="Hauteur max"
            value={formatNumber(metrics.maxHeight, 2)}
            unit="m"
          />
          <CarteMetrique
            label="Portée"
            value={formatNumber(metrics.range, 2)}
            unit="m"
          />
          <CarteMetrique
            label="Temps de vol"
            value={formatNumber(metrics.flightTime, 2)}
            unit="s"
          />
          <CarteMetrique
            label="Itérations"
            value={String(metrics.iterations)}
          />
        </View>
      </Carte>

      {/* Graphique SVG de la trajectoire */}
      <Carte style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Trajectoire</Text>
        <GraphiqueTrajectoire
          trajectory={sampledTrajectory}
          height={220}
          width={Math.max(chartWidth, 260)}
        />
      </Carte>

      {/* Tableau des points */}
      <Carte style={styles.tableCard}>
        <Text style={styles.sectionTitle}>Points de trajectoire</Text>
        <Text style={styles.tableHint}>
          {sampledTrajectory.length} points affichés sur {trajectory.length}
        </Text>
        <TableauResultats points={sampledTrajectory} maxHeight={280} />
      </Carte>

      {/* Actions */}
      <View style={styles.actions}>
        <Bouton
          label="Nouvelle Simulation"
          variant="secondary"
          onPress={() => navigation.navigate("Simulation")}
        />
        <Bouton label="Comparer" variant="ghost" onPress={handleCompare} />
      </View>
    </Ecran>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: SPACING.xxl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.lg,
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
  },
  method: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    backgroundColor: COLORS.surfaceAlt,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 999,
    overflow: "hidden",
  },
  sectionTitle: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: SPACING.md,
  },
  metricsCard: {
    marginBottom: SPACING.md,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  chartCard: {
    marginBottom: SPACING.md,
  },
  tableCard: {
    marginBottom: SPACING.md,
  },
  tableHint: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
    marginBottom: SPACING.sm,
  },
  actions: {
    gap: SPACING.md,
  },
})
