
<script>
  let {title, idComponent = '', value = $bindable(), step = "1", isInline = false} = $props();

  if(idComponent == ''){
    idComponent = "id-" + title.toLowerCase();
  }
</script>

<div class="flex {isInline ? "flex-row gap-2 items-center" : "flex-col"}">
  <label class="font-bold pb-1" for={idComponent}>{title}</label>
  <input class="w-24 p-2 border-2 border-bacalao-secondary border-solid rounded" type="number" bind:value={value} id={idComponent} {step} min="0">
</div>
