<script lang="ts">
  import { fade, fly } from "svelte/transition"
  import { link } from "svelte-spa-router"
  import { ytCookiesAccepted, dictionary as t } from "../stores/settings"
</script>

<div
  class="cookie-banner | flex-col fixed-bottom"
  in:fly={{ y: 500, delay: 500 }}
  out:fade={{ duration: 100 }}
>
  <p>
    {$t.usingYtCookies}<a href="/privacy" class="link" use:link>{$t.privacy}</a>
  </p>
  <div class="button-group">
    <button
      class="btn btn-reject | rounded"
      on:click={() => ($ytCookiesAccepted = false)}>{$t.reject}</button
    >
    <button
      class="btn btn-accept | rounded"
      on:click={() => ($ytCookiesAccepted = true)}>{$t.accept}</button
    >
  </div>
</div>
