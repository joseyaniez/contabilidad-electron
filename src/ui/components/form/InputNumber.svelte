
<script>
  let {title, idComponent = '', value = $bindable(), step = "1"} = $props();

  if(idComponent == ''){
    idComponent = "id-" + title.toLowerCase();
  }
</script>

<div class="flex flex-col mt-4">
  <label class="font-bold pb-1" for={idComponent}>{title}</label>
  <input class="w-20 p-1 border-2 border-bacalao-secondary border-solid rounded" type="number" bind:value={value} id={idComponent} {step} min="0">
</div>
