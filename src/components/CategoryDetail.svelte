<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { appLanguage } from "../stores/settings.js"
  import { decks } from "../stores/game.js"
  import Card from "./Card.svelte"

  export let cat: string

  let cardsInCat: ComposerCard[] = []

  onMount(() => {
    cardsInCat = $decks[$appLanguage].filter(
      (card: ComposerCard) => card.index[0] === cat
    )
  })
</script>

<div class="flex-col" transition:fade={{ duration: 100, delay: 100 }}>
  {#each cardsInCat as card}
    <Card {...card} />
  {/each}
</div>
