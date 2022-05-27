<script lang="ts">
  import {
    onboardingComplete,
    appLanguage,
    dictionary as t,
  } from "../stores/settings"
  import Onboarding from "../components/Onboarding.svelte"
  import BasePage from "../components/BasePage.svelte"
  import TitleMain from "../components/TitleMain.svelte"
  import ButtonNav from "../components/ButtonNav.svelte"
  import IconRules from "../components/IconRules.svelte"
  // import BannerCookies from "../components/BannerCookies.svelte"
</script>

{#if !$onboardingComplete}
  <Onboarding />
{:else}
  <BasePage>
    <TitleMain />
    <div class="language-switch">
      <span
        class:bold={$appLanguage === "de"}
        on:click={() => ($appLanguage = "de")}>DE</span
      >
      |
      <span
        class:bold={$appLanguage === "en"}
        on:click={() => ($appLanguage = "en")}>EN</span
      >
    </div>

    <div class="nav-grid | grid">
      <ButtonNav
        text={$t.play}
        href={"/game"}
        color={"var(--white)"}
        bgColor={"var(--teal-400)"}
        col={"1 / 5"}
        row={1}
      />

      <ButtonNav
        href={"/rules"}
        color={"var(--white)"}
        bgColor={"var(--teal-300)"}
        col={"5"}
        row={1}
      >
        <IconRules />
      </ButtonNav>

      <ButtonNav
        text={$t.browse}
        href={"/browse"}
        color={"var(--white)"}
        bgColor={"var(--blue-400)"}
        col={"1 / 6"}
        row={2}
      />

      <ButtonNav text={$t.about} href={"/about"} col={"1 / 6"} row={3} />
    </div>
  </BasePage>
{/if}

<style>
  .nav-grid {
    grid-template-columns: repeat(5, minmax(1fr, 10%));
    grid-template-rows: repeat(3, 1fr);
    gap: 0.75em;
    text-align: center;
    width: 70%;
    margin: auto;
  }

  .language-switch {
    place-self: center;
    margin-bottom: 1em;
    font-size: 180%;
  }

  .language-switch > span {
    cursor: pointer;
    transition: all 300ms;
  }

  .language-switch > span.bold {
    font-weight: 600;
  }
</style>
