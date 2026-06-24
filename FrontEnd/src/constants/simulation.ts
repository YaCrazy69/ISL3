/**
 * Constantes liées au domaine de la simulation :
 * valeurs par défaut, bornes de validation et définition des champs du formulaire.
 */
import type { IntegrationMethod, SimulationParams } from "@/types"

/** Valeurs par défaut pré-remplies dans le formulaire de simulation. */
export const DEFAULT_PARAMS: SimulationParams = {
  initialVelocity: 30,
  angle: 45,
  gravity: 9.81,
  timeStep: 0.01,
  mass: 1,
  dragCoefficient: 0.05,
  initialHeight: 0,
  method: "rk4",
}

/** Clé de champ numérique (exclut la méthode qui est un sélecteur). */
export type NumericField = Exclude<keyof SimulationParams, "method">

/** Description d'un champ numérique du formulaire pour un rendu générique. */
export interface FieldConfig {
  key: NumericField
  label: string
  unit: string
  placeholder: string
  /** Borne minimale autorisée (incluse selon `minInclusive`) */
  min: number
  /** Borne maximale autorisée */
  max: number
  /** Si false, la valeur doit être strictement supérieure à `min` */
  minInclusive: boolean
}

/** Configuration déclarative de tous les champs numériques. */
export const FIELD_CONFIGS: FieldConfig[] = [
  {
    key: "initialVelocity",
    label: "Vitesse initiale",
    unit: "m/s",
    placeholder: "30",
    min: 0,
    max: 1000,
    minInclusive: false,
  },
  {
    key: "angle",
    label: "Angle",
    unit: "°",
    placeholder: "45",
    min: 0,
    max: 90,
    minInclusive: true,
  },
  {
    key: "gravity",
    label: "Gravité",
    unit: "m/s²",
    placeholder: "9.81",
    min: 0,
    max: 100,
    minInclusive: false,
  },
  {
    key: "timeStep",
    label: "Pas de temps",
    unit: "s",
    placeholder: "0.01",
    min: 0,
    max: 1,
    minInclusive: false,
  },
  {
    key: "mass",
    label: "Masse",
    unit: "kg",
    placeholder: "1",
    min: 0,
    max: 10000,
    minInclusive: false,
  },
  {
    key: "dragCoefficient",
    label: "Coefficient de résistance de l'air",
    unit: "kg/m",
    placeholder: "0.05",
    min: 0,
    max: 100,
    minInclusive: true,
  },
  {
    key: "initialHeight",
    label: "Hauteur initiale",
    unit: "m",
    placeholder: "0",
    min: 0,
    max: 10000,
    minInclusive: true,
  },
]

/** Options du sélecteur de méthode d'intégration numérique. */
export const METHOD_OPTIONS: { value: IntegrationMethod; label: string; short: string }[] = [
  { value: "euler", label: "Euler", short: "Euler" },
  { value: "midpoint", label: "Point Milieu", short: "Milieu" },
  { value: "rk4", label: "Runge-Kutta 4", short: "RK4" },
]

/** Libellé lisible d'une méthode pour l'affichage. */
export const METHOD_LABELS: Record<IntegrationMethod, string> = {
  euler: "Euler",
  midpoint: "Point Milieu",
  rk4: "Runge-Kutta 4",
}

/** Clé de stockage AsyncStorage pour l'historique des simulations. */
export const STORAGE_KEY = "@projectile_simulator/history"
