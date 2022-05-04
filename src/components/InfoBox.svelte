<script>
  import { deckNpc, deckUser } from "../stores/game"
  import { dictionary as t } from "../stores/settings"
</script>

<div class="info-box">
  <span
    >Computer: {$deckNpc.length}
    {$t.card}{$deckNpc.length > 1 ? $t.cardPlural : ""}</span
  >
  <span class="float-right"
    >User: {$deckUser.length}
    {$t.card}{$deckUser.length > 1 ? $t.cardPlural : ""}</span
  >
</div>

<style>
  .info-box {
    font-size: 65%;
    margin: 0.5em 0.7em;
  }
</style>
