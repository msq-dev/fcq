<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { tweened } from "svelte/motion"
  import { cubicInOut } from "svelte/easing"
  import { sessionRunning, gameRunning, statUser } from "../stores/game.js"
  import { appLanguage, dictionary as t } from "../stores/settings.js"

  import CardStat from "./CardStat.svelte"
  import OverlayYoutube from "./OverlayYoutube.svelte"
  import IconSpeaker from "./IconSpeaker.svelte"

  export let index = ""
  export let category = ""
  export let name = ""
  export let nameMaiden = ""
  export let dateOfBirth = ""
  export let dateOfDeath = ""
  export let placeOfBirth = ""
  export let placeOfDeath = ""
  export let imageUrl = "Placeholder.jpg"
  export let ytId = ""
  export let ytTitle = ""
  export let ytDesc = ""
  export let stats: Stat[] = []
  export let isUserCard = false
  export let isGameCard = false
  export let isTurnComplete = false

  let showYtOverlay = false

  const dispatch = createEventDispatcher()

  const imgBaseUrl = "https://apps.maxspuling.de/assets/fcq/img/"
  const colors = [
    "darkgreen",
    "crimson",
    "aqua",
    "darkorange",
    "deeppink",
    "blueviolet",
    "saddlebrown",
    "tomato",
    "fuchsia",
  ]

  const cardSize = tweened(1)
  const cardTranslation = tweened(0)

  $: categoryColor = colors[parseInt(index[0]) - 1]
  $: src = imgBaseUrl + imageUrl
  $: birthday = formatDate(dateOfBirth)
  $: deathday = formatDate(dateOfDeath)

  $: isTurnComplete ? animateCards() : null

  function animateCards() {
    let translation
    cardSize
      .set(0.73, {
        duration: 1000,
        easing: cubicInOut,
      })
      .then(() => {
        translation = isUserCard ? 100 : -100
        cardTranslation
          .set(translation, {
            duration: 1000,
            easing: cubicInOut,
          })
          .then(() => {
            translation = isUserCard ? -150 : 150
            cardTranslation
              .set(translation, { duration: 500, delay: 500 })
              .then(() => {
                emitAnimationEnd()
              })
          })
      })
  }

  function formatDate(date: string) {
    const languageCodes: Record<string, string> = {
      en: "en-US",
      de: "de-DE",
    }

    const dateOptions: Record<string, string> = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }

    const day = new Date(date)
    return day.toLocaleDateString(languageCodes[$appLanguage], dateOptions)
  }

  function emitAnimationEnd() {
    cardSize.set(1)
    cardTranslation.set(0)
    dispatch("animationOver")
  }

  function playStat(s: Stat) {
    if (!$sessionRunning) return
    if ($statUser !== null) return

    if (!$gameRunning) {
      $gameRunning = true
    }

    $statUser = s
    dispatch("statPlayed")
  }
</script>

<OverlayYoutube
  active={showYtOverlay}
  {ytId}
  {ytTitle}
  {ytDesc}
  {name}
  on:close={() => (showYtOverlay = false)}
/>

<div
  class="playing-card | rounded shadow"
  class:user-card={isGameCard && isUserCard}
  class:npc-card={isGameCard && !isUserCard}
  style="transform: scale({$cardSize}) translate({$cardTranslation}%);"
>
  <div class="head-container" style:color={categoryColor}>
    <div class="category">{category}</div>
    <div class="index">{index}</div>
  </div>
  <div class="names-container">
    <div class="name">{name}</div>
    {#if nameMaiden}
      <div class="maiden-name">({$t.born} {nameMaiden})</div>
    {/if}
  </div>
  <div class="life-container">
    <div class="date birth">&ast; {birthday} in {placeOfBirth}</div>
    <div class="date death">&dagger; {deathday} in {placeOfDeath}</div>
  </div>
  <div class="portrait-container" on:click={() => (showYtOverlay = true)}>
    <img class="portrait" {src} alt={`Portait of ${name}`} />
    <img class="bg-portrait" {src} alt={`Portait of ${name}`} />
    {#if ytId}
      <div class="yt-icon">
        <IconSpeaker size={30} />
      </div>
    {/if}
  </div>
  <div class="stats-table">
    {#each stats as stat}
      <CardStat {stat} on:statClicked={() => playStat(stat)} />
    {/each}
  </div>
  <div class="app-title">Female Composers Quartets</div>
</div>

<style lang="scss">
  .playing-card {
    --size-portrait: 12rem;

    font-size: 90%;
    background-color: ghostwhite;
    width: calc(100% - 2rem);
    height: 85vmax;
    padding: 0.5em 1em;
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
  }

  .head-container {
    color: #666;
  }

  .head-container,
  .maiden-name {
    font-size: 75%;
  }

  .category,
  .index,
  .name {
    display: inline;
  }

  .index {
    float: right;
    text-transform: uppercase;
    letter-spacing: 0.25em;
  }

  .names-container > * {
    line-height: 120%;
  }

  .name {
    font-weight: 450;
    font-size: 130%;
  }

  .maiden-name {
    display: block;
  }

  .life-container,
  .portrait-container {
    margin-top: 0.25em;
  }

  .portrait-container {
    position: relative;
    height: var(--size-portrait);

    > img {
      position: absolute;
      height: 100%;
    }

    .portrait {
      object-fit: contain;
      z-index: 5;
      left: 50%;
      transform: translateX(-50%);
    }

    .bg-portrait {
      object-fit: cover;
      z-index: 0;
      width: 100%;
      opacity: 0.5;
    }
  }

  .yt-icon {
    position: absolute;
    bottom: 0.75em;
    right: 0.75em;
  }

  .stats-table {
    margin-top: 0.5em;
  }

  .app-title {
    margin-top: 0.6em;
    text-align: right;
    font-size: 75%;
    color: var(--gray);
  }

  .user-card,
  .npc-card {
    position: absolute;
    top: 0;
    // transform: scale(1);
  }

  .user-card {
    z-index: 10;
    transform-origin: top left;
  }

  .npc-card {
    --shadow-clr: rgb(0 0 0 / 0);
    transform-origin: bottom right;
  }
</style>
