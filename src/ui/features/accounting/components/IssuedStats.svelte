
<script lang="ts">
  import type { Invoice } from "../../../../types/models/invoice";
  import type { Ticket } from "../../../../types/models/ticket";
    import { totalInvoice, totalTicket } from "../../../util/emitted";

  let { tickets = $bindable(), invoices = $bindable() }: {tickets: Array<Ticket>, invoices: Array<Invoice>} = $props()

</script>


<div class="p-2 mb-4 border-t-2 border-b-2 border-bacalao-primary">
  {#if tickets.length != 0}
    <div class="flex flex-col gap-2">
      <div class="flex flex-row gap-2">
        <p class="w-60 font-bold">Total de boletas emitidas: </p>
        <p>{tickets.length}</p>
      </div>
      <div class="flex flex-row gap-2">
        <p class="w-60 font-bold">Total emitido: </p>
        <p>S/. {totalTicket(tickets)}</p>
      </div>
    </div>
  {:else if invoices.length != 0}
    <div class="flex flex-col gap-2">
      <div class="flex flex-row gap-2">
        <p class="w-60 font-bold">Total de boletas emitidas: </p>
        <p>{invoices.length}</p>
      </div>
      <div class="flex flex-row gap-2">
        <p class="w-60 font-bold">Total emitido: </p>
        <p>S/. {totalInvoice(invoices)}</p>
      </div>
    </div>

  {/if}
</div>
