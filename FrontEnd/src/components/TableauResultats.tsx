/**
 * Tableau scrollable affichant les points échantillonnés de la trajectoire.
 * En-tête figé, lignes alternées pour la lisibilité.
 */
import { memo } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from "@/constants/theme"
import { formatNumber } from "@/utils/format"
import type { TrajectoryPoint } from "@/types"

interface ResultsTableProps {
  points: TrajectoryPoint[]
  /** Hauteur maximale de la zone scrollable */
  maxHeight?: number
}

const COLUMNS: { key: keyof TrajectoryPoint; label: string }[] = [
  { key: "t", label: "t (s)" },
  { key: "x", label: "x (m)" },
  { key: "y", label: "y (m)" },
  { key: "vx", label: "vx (m/s)" },
  { key: "vy", label: "vy (m/s)" },
]

function ResultsTableComponent({ points, maxHeight = 280 }: ResultsTableProps) {
  return (
    <View style={styles.container}>
      {/* En-tête figé */}
      <View style={[styles.row, styles.headerRow]}>
        {COLUMNS.map((col) => (
          <Text key={col.key} style={[styles.cell, styles.headerCell]}>
            {col.label}
          </Text>
        ))}
      </View>

      <ScrollView
        style={{ maxHeight }}
        nestedScrollEnabled
        showsVerticalScrollIndicator
        accessibilityLabel="Tableau des résultats de la trajectoire"
      >
        {points.map((point, index) => (
          <View key={`${point.t}-${index}`} style={[styles.row, index % 2 === 1 && styles.rowAlt]}>
            <Text style={styles.cell}>{formatNumber(point.t, 2)}</Text>
            <Text style={styles.cell}>{formatNumber(point.x, 2)}</Text>
            <Text style={styles.cell}>{formatNumber(point.y, 2)}</Text>
            <Text style={styles.cell}>{formatNumber(point.vx, 2)}</Text>
            <Text style={styles.cell}>{formatNumber(point.vy, 2)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  headerRow: {
    backgroundColor: COLORS.surfaceAlt,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  rowAlt: {
    backgroundColor: COLORS.surfaceAlt,
  },
  cell: {
    flex: 1,
    color: COLORS.text,
    fontSize: FONT_SIZE.xs,
    textAlign: "center",
  },
  headerCell: {
    color: COLORS.textMuted,
    fontWeight: FONT_WEIGHT.semibold,
  },
})

export const TableauResultats = memo(ResultsTableComponent)
