<script lang="ts">
  import { dictionary as t } from "../stores/settings"

  export let cardName: string
  export let stat: Stat
  export let winner: boolean
</script>

<div class="overlay-stat | flex-col" class:winner>
  <div class="bold">
    {cardName}
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
    --align: start;
    margin-bottom: 1em;
  }

  .winner {
    color: gold;
  }
</style>
