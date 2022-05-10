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
  export let centerContent = false
</script>

{#if active}
  <div
    class="overlay | grid"
    style:place-content={centerContent ? "center" : ""}
    on:click={() => close()}
    transition:fade={{ duration: 250, delay: 250 }}
  >
    <div class="overlay-content | container | flex-col">
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
    --gap: 0.15em;
    margin-top: 7vh;

    .headline {
      font-size: 150%;
    }
  }

  .btn-close {
    color: var(--gray-900);
    margin-top: 1em;
  }
</style>
