<script>
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { appLanguage } from "../stores/settings.js"
  import { decks } from "../stores/game.js"
  import CategoryButton from "../components/CategoryButton.svelte"
  import CategoryDetail from "../components/CategoryDetail.svelte"
  import dict from "../assets/dict.js"

  export let params = {}

  $: t = dict[$appLanguage]

  let categories = []

  function getCategories(cardDeck) {
    return cardDeck
      .map((card) => card.category)
      .filter((value, index, self) => self.indexOf(value) === index)
  }

  onMount(() => {
    categories = getCategories($decks[$appLanguage])
  })
</script>

<main
  in:fade={{ duration: 100, delay: 200 }}
  out:fade={{ duration: 100, delay: 0 }}
>
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
