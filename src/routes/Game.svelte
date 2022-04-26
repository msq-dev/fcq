<script>
  import { onMount, onDestroy } from "svelte"
  import { fade } from "svelte/transition"
  import { appLanguage, dictionary as t } from "../stores/settings.js"
  import {
    decks,
    sessionRunning,
    gameRunning,
    deckUser,
    deckNpc,
    currentCardUser,
    currentCardNpc,
    statUser,
    statNpc,
    resetGame,
  } from "../stores/game.js"
  import Card from "../components/Card.svelte"
  import Overlay from "../components/Overlay.svelte"

  const cardsPerPlayer = $decks[$appLanguage].length / 2

  $: overlayActive = $statUser !== null && $statNpc !== null

  let deck = []
  let cardsPlayed = []
  let userBegins
  let userWins

  function setupGame() {
    deck = shuffle(Array.from($decks[$appLanguage]))
    cardsPlayed = []

    for (let i = 0; i < cardsPerPlayer; i++) {
      $deckUser = [...$deckUser, deck.pop()]
    }

    $deckNpc = deck
    userBegins = null
    userWins = null

    $sessionRunning = true
  }

  function playCard(deck) {
    cardsPlayed.push(deck[0])
  }

  function moveNpc() {
    if (!$gameRunning) {
      $gameRunning = true
    }
    const statIdx = Math.floor(Math.random() * $currentCardNpc.stats.length)

    setTimeout(() => {
      $statNpc = $currentCardNpc.stats[statIdx]
      playCard($deckNpc)
    }, 500)
  }

  function moveUser() {
    if ($statNpc === null) {
      $statNpc = $currentCardNpc.stats.find((s) => s.name === $statUser.name)
      playCard($deckNpc)
    }
    playCard($deckUser)
    evaluateTurn()
  }

  function evaluateTurn() {
    if ($statUser?.value === $statNpc?.value) return

    if (
      $statUser.highestWins
        ? $statUser.value > $statNpc.value
        : $statUser.value < $statNpc.value
    ) {
      userWins = true
    } else {
      userWins = false
    }
  }

  function handleDraw() {
    $deckUser = [...$deckUser.slice(1, $deckUser.length)]
    $deckNpc = [...$deckNpc.slice(1, $deckNpc.length)]

    $statUser = null
    $statNpc = null

    if (!userBegins) {
      moveNpc()
    }
  }

  function endTurn() {
    if (userWins) {
      userBegins = true
      $deckUser = [...$deckUser, ...cardsPlayed]
    } else {
      userBegins = false
      $deckNpc = [...$deckNpc, ...cardsPlayed]
    }

    $deckUser = [...$deckUser.slice(1, $deckUser.length)]
    $deckNpc = [...$deckNpc.slice(1, $deckNpc.length)]

    $statUser = null
    $statNpc = null

    cardsPlayed = []
    userWins = null

    if (!userBegins) {
      moveNpc()
    }
  }

  function closeOverlay() {
    if ($statUser.value === $statNpc.value) {
      handleDraw()
      return
    }
    endTurn()
  }

  // courtesy of https://stackoverflow.com/a/12646864
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  onMount(() => {
    setupGame()
    userBegins = Math.round(Math.random()) ? true : false
  })

  onDestroy(() => {
    resetGame()
  })
</script>

{#if $sessionRunning}
  <main transition:fade={{ duration: 100, delay: 100 }}>
    <Overlay {overlayActive} on:close={() => closeOverlay()}>
      {#if $statUser.value === $statNpc.value}
        {$t.draw}
      {:else}
        {userWins ? $t.youWin : $t.youLose}
      {/if}
    </Overlay>

    {#if !$gameRunning && !userBegins}
      <div class="npc-start flex-col">
        {$t.npcBegins}
        <button class="btn | rounded" on:click={() => moveNpc()}>Start</button>
      </div>
    {:else}
      <div class="info-box">
        <span
          >Computer: {$deckNpc.length}
          {$t.card}{$deckNpc.length > 1 ? $t.cardPlural : ""}</span
        >
        {#if $statNpc !== null}
          | <span class="stat-played"
            >{$t[$statNpc.name]}: {$statNpc.symbol || ""} {$statNpc.value}</span
          >
        {/if}
        <span class="float-right"
          >User: {$deckUser.length}
          {$t.card}{$deckUser.length > 1 ? $t.cardPlural : ""}</span
        >
      </div>
    {/if}

    <div class="flex-col">
      {#if $gameRunning || userBegins}
        <Card {...$currentCardUser} on:statPlayed={() => moveUser()} />
      {/if}
    </div>
  </main>
{/if}

<style>
  .info-box {
    font-size: 65%;
    margin: 0.5em 0;
  }

  .stat-played {
    font-weight: 500;
  }

  .npc-start {
    margin-top: 15vh;
    gap: 1em;
  }

  .float-right {
    float: right;
  }
</style>
