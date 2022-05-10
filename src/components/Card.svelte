<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { tweened } from "svelte/motion"
  import { cubicInOut } from "svelte/easing"
  import { sessionRunning, gameRunning, statUser } from "../stores/game"
  import { dictionary as t } from "../stores/settings"
  import {
    showOverlay,
    videoId,
    videoTitle,
    videoDesc,
    composerName,
  } from "../stores/youtube"

  import CardStat from "./CardStat.svelte"
  import IconSpeaker from "./IconSpeaker.svelte"

  import { checkIfImageExists } from "../utils/utils"

  export let index = ""
  export let category = ""
  export let name = ""
  export let nameMaiden = ""
  export let dateOfBirth = ""
  export let birthIsBaptized = ""
  export let dateOfDeath = ""
  export let dateDeathOverride = ""
  export let placeOfBirth = ""
  export let placeOfDeath = ""
  export let imageUrl = ""
  export let stats: Stat[] = []

  export let ytId = ""
  export let ytTitle = ""
  export let ytDesc = ""

  export let shadow = true
  export let isUserCard = false
  export let isGameCard = false
  export let isTurnComplete = false

  const dispatch = createEventDispatcher()

  const IMG_BASE_URL = "https://apps.maxspuling.de/assets/fcq/img/"
  const colors = [
    "darkgreen",
    "crimson",
    "darkmagenta",
    "darkorange",
    "deeppink",
    "blueviolet",
    "saddlebrown",
    "tomato",
    "fuchsia",
  ]

  const cardSize = tweened(1)
  const cardTranslationX = tweened(0)
  const cardTranslationY = tweened(0)

  let imgExists = false
  let switchClass = false

  $: categoryColor = colors[parseInt(index[0]) - 1]
  $: birthday = formatDate(dateOfBirth)
  $: deathday = dateDeathOverride || formatDate(dateOfDeath)
  $: isTurnComplete ? animateCards() : null

  $: userClass = isGameCard && isUserCard
  $: npcClass = isGameCard && !isUserCard

  $: srcUrl = /^https?/.test(imageUrl) ? imageUrl : IMG_BASE_URL + imageUrl
  $: src = imgExists ? srcUrl : IMG_BASE_URL + "fcq_placeholder.jpg"

  function animateCards() {
    let translation
    const shmoov = {
      duration: 1000,
      easing: cubicInOut,
    }
    cardSize
      .set(0.73, {
        duration: 500,
      })
      .then(() => {
        translation = isUserCard ? -100 : 100
        cardTranslationX
          .set(translation, shmoov)
          .then(() => {
            translation = isUserCard ? 37 : -37
            switchClass = !switchClass
            cardTranslationX.set(translation, shmoov)
            cardTranslationY.set(translation, shmoov)
          })
          .then(() => {
            emitAnimationEnd()
          })
      })
  }

  function formatDate(date: string) {
    const day = new Date(date)
    const dateOptions: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return day.toLocaleDateString($t.languageCode, dateOptions)
  }

  function emitAnimationEnd() {
    setTimeout(() => {
      dispatch("animationEnd")
    }, 1500)
  }

  function resetTweens() {
    cardTranslationX.set(0, { duration: 0 })
    cardTranslationY.set(0, { duration: 0 })
    cardSize.set(1, { duration: 0 })
    switchClass = false
  }

  function playStat(s: Stat) {
    if (!$sessionRunning || $statUser !== null) return
    if (!$gameRunning) $gameRunning = true

    $statUser = s
    dispatch("statPlayed")
  }

  function showYoutubeOverlay() {
    if (!ytId) return

    $showOverlay = true
    $videoId = ytId
    $videoTitle = ytTitle
    $videoDesc = ytDesc
    $composerName = name
  }

  onMount(() => {
    checkIfImageExists(srcUrl, (exists: boolean) => {
      if (exists) {
        imgExists = true
      } else {
        imgExists = false
      }
    })
  })
</script>

<div
  id={index}
  class="playing-card | rounded"
  class:shadow
  class:user-card={userClass}
  class:npc-card={npcClass}
  style="transform: scale({$cardSize}) translateX({$cardTranslationX}%) translateY({$cardTranslationY}%);"
  in:fade={{ duration: 100 }}
  on:introstart={() => resetTweens()}
>
  <div class="head-container | flex-between" style:color={categoryColor}>
    <div class="category | small">{category}</div>
    <div class="index | small">{index}</div>
  </div>
  <div class="names-container">
    <div class="name | fit-text" style="--text-length: {name?.length};">
      {name}
    </div>
    {#if nameMaiden}
      <div class="maiden-name | small">({$t.born} {nameMaiden})</div>
    {/if}
  </div>
  <div class="life-container">
    <div class="date birth">
      {#if birthIsBaptized}
        <sup
          ><span class="small">(</span>&lowast;<span class="small">)</span></sup
        >
        {$t.bapt}
      {:else}
        <sup>&lowast;</sup>
      {/if}
      {birthday} in {placeOfBirth}
    </div>
    {#if dateOfDeath}
      <div class="date death">&dagger; {deathday} in {placeOfDeath}</div>
    {/if}
  </div>
  <div class="portrait-container" on:click={() => showYoutubeOverlay()}>
    <img class="portrait" {src} alt={$t.portraitOf + name} />
    <img class="bg-portrait" {src} alt={$t.portraitOf + name} />
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
  <div class="app-title | small">Female Composers Quartets</div>
</div>

<style>
  .playing-card {
    --size-portrait: min(40%, 22rem);

    position: relative;
    font-size: 90%;
    background-color: var(--white);
    width: min(100vmin - 4.5rem, 30rem);
    aspect-ratio: 1 / 1.55;
    padding: 0.5em 1em;
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
    scroll-snap-align: start;
  }

  .head-container {
    color: var(--gray-400);
  }

  .category,
  .index,
  .name {
    display: inline;
  }

  .index {
    text-transform: uppercase;
    letter-spacing: 0.25em;
  }

  .names-container > * {
    line-height: 120%;
  }

  .name {
    --scale: 18.5;
    font-weight: var(--fw-bold);
  }

  .maiden-name {
    display: block;
  }

  .portrait-container {
    margin-top: 0.25em;
  }

  .portrait-container {
    position: relative;
    height: var(--size-portrait);
  }

  .portrait-container > img {
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

  .yt-icon {
    position: absolute;
    z-index: 5;
    bottom: 0.75em;
    right: 0.75em;
  }

  .stats-table {
    margin-top: 0.5em;
  }

  .app-title {
    position: absolute;
    bottom: 0.75em;
    right: 1em;
    color: var(--gray-400);
  }

  .user-card,
  .npc-card {
    position: absolute;
    top: 0;
  }

  .user-card {
    transform-origin: top left;
  }

  .npc-card {
    transform-origin: bottom right;
  }
</style>
