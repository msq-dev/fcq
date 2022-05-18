<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"
  import { dictionary as t } from "../stores/settings"
  import {
    sessionRunning,
    gameRunning,
    statNpc,
    statUser,
  } from "../stores/game"
  import {
    showOverlay,
    videoId,
    videoTitle,
    videoDesc,
    composerName,
  } from "../stores/youtube"

  import CardHead from "./CardHead.svelte"
  import CardName from "./CardName.svelte"
  import CardDates from "./CardDates.svelte"
  import CardStat from "./CardStat.svelte"
  import BaseImage from "./BaseImage.svelte"
  import IconSpeaker from "./IconSpeaker.svelte"

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

  export let shadow = false
  export let singleCard = false

  const dispatch = createEventDispatcher()

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
</script>

<div
  id={index}
  class="card | flex-col | rounded"
  class:shadow
  transition:fade={{ duration: 200 }}
>
  <CardHead {index} {category} />
  <CardName {name} {nameMaiden} />

  <CardDates
    {dateOfBirth}
    {birthIsBaptized}
    {dateOfDeath}
    {dateDeathOverride}
    {placeOfBirth}
    {placeOfDeath}
  />

  <div class="image-container" on:click={() => showYoutubeOverlay()}>
    <BaseImage {imageUrl} portrait />
    <BaseImage {imageUrl} portrait portraitBackground />

    {#if ytId}
      <div class="yt-icon">
        <IconSpeaker size={30} />
      </div>
    {/if}
  </div>

  <div class="stats-table">
    {#each stats as stat}
      <CardStat
        {stat}
        disabled={$statNpc !== null &&
          $t[$statNpc.name] !== $t[stat.name] &&
          !singleCard}
        selected={$statNpc !== null &&
          $t[$statNpc.name] === $t[stat.name] &&
          !singleCard}
        on:statClicked={() => playStat(stat)}
      />
    {/each}
  </div>
  <div class="app-title | small">Female Composers Quartets</div>
</div>

<style>
  .card {
    /* --size-portrait: min(40%, 22rem); */
    --size-portrait: 11rem;
    --align: start;
    --gap: 0;

    position: relative;
    font-size: 90%;
    color: var(--gray-900);
    background-color: var(--white);
    width: min(100vmin - 4.5rem, 30rem);
    aspect-ratio: 1 / 1.55;
    padding: 0.5em 1em;
    margin-bottom: 1em;
    scroll-snap-align: start;
  }

  .image-container {
    position: relative;
    width: 100%;
    height: var(--size-portrait);
    margin-top: 0.25em;
  }

  .yt-icon {
    position: absolute;
    z-index: 5;
    bottom: 0.75em;
    right: 0.75em;
  }

  .stats-table {
    width: 100%;
    margin-top: 0.5em;
  }

  .app-title {
    position: absolute;
    bottom: 0.75em;
    right: 1em;
    color: var(--gray-400);
  }
</style>
