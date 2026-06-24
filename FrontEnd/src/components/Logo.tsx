/**
 * Logo de l'application dessiné en SVG : une trajectoire balistique stylisée.
 */
import { memo } from "react"
import { StyleSheet, Text, View } from "react-native"
import Svg, { Circle, Path } from "react-native-svg"
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "@/constants/theme"

interface LogoProps {
  size?: number
  showText?: boolean
}

function LogoComponent({ size = 96, showText = true }: LogoProps) {
  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 100 100" accessibilityLabel="Logo Projectile Simulator">
        {/* Sol */}
        <Path d="M10 85 H90" stroke={COLORS.border} strokeWidth={3} strokeLinecap="round" />
        {/* Trajectoire en arc */}
        <Path
          d="M15 85 Q50 5 85 85"
          stroke={COLORS.primary}
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
        />
        {/* Projectile */}
        <Circle cx={85} cy={85} r={6} fill={COLORS.primary} />
        {/* Point de départ */}
        <Circle cx={15} cy={85} r={4} fill={COLORS.text} />
      </Svg>

      {showText ? (
        <View style={styles.textWrap}>
          <Text style={styles.title}>Projectile</Text>
          <Text style={styles.subtitle}>Simulator</Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  textWrap: {
    marginTop: SPACING.md,
    alignItems: "center",
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: 0.5,
  },
  subtitle: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    letterSpacing: 4,
    textTransform: "uppercase",
  },
})

export const Logo = memo(LogoComponent)
