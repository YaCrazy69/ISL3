/**
 * Champ de saisie numérique réutilisable avec label, unité et message d'erreur.
 * Pilote l'affichage de la validation reçue en props (composant contrôlé).
 */
import { memo, useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from "@/constants/theme"

interface NumericInputProps {
  label: string
  unit: string
  value: string
  placeholder?: string
  error?: string
  onChangeText: (value: string) => void
  onBlur?: () => void
}

function NumericInputComponent({
  label,
  unit,
  value,
  placeholder,
  error,
  onChangeText,
  onBlur,
}: NumericInputProps) {
  const [focused, setFocused] = useState(false)
  const hasError = Boolean(error)

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>

      <TextInput
        style={[styles.input, focused && styles.inputFocused, hasError && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false)
          onBlur?.()
        }}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        keyboardType="numeric"
        inputMode="decimal"
        accessibilityLabel={`${label} en ${unit}`}
        accessibilityState={{ disabled: false }}
        returnKeyType="done"
      />

      {hasError ? (
        <Text style={styles.errorText} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  label: {
    color: COLORS.text,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    flexShrink: 1,
  },
  unit: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
    marginLeft: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.text,
    fontSize: FONT_SIZE.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  inputFocused: {
    borderColor: COLORS.primary,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZE.xs,
    marginTop: SPACING.xs,
  },
})

export const NumericInput = memo(NumericInputComponent)
