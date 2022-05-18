<script lang="ts">
  import { onMount } from "svelte"
  import { appLanguage, dictionary as t } from "../stores/settings"
  import { decks } from "../stores/game"
  import BasePage from "../components/BasePage.svelte"
  import ButtonQuartet from "../components/ButtonQuartet.svelte"
  import PageQuartet from "../components/PageQuartet.svelte"
  import { fetchData, makePlayingCards } from "../utils/utils"

  export let params: Record<string, string> = {}

  let quartets: object[] = []

  function getQuartets(cardDeck: ComposerCard[]) {
    let quats: Category[] = []

    cardDeck.forEach((card) => {
      quats.push({ catIndex: card.index[0], catName: card.category })
    })

    // courtesy of https://stackoverflow.com/a/58429784
    return [...new Map(quats.map((item) => [item["catIndex"], item])).values()]
  }

  onMount(() => {
    if (!$decks[$appLanguage].length) {
      fetchData($appLanguage)
        .then((data: ComposerCard[]) => {
          $decks[$appLanguage] = makePlayingCards(data)
        })
        .then(() => {
          quartets = getQuartets($decks[$appLanguage])
        })
    } else {
      quartets = getQuartets($decks[$appLanguage])
    }
  })
</script>

<BasePage>
  {#if !params.quat}
    <h1>{$t.quartets}</h1>
    <div class="quartets-grid | grid">
      {#each quartets as quat}
        <ButtonQuartet {...quat} />
      {/each}
    </div>
  {:else}
    <PageQuartet quat={params.quat} />
  {/if}
</BasePage>

<style>
  .quartets-grid {
    gap: 0.5em;
    width: min(90%, 20rem);
    margin: 0.75em auto;
  }
</style>
