/**
 * Définitions de types globales pour Projectile Simulator.
 * Le typage strict garantit la cohérence entre la logique métier et l'UI.
 */

/** Méthodes d'intégration numérique disponibles. */
export type IntegrationMethod = "euler" | "midpoint" | "rk4"

/**
 * Paramètres d'entrée d'une simulation.
 * Toutes les valeurs sont exprimées dans le Système International (SI).
 */
export interface SimulationParams {
  /** Vitesse initiale (m/s) */
  initialVelocity: number
  /** Angle de tir (degrés) */
  angle: number
  /** Gravité (m/s²) */
  gravity: number
  /** Pas de temps d'intégration (s) */
  timeStep: number
  /** Masse du projectile (kg) */
  mass: number
  /** Coefficient de résistance de l'air (kg/m) */
  dragCoefficient: number
  /** Hauteur initiale (m) */
  initialHeight: number
  /** Méthode d'intégration numérique choisie */
  method: IntegrationMethod
}

/** Un point unique de la trajectoire calculée. */
export interface TrajectoryPoint {
  /** Temps écoulé (s) */
  t: number
  /** Position horizontale (m) */
  x: number
  /** Position verticale / hauteur (m) */
  y: number
  /** Vitesse horizontale (m/s) */
  vx: number
  /** Vitesse verticale (m/s) */
  vy: number
}

/** Indicateurs résumés d'une simulation. */
export interface SimulationMetrics {
  /** Hauteur maximale atteinte (m) */
  maxHeight: number
  /** Portée horizontale totale (m) */
  range: number
  /** Temps de vol total (s) */
  flightTime: number
  /** Nombre d'itérations effectuées */
  iterations: number
}

/** Résultat complet d'une simulation (métriques + trajectoire). */
export interface SimulationResult {
  metrics: SimulationMetrics
  trajectory: TrajectoryPoint[]
}

/**
 * Enregistrement persistant d'une simulation dans l'historique.
 * Contient les paramètres, le résultat et des métadonnées.
 */
export interface SimulationRecord {
  /** Identifiant unique */
  id: string
  /** Date de création (ISO 8601) */
  createdAt: string
  /** Paramètres utilisés */
  params: SimulationParams
  /** Résultat calculé */
  result: SimulationResult
}

/** Représente les erreurs de validation d'un formulaire. */
export type ValidationErrors<T> = Partial<Record<keyof T, string>>
