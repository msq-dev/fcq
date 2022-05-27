<script lang="ts">
  import { fade } from "svelte/transition"

  import Router from "svelte-spa-router"
  import { location, link } from "svelte-spa-router"
  import active from "svelte-spa-router/active"

  import { dictionary as t } from "./stores/settings"
  import { showOverlay } from "./stores/youtube"

  import Home from "./routes/Home.svelte"
  import Game from "./routes/Game.svelte"
  import Browse from "./routes/Browse.svelte"
  import Settings from "./routes/Settings.svelte"
  import About from "./routes/About.svelte"
  import Rules from "./routes/Rules.svelte"
  import Privacy from "./routes/Privacy.svelte"
  import NotFound from "./routes/NotFound.svelte"

  import OverlayYoutube from "./components/OverlayYoutube.svelte"
  import IconHome from "./components/IconHome.svelte"
  import IconSettings from "./components/IconSettings.svelte"

  const routes = {
    "/": Home,
    "/game": Game,
    "/browse/:quat?": Browse,
    "/settings": Settings,
    "/about": About,
    "/rules": Rules,
    "/privacy": Privacy,
    "*": NotFound,
  }
</script>

<div class="mainwrapper">
  <Router {routes} restoreScrollState={true} />

  {#if $showOverlay}
    <OverlayYoutube />
  {/if}

  {#if $location !== "/" && $location !== "/settings"}
    <nav class="shadow" transition:fade={{ duration: 100 }}>
      <div class="container">
        <div class="nav-links">
          <a href="/" use:link use:active>
            <IconHome size={18} stroke={1.5} />
          </a>
          {#if $location !== "/rules"}
            <a href="/game" use:link use:active>{$t.play}</a>
          {/if}
          <a href="/browse" use:link use:active>{$t.browse}</a>
          <a href="/about" use:link use:active>{$t.about}</a>
          <a href="/settings" use:link use:active>
            <IconSettings size={18} stroke={1.5} />
          </a>
        </div>
      </div>
    </nav>
  {/if}
</div>

<style lang="scss">
  :global(a.active) {
    display: none;
  }

  nav {
    --shadow-clr: rgb(0 0 0 / 0.5);

    position: fixed;
    inset: auto 0 0 0;
    z-index: 20;
    padding: 0.5em 0;
    color: var(--slate-100);
    background-color: var(--slate-400);

    .nav-links {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    a {
      font-size: 85%;
      color: currentColor;
      text-decoration: none;
    }
  }
</style>
