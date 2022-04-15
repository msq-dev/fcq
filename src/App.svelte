<script>
  import Router from "svelte-spa-router"
  import { location, link } from "svelte-spa-router"
  import active from "svelte-spa-router/active"
  import { appLanguage } from "./stores/settings.js"
  import dict from "./assets/dict.js"

  import Home from "./routes/Home.svelte"
  import Game from "./routes/Game.svelte"
  import Browse from "./routes/Browse.svelte"
  import Settings from "./routes/Settings.svelte"
  import NotFound from "./routes/NotFound.svelte"

  $: t = dict[$appLanguage]

  const routes = {
    "/": Home,
    "/game": Game,
    "/browse/:cat?": Browse,
    "/settings": Settings,
    "*": NotFound,
  }
</script>

<Router {routes} />

{#if $location !== "/"}
  <nav class="shadow">
    <a href="/" use:link use:active>Home</a>
    <!-- <a href="/game" use:link use:active>Spielen</a> -->
    <a href="/browse" use:link use:active>{t.browse}</a>
    <a href="/settings" use:link use:active>{t.settings}</a>
  </nav>
{/if}

<style>
  :global(a.active) {
    display: none;
  }

  nav {
    --shadow-clr: rgb(0 0 0 / 0.5);

    position: fixed;
    inset: auto 0 0 0;
    z-index: 20;
    display: flex;
    justify-content: space-around;
    padding: 0.5em 0;
    color: var(--npc-light);
    background-color: var(--npc-dark);
  }

  nav a {
    font-size: 85%;
    color: currentColor;
    text-decoration: none;
  }
</style>
