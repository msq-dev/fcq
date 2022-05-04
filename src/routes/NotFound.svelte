<script>
  import { fade } from "svelte/transition"
  import { link } from "svelte-spa-router"
</script>

<main
  class="container"
  in:fade={{ duration: 100, delay: 200 }}
  out:fade={{ duration: 100, delay: 0 }}
>
  <h1>Ce site n'existe pas</h1>
  <a href="/" use:link>Home</a>
</main>

<style lang="scss">
  main {
    margin: 10vh auto 0 auto;

    h1 {
      margin-bottom: 1em;
    }
  }
</style>
