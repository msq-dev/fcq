<script lang="ts">
  import { fade } from "svelte/transition"
  import { link } from "svelte-spa-router"
  import { ytCookiesAccepted, dictionary as t } from "../stores/settings"
  import {
    videoId,
    videoTitle,
    videoDesc,
    // composerName,
    closeOverlay,
  } from "../stores/youtube"

  $: formattedTitle = $videoTitle.replace(
    /(\([UAa-z . 0-9]+\))/g,
    "<span style='font-style: normal; white-space: nowrap;'>$1</span>"
  )
</script>

<div class="yt-overlay" transition:fade={{ duration: 200 }}>
  <div class="container">
    <!-- <div class="name | fit-text" style="--text-length: {$composerName.length}">
      {$composerName}
    </div> -->

    <div class="yt-iframe">
      {#if !$ytCookiesAccepted}
        <div class="cookie-banner | flex-col">
          <p>
            {$t.noVideo}<a href="/privacy" class="link light" use:link
              >{$t.privacy}</a
            >
          </p>
          <button
            class="btn btn-accept | rounded"
            on:click={() => ($ytCookiesAccepted = true)}>{$t.accept}</button
          >
        </div>
      {:else}
        <iframe
          src="https://www.youtube.com/embed/{$videoId}"
          title="YouTube video player"
          frameborder="0"
          loading="lazy"
        />
      {/if}
    </div>

    <div class="yt-title">
      {@html formattedTitle}
    </div>
    <div class="yt-desc" lang={$t.languageCode}>{$videoDesc}</div>
    <div class="overlay-footer | flex-between">
      <div class="btn btn-close | rounded" on:click={() => closeOverlay()}>
        {$t.close}
      </div>
      <div class="app-title | small">Female Composers Quartets</div>
    </div>
  </div>
</div>

<style>
  .yt-overlay {
    padding-top: 0.5em;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 500;
    color: var(--white);
    background-color: rgb(0 0 0 / 0.95);
    overflow-y: scroll;
  }

  .cookie-banner {
    height: 100%;
    font-size: 90%;
    justify-content: center;
  }

  /* .name {
    --scale: 18;
    font-size: 90%;
    font-weight: var(--fw-bold);
  } */

  .yt-iframe {
    align-self: center;
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  .yt-iframe > iframe {
    width: 100%;
    height: 100%;
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
    width: 100%;
    margin-top: 0.75em;
  }

  .btn-close {
    font-size: 90%;
    background-color: var(--warning);
    padding: 0.2em 1em;
  }

  .app-title {
    color: var(--gray-200);
  }
</style>
