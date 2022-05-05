<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"
  import { link } from "svelte-spa-router"
  import { dictionary as t } from "../stores/settings"
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
    <div class="overlay-content | container flex-col">
      <div class="headline | bold upper">
        {userWinsGame ? $t.youWin : $t.youLose}
      </div>
      <div class="body | flex-col">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto
        quibusdam quam nemo in consequuntur ratione sed blanditiis rerum quos,
        voluptatum molestias eum fuga minus! Exercitationem distinctio
        reprehenderit soluta sed?
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
    --max-width: 80%;

    place-self: center;
    z-index: 10;

    .headline {
      font-size: 150%;
    }
  }
</style>
