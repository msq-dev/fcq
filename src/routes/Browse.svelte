<script lang="ts">
  import { onMount } from "svelte"
  import { appLanguage, dictionary as t } from "../stores/settings"
  import { decks } from "../stores/game"
  import BasePage from "../components/BasePage.svelte"
  import ButtonCategory from "../components/ButtonCategory.svelte"
  import PageCategory from "../components/PageCategory.svelte"
  import { fetchData, makePlayingCards } from "../utils/utils"

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
    if (!$decks[$appLanguage].length) {
      fetchData($appLanguage)
        .then((data: ComposerCard[]) => {
          $decks[$appLanguage] = makePlayingCards(data)
        })
        .then(() => {
          categories = getCategories($decks[$appLanguage])
        })
    } else {
      categories = getCategories($decks[$appLanguage])
    }
  })
</script>

<BasePage>
  {#if !params.cat}
    <h1>{$t.categories}</h1>
    <div class="category-grid | grid">
      {#each categories as cat}
        <ButtonCategory {...cat} />
      {/each}
    </div>
  {:else}
    <PageCategory cat={params.cat} />
  {/if}
</BasePage>

<style>
  .category-grid {
    gap: 0.5em;
    width: min(90%, 20rem);
    margin: 0.75em auto;
  }
</style>
