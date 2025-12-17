<script lang="ts">
  import type { Client } from "../../../types/models/client";
  import Title from "../../components/Title.svelte";

  let clients = $state<Array<Client>>();

  $effect(() => {
    getClients();
  })

  async function getClients(){
    let result = await window.electronAPI.clients.getAll();
    if(result.success){
      clients = result.data
    } else {
      console.log("Error al obtener clientes: " + result.error)
    }
  }

</script>

<div class="lg:w-5/6 lg:m-auto relative h-full">
  <Title>
    Clientes
  </Title>
  <div class="flex flex-col mt-4">
    {#each clients as client}
      <div class="border-2 border-bacalao-primary rounded-md p-4 my-1">
        <div class="flex flex-row justify-between">
          <p class="text-md text-bacalao-primary font-bold">{client.name}</p>
        </div>
        <div class="p-2">
          {#if client.ruc != ''}
            <div class="flex flex-row gap-2">
              <p class="font-bold">RUC: </p> <p>{client.ruc}</p>
            </div>
          {/if}
          {#if client.dni != ''}
            <div class="flex flex-row gap-2">
              <p class="font-bold">DNI: </p> <p>{client.dni}</p>
            </div>
          {/if}

          {#if client.address != ""}
            <div class="flex flex-row gap-2">
              <p class="font-bold">Dirección: </p> <p>{client.address}</p>
            </div>
          {/if}
        </div>
      </div>
    {/each}

  </div>
</div>
