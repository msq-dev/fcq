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
        <BaseImage
          imageUrl={$currentCardNpc.imageUrl}
          circle
          winner={!userWins}
        />
        <button
          class="btn btn-check-her | small rounded"
          on:click|self|stopPropagation={() => (showNpcCard = true)}
          >{$t.checkHerOut}</button
        >
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

  .btn-check-her {
    align-self: center;
    font-weight: var(--fw-bold);
    color: var(--white);
    background-color: var(--blue-400);
    margin-bottom: 0.5em;
  }
</style>
