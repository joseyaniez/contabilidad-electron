
<script>
  let {title, idComponent = '', checked = $bindable()} = $props();

  if(idComponent == ''){
    idComponent = "id-" + title.toLowerCase();
  }
</script>


<div class="flex flex-row h-10 items-center">
  <label class="font-bold pb-1" for={idComponent}>{title}</label>
  <input class=" h-6 w-6 m-2" type="checkbox" bind:checked={checked} id={idComponent} min="0">
</div>
