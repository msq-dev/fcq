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
    <button class="btn btn-back | rounded" on:click={() => goBack()}
      >{$t.goBack}</button
    >
  </div>
{/if}

<style>
  .single-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    position: absolute;
    inset: 0;
    z-index: 250;
    padding-top: 0.5em;
    background-color: rgb(0 0 0 / var(--opacity, 0.88));
  }

  .btn-back {
    color: var(--gray-900);
  }
</style>
