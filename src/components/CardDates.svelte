<script lang="ts">
  import { dictionary as t } from "../stores/settings"
  import { formatDate } from "../utils/utils"

  export let birthIsBaptized = ""
  export let dateOfBirth = ""
  export let dateOfDeath = ""
  export let placeOfBirth = ""
  export let placeOfDeath = ""
  export let dateDeathOverride = ""

  $: birthday = formatDate(dateOfBirth, $t.languageCode)
  $: deathday = dateDeathOverride || formatDate(dateOfDeath, $t.languageCode)
</script>

<div class="life-container">
  <div class="date birth">
    {#if birthIsBaptized}
      <sup><span class="small">(</span>&lowast;<span class="small">)</span></sup
      >
      {$t.bapt}
    {:else}
      <sup>&lowast;</sup>
    {/if}
    {birthday} in {placeOfBirth}
  </div>
  {#if dateOfDeath}
    <div class="date death">&dagger; {deathday} in {placeOfDeath}</div>
  {/if}
</div>
