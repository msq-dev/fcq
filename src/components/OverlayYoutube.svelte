<script lang="ts">
  import { fade } from "svelte/transition"
  import { link } from "svelte-spa-router"
  import { ytCookiesAccepted, dictionary as t } from "../stores/settings"
  import {
    videoId,
    videoTitle,
    videoDesc,
    composerName,
    closeOverlay,
  } from "../stores/youtube"

  $: formattedTitle = $videoTitle.replace(
    /(\([UAa-z . 0-9]+\))/g,
    "<span style='font-style: normal; white-space: nowrap;'>$1</span>"
  )
</script>

<div class="yt-overlay | flex-col" transition:fade={{ duration: 100 }}>
  <div class="names-container">
    <div class="name | fit-text" style="--text-length: {$composerName.length}">
      {$composerName}
    </div>
  </div>

  {#if !$ytCookiesAccepted}
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
      src="https://www.youtube.com/embed/{$videoId}"
      title="YouTube video player"
      frameborder="0"
      loading="lazy"
    />
  {/if}

  <div class="yt-title">
    {@html formattedTitle}
  </div>
  <div class="yt-desc" lang={$t.languageCode}>{$videoDesc}</div>
  <div class="overlay-footer">
    <div class="btn btn-close | rounded" on:click={() => closeOverlay()}>
      {$t.close}
    </div>
    <div class="app-title | small">Female Composers Quartets</div>
  </div>
</div>

<style>
  .yt-overlay {
    --align: start;
    --flex-gap: 0.3em;

    padding: 1em;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    color: ghostwhite;
    background-color: rgb(0 0 0 / 0.95);
  }

  .cookie-banner {
    font-size: 90%;
  }

  .name {
    --scale: 18.5;
    font-weight: var(--fw-bold);
  }

  .yt-iframe {
    align-self: center;
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  .yt-title {
    font-weight: var(--fw-bold);
    font-style: italic;
  }

  .yt-desc {
    font-size: 90%;
    hyphens: auto;
  }

  .overlay-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 0.7em;
  }

  .btn-close {
    font-size: 90%;
    background-color: var(--warning);
    padding: 0.2em 1em;
  }

  .app-title {
    color: var(--gray);
  }
</style>
