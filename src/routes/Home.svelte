<script lang="ts">
  import { fade } from "svelte/transition"
  import { link } from "svelte-spa-router"
  import { ytCookiesAccepted, dictionary as t } from "../stores/settings.js"
  import BannerCookies from "../components/BannerCookies.svelte"
</script>

<main class="home | flex-col" transition:fade={{ duration: 100, delay: 100 }}>
  <h1 class="text-center bold">Female<br />Composers<br />Quartets</h1>
  <a href="/browse" class="nav-button" use:link>{$t.browse}</a>
  <a href="/game" class="nav-button" use:link>{$t.play}</a>
  <a href="/settings" class="nav-button" use:link>{$t.settings}</a>

  {#if $ytCookiesAccepted === null}
    <BannerCookies />
  {/if}
</main>

<style>
  .home {
    margin: 10vh auto 0 auto;
  }

  .nav-button::before {
    content: "\2192";
    margin-right: 0.3em;
  }

  .nav-button {
    text-decoration: none;
    padding: 0.15em 0.75em 0.25em 0.5em;
    border-radius: 0.2em;
    color: inherit;
  }
</style>
