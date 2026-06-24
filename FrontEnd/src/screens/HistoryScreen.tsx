/**
 * Écran d'historique des simulations sauvegardées.
 * Liste les enregistrements, permet d'y naviguer et d'en supprimer.
 */
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from "react-native"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Screen } from "@/components/Screen"
import { METHOD_LABELS } from "@/constants/simulation"
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/theme"
import { useHistory } from "@/hooks/useHistory"
import { formatDate, formatNumber } from "@/utils/format"
import type { SimulationRecord } from "@/types"
import type { AppScreenProps } from "@/types/navigation"

export function HistoryScreen({ navigation }: AppScreenProps<"History">) {
  const { history, loading, error, remove } = useHistory()

  function handleView(record: SimulationRecord) {
    navigation.navigate("Result", {
      params: record.params,
      result: record.result,
    })
  }

  function handleDelete(id: string) {
    Alert.alert(
      "Supprimer",
      "Voulez-vous supprimer cette simulation ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => { void remove(id) },
        },
      ],
    )
  }

  // ─── États de chargement / erreur ──────────────────────────────────────────
  if (loading) {
    return (
      <Screen contentStyle={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Chargement de l&apos;historique…</Text>
      </Screen>
    )
  }

  if (error) {
    return (
      <Screen contentStyle={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </Screen>
    )
  }

  // ─── Liste vide ─────────────────────────────────────────────────────────────
  if (history.length === 0) {
    return (
      <Screen contentStyle={styles.centered}>
        <Text style={styles.emptyIcon}>🚀</Text>
        <Text style={styles.emptyTitle}>Aucune simulation</Text>
        <Text style={styles.emptySubtitle}>
          Lancez votre première simulation pour la retrouver ici.
        </Text>
        <Button
          label="Nouvelle Simulation"
          onPress={() => navigation.navigate("Simulation")}
          style={styles.emptyAction}
        />
      </Screen>
    )
  }

  // ─── Rendu d'un item ────────────────────────────────────────────────────────
  function renderItem({ item }: { item: SimulationRecord }) {
    const { id, createdAt, params, result } = item
    return (
      <Card style={styles.card}>
        {/* Ligne supérieure : date + méthode */}
        <View style={styles.cardHeader}>
          <Text style={styles.date}>{formatDate(createdAt)}</Text>
          <Text style={styles.methodBadge}>{METHOD_LABELS[params.method]}</Text>
        </View>

        {/* Métriques résumées */}
        <View style={styles.metricRow}>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Portée</Text>
            <Text style={styles.metricValue}>
              {formatNumber(result.metrics.range, 1)} m
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Hauteur max</Text>
            <Text style={styles.metricValue}>
              {formatNumber(result.metrics.maxHeight, 1)} m
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Temps de vol</Text>
            <Text style={styles.metricValue}>
              {formatNumber(result.metrics.flightTime, 2)} s
            </Text>
          </View>
        </View>

        {/* Paramètres condensés */}
        <Text style={styles.params}>
          {params.initialVelocity} m/s · {params.angle}° · g={params.gravity} m/s²
        </Text>

        {/* Actions */}
        <View style={styles.cardActions}>
          <Button
            label="Voir"
            variant="secondary"
            onPress={() => handleView(item)}
            style={styles.actionBtn}
          />
          <Button
            label="Supprimer"
            variant="danger"
            onPress={() => handleDelete(id)}
            style={styles.actionBtn}
          />
        </View>
      </Card>
    )
  }

  return (
    <Screen contentStyle={styles.screenContent}>
      {/* En-tête de l'écran */}
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Historique</Text>
        <Text style={styles.count}>
          {history.length} simulation{history.length > 1 ? "s" : ""}
        </Text>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  // ── Layout utilitaires ──────────────────────────────────────────────────────
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.md,
  },
  screenContent: {
    flex: 1,
    paddingBottom: 0,
  },
  // ── En-tête de l'écran ──────────────────────────────────────────────────────
  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.lg,
  },
  screenTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
  },
  count: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.sm,
  },
  // ── Liste ───────────────────────────────────────────────────────────────────
  list: {
    paddingBottom: SPACING.xxl,
  },
  separator: {
    height: SPACING.md,
  },
  // ── Carte d'item ────────────────────────────────────────────────────────────
  card: {
    gap: SPACING.sm,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
  },
  methodBadge: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    backgroundColor: COLORS.surfaceAlt,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: 999,
    overflow: "hidden",
  },
  metricRow: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  metric: {
    flex: 1,
  },
  metricLabel: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
    marginBottom: 2,
  },
  metricValue: {
    color: COLORS.text,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
  },
  params: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
  },
  cardActions: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  actionBtn: {
    flex: 1,
    minHeight: 40,
  },
  // ── États vide / chargement / erreur ────────────────────────────────────────
  loadingText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.sm,
    marginTop: SPACING.sm,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZE.sm,
    textAlign: "center",
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
  },
  emptySubtitle: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.sm,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: SPACING.lg,
  },
  emptyAction: {
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
})
