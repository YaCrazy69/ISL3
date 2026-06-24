/**
 * Hook gérant l'état et la validation du formulaire de simulation.
 * Sépare la logique métier (état, validation, conversion) de l'UI.
 */
import { useCallback, useMemo, useState } from "react"
import { DEFAULT_PARAMS, FIELD_CONFIGS, type NumericField } from "@/constants/simulation"
import { isFormValid, parseNumeric, type RawFormValues, validateForm } from "@/utils/validation"
import type { IntegrationMethod, SimulationParams, ValidationErrors } from "@/types"

/** Construit les valeurs brutes initiales (chaînes) à partir des paramètres par défaut. */
function buildInitialValues(): RawFormValues {
  const values = {} as RawFormValues
  for (const config of FIELD_CONFIGS) {
    values[config.key] = String(DEFAULT_PARAMS[config.key])
  }
  return values
}

export interface UseSimulationFormResult {
  /** Valeurs brutes saisies (chaînes) */
  values: RawFormValues
  /** Méthode d'intégration sélectionnée */
  method: IntegrationMethod
  /** Erreurs de validation affichées (champs déjà "touchés") */
  errors: ValidationErrors<RawFormValues>
  /** Met à jour la valeur d'un champ */
  setField: (field: NumericField, value: string) => void
  /** Sélectionne la méthode d'intégration */
  setMethod: (method: IntegrationMethod) => void
  /** Marque un champ comme touché (déclenche l'affichage de son erreur) */
  touchField: (field: NumericField) => void
  /** Valide tout le formulaire et marque tous les champs comme touchés */
  validateAll: () => boolean
  /** Réinitialise le formulaire aux valeurs par défaut */
  reset: () => void
  /** Construit l'objet `SimulationParams` typé (à appeler après validation) */
  buildParams: () => SimulationParams
}

/**
 * Gère l'intégralité de l'état du formulaire de simulation.
 */
export function useSimulationForm(): UseSimulationFormResult {
  const [values, setValues] = useState<RawFormValues>(buildInitialValues)
  const [method, setMethod] = useState<IntegrationMethod>(DEFAULT_PARAMS.method)
  const [touched, setTouched] = useState<Partial<Record<NumericField, boolean>>>({})

  // Erreurs calculées sur l'ensemble du formulaire.
  const allErrors = useMemo(() => validateForm(values), [values])

  // On n'affiche que les erreurs des champs déjà touchés.
  const errors = useMemo<ValidationErrors<RawFormValues>>(() => {
    const visible: ValidationErrors<RawFormValues> = {}
    for (const config of FIELD_CONFIGS) {
      if (touched[config.key] && allErrors[config.key]) {
        visible[config.key] = allErrors[config.key]
      }
    }
    return visible
  }, [allErrors, touched])

  const setField = useCallback((field: NumericField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }, [])

  const touchField = useCallback((field: NumericField) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  const validateAll = useCallback(() => {
    // Marque tous les champs comme touchés pour révéler toutes les erreurs.
    const allTouched: Partial<Record<NumericField, boolean>> = {}
    for (const config of FIELD_CONFIGS) {
      allTouched[config.key] = true
    }
    setTouched(allTouched)
    return isFormValid(validateForm(values))
  }, [values])

  const reset = useCallback(() => {
    setValues(buildInitialValues())
    setMethod(DEFAULT_PARAMS.method)
    setTouched({})
  }, [])

  const buildParams = useCallback((): SimulationParams => {
    return {
      initialVelocity: parseNumeric(values.initialVelocity),
      angle: parseNumeric(values.angle),
      gravity: parseNumeric(values.gravity),
      timeStep: parseNumeric(values.timeStep),
      mass: parseNumeric(values.mass),
      dragCoefficient: parseNumeric(values.dragCoefficient),
      initialHeight: parseNumeric(values.initialHeight),
      method,
    }
  }, [values, method])

  return {
    values,
    method,
    errors,
    setField,
    setMethod,
    touchField,
    validateAll,
    reset,
    buildParams,
  }
}
