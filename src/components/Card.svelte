<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"
  import { tweened } from "svelte/motion"
  import { cubicInOut } from "svelte/easing"
  import { sessionRunning, gameRunning, statUser } from "../stores/game.js"
  import { dictionary as t } from "../stores/settings.js"

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
  export let shadow = true
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
        duration: 500,
        easing: cubicInOut,
      })
      .then(() => {
        translation = isUserCard ? 100 : -100
        cardTranslation
          .set(translation, {
            duration: 300,
            easing: cubicInOut,
          })
          .then(() => {
            translation = isUserCard ? -250 : 250
            cardTranslation
              .set(translation, { duration: 300, delay: 100 })
              .then(() => {
                emitAnimationEnd()
              })
          })
      })
  }

  function formatDate(date: string) {
    const day = new Date(date)
    const onlyYear = day.getDate() === 31 && day.getMonth() === 11
    const dateOptions: any = {
      year: "numeric",
      month: onlyYear ? undefined : "long",
      day: onlyYear ? undefined : "numeric",
    }
    return day.toLocaleDateString($t.languageCode, dateOptions)
  }

  function emitAnimationEnd() {
    dispatch("animationEnd")
  }

  function resetTweens() {
    cardTranslation.set(0, { duration: 0 })
    cardSize.set(1, { duration: 0 })
  }

  function playStat(s: Stat) {
    if (!$sessionRunning || $statUser !== null) return

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

{#key index}
  <div
    id={index}
    class="playing-card | rounded"
    class:shadow
    class:user-card={isGameCard && isUserCard}
    class:npc-card={isGameCard && !isUserCard}
    style="transform: scale({$cardSize}) translate({$cardTranslation}%);"
    in:fade={{ duration: 100 }}
    on:introstart={() => resetTweens()}
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
{/key}

<style lang="scss">
  .playing-card {
    --size-portrait: 12rem;

    position: relative;
    font-size: 90%;
    background-color: ghostwhite;
    width: calc(100% - 2rem);
    height: 30rem;
    min-width: 80vw;
    padding: 0.5em 1em;
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
    scroll-snap-align: start;
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
    font-weight: var(--fw-bold);
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
    position: absolute;
    bottom: 0.75em;
    right: 1em;
    font-size: 75%;
    color: var(--gray);
  }

  .user-card,
  .npc-card {
    position: absolute;
    top: 0;
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
