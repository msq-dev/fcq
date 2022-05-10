<script lang="ts">
  import { link } from "svelte-spa-router"

  export let catIndex = ""
  export let catName = ""
</script>

<a href="/browse/{catIndex}" class="btn-category | shadow rounded" use:link>
  <span>{catName}</span>
</a>

<style>
  .btn-category {
    --shadow-size: 0.5rem;

    padding: 0.5em 0;
    color: currentColor;
    font-size: 90%;
    text-align: center;
    text-decoration: none;
    background-color: var(--slate-100);
  }
</style>
