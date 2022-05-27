<script>
  import { fly } from "svelte/transition"
  import {
    appLanguage,
    onboardingComplete,
    dictionary as t,
  } from "../stores/settings"
  import BasePage from "./BasePage.svelte"
  import SliderIndicator from "./SliderIndicator.svelte"

  let currentOnboardingSlide = 0

  function chooseLanguage(lang) {
    $appLanguage = lang
    currentOnboardingSlide = 1
  }
</script>

<BasePage>
  <div class="onboarding">
    {#if currentOnboardingSlide === 0}
      <div class="slide | rounded" out:fly={{ x: -600, duration: 200 }}>
        Please choose your language/<br />Bitte Sprache wählen
        <div class="language-btns | flex-between">
          <button class="btn | rounded" on:click={() => chooseLanguage("en")}
            >EN</button
          >
          <button class="btn | rounded" on:click={() => chooseLanguage("de")}
            >DE</button
          >
        </div>
        <SliderIndicator noOfSlides={2} activeSlide={currentOnboardingSlide} />
      </div>
    {:else if currentOnboardingSlide === 1}
      <div
        class="slide | rounded"
        in:fly={{ x: 600, delay: 200, duration: 200 }}
      >
        <h1>{$t.welcome}</h1>
        {#if $appLanguage === "de"}
          <p>
            Wir freuen uns, dass Sie <span class="bold"
              >FCQ – Female Composers Quartets</span
            > spielen und entdecken wollen.
          </p>
          <p>
            Das Prinzip des Spiels ist einfach: eine der fünf Kategorien wählen
            – vergleichen – die Karte gewinnen oder verlieren.
          </p>
          <p>
            Unter „Stöbern“ kann man zudem alle Karten, nach Quartettgruppen
            sortiert, in Ruhe durchschauen und anhören.
          </p>
        {:else}
          <p>
            We are pleased that you want to play and discover <span class="bold"
              >FCQ – Female Composers Quartets</span
            >.
          </p>
          <p>
            The principle of the game is simple: choose one of the five
            categories – compare – win or lose the card.
          </p>
          <p>
            Under "Browse" you can also look through and listen to all the cards
            at your leisure, sorted by quartet groups.
          </p>
        {/if}
        <button
          class="btn btn-continue | rounded"
          on:click={() => ($onboardingComplete = true)}>{$t.continue}</button
        >
        <SliderIndicator noOfSlides={2} activeSlide={currentOnboardingSlide} />
      </div>
    {/if}
  </div>
</BasePage>

<style>
  .onboarding {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background-color: var(--gray-900);
  }

  .slide {
    position: relative;
    display: grid;
    place-content: center;
    gap: 1em;
    background-color: var(--slate-200);
    width: 90%;
    height: 90%;
    padding: 0 1em;
  }

  .language-btns {
    gap: 1rem;
  }

  .slide > h1,
  .language-btns,
  .btn-continue {
    justify-self: center;
  }
</style>
