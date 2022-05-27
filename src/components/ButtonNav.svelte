<script>
  import { link } from "svelte-spa-router"
  import FadingElement from "./FadingElement.svelte"

  export let text = ""
  export let href = "/"
  export let color = "initial"
  export let bgColor = "initial"
  export let col = ""
  export let row = 0
  export let width = ""
  export let placeSelf = ""
</script>

<a
  {href}
  class="nav-button | rounded"
  style:color
  style:background-color={bgColor}
  style:grid-column={col}
  style:grid-row={row}
  style:width
  style:place-self={placeSelf}
  use:link
>
  <FadingElement name={text}>
    <slot>{text}</slot>
  </FadingElement>
</a>

<style>
  .nav-button {
    display: grid;
    place-items: center;
    padding: 0.5em 1em;
    text-decoration: none;
    font-size: 120%;
    text-align: center;
  }
</style>
