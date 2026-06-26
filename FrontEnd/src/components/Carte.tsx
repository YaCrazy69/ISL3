/**
 * Conteneur de type "carte" réutilisable pour regrouper du contenu.
 */
import { memo } from "react"
import { StyleSheet, View, type ViewStyle } from "react-native"
import { COLORS, RADIUS, SPACING } from "@/constants/theme"

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
}

function CardComponent({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
})

export const Carte = memo(CardComponent)
