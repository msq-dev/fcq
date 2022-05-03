/// <reference types="svelte" />

declare module "d3-fetch"

interface ComposerCard {
  index: string
  category: string
  name: string
  nameMaiden: string
  imageUrl: string
  dateOfBirth: string
  placeOfBirth: string
  dateOfDeath: string
  placeOfDeath: string
  ytTitle: string
  ytDesc: string
  ytId: string
  ageAtDeath?: string
  noOfWorks?: string
  upcomingAnniversary?: string
  anniversaryBirth?: string
  levelOfAwareness?: string
  noOfAbilities?: string
  musicalAbilities?: string
  stats?: Stat[]
}

interface Stat {
  name: string
  value: number
  highestWins: boolean
  isAlive?: boolean
  symbol?: string
  abilitiesInfo?: string
  anniversaryInfo?: AnniversaryInfo
}

interface AnniversaryInfo {
  isBirth: boolean
  anniversaryYear: number
  yearOfBirth: number
  yearOfDeath: number
}

interface Deck {
  [key: string]: ComposerCard[]
}

interface Category {
  catIndex: string
  catName: string
}

interface Dictionary {
  [key: string]: DictEntry
}

interface DictEntry {
  [key: string]: string
}
