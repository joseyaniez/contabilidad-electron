<script lang="ts">
  import type { Client } from "../../../../../types/models/client";
  import { debounceAsync } from "../../../../util/debounceAsync";

  let { clientSelected = $bindable() } = $props();

  const updateDebounced = debounceAsync(updateClientsList, 600);

  let clientText = $state("");
  let clientList = $state<Array<Client>>([]);
  let isSelected = $derived(clientSelected != null);

  $effect(() => {
    if(clientText.length > 3){
      updateDebounced();
    } else {
      clientList = [];
    }
  });

  $effect(() => {
    if(clientSelected){
      clientText = clientSelected.ruc ? clientSelected.ruc + " - " + clientSelected.name : clientSelected.dni + " - " + clientSelected.name;
    } else {
      clientText = '';
    }
  })
  
  async function updateClientsList(){
    try {
      const result = await window.electronAPI.clients.find(clientText, clientText, clientText);
      const data = result.data || [];
      if(result.success){
        clientList = data;
      } else {
        console.error("Failed to fetch clients:", result.error);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }

  function onClickProductListed(client: Client){
    clientSelected = client;
    clientList = [];
  }
  
  function resetSelection(){
    clientSelected = null;
    clientText = "";
  }

</script>

<div class="flex flex-col relative flex-1">
  <label class="font-bold pb-1" for="client-input">Cliente</label>
  <input 
    bind:value={clientText} 
    class={`${isSelected ? 'bg-green-100' : 'bg-white'} px-4 py-1 relative z-20 border-2 border-bacalao-secondary border-solid rounded-xl`}
    type="text" 
    id="client-input"
  />
  <button 
    class={`${isSelected ? 'block' : 'hidden'} w-6 h-6 absolute top-8.5 right-2 z-30 text-green-600 font-bold cursor-pointer`}
    onclick={resetSelection}
  >
    X
  </button>
  <div class={`absolute w-5/6 top-16 bg-white left-2 ${clientList.length > 0 && !isSelected ? 'block' : 'hidden'} shadow-lg rounded-xl z-30`}>
    <div class="p-2 border-x border-b rounded-b-xl border-bacalao-secondary flex flex-col">
      {#each clientList as client}
        <button onclick={() => {onClickProductListed(client)}} class="px-2 py-1 text-left rounded-md hover:bg-indigo-50">{client.ruc ? client.dni + client.ruc : client.dni} - {client.name}</button>
      {/each}
    </div>
  </div>
</div>
