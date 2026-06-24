/**
 * Service de persistance de l'historique des simulations via AsyncStorage.
 * Encapsule toute interaction avec le stockage : l'UI n'y accède jamais directement.
 */
import AsyncStorage from "@react-native-async-storage/async-storage"
import { STORAGE_KEY } from "@/constants/simulation"
import type { SimulationRecord } from "@/types"

/** Récupère l'ensemble des simulations sauvegardées (les plus récentes d'abord). */
export async function getHistory(): Promise<SimulationRecord[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as SimulationRecord[]
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch (error) {
    console.log("[v0] getHistory error:", error)
    return []
  }
}

/** Sauvegarde un nouvel enregistrement en tête de l'historique. */
export async function saveSimulation(record: SimulationRecord): Promise<SimulationRecord[]> {
  const history = await getHistory()
  const updated = [record, ...history]
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

/** Supprime un enregistrement par son identifiant. */
export async function deleteSimulation(id: string): Promise<SimulationRecord[]> {
  const history = await getHistory()
  const updated = history.filter((record) => record.id !== id)
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

/** Efface tout l'historique (utilitaire de maintenance). */
export async function clearHistory(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY)
}
