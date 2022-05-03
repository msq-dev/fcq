<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"
  import { dictionary as t } from "../stores/settings"

  const dispatch = createEventDispatcher()

  function close() {
    dispatch("close")
  }

  export let active = false
  export let btnText = $t.close
</script>

{#if active}
  <div
    class="overlay | grid"
    on:click={() => close()}
    transition:fade={{ duration: 100 }}
  >
    <div class="overlay-content | flex-col">
      <div class="headline | bold upper">
        <slot name="headline" />
      </div>
      <div class="body | flex-col">
        <slot name="body" />
      </div>

      <button class="btn btn-close | rounded">{btnText}</button>
    </div>
  </div>
{/if}

<style lang="scss">
  .overlay-content {
    --flex-gap: 0.5em;
    place-self: center;

    .headline {
      font-size: 150%;
    }
  }

  .btn-close {
    color: #000;
    margin-top: 1em;
  }
</style>
