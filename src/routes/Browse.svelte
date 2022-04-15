<script>
  import { onMount } from "svelte"
  import { csv } from "d3-fetch"
  import { appLanguage } from "../stores/settings.js"
  import PlayingCard from "../components/PlayingCard.svelte"

  export let params = {}

  const DATA_URL = `https://apps.maxspuling.de/assets/fcq/data/composers_${$appLanguage}.csv`

  let data = []

  let categories = []

  function getCategories(cardDeck) {
    return cardDeck
      .map((card) => card.category)
      .filter((value, index, self) => self.indexOf(value) === index)
  }

  onMount(() => {
    data = csv(DATA_URL)
  })
</script>

<main>
  {#await data}
    <p>Fetching &hellip;</p>
  {:then composers}
    {#each composers as c}
      <PlayingCard {...c} />
    {/each}
  {:catch error}
    <p>{error}</p>
  {/await}
</main>

<style>
  main {
    padding: 1em 0;
    margin: 0 auto;
    margin-bottom: 20vh;
  }
</style>
