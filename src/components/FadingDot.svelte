<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";

  export let character = ".";
  export let fontSize = 500;
  export let duration = 350;
  export let delay = 0;

  const opacity = tweened(0.1, {
    duration,
    delay,
  });

  onMount(() => {
    $opacity = 1;
  });
</script>

<span style:font-size={fontSize + "%"} style:opacity={$opacity}
  >{character}</span>
