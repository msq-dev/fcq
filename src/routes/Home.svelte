<script lang="ts">
  import { fade } from "svelte/transition"
  import { link } from "svelte-spa-router"
  import { ytCookiesAccepted, dictionary as t } from "../stores/settings"
  import BannerCookies from "../components/BannerCookies.svelte"
</script>

<main
  class="home | container | flex-col"
  transition:fade={{ duration: 100, delay: 100 }}
>
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
</style>
