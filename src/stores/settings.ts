import { writable, derived } from "svelte/store"
import { dict } from "../assets/dict"

const onboarding = getLocalStorage("onboarding")
export const onboardingComplete = writable(onboarding || false)
onboardingComplete.subscribe((value) => (localStorage.onboarding = value))

const storedCookiePreference = getLocalStorage("acceptCookies")
export const ytCookiesAccepted = writable(storedCookiePreference)
ytCookiesAccepted.subscribe((value) => (localStorage.acceptCookies = value))

const preferredLanguage = localStorage.language
export const appLanguage = writable(preferredLanguage || "de")
appLanguage.subscribe((lang) => (localStorage.language = lang))

export const dictionary = derived(
  appLanguage,
  ($appLanguage) => dict[$appLanguage]
)

export const locales = derived(appLanguage, ($appLanguage) =>
  $appLanguage === "de" ? "de-DE" : "en-GB"
)

function getLocalStorage(key: string) {
  try {
    return JSON.parse(localStorage[key])
  } catch {
    return false
  }
}
