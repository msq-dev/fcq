<script lang="ts">
  import { dictionary as t } from "../stores/settings.js"

  export let cardName: string
  export let stat: Stat
  export let winner: boolean
</script>

<div class="overlay-stat | flex-col" class:winner>
  <div class="bold">
    {cardName}
  </div>
  <div>
    {$t[stat.name]}:
    <span class="bold">{stat.symbol || ""} {stat.value}</span>
  </div>
</div>

<style>
  .overlay-stat {
    margin-bottom: 0.5em;
  }

  .winner {
    color: gold;
  }
</style>
