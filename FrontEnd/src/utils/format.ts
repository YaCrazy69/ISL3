/**
 * Fonctions utilitaires de formatage (nombres, dates).
 * Sans état, pures et réutilisables.
 */

/** Formate un nombre avec un nombre fixe de décimales, en gérant les valeurs invalides. */
export function formatNumber(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return "—"
  return value.toFixed(decimals)
}

/** Formate une valeur avec son unité (ex: "12.34 m"). */
export function formatWithUnit(value: number, unit: string, decimals = 2): string {
  return `${formatNumber(value, decimals)} ${unit}`
}

/** Formate une date ISO en chaîne locale lisible (FR). */
export function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return "Date inconnue"
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/** Génère un identifiant unique simple (suffisant côté client). */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}
