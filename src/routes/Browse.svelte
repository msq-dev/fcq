<script>
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { csv } from "d3-fetch"
  import { appLanguage } from "../stores/settings.js"
  import { deck } from "../stores/game.js"
  import CategoryButton from "../components/CategoryButton.svelte"
  import CategoryDetail from "../components/CategoryDetail.svelte"
  import dict from "../assets/dict.js"

  const DATA_URL = `https://apps.maxspuling.de/assets/fcq/data/composers_${$appLanguage}.csv`

  export let params = {}

  $: t = dict[$appLanguage]

  let categories = []

  function getCategories(cardDeck) {
    return cardDeck
      .map((card) => card.category)
      .filter((value, index, self) => self.indexOf(value) === index)
  }

  onMount(() => {
    csv(DATA_URL).then((data) => {
      $deck = data
      if (!params.cat) {
        categories = getCategories($deck)
      }
    })
  })
</script>

<main
  in:fade={{ duration: 100, delay: 200 }}
  out:fade={{ duration: 100, delay: 0 }}
>
  {#await $deck}
    <p>{t.fetching} &hellip;</p>
  {:then composers}
    {#if !params.cat}
      <h1>{t.categories}</h1>
      <div class="category-grid">
        {#each categories as cat}
          <CategoryButton {cat} />
        {/each}
      </div>
    {:else}
      <CategoryDetail cat={params.cat} />
    {/if}
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

  h1 {
    margin-top: 2vh;
    font-weight: 500;
    margin-bottom: 0.5em;
  }

  .category-grid {
    --min: 15ch;
    --gap: 1rem;

    display: grid;
    grid-gap: var(--gap);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
  }
</style>
