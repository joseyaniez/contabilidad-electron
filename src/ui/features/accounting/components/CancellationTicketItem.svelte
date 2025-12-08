
<script lang="ts">
  import type { Ticket } from "../../../../types/models/ticket";
  import { sumPrices } from "../../../util/cents";

  let { item, ticketSelected = $bindable() }: {item: Ticket, ticketSelected: Ticket | null} = $props();

  let isHidden = $state(true);

  function toggleHidden(){
    isHidden = !isHidden;
  }

  function cancellationClick(){
    console.log("hello")
    ticketSelected = item;
  }

</script>

<div class="rounded-t-lg rounded-b-sm my-1 border-2 border-bacalao-primary">
  <div class="flex flex-col">
    <div class="p-3 text-bacalao-primary font-bold {isHidden ? "" : "border-b-2"} border-bacalao-secondary flex flex-row justify-between">
      <div class="flex flex-row">
        <button class="w-4" onclick={toggleHidden}>{isHidden ? "+" : "-"}</button>
        <p class="ms-2 me-4">{item.serie + "-" + item.number.toString().padStart(4, "0")}</p>
        {#if item.client.name}
          <p>{item.client.name}</p>
        {/if}
      </div>
      <div class="mx-2">
        <button onclick={cancellationClick} class="rounded-md bg-red-50 text-sm py-1 px-2">Dar de baja</button>
      </div>
    </div>
    <div class="p-3 text-bacalao-primary {isHidden ? "hidden" : ""}">
      <p class="font-bold">Fecha: {item.dateString}</p>
      <p>Cliente: {item.client.name}</p>
      <p>DNI: {item.client.dni}</p>
      <p>RUC: {item.client.ruc}</p>
      <p>Total: {sumPrices(...item.productsList.map(p => p.importPrice))}</p>
      <div>
        <p>Productos: </p>
        <div class="px-4">
          {#each item.productsList as prod}
            <p> - ({prod.quantity}) {prod.description}</p>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
