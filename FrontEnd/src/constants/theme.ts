/**
 * Thème centralisé de l'application : couleurs, espacements, typographie, rayons.
 * Toute l'UI référence ces tokens pour garantir une cohérence visuelle.
 *
 * Palette : fond sombre (slate), accent ambre, neutres.
 */

export const COLORS = {
  // Fonds
  background: "#0B1120",
  surface: "#111A2E",
  surfaceAlt: "#1A2742",
  // Accent (ambre)
  primary: "#F59E0B",
  primaryDark: "#B45309",
  // Texte
  text: "#F8FAFC",
  textMuted: "#94A3B8",
  textInverse: "#0B1120",
  // États
  border: "#243049",
  error: "#F87171",
  success: "#34D399",
  // Courbe trajectoire
  curve: "#F59E0B",
  grid: "#243049",
} as const

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 20,
  full: 999,
} as const

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 26,
  xxl: 34,
} as const

export const FONT_WEIGHT = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const
