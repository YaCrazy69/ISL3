import { Platform } from "react-native"
import type { SimulationParams, SimulationResult } from "@/types"

const DEFAULT_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? (
  Platform.OS === "android"
    ? "http://10.0.2.2:8000"

)

const BASE_URL = DEFAULT_BASE_URL.replace(/\/$/, "")

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers)
  headers.set("Content-Type", "application/json")
  headers.set("Accept", "application/json")

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText)
    throw new Error(`API request failed: ${response.status} ${errorText}`)
  }

  return response.json() as Promise<T>
}

export async function simulate(params: SimulationParams): Promise<SimulationResult> {
  return request<SimulationResult>("/simulate", {
    method: "POST",
    body: JSON.stringify(params),
  })
}

