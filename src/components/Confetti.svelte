<script>
  /**
   * Confetti-Component courtesy of https://svelte.dev/tutorial/congratulations
   */

  import { onMount } from "svelte"

  let characters = [
    "&#x22C6;",
    "&#x2605;",
    "&#x2606;",
    "&#x2736;",
    "&#x2730;",
    "&#x2738;",
    "&#x2739;",
  ]

  let confetti = new Array(50)
    .fill()
    .map((_, i) => {
      return {
        character: characters[i % characters.length],
        x: Math.random() * 100,
        y: -20 - Math.random() * 100,
        r: 0.5 + Math.random() * 1,
      }
    })
    .sort((a, b) => a.r - b.r)

  onMount(() => {
    let frame

    function loop() {
      frame = requestAnimationFrame(loop)

      confetti = confetti.map((emoji) => {
        emoji.y += 0.3 * emoji.r
        if (emoji.y > 120) emoji.y = -20
        return emoji
      })
    }

    loop()

    return () => cancelAnimationFrame(frame)
  })
</script>

{#each confetti as c}
  <span
    class="shadow"
    style="left: {c.x}%; top: {c.y}%; transform: scale({c.r})"
    >{@html c.character}</span
  >
{/each}

<style>
  span {
    position: absolute;
    font-size: 5vw;
    user-select: none;
    color: gold;
  }
</style>
