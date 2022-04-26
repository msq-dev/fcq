<script>
  import { createEventDispatcher } from "svelte"
  import { sessionRunning, gameRunning, statUser } from "../stores/game.js"
  import { appLanguage, dictionary as t } from "../stores/settings.js"
  import CardStat from "./CardStat.svelte"
  import OverlayYoutube from "./OverlayYoutube.svelte"
  import IconSpeaker from "./IconSpeaker.svelte"

  export let index = 0
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
  export let stats = []

  const languageCodes = {
    en: "en-US",
    de: "de-DE",
  }

  const dateOptions = { year: "numeric", month: "long", day: "numeric" }

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

  const imgBaseUrl = "https://apps.maxspuling.de/assets/fcq/img/"
  const dispatch = createEventDispatcher()

  $: categoryColor = colors[index[0] - 1]
  $: birthday = formatDate(dateOfBirth)
  $: deathday = formatDate(dateOfDeath)
  $: src = imgBaseUrl + imageUrl

  let ytOverlay = false

  function playStat(s) {
    if (!$sessionRunning) return
    if ($statUser !== null) return

    if (!$gameRunning) {
      $gameRunning = true
    }

    $statUser = s
    dispatch("statPlayed")
  }

  function formatDate(date) {
    const day = new Date(date)
    return day.toLocaleDateString(languageCodes[$appLanguage], dateOptions)
  }
</script>

<OverlayYoutube
  {ytOverlay}
  {ytId}
  {ytTitle}
  {ytDesc}
  {name}
  on:close={() => (ytOverlay = false)}
/>

<div class="playing-card rounded">
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
  <div class="portrait-container" on:click={() => (ytOverlay = true)}>
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

<style>
  .playing-card {
    --size-portrait: 12rem;

    font-size: 90%;
    background-color: ghostwhite;
    width: calc(100% - 2rem);
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
  }

  .portrait-container > .portrait {
    position: absolute;
    height: 100%;
    object-fit: contain;
    z-index: 5;
    left: 50%;
    transform: translateX(-50%);
  }

  .bg-portrait {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
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
</style>
