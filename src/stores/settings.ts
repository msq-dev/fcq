import { writable, derived, Writable } from "svelte/store"
import { dict } from "../assets/dict.js"

const storedCookiePreference = JSON.parse(localStorage.acceptCookies)
export const ytCookiesAccepted = writable(storedCookiePreference || null)
ytCookiesAccepted.subscribe((value) => (localStorage.acceptCookies = value))

export const appLanguage: Writable<string> = writable("de")
export const dictionary = derived(
  appLanguage,
  ($appLanguage) => dict[$appLanguage]
)
