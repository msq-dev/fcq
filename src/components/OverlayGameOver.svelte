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
            Wow, what a ride! We hope you had fun and gained knowledge about the
            wonderful and uncharted territory that is the world of female
            composers, both present and past.
          </p>
          <p>Möchten Sie eine weitere Runde spielen?</p>
        {:else}
          <p>
            Wow, what a ride! We hope you had fun and gained knowledge about the
            wonderful and uncharted territory that is the world of female
            composers, both present and past.
          </p>
          <p>Do you wish to play another round?</p>
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

<style lang="scss">
  .overlay {
    overflow: hidden;
  }

  .overlay-content {
    place-self: center;
    z-index: 10;

    .headline {
      place-self: center;
      font-size: 150%;
    }

    .body {
      --align: start;
    }
  }

  .button-group {
    margin-top: 1em;
  }
</style>
