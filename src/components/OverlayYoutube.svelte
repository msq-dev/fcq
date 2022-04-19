<script>
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"
  import { appLanguage } from "../stores/settings.js"
  import dict from "../assets/dict.js"

  export let ytOverlay
  export let ytId
  export let ytTitle
  export let ytDesc
  export let name

  $: t = dict[$appLanguage]

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
    <div class="names-container">
      <div class="name">{name}</div>
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
    <div class="overlay-footer">
      <div class="btn-close | rounded" on:click={() => closeOverlay()}>
        {t.close}
      </div>
      <div class="app-title">Female Composers Quartets</div>
    </div>
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

  .overlay-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.7em;
  }

  .btn-close {
    --br-size: 100vw;

    font-size: 90%;
    background-color: var(--warning);
    padding: 0.2em 1em;
  }

  .app-title {
    font-size: 75%;
    color: var(--gray);
  }
</style>
