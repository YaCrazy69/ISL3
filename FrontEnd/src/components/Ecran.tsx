/**
 * Conteneur d'écran réutilisable : gère les zones sûres (safe area) et le fond.
 * Optionnellement défilable via `scroll`.
 */
import { memo } from "react"
import { ScrollView, StyleSheet, View, type ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { COLORS, SPACING } from "@/constants/theme"

interface ScreenProps {
  children: React.ReactNode
  scroll?: boolean
  contentStyle?: ViewStyle
}

function ScreenComponent({ children, scroll = false, contentStyle }: ScreenProps) {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={[styles.content, contentStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, styles.flex, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
  flex: {
    flex: 1,
  },
})

export const Ecran = memo(ScreenComponent)
