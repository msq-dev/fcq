<script>
  import { fade } from "svelte/transition"
  import {
    deckNpc,
    deckUser,
    statNpc,
    statUser,
    cardsPlayed,
  } from "../stores/game"
  import { dictionary as t } from "../stores/settings"

  $: itsADraw = false
</script>

<div
  class="container"
  in:fade={{ delay: 300 }}
  out:fade={{ duration: 100, delay: 0 }}
>
  <div class="info-box">
    <span
      >Computer: {$deckNpc.length}
      {$t.card}{$deckNpc.length !== 1 ? $t.cardPlural : ""}</span
    >
    {#if itsADraw}
      <span>
        Cards up for grabs: {$cardsPlayed.length}
      </span>
    {/if}
    <span
      >User: {$deckUser.length}
      {$t.card}{$deckUser.length !== 1 ? $t.cardPlural : ""}</span
    >
  </div>
</div>

<style>
  .info-box {
    display: flex;
    justify-content: space-between;
    font-size: 65%;
    margin: 0.5em 0;
  }
</style>
