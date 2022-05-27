<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"
  import { link } from "svelte-spa-router"
  import { appLanguage, dictionary as t } from "../stores/settings"
  import Confetti from "./Confetti.svelte"

  export let active: boolean
  export let userWinsGame: boolean

  const dispatch = createEventDispatcher()

  function playAgain() {
    dispatch("reset")
  }
</script>

{#if active}
  <div class="overlay | grid" transition:fade={{ duration: 200 }}>
    {#if userWinsGame}
      <Confetti />
    {/if}
    <div class="overlay-content | container">
      <div class="headline | bold upper">
        {userWinsGame ? $t.youWin : $t.youLose}
      </div>
      <div class="body | flex-col">
        {#if $appLanguage === "de"}
          <p>
            Wir hoffen, Sie hatten Spaß mit dem Spiel und wissen nun mehr über
            Komponistinnen – in Vergangenheit und Gegenwart.
          </p>
          <p>Haben Sie Lust auf eine weitere Runde?</p>
        {:else}
          <p>
            We hope you enjoyed the game and gained knowledge about female
            composers, both present and past.
          </p>
          <p>Do you fancy another round?</p>
        {/if}
      </div>

      <div class="button-group | flex-between">
        <a href="/" class="btn btn-reject | rounded shadow" use:link
          >{$t.noThanks}</a
        >
        <button
          class="btn btn-accept | rounded shadow"
          on:click={() => playAgain()}>{$t.yesPlease}</button
        >
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    overflow: hidden;
    position: absolute;
    z-index: 500;
    width: 100%;
    height: 100%;
    color: var(--white);
    background-color: hsl(0 100% 0% / 0.9);
  }

  .overlay-content {
    place-self: center;
    z-index: 10;
  }

  .overlay-content .headline {
    place-self: center;
    font-size: 150%;
  }

  .overlay-content .body {
    --align: start;
  }

  .button-group {
    margin-top: 1em;
  }
</style>
