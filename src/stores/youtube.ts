import { writable } from "svelte/store"

export const showOverlay = writable(false)
export const videoId = writable("")
export const videoTitle = writable("")
export const videoDesc = writable("")
export const composerName = writable("")

export function closeOverlay() {
  showOverlay.set(false)
  videoId.set("")
  videoTitle.set("")
  videoDesc.set("")
  composerName.set("")
}
