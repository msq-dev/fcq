<script lang="ts">
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
  import OverlayStat from "../components/OverlayStat.svelte"

  const cardsPerPlayer = $decks[$appLanguage].length / 2

  $: isTurnComplete = $statUser !== null && $statNpc !== null

  let deck = []
  let cardsPlayed: ComposerCard[] = []
  let showEvaluation: boolean
  let userBegins: boolean
  let userWins: boolean

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

  function startTurn() {
    playCard($deckNpc)
    playCard($deckUser)
  }

  function playCard(deck: ComposerCard[]) {
    cardsPlayed.push(deck[0])
  }

  function moveNpc() {
    if (!$gameRunning) {
      $gameRunning = true
      startTurn()
    }
    const statIdx = Math.floor(Math.random() * $currentCardNpc.stats.length)

    setTimeout(() => {
      $statNpc = $currentCardNpc.stats[statIdx]
    }, 500)
  }

  function moveUser() {
    if ($statNpc === null) {
      $statNpc = $currentCardNpc.stats.find(
        (s: Stat) => s.name === $statUser.name
      )
    }
    evaluateTurn()
  }

  function evaluateTurn() {
    if ($statUser.value === $statNpc.value) return

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
    setupNextTurn()
  }

  function endTurn() {
    if (userWins) {
      userBegins = true
      $deckUser = [...$deckUser, ...cardsPlayed]
    } else {
      userBegins = false
      $deckNpc = [...$deckNpc, ...cardsPlayed]
    }

    cardsPlayed = []
    userWins = null

    setupNextTurn()
  }

  function setupNextTurn() {
    $deckUser = [...$deckUser.slice(1, $deckUser.length)]
    $deckNpc = [...$deckNpc.slice(1, $deckNpc.length)]

    $statUser = null
    $statNpc = null

    startTurn()

    if (!userBegins) {
      moveNpc()
    }
  }

  function handleEvaluation() {
    showEvaluation = false
    if ($statUser.value === $statNpc.value) {
      handleDraw()
      return
    }
    endTurn()
  }

  // courtesy of https://stackoverflow.com/a/12646864
  function shuffle(array: ComposerCard[]) {
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
  <main
    class="container"
    in:fade={{ duration: 100, delay: 200 }}
    out:fade={{ duration: 100, delay: 0 }}
  >
    <Overlay
      active={showEvaluation}
      btnText={$t.continue}
      on:close={() => handleEvaluation()}
    >
      <span slot="headline">
        {#if $statUser.value === $statNpc.value}
          {$t.draw}
        {:else}
          {userWins ? $t.youWin : $t.youLose}
        {/if}
      </span>
      <span slot="body">
        <OverlayStat
          cardName={$currentCardNpc.name}
          stat={$statNpc}
          winner={!userWins}
        />
        <OverlayStat
          cardName={$currentCardUser.name}
          stat={$statUser}
          winner={userWins}
        />
      </span>
    </Overlay>

    {#if !$gameRunning && !userBegins}
      <div class="npc-start flex-col">
        {$t.npcBegins}
        <button class="btn | rounded" on:click={() => moveNpc()}>Start</button>
      </div>
    {:else}
      <Overlay
        active={!$gameRunning}
        btnText="Start"
        on:close={() => {
          $gameRunning = true
          startTurn()
        }}
      >
        <span slot="headline">
          {$t.welcome}
        </span>
        <span slot="body">
          {$t.chooseCat}
        </span>
      </Overlay>

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
    {/if}

    <div class="table | grid">
      {#if $gameRunning || userBegins}
        <Card
          {...$currentCardUser}
          isGameCard
          isUserCard
          {isTurnComplete}
          on:statPlayed={() => moveUser()}
          on:animationEnd={() => (showEvaluation = true)}
        />
        <Card {...$currentCardNpc} isGameCard {isTurnComplete} />
      {/if}
    </div>
  </main>
{/if}

<style>
  .info-box {
    font-size: 65%;
    margin: 0.5em 0;
  }

  .npc-start {
    margin-top: 15vh;
    gap: 1em;
  }

  .float-right {
    float: right;
  }

  .table {
    position: relative;
    place-items: center;
  }
</style>
