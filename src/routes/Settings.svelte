<script>
  import { fly } from "svelte/transition"
  import { pop } from "svelte-spa-router"
  import { appLanguage } from "../stores/settings.js"
  import dict from "../assets/dict.js"

  $: t = dict[$appLanguage]
</script>

<main in:fly={{ y: 500, delay: 200 }} out:fly={{ y: 500, duration: 100 }}>
  <h1>{t.settings}</h1>
  <h2>{t.language}</h2>
  <div class="radio-group">
    <input type="radio" id="de" bind:group={$appLanguage} value={"de"} />
    <label for="de">Deutsch</label>
  </div>
  <div class="radio-group">
    <input type="radio" id="en" bind:group={$appLanguage} value={"en"} />
    <label for="en">English</label>
  </div>
  <button class="btn-close rounded" on:click={() => pop()}
    >{t.saveAndClose}</button
  >
</main>

<style>
  main {
    position: relative;
  }

  h1 {
    margin-top: 5vh;
    font-weight: 500;
    margin-bottom: 1em;
  }

  h2 {
    font-weight: 400;
    padding-bottom: 0.2em;
    margin-bottom: 0.25em;
    border-bottom: 1px dotted var(--npc-dark);
  }

  .radio-group {
    accent-color: var(--npc-dark);
    margin-bottom: 0.25em;
  }

  .radio-group input {
    margin-right: 0.2em;
  }

  .btn-close {
    --br-size: 100vw;
    width: fit-content;
    padding: 0.3em 1em;
    margin: 3em auto 0 auto;
  }
</style>
