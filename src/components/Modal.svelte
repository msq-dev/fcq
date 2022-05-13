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
</script>

{#if active}
  <div
    class="modal | grid"
    style:place-content={centerContent ? "center" : ""}
    on:click|self={() => close()}
    transition:fade={{ duration: 250 }}
  >
    <div class="modal-content | container flex-col">
      <div class="title | bold upper">
        <slot name="title" />
      </div>
      <div class="body | flex-col">
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
    z-index: 100;
    color: var(--white);
    background-color: rgb(0 0 0 / var(--opacity, 0.88));
  }

  .modal-content {
    --gap: 0.15em;
  }

  .title {
    font-size: 150%;
  }

  .body {
    --align: start;
  }

  .btn-close {
    color: var(--gray-900);
    margin-top: 1em;
  }
</style>
