/**
 * Logique de validation des entrées du formulaire de simulation.
 * Totalement découplée de l'UI : prend des chaînes brutes, retourne des erreurs typées.
 */
import { FIELD_CONFIGS, type NumericField } from "@/constants/simulation"
import type { ValidationErrors } from "@/types"

/** État brut du formulaire : chaque champ numérique est une chaîne saisie par l'utilisateur. */
export type RawFormValues = Record<NumericField, string>

/**
 * Valide un seul champ numérique en fonction de sa configuration.
 * @returns un message d'erreur, ou `undefined` si la valeur est valide.
 */
export function validateField(field: NumericField, rawValue: string): string | undefined {
  const config = FIELD_CONFIGS.find((c) => c.key === field)
  if (!config) return undefined

  const trimmed = rawValue.trim()
  if (trimmed === "") {
    return "Ce champ est requis"
  }

  // Accepte les nombres décimaux avec point ou virgule.
  const normalized = trimmed.replace(",", ".")
  const value = Number(normalized)

  if (!Number.isFinite(value)) {
    return "Veuillez entrer un nombre valide"
  }

  if (config.minInclusive) {
    if (value < config.min) return `La valeur doit être ≥ ${config.min}`
  } else if (value <= config.min) {
    return `La valeur doit être > ${config.min}`
  }

  if (value > config.max) {
    return `La valeur doit être ≤ ${config.max}`
  }

  return undefined
}

/**
 * Valide l'ensemble du formulaire.
 * @returns un objet d'erreurs (vide si tout est valide).
 */
export function validateForm(values: RawFormValues): ValidationErrors<RawFormValues> {
  const errors: ValidationErrors<RawFormValues> = {}
  for (const config of FIELD_CONFIGS) {
    const error = validateField(config.key, values[config.key])
    if (error) {
      errors[config.key] = error
    }
  }
  return errors
}

/** Indique si un objet d'erreurs ne contient aucune erreur. */
export function isFormValid(errors: ValidationErrors<RawFormValues>): boolean {
  return Object.keys(errors).length === 0
}

/** Convertit une valeur brute (string) en nombre normalisé. */
export function parseNumeric(rawValue: string): number {
  return Number(rawValue.trim().replace(",", "."))
}
