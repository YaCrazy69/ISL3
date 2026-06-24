/**
 * Données mockées utilisées pour pré-remplir l'historique lors des tests d'UI.
 * Le service d'historique amorce le stockage avec ces données s'il est vide.
 */
import { computeSimulation } from "@/utils/mockEngine"
import { generateId } from "@/utils/format"
import type { SimulationParams, SimulationRecord } from "@/types"

/** Construit un enregistrement mocké à partir de paramètres et d'une date. */
function buildRecord(params: SimulationParams, daysAgo: number): SimulationRecord {
  const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString()
  return {
    id: generateId(),
    createdAt,
    params,
    result: computeSimulation(params),
  }
}

/** Jeu d'exemples couvrant les trois méthodes d'intégration. */
export const MOCK_HISTORY: SimulationRecord[] = [
  buildRecord(
    {
      initialVelocity: 30,
      angle: 45,
      gravity: 9.81,
      timeStep: 0.01,
      mass: 1,
      dragCoefficient: 0.05,
      initialHeight: 0,
      method: "rk4",
    },
    0,
  ),
  buildRecord(
    {
      initialVelocity: 50,
      angle: 60,
      gravity: 9.81,
      timeStep: 0.02,
      mass: 2,
      dragCoefficient: 0.1,
      initialHeight: 10,
      method: "midpoint",
    },
    1,
  ),
  buildRecord(
    {
      initialVelocity: 20,
      angle: 30,
      gravity: 9.81,
      timeStep: 0.05,
      mass: 0.5,
      dragCoefficient: 0,
      initialHeight: 0,
      method: "euler",
    },
    3,
  ),
]
