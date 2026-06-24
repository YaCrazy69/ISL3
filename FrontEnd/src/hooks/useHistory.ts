/**
 * Hook gérant l'historique des simulations : chargement, sauvegarde, suppression.
 * Amorce le stockage avec des données mockées au premier lancement.
 */
import { useCallback, useEffect, useState } from "react"
import {
  deleteSimulation as deleteFromStorage,
  getHistory,
  saveSimulation as saveToStorage,
} from "@/services/storageService"
import { MOCK_HISTORY } from "@/services/mockData"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { STORAGE_KEY } from "@/constants/simulation"
import type { SimulationRecord } from "@/types"

export interface UseHistoryResult {
  history: SimulationRecord[]
  loading: boolean
  error: string | null
  /** Recharge l'historique depuis le stockage */
  refresh: () => Promise<void>
  /** Sauvegarde un enregistrement et met à jour l'état */
  save: (record: SimulationRecord) => Promise<void>
  /** Supprime un enregistrement par id */
  remove: (id: string) => Promise<void>
}

/**
 * Fournit l'état et les actions de gestion de l'historique.
 */
export function useHistory(): UseHistoryResult {
  const [history, setHistory] = useState<SimulationRecord[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const existing = await getHistory()
      // Amorçage : si aucun historique, on injecte les données mockées.
      if (existing.length === 0) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_HISTORY))
        setHistory(MOCK_HISTORY)
      } else {
        setHistory(existing)
      }
    } catch (e) {
      console.log("[v0] useHistory refresh error:", e)
      setError("Impossible de charger l'historique.")
    } finally {
      setLoading(false)
    }
  }, [])

  const save = useCallback(async (record: SimulationRecord) => {
    try {
      const updated = await saveToStorage(record)
      setHistory(updated)
    } catch (e) {
      console.log("[v0] useHistory save error:", e)
      setError("Impossible de sauvegarder la simulation.")
    }
  }, [])

  const remove = useCallback(async (id: string) => {
    try {
      const updated = await deleteFromStorage(id)
      setHistory(updated)
    } catch (e) {
      console.log("[v0] useHistory remove error:", e)
      setError("Impossible de supprimer la simulation.")
    }
  }, [])

  // Chargement initial au montage.
  useEffect(() => {
    void refresh()
  }, [refresh])

  return { history, loading, error, refresh, save, remove }
}
