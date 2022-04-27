<script lang="ts">
  import { dictionary as t } from "../stores/settings.js"

  export let cardName: string
  export let stat: Stat
  export let isUser = false

  let playerClass = isUser ? "user" : "npc"
</script>

<div class={`${playerClass} | overlay-stat | flex-col`}>
  <div class="bold">
    {cardName}
  </div>
  <div>
    {$t[stat.name]}:
    <span class="bold">{stat.symbol || ""} {stat.value}</span>
  </div>
</div>

<style>
  .overlay-stat {
    margin-bottom: 0.5em;
  }

  .user {
    color: var(--user-light);
  }

  .npc {
    color: var(--npc-light);
  }
</style>
