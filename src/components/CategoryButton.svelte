<script>
  import { link } from "svelte-spa-router"
  export let catIndex
  export let catName
</script>

<a href="/browse/{catIndex}" class="btn-category | shadow rounded" use:link>
  <span class="cat-name">{catName}</span>
</a>

<style>
  .btn-category {
    --shadow-size: 0.5rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5em 0;
    color: currentColor;
    text-decoration: none;
    background-color: var(--npc-light);
  }
</style>
