<script lang="ts">
  import type { Client } from "../../../../../types/models/client";
  import { debounce } from "../../../../util/debounce";
  import { debounceAsync } from "../../../../util/debounceAsync";

  const updateDebounced = debounceAsync(updateProductsList, 600);

  let clientText = $state("");
  let clientList = $state<Array<Client>>([]);

  $effect(() => {
    if(clientText.length > 3){
      updateDebounced();
    } else {
      clientList = [];
    }
  });
  
  async function updateProductsList(){
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

</script>

<div class="flex flex-col relative flex-1">
  <label class="font-bold pb-1" for="client-input">Cliente</label>
  <input bind:value={clientText} class="px-4 py-1 relative z-20 bg-white  border-2 border-bacalao-secondary border-solid rounded-xl"  type="text" id="client-input"/>
  <div class={`absolute w-5/6 top-16 bg-white left-2 ${clientList.length > 0 ? 'block' : 'hidden'} shadow-lg rounded-xl z-10`}>
    <div class="p-2 border-x border-b rounded-b-xl border-bacalao-secondary flex flex-col">
      {#each clientList as client}
        <button onclick={() => {}} class="px-2 py-1 text-left rounded-md hover:bg-indigo-50">{client.ruc ? client.dni + client.ruc : client.dni} - {client.name}</button>
      {/each}
    </div>
  </div>
</div>
