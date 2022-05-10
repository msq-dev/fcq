<script>
  import { fade } from "svelte/transition"
  import { cubicOut } from "svelte/easing"

  export let name = ""
  export let duration = 200

  let transitioning = false
  $: change(name)

  function change() {
    transitioning = true
    setTimeout(() => {
      transitioning = false
    }, duration)
  }
</script>

{#if !transitioning}
  <span transition:fade={{ duration, easing: cubicOut }}>
    <slot>{name}</slot>
  </span>
{/if}
