<script lang="ts">
  import { onMount } from "svelte"
  import { dictionary as t } from "../stores/settings"
  import { checkIfImageExists } from "../utils/utils"

  export let cardName: string
  export let cardImg: string
  export let stat: Stat
  export let winner: boolean

  const IMG_BASE_URL = "https://apps.maxspuling.de/assets/fcq/img/"
  let imgExists = false

  $: fullBodyImg =
    cardImg.includes("Cozzolani") || cardImg.includes("Viardot") ? true : false
  $: srcUrl = /^https?/.test(cardImg) ? cardImg : IMG_BASE_URL + cardImg
  $: src = imgExists ? srcUrl : IMG_BASE_URL + "fcq_placeholder.jpg"

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

<div class="overlay-stat | flex-col" class:winner>
  <div
    class="image"
    class:full-body={fullBodyImg}
    class:winner
    style="background-image: url({src});"
  />
  <div class="stat">
    <div class="bold">
      {cardName}
    </div>
  </div>
  {#if stat.isAlive}
    <div>
      {$t.currentAge}:
      <span><span class="bold">{stat.value}</span> {$t.andCounting}</span>
    </div>
  {:else}
    <div>
      {$t[stat.name]}:
      <span class="bold">{stat.symbol || ""} {stat.value}</span>
    </div>
  {/if}
</div>

<style>
  .overlay-stat {
    margin-bottom: 1em;
  }

  .winner {
    color: gold;
  }

  .image {
    width: 3.5rem;
    aspect-ratio: 1;
    background-size: 125%;
    background-position-x: 50%;
    background-position-y: 25%;
    border-radius: 100vw;
    margin-bottom: 0.5em;
  }

  .image.full-body {
    background-size: 175%;
    background-position-y: initial;
  }

  .image.winner {
    border: 2px solid gold;
  }
</style>
