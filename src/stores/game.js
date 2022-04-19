import { writable } from "svelte/store"

export const decks = writable({ en: [], de: [] })

// export const deckEN = writable([])
// export const deckDE = writable([])
