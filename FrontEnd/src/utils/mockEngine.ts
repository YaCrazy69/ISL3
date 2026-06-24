/**
 * Moteur de simulation MOCKÉ.
 *
 * NOTE IMPORTANTE : le calcul numérique réel (Euler, Point Milieu, RK4 avec
 * résistance de l'air) sera injecté plus tard. Cette implémentation produit une
 * trajectoire balistique plausible afin de tester intégralement l'interface.
 *
 * L'interface publique (`computeSimulation`) est volontairement stable pour que
 * le vrai moteur puisse la remplacer sans modifier l'UI.
 */
import type { SimulationParams, SimulationResult, TrajectoryPoint } from "@/types"

const DEG_TO_RAD = Math.PI / 180

/**
 * Calcule une trajectoire approchée (sans traînée, pour le mock) puis applique
 * une légère perturbation dépendant de la méthode afin de différencier les rendus.
 */
export function computeSimulation(params: SimulationParams): SimulationResult {
  const { initialVelocity, angle, gravity, timeStep, initialHeight, method } = params

  const rad = angle * DEG_TO_RAD
  const vx0 = initialVelocity * Math.cos(rad)
  const vy0 = initialVelocity * Math.sin(rad)

  // Facteur fictif de "précision" selon la méthode (uniquement pour le mock).
  const methodFactor = method === "euler" ? 0.96 : method === "midpoint" ? 0.99 : 1

  const trajectory: TrajectoryPoint[] = []
  let t = 0
  let x = 0
  let y = initialHeight
  let vx = vx0
  let vy = vy0
  let iterations = 0
  let maxHeight = initialHeight

  // Garde-fou pour éviter une boucle infinie si les paramètres sont extrêmes.
  const MAX_ITERATIONS = 200000

  while (y >= 0 && iterations < MAX_ITERATIONS) {
    trajectory.push({ t, x, y, vx, vy })
    maxHeight = Math.max(maxHeight, y)

    // Intégration explicite simplifiée (mock, sans résistance de l'air).
    vy = vy - gravity * timeStep * methodFactor
    x = x + vx * timeStep
    y = y + vy * timeStep
    t = t + timeStep
    iterations += 1
  }

  // Dernier point au sol (interpolation simple sur y = 0).
  const last = trajectory[trajectory.length - 1]
  const range = last ? last.x : 0
  const flightTime = last ? last.t : 0

  return {
    metrics: {
      maxHeight,
      range,
      flightTime,
      iterations,
    },
    trajectory,
  }
}

/**
 * Sous-échantillonne une trajectoire pour l'affichage (graphe / tableau)
 * afin de limiter le nombre de points rendus.
 */
export function sampleTrajectory(trajectory: TrajectoryPoint[], maxPoints = 60): TrajectoryPoint[] {
  if (trajectory.length <= maxPoints) return trajectory
  const step = Math.ceil(trajectory.length / maxPoints)
  const sampled = trajectory.filter((_, index) => index % step === 0)
  // Garantit la présence du dernier point.
  const last = trajectory[trajectory.length - 1]
  if (sampled[sampled.length - 1] !== last) {
    sampled.push(last)
  }
  return sampled
}
