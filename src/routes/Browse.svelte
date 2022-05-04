<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { appLanguage, dictionary as t } from "../stores/settings"
  import { decks } from "../stores/game"
  import ButtonCategory from "../components/ButtonCategory.svelte"
  import PageCategory from "../components/PageCategory.svelte"

  export let params: Record<string, string> = {}

  let categories: object[] = []

  function getCategories(cardDeck: ComposerCard[]) {
    let cats: Category[] = []

    cardDeck.forEach((card) => {
      cats.push({ catIndex: card.index[0], catName: card.category })
    })

    // courtesy of https://stackoverflow.com/a/58429784
    return [...new Map(cats.map((item) => [item["catIndex"], item])).values()]
  }

  onMount(() => {
    categories = getCategories($decks[$appLanguage])
  })
</script>

<main
  class="grid-container | grid"
  in:fade={{ duration: 100, delay: 200 }}
  out:fade={{ duration: 100, delay: 0 }}
>
  {#if !params.cat}
    <h1 class="page-title">{$t.categories}</h1>
    <div class="category-grid | grid">
      {#each categories as cat}
        <ButtonCategory {...cat} />
      {/each}
    </div>
  {:else}
    <PageCategory cat={params.cat} />
  {/if}
</main>

<style>
  main {
    margin: 3vh auto 20vh auto;
  }

  .page-title {
    margin-bottom: 0.5em;
  }

  .grid-container {
    grid-template-columns: 1fr min(100% - 2rem, 65ch) 1fr;
  }

  .grid-container > * {
    grid-column: 2;
  }

  .category-grid {
    --min: 15ch;
    --gap: 1rem;

    grid-gap: var(--gap);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
  }
</style>
