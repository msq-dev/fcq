<script>
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { appLanguage } from "../stores/settings.js"
  import { decks } from "../stores/game.js"
  import PlayingCard from "./PlayingCard.svelte"

  export let cat

  let cardsInCat = []

  onMount(() => {
    cardsInCat = $decks[$appLanguage].filter((card) => card.category === cat)
  })
</script>

<main transition:fade={{ duration: 100, delay: 100 }}>
  {#each cardsInCat as card}
    <PlayingCard {...card} />
  {/each}
</main>
