<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { statNpc, sessionRunning } from "../stores/game";
  import { dictionary as t } from "../stores/settings";

  export let stat: Stat;

  $: disabled = $statNpc !== null && $t[$statNpc.name] !== $t[stat.name];
  $: selected = $statNpc !== null && $t[$statNpc.name] === $t[stat.name];
  $: anniversaryInfo = stat.anniversaryInfo
    ? calculateAnniversary(stat.anniversaryInfo)
    : "";

  const dispatch = createEventDispatcher();

  function statClicked() {
    if (disabled || !$sessionRunning) return;
    dispatch("statClicked");
  }

  function calculateAnniversary(a: AnniversaryInfo) {
    const upcomingYear = a.anniversaryYear;
    const anniversary = a.isBirth
      ? "&ast;&thinsp;" + String(upcomingYear - a.yearOfBirth)
      : "&dagger;&thinsp;" + String(upcomingYear - a.yearOfDeath);

    return `<span class="small" style="margin-left: 0.5em;">(${anniversary})</span>`;
  }
</script>

<div class="stat" class:disabled class:selected on:click={() => statClicked()}>
  <span class="name">
    {#if stat.isAlive === true}
      {$t.currentAge}
    {:else}
      {$t[stat.name]}
    {/if}
  </span>
  <span class="value"
    >{stat.symbol || ""} {stat.value}{@html anniversaryInfo}</span>
  {#if stat.abilitiesInfo}
    <span class="abilities | small">{stat.abilitiesInfo}</span>
  {/if}
</div>

<style lang="scss">
  .stat {
    display: grid;
    grid-template-columns: max-content 1fr;
    border-bottom: 1px dotted var(--gray-400);
    transition: all 500ms;

    .name {
      margin-left: 0.25em;
    }

    .value {
      text-align: right;
      margin-right: 0.5em;
      color: var(--slate-400);
    }

    &:last-of-type {
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
