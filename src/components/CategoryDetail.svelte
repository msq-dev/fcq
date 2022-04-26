<script>
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { appLanguage } from "../stores/settings.js"
  import { decks } from "../stores/game.js"
  import Card from "./Card.svelte"

  export let cat

  let cardsInCat = []

  onMount(() => {
    cardsInCat = $decks[$appLanguage].filter((card) => card.index[0] === cat)
  })
</script>

<div class="flex-col" transition:fade={{ duration: 100, delay: 100 }}>
  {#each cardsInCat as card}
    <Card {...card} />
  {/each}
</div>
