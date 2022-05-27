<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"

  const dispatch = createEventDispatcher()

  function close() {
    dispatch("close")
  }

  export let active = false
  export let centerContent = true
  export let btnText = ""
  export let bgColor = "hsl(0 100% 0% / 0.9)"
  export let winner = false
  export let noFlex = false
</script>

{#if active}
  <div
    class="modal | grid"
    style:place-content={centerContent ? "center" : ""}
    style:background-color={bgColor}
    on:click|self={() => close()}
    transition:fade={{ duration: 200 }}
  >
    <div class="modal-content | container flex-col">
      <div class="title | bold upper" class:winner>
        <slot name="title" />
      </div>
      <div class="body" class:flex-col={!noFlex}>
        <slot name="body" />
      </div>

      {#if btnText}
        <button class="btn btn-close | rounded" on:click={() => close()}>
          {btnText}
        </button>
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 1em;
    z-index: 100;
    color: var(--white);
  }

  .modal-content {
    --gap: 0.15em;
  }

  .title {
    font-size: 200%;
  }

  .title.winner {
    color: var(--winner);
  }

  .body {
    --align: start;
  }

  .btn-close {
    color: var(--gray-900);
    margin-top: 1em;
  }
</style>
