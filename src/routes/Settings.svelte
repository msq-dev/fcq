<script lang="ts">
  import { fly } from "svelte/transition"
  import { link, pop } from "svelte-spa-router"
  import {
    ytCookiesAccepted,
    appLanguage,
    dictionary as t,
  } from "../stores/settings"
  import FadingElement from "../components/FadingElement.svelte"
</script>

<main
  class="container"
  in:fly={{ y: 500, delay: 200 }}
  out:fly={{ y: 500, duration: 100 }}
>
  <h1 class="page-title">
    <FadingElement name={$t.settings} />
  </h1>
  <div class="settings">
    <h2><FadingElement name={$t.language} /></h2>
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
      <FadingElement name={$t.cookieCheckbox}>
        <label for="cookies"
          >{$t.cookieCheckbox}<br />
          {#if !$ytCookiesAccepted}
            {$t.see} <a href="/privacy" class="link" use:link>{$t.privacy}</a>
          {/if}
        </label>
      </FadingElement>
    </div>
  </div>

  <span style="place-self: center;">
    <FadingElement name={$t.saveAndClose}>
      <button class="btn btn-close | rounded" on:click={() => pop()}
        >{$t.saveAndClose}</button
      >
    </FadingElement>
  </span>
</main>

<style>
  main {
    position: relative;
  }

  .settings {
    min-height: 50vh;
  }

  h2 {
    padding-bottom: 0.2em;
    margin: 0.5em 0;
    border-bottom: 1px dotted var(--slate-400);
  }

  .input-group {
    accent-color: var(--teal-400);
    margin-bottom: 0.25em;
  }

  .input-group input {
    margin-right: 0.2em;
  }

  .btn-close {
    width: fit-content;
    padding: 0.3em 1em;
  }
</style>
