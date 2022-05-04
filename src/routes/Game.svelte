<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { appLanguage, dictionary as t } from "../stores/settings"
  import {
    game,
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
  } from "../stores/game"
  import Card from "../components/Card.svelte"
  import Overlay from "../components/Overlay.svelte"
  import OverlayStat from "../components/OverlayStat.svelte"
  import OverlayGameOver from "../components/OverlayGameOver.svelte"
  import InfoBox from "../components/InfoBox.svelte"

  const cardsPerPlayer = $decks[$appLanguage].length / 2

  let deck = []
  let cardsPlayed: ComposerCard[] = []
  let showEvaluation: boolean
  let userBegins: boolean
  let userWins: boolean
  let userWinsGame: boolean
  let setupReady: Promise<boolean>

  $: isTurnComplete = $statUser !== null && $statNpc !== null
  $: isGameOver = userWinsGame !== null

  async function getGameReadyState() {
    return await game.setup()
  }

  function setupGame() {
    resetGame()

    deck = shuffle(Array.from($decks[$appLanguage]))
    cardsPlayed = []

    for (let i = 0; i < cardsPerPlayer; i++) {
      $deckUser = [...$deckUser, deck.pop()]
    }
    $deckNpc = deck

    userBegins = null
    userWins = null
    userWinsGame = null

    $sessionRunning = true
    setupReady = getGameReadyState()
    userBegins = Math.round(Math.random()) ? true : false
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
    showEvaluation = true
  }

  function evaluateTurn() {
    if ($statUser.isAlive && !$statNpc.isAlive) {
      userWins = true
      return
    } else if (!$statUser.isAlive && $statNpc.isAlive) {
      userWins = false
      return
    }

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

    if (!$deckUser.length || !$deckNpc.length) {
      handleGameOver()
      return
    }

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

  function handleGameOver() {
    userWinsGame = $deckUser.length ? true : false
    $gameRunning = false
  }

  function handleReset() {
    setupGame()
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
  })
</script>

<main
  in:fade={{ duration: 100, delay: 200 }}
  out:fade={{ duration: 100, delay: 0 }}
>
  {#await setupReady}
    <div class="waiting | flex-col">
      <div style="font-size: 300%;">...</div>
      <div>{$t.settingUp}</div>
    </div>
  {:then}
    <!-- START -->
    {#if !$gameRunning && !isGameOver}
      {#if !userBegins}
        <div class="npc-start flex-col">
          {$t.npcBegins}
          <button class="btn | rounded" on:click={() => moveNpc()}>Start</button
          >
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
      {/if}
    {/if}

    <!-- GAME -->
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

    {#if ($gameRunning || userBegins) && userWinsGame === null}
      <InfoBox />
      <div class="table | grid">
        <Card {...$currentCardUser} on:statPlayed={() => moveUser()} />
        <!-- <Card {...$currentCardNpc} /> -->
      </div>
    {/if}

    <!-- END -->
    <OverlayGameOver
      active={userWinsGame !== null}
      {userWinsGame}
      on:reset={() => {
        handleReset()
      }}
    />
  {/await}
</main>

<style>
  .waiting {
    --flex-gap: 0.5em;

    margin-top: 40%;
    font-size: 150%;
  }

  .npc-start {
    margin-top: 15vh;
    gap: 1em;
  }

  .table {
    position: relative;
    place-items: center;
  }
</style>
