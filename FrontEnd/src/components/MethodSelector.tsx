/**
 * Sélecteur segmenté pour choisir la méthode d'intégration numérique.
 */
import { memo } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { METHOD_OPTIONS } from "@/constants/simulation"
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from "@/constants/theme"
import type { IntegrationMethod } from "@/types"

interface MethodSelectorProps {
  value: IntegrationMethod
  onChange: (method: IntegrationMethod) => void
}

function MethodSelectorComponent({ value, onChange }: MethodSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Méthode d&apos;intégration</Text>
      <View style={styles.segment} accessibilityRole="radiogroup">
        {METHOD_OPTIONS.map((option) => {
          const selected = option.value === value
          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={option.label}
              onPress={() => onChange(option.value)}
              style={[styles.option, selected && styles.optionSelected]}
            >
              <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                {option.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    color: COLORS.text,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    marginBottom: SPACING.sm,
  },
  segment: {
    flexDirection: "row",
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.xs,
    gap: SPACING.xs,
  },
  option: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  optionSelected: {
    backgroundColor: COLORS.primary,
  },
  optionText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    textAlign: "center",
  },
  optionTextSelected: {
    color: COLORS.textInverse,
    fontWeight: FONT_WEIGHT.semibold,
  },
})

export const MethodSelector = memo(MethodSelectorComponent)
