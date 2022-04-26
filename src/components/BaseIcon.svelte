<script>
  export let size = 24
  export let strokeColor = "currentColor"
  export let stroke = 2
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke={strokeColor}
  stroke-width={stroke}
  stroke-linecap="round"
  stroke-linejoin="round"
  class="feather feather-settings"
>
  <slot />
</svg>
