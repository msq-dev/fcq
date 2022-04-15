<script>
  import { fly } from "svelte/transition"
  import { appLanguage } from "../stores/settings.js"
  import dict from "../assets/dict.js"

  $: t = dict[$appLanguage]
</script>

<main in:fly={{ y: 500, delay: 200 }}>
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
</main>

<style>
  h1 {
    margin-top: 10vh;
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
</style>
