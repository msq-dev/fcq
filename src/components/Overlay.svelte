<script>
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"
  import { dictionary as t } from "../stores/settings.js"
  import {
    statUser,
    statNpc,
    currentCardUser,
    currentCardNpc,
  } from "../stores/game.js"

  const dispatch = createEventDispatcher()

  function close() {
    dispatch("close")
  }

  export let overlayActive
</script>

{#if overlayActive}
  <div
    class="overlay grid"
    on:click={() => close()}
    transition:fade={{ duration: 100 }}
  >
    <div class="overlay-content | flex-col">
      <div class="message | bold upper">
        <slot />
      </div>

      <div class="npc | bold">{$currentCardNpc.name}</div>
      <div class="npc">
        {$t[$statNpc.name]}:
        <span class="bold">{$statNpc.symbol || ""} {$statNpc.value}</span>
      </div>
      <div>vs.</div>
      <div class="user | bold">{$currentCardUser.name}</div>
      <div class="user">
        {$t[$statUser.name]}:
        <span class="bold">{$statUser.symbol || ""} {$statUser.value}</span>
      </div>
      <button class="btn btn-continue | rounded">{$t.continue}</button>
    </div>
  </div>
{/if}

<style>
  .overlay-content {
    --flex-gap: 0.5em;
    place-self: center;
  }

  .message {
    font-size: 150%;
  }

  .user {
    color: var(--user-light);
  }

  .npc {
    color: var(--npc-light);
  }

  .btn-continue {
    color: #000;
    margin-top: 1em;
  }
</style>
