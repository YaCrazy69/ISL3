/**
 * Point d'entrée de l'application Projectile Simulator.
 * Fournit les contextes globaux (SafeAreaProvider) et monte le navigateur.
 */
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { NavigateurApp } from "@/navigation/NavigateurApp"

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Barre de statut claire sur fond sombre */}
      <StatusBar style="light" backgroundColor="#0B1120" />
      <NavigateurApp />
    </SafeAreaProvider>
  )
}
