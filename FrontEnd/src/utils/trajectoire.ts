import type { TrajectoryPoint } from "@/types"

/**
 * Sous-échantillonne une trajectoire pour l'affichage sans modifier les données d'origine.
 */
export function sampleTrajectory(trajectory: TrajectoryPoint[], maxPoints = 60): TrajectoryPoint[] {
  if (trajectory.length <= maxPoints) return trajectory
  const step = Math.ceil(trajectory.length / maxPoints)
  const sampled = trajectory.filter((_, index) => index % step === 0)
  const last = trajectory[trajectory.length - 1]
  if (sampled[sampled.length - 1] !== last) {
    sampled.push(last)
  }
  return sampled
}
