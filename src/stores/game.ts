import { writable, derived, Writable } from "svelte/store"

export const decks: Writable<Deck> = writable({ en: [], de: [] })

export const sessionRunning = writable(false)
export const deckUser = writable([])
export const deckNpc = writable([])
export const statUser = writable(null)
export const statNpc = writable(null)
export const gameRunning = writable(false)

export const currentCardUser = derived(deckUser, ($deckUser) => $deckUser[0])
export const currentCardNpc = derived(deckNpc, ($deckNpc) => $deckNpc[0])

export function resetGame() {
  sessionRunning.set(false)
  deckUser.set([])
  deckNpc.set([])
  statUser.set(null)
  statNpc.set(null)
  gameRunning.set(false)
}
