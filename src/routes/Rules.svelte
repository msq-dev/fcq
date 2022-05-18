<script>
  import { appLanguage, dictionary as t } from "../stores/settings"
  import BasePage from "../components/BasePage.svelte"
  import ButtonNav from "../components/ButtonNav.svelte"
</script>

<BasePage>
  <h1 class="page-title">{$t.rules}</h1>
  {#if $appLanguage === "de"}
    <p>
      Computer und Spieler*in erhalten die gleiche Anzahl Karten. Wer an der
      Reihe ist, wählt eine Kategorie mit dem Wert aus, der am
      vielversprechendsten erscheint. Die Verliererkarte wird ermittelt und
      wandert in den gegnerischen Stapel. Wer die Siegkarte besitzt, ist am Zug.
      Bei gleichen Werten entscheidet sich in der darauffolgenden Stichrunde,
      wer schließlich alle vier Karten gewinnt. Das Spiel endet, wenn eine Seite
      alle Karten erobert hat.
    </p>
  {:else}
    <p>
      The computer and the player receive the same number of cards. The player
      whose turn it is chooses a category with the value that seems most
      promising. The losing card is determined and goes into the opponent's
      pile. It is the turn of the player who has the winning card. If the values
      are equal, the next trick round decides who finally wins all four cards.
      The game ends when one side has captured all the cards.
    </p>
  {/if}
  <ButtonNav
    text={$t.play}
    href={"/game"}
    color={"var(--white)"}
    bgColor={"var(--teal-400)"}
  />
</BasePage>

<style>
  p {
    margin-bottom: 1em;
  }
</style>
