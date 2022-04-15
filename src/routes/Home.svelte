<script>
  import { link } from "svelte-spa-router"
  import { appLanguage } from "../stores/settings.js"
  import dict from "../assets/dict.js"

  const t = dict[$appLanguage]
</script>

<main class="centered">
  <h1>Female<br />Composers<br />Quartets</h1>
  <a href="/browse" class="nav-button" use:link>&rarr; {t.browse}</a>
  <a href="/settings" class="nav-button" use:link>&rarr; {t.settings}</a>
</main>

<style>
  .centered {
    align-items: center;
    gap: 2rem;
    margin: 10vh auto 0 auto;
  }

  .centered h1 {
    text-align: center;
    font-weight: 500;
  }

  .nav-button {
    text-decoration: none;
    padding: 0.15em 0.75em 0.25em 0.5em;
    border-radius: 0.2em;
    color: inherit;
  }
</style>
