<script>
  export let index
  export let category

  const colors = [
    "darkgreen",
    "crimson",
    "darkmagenta",
    "darkorange",
    "deeppink",
    "blueviolet",
    "saddlebrown",
    "tomato",
    "navy",
  ]

  $: categoryColor = colors[parseInt(index[0]) - 1]
</script>

<div class="head-container | flex-between" style:color={categoryColor}>
  <div class="category | small">{category}</div>
  <div class="index | small">{index}</div>
</div>

<style>
  .head-container {
    color: var(--gray-400);
    width: 100%;
  }

  .category,
  .index {
    display: inline;
  }

  .index {
    text-transform: uppercase;
    letter-spacing: 0.25em;
  }
</style>
