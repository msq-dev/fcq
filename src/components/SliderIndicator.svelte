<script>
  export let noOfSlides = 1
  export let activeSlide = 0
</script>

<div class="indicator-wrapper">
  <div class="indicator-group">
    {#each Array(noOfSlides) as _, index}
      <div class="indicator" class:active={activeSlide === index} />
    {/each}
  </div>
</div>

<style>
  .indicator-wrapper {
    position: absolute;
    bottom: 1rem;
    left: 50%;
  }

  .indicator-group {
    --size: 0.5rem;

    position: relative;
    left: -50%;
    display: flex;
    gap: var(--size);
  }

  .indicator {
    width: var(--size);
    height: var(--size);
    border-radius: 100vw;
    background-color: var(--slate-100);
  }

  .indicator.active {
    background-color: var(--teal-400);
  }
</style>
