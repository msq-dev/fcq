<script lang="ts">
  import { fly } from "svelte/transition"
  import { link, pop } from "svelte-spa-router"
  import {
    ytCookiesAccepted,
    appLanguage,
    dictionary as t,
  } from "../stores/settings.js"
</script>

<main
  class="container | flex-col"
  in:fly={{ y: 500, delay: 200 }}
  out:fly={{ y: 500, duration: 100 }}
>
  <h1>{$t.settings}</h1>
  <div class="settings">
    <h2>{$t.language}</h2>
    <div class="input-group">
      <input type="radio" id="de" bind:group={$appLanguage} value={"de"} />
      <label for="de">Deutsch</label>
    </div>
    <div class="input-group">
      <input type="radio" id="en" bind:group={$appLanguage} value={"en"} />
      <label for="en">English</label>
    </div>
    <h2>Cookies</h2>
    <div class="input-group">
      <input type="checkbox" id="cookies" bind:checked={$ytCookiesAccepted} />
      <label for="cookies"
        >{$t.cookieCheckbox}<br />
        {#if !$ytCookiesAccepted}
          {$t.see} <a href="/privacy" class="link" use:link>{$t.privacy}</a>
        {/if}
      </label>
    </div>
  </div>

  <button class="btn-close | rounded" on:click={() => pop()}
    >{$t.saveAndClose}</button
  >
</main>

<style>
  main {
    position: relative;
  }

  h1 {
    margin-top: 5vh;
    align-self: flex-start;
  }

  .settings {
    min-height: 50vh;
    align-self: flex-start;
  }

  h2 {
    padding-bottom: 0.2em;
    margin: 0.5em 0;
    border-bottom: 1px dotted var(--npc-dark);
  }

  .input-group {
    accent-color: var(--npc-dark);
    margin-bottom: 0.25em;
  }

  .input-group input {
    margin-right: 0.2em;
  }

  .btn-close {
    width: fit-content;
    padding: 0.3em 1em;
    margin: 3em auto 0 auto;
  }
</style>
