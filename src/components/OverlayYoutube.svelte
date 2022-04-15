<script>
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"

  export let ytOverlay
  export let ytId
  export let ytTitle
  export let ytDesc
  export let name
  export let nameMaiden

  $: formattedTitle = ytTitle.replace(
    /(\([a-z . 0-9]+\))/g,
    "<span style='font-style: normal;'>$1</span>"
  )

  const dispatch = createEventDispatcher()

  function closeOverlay() {
    dispatch("close")
  }
</script>

{#if ytOverlay}
  <div class="overlay" transition:fade={{ duration: 100 }}>
    <div class="btn-close" on:click={() => closeOverlay()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-x-circle"
        ><circle cx="12" cy="12" r="10" /><line
          x1="15"
          y1="9"
          x2="9"
          y2="15"
        /><line x1="9" y1="9" x2="15" y2="15" /></svg
      >
    </div>
    <div class="names-container">
      <div class="name">{name}</div>
      <!-- {#if nameMaiden}
        <div class="maiden-name">(b. {nameMaiden})</div>
      {/if} -->
    </div>
    <iframe
      class="yt-iframe"
      width="300"
      height="200"
      src="https://www.youtube.com/embed/{ytId}"
      title="YouTube video player"
      frameborder="0"
    />
    <div class="yt-title">
      {@html formattedTitle}
    </div>
    <div class="yt-desc">{ytDesc}</div>
    <div class="app-title">Female Composers Quartets</div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    display: flex;
    flex-direction: column;
    gap: 0.7em;
    color: ghostwhite;
    background-color: rgb(0 0 0 / 0.95);
    padding: 1em;
  }

  .name {
    font-weight: 450;
    font-size: 130%;
  }

  .btn-close {
    position: absolute;
    right: 1em;
    color: var(--warning);
  }

  .yt-iframe {
    align-self: center;
  }

  .yt-title {
    font-weight: 400;
    font-style: italic;
  }

  .yt-desc {
    font-size: 90%;
  }
</style>
