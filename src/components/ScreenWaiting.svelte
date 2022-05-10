<script>
  import { fade } from "svelte/transition"
  import { dictionary as t } from "../stores/settings"
  import FadingDot from "./FadingDot.svelte"
</script>

<div class="waiting | flex-col" transition:fade={{ duration: 200 }}>
  <div class="dots">
    <FadingDot />
    <FadingDot delay={350} />
    <FadingDot delay={700} />
  </div>
  <div>{$t.settingUp}</div>
</div>

<style>
  .waiting {
    --gap: 0.5em;

    margin-top: 30vmin;
    font-size: 150%;
  }
</style>
