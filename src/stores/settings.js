import { writable, derived } from "svelte/store"
import dict from "../assets/dict.js"

const storedCookiePreference = localStorage.acceptCookies
export const ytCookiesAccepted = writable(storedCookiePreference || null)
ytCookiesAccepted.subscribe((value) => (localStorage.acceptCookies = value))

export const appLanguage = writable("de")
export const dictionary = derived(
  appLanguage,
  ($appLanguage) => dict[$appLanguage]
)
