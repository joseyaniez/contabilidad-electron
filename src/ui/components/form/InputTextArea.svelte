
<script>
  let {title, idComponent = '', value = $bindable()} = $props();

  if(idComponent == ''){
      idComponent = "id-" + title.toLowerCase();
  }
</script>

<div class="flex flex-col mt-4">
  <label class="font-bold pb-1" for={idComponent}>{title}</label>
  <textarea bind:value={value} class="p-2 border-2 border-bacalao-secondary border-solid rounded" id={idComponent}></textarea>
</div>
