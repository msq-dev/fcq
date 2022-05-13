<script lang="ts">
  import { dictionary as t } from "../stores/settings"
  import BaseImage from "./BaseImage.svelte"

  export let cardName: string
  export let cardImg: string
  export let stat: Stat
  export let winner: boolean

  $: fullBodyImg =
    cardName.includes("Cozzolani") || cardName.includes("Viardot")
      ? true
      : false
</script>

<div class="overlay-stat | flex-col" class:winner>
  <BaseImage imageUrl={cardImg} circle {winner} />

  <div class="stat">
    <div class="bold">
      {cardName}
    </div>
  </div>
  {#if stat.isAlive}
    <div>
      {$t.currentAge}:
      <span><span class="bold">{stat.value}</span> {$t.andCounting}</span>
    </div>
  {:else}
    <div>
      {$t[stat.name]}:
      <span class="bold">{stat.symbol || ""} {stat.value}</span>
    </div>
  {/if}
</div>

<style>
  .overlay-stat {
    margin-bottom: 1em;
  }

  .winner {
    color: gold;
  }
</style>
