<script>
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"
  import { link } from "svelte-spa-router"
  import { ytCookiesAccepted, dictionary as t } from "../stores/settings.js"

  export let ytOverlay
  export let ytId
  export let ytTitle
  export let ytDesc
  export let name

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
  <div
    class="yt-overlay | overlay | flex-col"
    transition:fade={{ duration: 100 }}
  >
    <div class="names-container">
      <div class="name">{name}</div>
    </div>

    {#if !JSON.parse($ytCookiesAccepted)}
      <div class="cookie-banner | flex-col">
        <p>
          {$t.noVideo}<a href="/privacy" class="link" use:link>{$t.privacy}</a>
        </p>
        <button
          class="btn btn-accept | rounded"
          on:click={() => ($ytCookiesAccepted = true)}>{$t.accept}</button
        >
      </div>
    {:else}
      <iframe
        class="yt-iframe"
        width="300"
        height="200"
        src="https://www.youtube.com/embed/{ytId}"
        title="YouTube video player"
        frameborder="0"
      />
    {/if}

    <div class="yt-title">
      {@html formattedTitle}
    </div>
    <div class="yt-desc">{ytDesc}</div>
    <div class="overlay-footer">
      <div class="btn-close | rounded" on:click={() => closeOverlay()}>
        {$t.close}
      </div>
      <div class="app-title">Female Composers Quartets</div>
    </div>
  </div>
{/if}

<style>
  .yt-overlay {
    --align: start;
    --flex-gap: 0.7em;
    --opacity: 0.95;

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
    width: 100%;
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
