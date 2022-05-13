import { writable, derived, Writable } from "svelte/store"

function createGameReadyState() {
  const { subscribe, set } = writable(false)
  return {
    subscribe,
    setup: (): Promise<boolean> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          set(true)
          resolve(true)
        }, 1000)
      })
    },
    reset: () => set(false),
  }
}

export const gameReady = createGameReadyState()
export const sessionRunning = writable(false)
export const gameRunning = writable(false)
export const showEvaluation = writable(false)

export const decks: Writable<Deck> = writable({ en: [], de: [] })

export const deckUser = writable([])
export const deckNpc = writable([])
export const cardsPlayed = writable([])
export const statUser = writable(null)
export const statNpc = writable(null)

export const currentCardUser = derived(deckUser, ($deckUser) => $deckUser[0])
export const currentCardNpc = derived(deckNpc, ($deckNpc) => $deckNpc[0])

export function resetGame() {
  gameReady.reset()
  showEvaluation.set(false)
  sessionRunning.set(false)
  gameRunning.set(false)
  deckUser.set([])
  deckNpc.set([])
  cardsPlayed.set([])
  statUser.set(null)
  statNpc.set(null)
}
