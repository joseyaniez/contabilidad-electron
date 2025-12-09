
<script lang="ts">
  import type { Invoice } from "../../../../types/models/invoice";
  import type { Ticket } from "../../../../types/models/ticket";
  import Modal from "../../../components/Modal.svelte";
  import { delay } from "../../../util/delay";
  import CancellationInvoiceItem from "./CancellationInvoiceItem.svelte";
  import CancellationTicketItem from "./CancellationTicketItem.svelte";

  interface Props {
    type: 'B' | 'F' | 'none',
    itemsB: Array<Ticket>
    itemsF: Array<Invoice>
  }
  let { type, itemsB, itemsF }: Props = $props();

  let ticketSelected = $state<Ticket | null>(null);
  let invoiceSelected = $state<Invoice | null>(null);
  let showModal = $state(false);
  let cancellationCause = $state('');
  let cancellationStatus = $state('Pending')

  $effect(() => {
    if(ticketSelected != null || invoiceSelected != null){
      showModal = true;
    } else {
      showModal = false;
    }
  })

  $effect(() => {
    if(showModal == false){
      ticketSelected = null;
      invoiceSelected = null;
      cancellationCause = '';
    }
  })

  async function onCancellationClick(){
    if(cancellationCause != ''){
      let idCancelable = '';
      if(ticketSelected != null){
        idCancelable = ticketSelected.id!;
      } else if(invoiceSelected != null) {
        idCancelable = invoiceSelected.id!;
      }
      cancellationStatus = 'Process';
      await delay(3000);
      const d = await window.electronAPI.cancellations.create({
        cause: cancellationCause,
        cancellableType: type == 'none' ? 'B' : type,
        cancellableId: idCancelable
      })

      if(d.success){
        cancellationStatus = 'Success'
      } else {
        console.log(d.error);
        cancellationStatus = 'Error'
      }

      cancellationCause = '';
    }
  }

</script>

<div class="flex flex-col">
  {#if type == 'B'}
    {#each itemsB as item}
      <CancellationTicketItem {item} bind:invoiceSelected bind:ticketSelected/>
    {/each}
  {:else}
    {#each itemsF as item}
      <CancellationInvoiceItem {item} bind:ticketSelected bind:invoiceSelected/>
    {/each}
  {/if}
</div>

<Modal bind:showModal>
  {#if cancellationStatus == 'Pending'}
    {#if ticketSelected != null}
      <div class="m-4 flex flex-col items-center gap-4">
        <p class="text-2xl font-bold text-bacalao-primary">Confirmar baja de factura {ticketSelected!.serie + "-" + ticketSelected!.number.toString().padStart(4, "0")}</p>
        <div class="flex flex-col w-full">
          <label class="text-bacalao-primary font-bold my-2" for="taBaja">Motivo de baja</label>
          <textarea bind:value={cancellationCause} class="min-h-20 max-h-40 p-2 border-2 rounded border-bacalao-primary" id="taBaja"></textarea>
        </div>
        <button onclick={onCancellationClick} class="bg-bacalao-primary font-bold text-white text-lg rounded px-4 py-2 cursor-pointer">Dar de baja</button>
      </div>
    {:else if invoiceSelected != null}
      <div class="m-4 flex flex-col items-center gap-4">
        <p class="text-2xl font-bold text-bacalao-primary">Confirmar baja de factura {invoiceSelected!.serie + "-" + invoiceSelected!.number.toString().padStart(4, "0")}</p>
        <div class="flex flex-col w-full">
          <label class="text-bacalao-primary font-bold my-2" for="taBaja">Motivo de baja</label>
          <textarea bind:value={cancellationCause} class="min-h-20 max-h-40 p-2 border-2 rounded border-bacalao-primary" id="taBaja"></textarea>
        </div>
        <button onclick={onCancellationClick} class="bg-bacalao-primary font-bold text-white text-lg rounded px-4 py-2 cursor-pointer">Dar de baja</button>
      </div>
    {/if}
  {:else if cancellationStatus == 'Process'}
    <div class="mx-4 my-10 flex flex-col items-center gap-4">
      <p class="text-bacalao-primary text-lg">Enviado baja a la SUNAT...</p>
    </div>
  {:else if cancellationStatus == 'Success'}
    <div class="mx-4 my-10 flex flex-col items-center gap-4">
      <p class="text-bacalao-primary font-bold text-lg">Se generó la baja</p>
    </div>
  {:else if cancellationStatus == 'Error'}
    <div class="mx-4 my-10 flex flex-col items-center gap-4">
      <p class="text-red-200 font-bold text-lg">No se pudo dar de baja</p>
    </div>
  {/if}
</Modal>
