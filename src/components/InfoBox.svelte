<script>
  import { fade } from "svelte/transition"
  import { deckNpc, deckUser, itsADraw, cardsPlayed } from "../stores/game"
  import { dictionary as t } from "../stores/settings"
</script>

<div
  class="container"
  in:fade={{ delay: 300 }}
  out:fade={{ duration: 100, delay: 0 }}
>
  <div
    class="info-box"
    style:justify-content={!$itsADraw ? "space-between" : "center"}
  >
    {#if !$itsADraw}
      <span
        >Computer: {$deckNpc.length}
        {$t.card}{$deckNpc.length !== 1 ? $t.cardPlural : ""}</span
      >
      <span
        >User: {$deckUser.length}
        {$t.card}{$deckUser.length !== 1 ? $t.cardPlural : ""}</span
      >
    {:else}
      <span>
        {$t.cardsForGrabs}: {$cardsPlayed.length}
      </span>
    {/if}
  </div>
</div>

<style>
  .info-box {
    display: flex;
    font-size: 65%;
    margin: 0.5em 0;
  }
</style>
