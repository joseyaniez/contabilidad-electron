<script>
  let { quantity = $bindable() } = $props();
</script>
<input bind:value={quantity} class="w-20 px-1 border-2 border-bacalao-secondary border-solid rounded" type="number" min="1">
