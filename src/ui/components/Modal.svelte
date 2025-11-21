
<script>
  let { showModal = $bindable(), children} = $props();
  let dialog = $state();

  $effect(() => {
    if(showModal){
      dialog.showModal();
    } else if (dialog.open){
      dialog.close();
    }
  })
</script>

<dialog 
  class="absolute rounded-lg border-none m-auto min-w-lg max-w-3/4 lg:max-w-2/3"
  bind:this={dialog}
  onclose={() => showModal = false}
  onclick={(e) => { if(e.target === dialog) dialog.close() }}
>
  <div class="px-10 py-4">
    {@render children?.()}
  </div>
</dialog>
