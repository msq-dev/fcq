<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { sessionRunning } from "../stores/game"
  import { dictionary as t } from "../stores/settings"

  export let stat: Stat
  export let disabled = false
  export let selected = false
  export let single = false

  $: anniversaryInfo = stat.anniversaryInfo
    ? calculateAnniversary(stat.anniversaryInfo)
    : ""

  const dispatch = createEventDispatcher()

  function statClicked() {
    if (disabled || !$sessionRunning) return
    dispatch("statClicked")
  }

  function calculateAnniversary(a: AnniversaryInfo) {
    const upcomingYear = a.anniversaryYear
    const anniversary = a.isBirth
      ? "&ast;&thinsp;" + String(upcomingYear - a.yearOfBirth)
      : "&dagger;&thinsp;" + String(upcomingYear - a.yearOfDeath)

    return `<span class="small" style="margin-left: 0.5em;">(${anniversary})</span>`
  }
</script>

<div
  class="stat"
  class:disabled
  class:selected
  class:single
  on:click={() => statClicked()}
>
  <span class="name">
    {#if stat.isAlive === true}
      {$t.currentAge}
    {:else}
      {$t[stat.name]}
    {/if}
  </span>
  <span class="value"
    >{stat.symbol || ""} {stat.value}{@html anniversaryInfo}</span
  >
  {#if stat.abilitiesInfo}
    <span class="abilities | small">{stat.abilitiesInfo}</span>
  {/if}
</div>

<style lang="scss">
  .stat {
    display: grid;
    grid-template-columns: max-content 1fr;
    column-gap: 0.25em;
    width: 100%;
    border-bottom: 1px dotted var(--gray-400);
    transition: all 500ms;

    .name {
      margin-left: 0.25em;
    }

    .value {
      text-align: right;
      margin-right: 0.5em;
      font-weight: var(--fw-bold);
    }

    &:not(.single) .value {
      color: var(--slate-400);
      font-weight: var(--fw-normal);
    }

    &:not(.single):last-child {
      border: none;
      margin-bottom: 1.5em;
    }

    &.disabled {
      opacity: 0.3;
    }
  }

  .selected {
    background-color: var(--slate-100);

    > .name {
      animation: pulse 2s alternate infinite;
    }
  }

  @keyframes pulse {
    to {
      font-weight: 420;
    }
  }

  .abilities {
    grid-column: span 2;
    margin-top: -0.2em;
    margin-left: 0.25em;
    line-height: 1.45em;
  }
</style>
