<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"

  import Router from "svelte-spa-router"
  import { location, link } from "svelte-spa-router"
  import active from "svelte-spa-router/active"

  import { csv } from "d3-fetch"

  import { dictionary as t } from "./stores/settings"
  import { decks } from "./stores/game"
  import { showOverlay } from "./stores/youtube"

  import Home from "./routes/Home.svelte"
  import Game from "./routes/Game.svelte"
  import Browse from "./routes/Browse.svelte"
  import Settings from "./routes/Settings.svelte"
  import Privacy from "./routes/Privacy.svelte"
  import NotFound from "./routes/NotFound.svelte"

  import OverlayYoutube from "./components/OverlayYoutube.svelte"
  import IconSettings from "./components/IconSettings.svelte"

  const routes = {
    "/": Home,
    "/game": Game,
    "/browse/:cat?": Browse,
    "/settings": Settings,
    "/privacy": Privacy,
    "*": NotFound,
  }

  // courtesy of https://stackoverflow.com/a/21984136
  function calculateAge(birthday: string, deathday: string) {
    const dateOfBirth = new Date(birthday)
    const dateToSubstractFrom: any = deathday
      ? new Date(deathday).getTime()
      : Date.now()
    const ageDifference = dateToSubstractFrom - dateOfBirth.getTime()
    const ageDate = new Date(ageDifference)

    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  function fetchData(lang: string) {
    const DATA_URL = `https://apps.maxspuling.de/assets/fcq/data/composers_${lang}.csv`
    return csv(DATA_URL)
  }

  function makePlayingCards(data: ComposerCard[]) {
    let playingCards: ComposerCard[] = []
    data.forEach((composer) => {
      let stats: Stat[] = [
        {
          name: "age",
          value: calculateAge(composer.dateOfBirth, composer.dateOfDeath),
          highestWins: true,
          isAlive: composer.dateOfDeath ? false : true,
        },
        {
          name: "works",
          value: parseInt(composer.noOfWorks),
          highestWins: true,
          symbol: ">",
        },
        {
          name: "anniversary",
          value: parseInt(composer.upcomingAnniversary),
          highestWins: false,
          anniversaryInfo: {
            isBirth: JSON.parse(composer.anniversaryBirth.toLowerCase()),
            anniversaryYear: parseInt(composer.upcomingAnniversary),
            yearOfBirth: parseInt(composer.dateOfBirth.substring(0, 4)),
            yearOfDeath: parseInt(composer.dateOfDeath.substring(0, 4)),
          },
        },
        {
          name: "awareness",
          value: parseInt(composer.levelOfAwareness),
          highestWins: true,
        },
        {
          name: "abilities",
          value: composer.musicalAbilities.split(",").length,
          highestWins: true,
          abilitiesInfo: composer.musicalAbilities,
        },
      ]

      playingCards.push({
        stats,
        index: composer.index,
        category: composer.category,
        name: composer.name,
        nameMaiden: composer.nameMaiden,
        imageUrl: composer.imageUrl || "Placeholder.png",
        dateOfBirth: composer.dateOfBirth,
        placeOfBirth: composer.placeOfBirth,
        dateOfDeath: composer.dateOfDeath || null,
        placeOfDeath: composer.placeOfDeath || null,
        ytTitle: composer.ytTitle,
        ytDesc: composer.ytDesc,
        ytId: composer.ytId,
      })
    })
    return playingCards
  }

  onMount(() => {
    fetchData("en").then((data: ComposerCard[]) => {
      $decks.en = makePlayingCards(data)
    })
    fetchData("de").then((data: ComposerCard[]) => {
      $decks.de = makePlayingCards(data)
    })
  })
</script>

<div class="mainwrapper">
  <Router {routes} restoreScrollState={true} />

  {#if $showOverlay}
    <OverlayYoutube />
  {/if}

  {#if $location !== "/" && $location !== "/settings"}
    <nav class="shadow" transition:fade={{ duration: 100 }}>
      <a href="/" use:link use:active>Home</a>
      <a href="/game" use:link use:active>{$t.play}</a>
      <a href="/browse" use:link use:active>{$t.browse}</a>
      <a href="/settings" use:link use:active>
        <IconSettings size={18} stroke={1.5} />
      </a>
    </nav>
  {/if}
</div>

<style lang="scss">
  :global(a.active) {
    display: none;
  }

  nav {
    --shadow-clr: rgb(0 0 0 / 0.5);

    position: fixed;
    inset: auto 0 0 0;
    z-index: 20;
    display: flex;
    justify-content: space-around;
    padding: 0.5em 0;
    color: var(--npc-light);
    background-color: var(--npc-dark);

    a {
      font-size: 85%;
      color: currentColor;
      text-decoration: none;
    }
  }
</style>
