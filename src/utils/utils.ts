import { csv } from "d3-fetch"

// courtesy of https://stackoverflow.com/a/12646864
export function shuffle(array: ComposerCard[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// courtesy of https://codepen.io/kallil-belmonte/pen/KKKRoyx
export function checkIfImageExists(url: string, callback: Function) {
  const img = new Image()
  img.src = url

  if (img.complete) {
    callback(true)
  } else {
    img.onload = () => {
      callback(true)
    }
    img.onerror = () => {
      callback(false)
    }
  }
}

// courtesy of https://stackoverflow.com/a/21984136
function calculateAge(birthday: string, deathday: string) {
  const dateOfBirth = new Date(birthday)
  const dateToSubstractFrom: any = deathday
    ? new Date(deathday).getTime()
    : Date.now()
  const ageDifference = dateToSubstractFrom - dateOfBirth.getTime()
  const ageDate = new Date(ageDifference)

  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export function fetchData(lang: string) {
  const DATA_URL = `https://apps.maxspuling.de/assets/fcq/data/composers_${lang}.csv`
  return csv(DATA_URL)
}

export function makePlayingCards(data: ComposerCard[]) {
  let playingCards: ComposerCard[] = []
  data.forEach((composer) => {
    let stats: Stat[] = [
      {
        name: "age",
        value: calculateAge(composer.dateOfBirth, composer.dateOfDeath),
        highestWins: true,
        isAlive: composer.dateOfDeath ? false : true,
      },
      {
        name: "works",
        value: parseInt(composer.noOfWorks),
        highestWins: true,
        symbol: ">",
      },
      {
        name: "anniversary",
        value: parseInt(composer.upcomingAnniversary),
        highestWins: false,
        anniversaryInfo: {
          isBirth: JSON.parse(composer.anniversaryBirth.toLowerCase()),
          anniversaryYear: parseInt(composer.upcomingAnniversary),
          yearOfBirth: parseInt(composer.dateOfBirth.substring(0, 4)),
          yearOfDeath: parseInt(composer.dateOfDeath.substring(0, 4)),
        },
      },
      {
        name: "awareness",
        value: parseInt(composer.levelOfAwareness),
        highestWins: true,
      },
      {
        name: "abilities",
        value: composer.musicalAbilities.split(",").length,
        highestWins: true,
        abilitiesInfo: composer.musicalAbilities,
      },
    ]

    playingCards.push({
      stats,
      index: composer.index,
      category: composer.category,
      name: composer.name,
      nameMaiden: composer.nameMaiden,
      imageUrl: composer.imageUrl,
      dateOfBirth: composer.dateOfBirth || null,
      birthIsBaptized: composer.birthIsBaptized,
      placeOfBirth: composer.placeOfBirth,
      dateOfDeath: composer.dateOfDeath || null,
      dateDeathOverride: composer.dateDeathOverride || null,
      placeOfDeath: composer.placeOfDeath || null,
      ytTitle: composer.ytTitle,
      ytDesc: composer.ytDesc,
      ytId: composer.ytId,
    })
  })
  return playingCards
}

export function formatDate(date: string, languageCode: string) {
  const day = new Date(date)
  const dateOptions: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return day.toLocaleDateString(languageCode, dateOptions)
}
