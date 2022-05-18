<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { appLanguage, dictionary as t } from "../stores/settings"
  import {
    gameReady,
    decks,
    sessionRunning,
    gameRunning,
    showEvaluation,
    deckUser,
    deckNpc,
    cardsPlayed,
    currentCardUser,
    currentCardNpc,
    statUser,
    statNpc,
    resetGame,
  } from "../stores/game"
  import ScreenWaiting from "../components/ScreenWaiting.svelte"
  import Modal from "../components/Modal.svelte"
  import BaseImage from "../components/BaseImage.svelte"
  import Card from "../components/Card.svelte"
  import CardName from "../components/CardName.svelte"
  import OverlayGameOver from "../components/OverlayGameOver.svelte"
  import SingleCard from "../components/SingleCard.svelte"
  import InfoBox from "../components/InfoBox.svelte"
  import { shuffle, fetchData, makePlayingCards } from "../utils/utils"
  import CardStat from "../components/CardStat.svelte"

  let deck = []
  let userBegins: boolean = null
  let userWins: boolean = null
  let userWinsGame: boolean = null
  let setupReady: Promise<boolean>
  let showNpcCard = false

  $: isGameOver = userWinsGame !== null

  async function getGameReadyState() {
    return await gameReady.setup()
  }

  function setupGame() {
    resetGame()

    deck = shuffle(Array.from($decks[$appLanguage]))
    $cardsPlayed = []

    // for (let i = 0; i < 1; i++) {
    //   $deckUser = [...$deckUser, deck.pop()]
    // }
    // $deckNpc = [...$deckNpc, deck.pop()]

    for (let i = 0; i < $decks[$appLanguage].length / 2; i++) {
      $deckUser = [...$deckUser, deck.pop()]
    }
    $deckNpc = deck

    userBegins = null
    userWinsGame = null

    $sessionRunning = true
    setupReady = getGameReadyState()
    userBegins = Math.round(Math.random()) ? true : false
  }

  function startTurn() {
    if (!$gameRunning) {
      $gameRunning = true
    }
    playCard($deckNpc)
    playCard($deckUser)
  }

  function playCard(playerDeck: ComposerCard[]) {
    $cardsPlayed = [...$cardsPlayed, playerDeck[0]]
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
    $showEvaluation = true
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
      $deckUser = [...$deckUser, ...$cardsPlayed]
    } else {
      userBegins = false
      $deckNpc = [...$deckNpc, ...$cardsPlayed]
    }

    $cardsPlayed = []
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
    $showEvaluation = false
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

  function matchCards(card: ComposerCard) {
    return $decks[$appLanguage].find(
      (deckCard) => deckCard.index === card.index
    )
  }

  function handleLanguageChange() {
    if (!$sessionRunning) {
      setupGame()
    } else {
      $cardsPlayed = [...$cardsPlayed.map((c) => matchCards(c))]
      $deckNpc = [...$deckNpc.map((c) => matchCards(c))]
      $deckUser = [...$deckUser.map((c) => matchCards(c))]
    }
  }

  onMount(() => {
    if (!$showEvaluation) {
      if (!$decks[$appLanguage].length) {
        fetchData($appLanguage)
          .then((data: ComposerCard[]) => {
            $decks[$appLanguage] = makePlayingCards(data)
          })
          .then(() => {
            handleLanguageChange()
          })
      } else {
        handleLanguageChange()
      }
    }
  })
</script>

<main
  in:fade={{ duration: 100, delay: 200 }}
  out:fade={{ duration: 100, delay: 0 }}
>
  {#await setupReady}
    <ScreenWaiting />
  {:then}
    <!-- START -->
    {#if !$gameRunning && !isGameOver}
      {#if !userBegins}
        <div class="npc-start flex-col" in:fade={{ delay: 200 }}>
          <span style="font-size: 150%;">{$t.npcBegins}</span>
          <button class="btn | rounded" on:click={() => moveNpc()}>Start</button
          >
        </div>
      {:else}
        <Modal
          active={!$gameRunning}
          btnText="Start"
          on:close={() => {
            startTurn()
          }}
        >
          <svelte:fragment slot="title">
            {$t.welcome}
          </svelte:fragment>
          <svelte:fragment slot="body">
            {$t.chooseCat}
          </svelte:fragment>
        </Modal>
      {/if}
    {/if}

    <!-- GAME -->
    {#if $currentCardUser}
      {#if ($gameRunning || userBegins) && userWinsGame === null}
        <InfoBox />
        <div class="table | grid">
          <Card {...$currentCardUser} shadow on:statPlayed={() => moveUser()} />
        </div>
      {/if}
    {/if}

    <Modal
      active={$showEvaluation}
      btnText={$t.continue}
      on:close={() => handleEvaluation()}
    >
      <svelte:fragment slot="title">
        {#if $statUser?.value === $statNpc?.value}
          {$t.draw}
        {:else}
          {userWins ? $t.youWin : $t.youLose}
        {/if}
      </svelte:fragment>
      <svelte:fragment slot="body">
        <span
          class="check-her-out"
          data-text={$t.checkHerOut}
          on:click|stopPropagation={() => (showNpcCard = true)}
        >
          <BaseImage
            imageUrl={$currentCardNpc.imageUrl}
            circle
            winner={!userWins}
          />
        </span>
        <CardName name={$currentCardNpc.name} />
        <CardStat stat={$statNpc} single />

        <div style="height: 2rem;" />

        <BaseImage
          imageUrl={$currentCardUser.imageUrl}
          circle
          winner={userWins}
        />
        <CardName name={$currentCardUser.name} />
        <CardStat stat={$statUser} single />

        <SingleCard
          active={showNpcCard}
          card={$currentCardNpc}
          on:close={() => (showNpcCard = false)}
        />
      </svelte:fragment>
    </Modal>

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
  .npc-start {
    margin-top: 30vmin;
    gap: 1em;
  }

  .table {
    position: relative;
    place-items: center;
  }

  .check-her-out {
    position: relative;
    align-self: center;
  }

  .check-her-out::before {
    content: attr(data-text);
    position: absolute;
    left: -180%;
    top: 0;
    width: 200%;
    font-size: 80%;
    font-weight: var(--fw-bold);
    color: var(--blue-300);
    transform: rotate(-15deg);
  }

  .check-her-out::after {
    content: "";
    position: absolute;
    left: -185%;
    top: -45%;
    width: 240%;
    height: 240%;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' viewBox='0 0 800 800'%3E%3Cg stroke-width='20' stroke='hsl(201, 72%25, 55%25)' fill='none' stroke-linecap='round' stroke-linejoin='round' transform='rotate(343, 400, 400)'%3E%3Cpath d='M335.52071380615234 314.3020248413086Q243.52071380615234 540.3020248413086 489.52071380615234 468.3020248413086 ' marker-end='url(%23SvgjsMarker1448)'%3E%3C/path%3E%3C/g%3E%3Cdefs%3E%3Cmarker markerWidth='6' markerHeight='6' refX='3' refY='3' viewBox='0 0 6 6' orient='auto' id='SvgjsMarker1448'%3E%3Cpolyline points='0,3 3,1.5 0,0' fill='none' stroke-width='1' stroke='hsl(201, 72%25, 55%25)' stroke-linecap='round' transform='matrix(1,0,0,1,1,1.5)' stroke-linejoin='round'%3E%3C/polyline%3E%3C/marker%3E%3C/defs%3E%3C/svg%3E");
  }
</style>
