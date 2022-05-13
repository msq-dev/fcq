<script lang="ts">
  import { onMount } from "svelte"
  import { checkIfImageExists } from "../utils/utils"

  export let imageUrl = ""
  export let background = false

  let imgExists = false
  const IMG_BASE_URL = "https://apps.maxspuling.de/assets/fcq/img/"

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

<div class="card-img" class:background style="background-image: url({src});" />

<style>
  .card-img,
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

  .card-img {
    z-index: 5;
    left: 50%;
    transform: translateX(-50%);
    background-size: contain;
  }

  .background {
    z-index: 0;
    opacity: 0.5;
    background-size: cover;
  }
</style>
