<script lang="ts">
  import { fade } from "svelte/transition"
  import { appLanguage } from "../stores/settings"
  import { decks } from "../stores/game"
  import Card from "./Card.svelte"

  export let cat: string

  $: cardsInCat = $decks[$appLanguage].filter(
    (card: ComposerCard) => card.index[0] === cat
  )
</script>

<div
  class="cards-container | full-bleed"
  transition:fade={{ duration: 100, delay: 100 }}
>
  {#each cardsInCat as card}
    <Card {...card} shadow={false} />
  {/each}
</div>

<style>
  .cards-container {
    display: grid;
    grid-auto-flow: column;
    gap: 1.5em;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-inline: contain;
    scroll-snap-type: inline mandatory;
    scroll-behavior: smooth;
    scroll-padding-inline: 1em;
    overflow-x: scroll;
    padding: 0 1em;
  }
</style>
