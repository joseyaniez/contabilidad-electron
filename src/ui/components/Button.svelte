
<script>
  let { typeColor = 'primary', onclick, children } = $props();
</script>

<button
  class="bg-bacalao-{typeColor} my-4 px-2 py-1 rounded text-white"
  {onclick}
>
  {@render children()}
</button>
