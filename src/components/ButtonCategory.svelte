<script lang="ts">
  import { link } from "svelte-spa-router"

  export let catIndex = ""
  export let catName = ""
</script>

<a
  href="/browse/{catIndex}"
  class="btn-category | flex-col shadow rounded"
  use:link
>
  <span class="fit-text" style="--text-length: {catName.length};"
    >{catName}</span
  >
</a>

<style>
  .btn-category {
    --shadow-size: 0.5rem;

    padding: 0.5em 0;
    color: currentColor;
    text-decoration: none;
    background-color: var(--npc-light);
    justify-content: center;
  }
</style>
