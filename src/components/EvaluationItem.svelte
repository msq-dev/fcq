<script>
  import { createEventDispatcher } from "svelte"
  import { dictionary as t } from "../stores/settings"
  import { itsADraw } from "../stores/game"
  import BaseImage from "./BaseImage.svelte"
  import CardName from "./CardName.svelte"
  import CardStat from "./CardStat.svelte"

  export let imageUrl = "fcq_placeholder.jpg"
  export let name = ""
  export let stat = {}
  export let isNpc = false
  export let winner = false

  const dispatch = createEventDispatcher()

  function checkHerOut() {
    dispatch("checkHerOut")
  }
</script>

<div
  class="evaluation-item | flex-col rounded"
  class:winner={!$itsADraw && winner}
>
  {#if isNpc}
    <span
      class="check-her-out"
      data-text={$t.checkHerOut}
      style="--btn-width: {$t.checkHerOut.length + 1}ch"
      on:click|stopPropagation={() => checkHerOut()}
    >
      <BaseImage {imageUrl} circle winner={!$itsADraw && winner} />
    </span>
  {:else}
    <BaseImage {imageUrl} circle winner={!$itsADraw && winner} />
  {/if}
  <CardName {name} />
  <CardStat {stat} single />
</div>

<style>
  .evaluation-item.winner {
    color: var(--winner);
  }

  .check-her-out {
    position: relative;
    align-self: center;
  }

  .check-her-out::after {
    content: attr(data-text);
    position: absolute;
    left: 120%;
    top: 50%;
    width: var(--btn-width);
    font-size: 70%;
    text-align: center;
    color: var(--white);
    border: 1px solid var(--white);
    padding: 0.1em 0.3em;
    border-radius: 100vw;
  }
</style>
