<script>
  import { fade } from "svelte/transition";

  export let name = "";
  export let duration = 200;

  let transitioning = false;
  $: change(name);

  function change() {
    transitioning = true;
    setTimeout(() => {
      transitioning = false;
    }, duration);
  }
</script>

{#if !transitioning}
  <span transition:fade={{ duration }}>
    <slot>{name}</slot>
  </span>
{/if}
