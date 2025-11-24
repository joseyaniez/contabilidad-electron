
<script>
  let { padding = 1, typeColor = 'primary', onclick, children } = $props();
</script>

<button
  class="bg-bacalao-{typeColor} my-4 px-{padding*2} py-{padding} cursor-pointer rounded text-white"
  type="button"
  {onclick}
>
  {@render children()}
</button>
