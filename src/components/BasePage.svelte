<script>
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { location } from "svelte-spa-router"
  import { resetGame } from "../stores/game"

  onMount(() => {
    if (
      $location === "/" ||
      $location === "/browse" ||
      $location === "/about"
    ) {
      resetGame()
    }
  })
</script>

<main
  class="container"
  in:fade={{ duration: 100, delay: 200 }}
  out:fade={{ duration: 100, delay: 0 }}
>
  <slot />
</main>

<style>
  main {
    margin-bottom: 20vh;
  }
</style>
