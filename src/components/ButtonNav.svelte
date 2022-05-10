<script>
  import { link } from "svelte-spa-router"
  import FadingElement from "./FadingElement.svelte"

  export let text = ""
  export let href = "/"
  export let color = "initial"
  export let bgColor = "initial"
</script>

<a
  {href}
  class="nav-button | rounded"
  style:color
  style:background-color={bgColor}
  use:link
>
  <FadingElement name={text} />
</a>

<style>
  .nav-button {
    padding: 0.5em 1em;
    text-decoration: none;
    font-size: 120%;
    text-align: center;
  }
</style>
