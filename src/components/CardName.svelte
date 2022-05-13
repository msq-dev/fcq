<script>
  import { dictionary as t } from "../stores/settings"
  export let name
  export let nameMaiden = ""
</script>

<div class="names-container">
  <div class="name | fit-text" style="--text-length: {name?.length};">
    {name}
  </div>
  {#if nameMaiden}
    <div class="maiden-name | small">({$t.born} {nameMaiden})</div>
  {/if}
</div>

<style>
  .names-container > * {
    line-height: 120%;
  }

  .name {
    --scale: 18;
    font-weight: var(--fw-bold);
  }
</style>
