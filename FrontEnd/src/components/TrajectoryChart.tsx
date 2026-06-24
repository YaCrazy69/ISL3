/**
 * Graphique SVG de la trajectoire du projectile (hauteur en fonction de la distance).
 * Met à l'échelle automatiquement les points et dessine une grille et des axes.
 */
import { memo, useMemo } from "react"
import { StyleSheet, Text, View } from "react-native"
import Svg, { Circle, Line, Path, Rect } from "react-native-svg"
import { COLORS, FONT_SIZE, SPACING } from "@/constants/theme"
import { formatNumber } from "@/utils/format"
import type { TrajectoryPoint } from "@/types"

interface TrajectoryChartProps {
  trajectory: TrajectoryPoint[]
  /** Hauteur du graphe en points (la largeur s'adapte au conteneur) */
  height?: number
  width?: number
}

const PADDING = { top: 16, right: 16, bottom: 32, left: 40 }

function TrajectoryChartComponent({ trajectory, height = 240, width = 320 }: TrajectoryChartProps) {
  const { pathData, points, bounds } = useMemo(() => {
    if (trajectory.length === 0) {
      return { pathData: "", points: [] as { cx: number; cy: number }[], bounds: null }
    }

    const xs = trajectory.map((p) => p.x)
    const ys = trajectory.map((p) => p.y)
    const maxX = Math.max(...xs, 1)
    const maxY = Math.max(...ys, 1)

    const plotWidth = width - PADDING.left - PADDING.right
    const plotHeight = height - PADDING.top - PADDING.bottom

    // Convertit une coordonnée monde -> coordonnée écran (y inversé).
    const toScreen = (x: number, y: number) => ({
      sx: PADDING.left + (x / maxX) * plotWidth,
      sy: PADDING.top + plotHeight - (y / maxY) * plotHeight,
    })

    const screenPoints = trajectory.map((p) => toScreen(p.x, p.y))
    const path = screenPoints
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.sx.toFixed(2)} ${p.sy.toFixed(2)}`)
      .join(" ")

    // Quelques points marqueurs répartis le long de la courbe.
    const markerStep = Math.max(1, Math.floor(screenPoints.length / 6))
    const markers = screenPoints
      .filter((_, i) => i % markerStep === 0)
      .map((p) => ({ cx: p.sx, cy: p.sy }))

    return { pathData: path, points: markers, bounds: { maxX, maxY } }
  }, [trajectory, height, width])

  if (!bounds) {
    return (
      <View style={[styles.empty, { height }]}>
        <Text style={styles.emptyText}>Aucune donnée de trajectoire</Text>
      </View>
    )
  }

  const plotWidth = width - PADDING.left - PADDING.right
  const plotHeight = height - PADDING.top - PADDING.bottom
  const gridLines = 4

  return (
    <View>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Fond de la zone de tracé */}
        <Rect
          x={PADDING.left}
          y={PADDING.top}
          width={plotWidth}
          height={plotHeight}
          fill={COLORS.surfaceAlt}
          rx={8}
        />

        {/* Lignes de grille horizontales */}
        {Array.from({ length: gridLines + 1 }).map((_, i) => {
          const y = PADDING.top + (plotHeight / gridLines) * i
          return (
            <Line
              key={`h-${i}`}
              x1={PADDING.left}
              y1={y}
              x2={PADDING.left + plotWidth}
              y2={y}
              stroke={COLORS.grid}
              strokeWidth={1}
            />
          )
        })}

        {/* Lignes de grille verticales */}
        {Array.from({ length: gridLines + 1 }).map((_, i) => {
          const x = PADDING.left + (plotWidth / gridLines) * i
          return (
            <Line
              key={`v-${i}`}
              x1={x}
              y1={PADDING.top}
              x2={x}
              y2={PADDING.top + plotHeight}
              stroke={COLORS.grid}
              strokeWidth={1}
            />
          )
        })}

        {/* Courbe de trajectoire */}
        <Path d={pathData} stroke={COLORS.curve} strokeWidth={2.5} fill="none" />

        {/* Marqueurs */}
        {points.map((p, i) => (
          <Circle key={`m-${i}`} cx={p.cx} cy={p.cy} r={3} fill={COLORS.primary} />
        ))}
      </Svg>

      {/* Légendes des axes */}
      <View style={styles.axisRow}>
        <Text style={styles.axisLabel}>0 m</Text>
        <Text style={styles.axisCaption}>Distance horizontale →</Text>
        <Text style={styles.axisLabel}>{formatNumber(bounds.maxX, 0)} m</Text>
      </View>
      <Text style={styles.yCaption}>Hauteur max : {formatNumber(bounds.maxY, 1)} m</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  empty: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 12,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.sm,
  },
  axisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.xs,
  },
  axisLabel: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
  },
  axisCaption: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
  },
  yCaption: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
    marginTop: SPACING.xs,
  },
})

export const TrajectoryChart = memo(TrajectoryChartComponent)
