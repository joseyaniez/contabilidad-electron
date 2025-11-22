
<script>
  let {title, idComponent = '', value = $bindable()} = $props();

  if(idComponent == ''){
    idComponent = "id-" + title.toLowerCase();
  }

</script>

<div class="flex flex-col">
  <label class="font-bold pb-1" for={idComponent}>{title}</label>
  <input class="p-1 border-2 border-bacalao-secondary border-solid rounded" bind:value={value}  type="text" id={idComponent}/>
</div>
