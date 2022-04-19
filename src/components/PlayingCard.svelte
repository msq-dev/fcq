<script>
  import { appLanguage } from "../stores/settings.js"
  import dict from "../assets/dict.js"
  import OverlayYoutube from "./OverlayYoutube.svelte"

  export let index
  export let category
  export let name
  export let nameMaiden
  export let dateOfBirth
  export let dateOfDeath
  export let placeOfBirth
  export let placeOfDeath
  export let ageAtDeath
  export let imageUrl
  export let ytId
  export let ytTitle
  export let ytDesc
  export let noOfWorks
  export let musicalAbilities
  export let noOfAbilities
  export let upcomingAnniversary
  export let levelOfAwareness

  $: t = dict[$appLanguage]

  const languageCodes = {
    en: "en-US",
    de: "de-DE",
  }

  const dateOptions = { year: "numeric", month: "long", day: "numeric" }

  const colors = [
    "#7786B8",
    "#5274EB",
    "#916349",
    "#72855D",
    "#243338",
    "#858256",
    "#458499",
    "#666F91",
  ]

  const categoryColor = colors[parseInt(index[0])]

  const imgBaseUrl = "https://apps.maxspuling.de/assets/fcq/img/"

  function formatDate(date) {
    const day = new Date(date)
    return day.toLocaleDateString(languageCodes[$appLanguage], dateOptions)
  }

  let birthday = formatDate(dateOfBirth)
  let deathday = formatDate(dateOfDeath)

  let ytOverlay = true
</script>

<OverlayYoutube
  {ytOverlay}
  {ytId}
  {ytTitle}
  {ytDesc}
  {name}
  {nameMaiden}
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
      <div class="maiden-name">({t.born} {nameMaiden})</div>
    {/if}
  </div>
  <div class="life-container">
    <div class="date birth">&ast; {birthday} in {placeOfBirth}</div>
    <div class="date death">&dagger; {deathday} in {placeOfDeath}</div>
  </div>
  <div class="portrait-container">
    <img
      class="portrait"
      src={`${imgBaseUrl}${imageUrl}`}
      alt={`Portait of ${name}`}
    />
    <img
      class="bg-portrait"
      src={`${imgBaseUrl}${imageUrl}`}
      alt={`Portait of ${name}`}
    />
    {#if ytId}
      <div class="yt-icon" on:click={() => (ytOverlay = true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-volume-2"
          ><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path
            d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
          /></svg
        >
      </div>
    {/if}
  </div>
  <div class="stats-table">
    <div class="stat">
      <span class="stat-name">{t.death}</span>
      <span class="stat-value">{ageAtDeath}</span>
    </div>
    <div class="stat">
      <span class="stat-name">{t.works}</span>
      <span class="stat-value">&gt; {noOfWorks}</span>
    </div>
    <div class="stat">
      <span class="stat-name">{t.anniversary}</span>
      <span class="stat-value">{upcomingAnniversary}</span>
    </div>
    <div class="stat">
      <span class="stat-name">{t.awareness}</span>
      <span class="stat-value">{levelOfAwareness}</span>
    </div>
    <div class="stat stat-abilities">
      <span class="stat-name">{t.abilities}</span>
      <span class="stat-value">{noOfAbilities}</span>
    </div>
    <span class="abilities">{musicalAbilities}</span>
  </div>
  <div class="app-title">Female Composers Quartets</div>
</div>

<style>
  .playing-card {
    --size-portrait: 12rem;

    font-size: 90%;
    background-color: ghostwhite;
    padding: 0.5em 1em;
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
  }

  .head-container {
    color: var(--user-dark);
    margin-bottom: 0.5em;
  }

  .head-container,
  .maiden-name,
  .abilities {
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
    margin-top: 0.7em;
  }

  .stat {
    display: grid;
    grid-template-columns: 2fr 1fr;
    border-bottom: 1px dotted var(--gray);
  }

  .stat-value {
    text-align: right;
    margin-right: 0.5em;
    color: var(--npc-dark);
  }

  .stat:last-of-type {
    border: none;
  }

  .stat-abilities {
    margin-bottom: -6px;
  }

  .app-title {
    margin-top: 1em;
    text-align: right;
    font-size: 75%;
    color: var(--gray);
  }
</style>
