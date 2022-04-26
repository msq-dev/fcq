<script>
  import { createEventDispatcher } from "svelte"
  import { statNpc, sessionRunning } from "../stores/game.js"
  import { dictionary as t } from "../stores/settings.js"

  $: disabled = $statNpc !== null && $t[$statNpc.name] !== $t[stat.name]

  export let stat = {}

  const dispatch = createEventDispatcher()

  function statClicked() {
    if (disabled || !$sessionRunning) return
    dispatch("statClicked")
  }
</script>

<div class="stat" class:disabled on:click={() => statClicked()}>
  <span class="stat-name">{$t[stat.name]}</span>
  <span class="stat-value">{stat.symbol || ""} {stat.value}</span>
  {#if stat.extra}
    <span class="abilities">{stat.extra}</span>
  {/if}
</div>

<style>
  .stat {
    display: grid;
    grid-template-columns: 2fr 1fr;
    border-bottom: 1px dotted var(--gray);
  }

  .stat-value {
    text-align: right;
    margin-right: 0.5em;
    color: var(--npc-dark);
  }

  .stat:last-of-type {
    border: none;
  }

  .abilities {
    grid-column: span 2;
    margin-top: -0.3em;
    font-size: 75%;
    letter-spacing: -0.02em;
  }

  .disabled {
    opacity: 0.2;
  }
</style>
