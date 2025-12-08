
<script lang="ts">
  import type { Invoice } from "../../../../types/models/invoice";
  import type { Ticket } from "../../../../types/models/ticket";
  import Modal from "../../../components/Modal.svelte";
  import CancellationTicketItem from "./CancellationTicketItem.svelte";

  interface Props {
    type: 'B' | 'F' | 'none',
    itemsB: Array<Ticket>
    itemsF: Array<Invoice>
  }
  let { type, itemsB, itemsF }: Props = $props();

  let ticketSelected = $state<Ticket | null>(null);
  let invoiceSelected = $state<Invoice | null>(null);
  let showModal = $derived(ticketSelected !== null || invoiceSelected !== null);

  //sumPrices(...productsSelected.map(p => multiplyPrice(p.price, p.quantity))).toString().split('.')[1].padEnd(2, "0")
</script>

<div class="flex flex-col">
  {#if type == 'B'}
    {#each itemsB as item}
      <CancellationTicketItem {item} bind:ticketSelected/>
    {/each}
  {:else}
    {#each itemsF as item}
      <div class="border border-bacalao-secondary rounded">
        <p>{item.serie + item.number.toString().padStart(4, "0")}</p>
      </div>
    {/each}
  {/if}
</div>

<Modal bind:showModal>
  {#if ticketSelected != null}
    <div class="m-4 flex flex-col items-center gap-4">
      <p class="text-2xl font-bold text-bacalao-primary">Confirmar baja de ticket {ticketSelected!.serie + "-" + ticketSelected!.number.toString().padStart(4, "0")}</p>
      <button class="bg-bacalao-primary font-bold text-white text-lg rounded px-4 py-2 cursor-pointer">Dar de baja</button>
    </div>
  {/if}
</Modal>
