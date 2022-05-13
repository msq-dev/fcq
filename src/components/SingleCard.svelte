<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"
  import { dictionary as t } from "../stores/settings"
  import Card from "./Card.svelte"

  export let active = false
  export let card: ComposerCard

  const dispatch = createEventDispatcher()

  function goBack() {
    dispatch("close")
  }
</script>

{#if active}
  <div class="single-card" transition:fade>
    <Card {...card} singleCard />
    <button class="btn btn-back | rounded shadow" on:click={() => goBack()}
      >{$t.goBack}</button
    >
  </div>
{/if}

<style>
  .single-card {
    position: absolute;
    inset: 0;
    z-index: 250;
    display: grid;
    place-items: center;
    background-color: var(--slate-200);
  }

  .btn-back {
    position: absolute;
    bottom: 1em;
    right: 1em;
    background-color: var(--teal-400);
    color: var(--white);
  }
</style>
