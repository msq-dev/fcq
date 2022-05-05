<script lang="ts">
  import { fade } from "svelte/transition"
  import { link } from "svelte-spa-router"
  import { ytCookiesAccepted, dictionary as t } from "../stores/settings"
  import BannerCookies from "../components/BannerCookies.svelte"
</script>

<main class="home | container" transition:fade={{ duration: 100, delay: 100 }}>
  <h1 class="main-title | bold">
    Female<br />Composers<br />Quartets
  </h1>
  <!-- <div class="nav-grid | grid"> -->
  <div class="nav-flex">
    <a href="/game" class="btn-play | nav-button | rounded" use:link
      >{$t.play}</a
    >
    <a href="/browse" class="btn-browse | nav-button | rounded" use:link
      >{$t.browse}</a
    >
    <a href="/settings" class="btn-settings | nav-button | rounded" use:link
      >{$t.settings}</a
    >
    <a href="/about" class="btn-about | nav-button | rounded" use:link
      >{$t.about}</a
    >
  </div>

  {#if $ytCookiesAccepted === null}
    <BannerCookies />
  {/if}
</main>

<style>
  .home {
    margin: 3vh auto 0 auto;
  }

  .main-title {
    background-image: linear-gradient(
      -311deg,
      var(--teal-400) 30%,
      #128b96 100%
    );
    background-clip: text;
    color: transparent;
    font-weight: 700;
    font-size: 300%;
    margin-bottom: 0.5em;
    align-self: start;
  }

  /* .nav-grid {
    grid-template-columns: repeat(5, minmax(1fr, 20%));
    grid-template-rows: repeat(3, 1fr);
    gap: 0.5em;
    text-align: center;
    width: 100%;
  } */

  .nav-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }

  .nav-button {
    flex: 1;
    color: var(--white);
    background-color: var(--teal-400);
    padding: 0.5em 1em;
    text-decoration: none;
    font-size: 120%;
    text-align: center;
  }

  .btn-settings,
  .btn-about {
    background-color: var(--slate-400);
  }
</style>
