<script lang="ts">
  import { onMount } from "svelte"
  import { checkIfImageExists } from "../utils/utils"

  const fullBody = ["cozzolani", "viardot"]

  export let imageUrl = "fcq_placeholder.jpg"
  export let portrait = false
  export let portraitBackground = false
  export let circle = false
  export let winner = false

  const IMG_BASE_URL = "https://apps.maxspuling.de/assets/fcq/img/"

  let imgExists = false

  $: fullBodyImg = circle
    ? fullBody.some((name) => imageUrl.toLowerCase().includes(name))
    : false
  $: srcUrl = /^https?/.test(imageUrl) ? imageUrl : IMG_BASE_URL + imageUrl
  $: src = imgExists ? srcUrl : IMG_BASE_URL + "fcq_placeholder.jpg"

  onMount(() => {
    checkIfImageExists(srcUrl, (exists: boolean) => {
      if (exists) {
        imgExists = true
      } else {
        imgExists = false
      }
    })
  })
</script>

<div
  class="image-div"
  class:portrait
  class:portrait-bg={portraitBackground}
  class:circle
  class:full-body={fullBodyImg}
  class:winner
  style="background-image: url({src});"
/>

<style>
  .image-div {
    background-position: center;
    background-repeat: no-repeat;
  }

  .portrait {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .image-div.portrait:not(.portrait-bg) {
    z-index: 5;
    left: 50%;
    transform: translateX(-50%);
    background-size: contain;
  }

  .portrait-bg {
    z-index: 0;
    opacity: 0.5;
    background-size: cover;
  }

  .circle {
    align-self: center;
    width: 3.5rem;
    aspect-ratio: 1;
    background-size: 125%;
    background-position-x: 50%;
    background-position-y: 25%;
    border-radius: 100vw;
    margin-bottom: 0.5em;
  }

  .circle.full-body {
    background-size: 175%;
    background-position-y: initial;
  }

  .circle.winner {
    border: 0.2em solid var(--winner);
  }
</style>
