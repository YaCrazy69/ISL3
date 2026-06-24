/**
 * Bouton réutilisable avec variantes (primary, secondary, ghost, danger).
 * Gère l'état désactivé et l'accessibilité.
 */
import { memo } from "react"
import { ActivityIndicator, Pressable, StyleSheet, Text, View, type ViewStyle } from "react-native"
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from "@/constants/theme"

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger"

interface ButtonProps {
  label: string
  onPress: () => void
  variant?: ButtonVariant
  disabled?: boolean
  loading?: boolean
  /** Icône optionnelle rendue avant le label */
  icon?: React.ReactNode
  style?: ViewStyle
}

function ButtonComponent({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  icon,
  style,
}: ButtonProps) {
  const isInactive = disabled || loading

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isInactive }}
      accessibilityLabel={label}
      disabled={isInactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        isInactive && styles.disabled,
        pressed && !isInactive && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? COLORS.textInverse : COLORS.text} />
      ) : (
        <View style={styles.content}>
          {icon ? <View style={styles.icon}>{icon}</View> : null}
          <Text style={[styles.label, styles[`${variant}Label`]]}>{label}</Text>
        </View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
  },
  // Variantes de fond
  primary: { backgroundColor: COLORS.primary },
  secondary: { backgroundColor: COLORS.surfaceAlt, borderColor: COLORS.border },
  ghost: { backgroundColor: "transparent", borderColor: COLORS.border },
  danger: { backgroundColor: "transparent", borderColor: COLORS.error },
  // Variantes de texte
  primaryLabel: { color: COLORS.textInverse },
  secondaryLabel: { color: COLORS.text },
  ghostLabel: { color: COLORS.text },
  dangerLabel: { color: COLORS.error },
  // États
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.85 },
})

export const Button = memo(ButtonComponent)
