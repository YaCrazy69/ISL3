/**
 * Types de navigation pour la pile (stack) React Navigation.
 * Centralise la liste des routes et leurs paramètres pour un typage strict.
 */
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { SimulationParams, SimulationResult } from "@/types"

/**
 * Liste des routes de l'application et de leurs paramètres.
 * `undefined` signifie que la route n'attend aucun paramètre.
 */
export type RootStackParamList = {
  Accueil: undefined
  Simulation: undefined
  Resultat: {
    params: SimulationParams
    result: SimulationResult
  }
}

/** Helper de typage des props d'écran pour une route donnée. */
export type AppScreenProps<RouteName extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  RouteName
>
