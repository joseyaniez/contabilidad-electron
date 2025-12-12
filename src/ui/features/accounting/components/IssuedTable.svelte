
<script lang="ts">
  import type { Invoice } from "../../../../types/models/invoice";
  import type { Ticket } from "../../../../types/models/ticket";
    import { sumPrices } from "../../../util/cents";
    import { totalSingleInvoice, totalSingleTicket } from "../../../util/emitted";

  let { tickets = $bindable(), invoices = $bindable() }: {tickets: Array<Ticket>, invoices: Array<Invoice>} = $props()
</script>

<div class="flex flex-col">
  {#if tickets.length != 0}
    {#each tickets as ticket}
      <div class="flex flex-col">
        <div class="flex flex-row items-center justify-between my-1 border border-bacalao-primary rounded-md p-2">
          <div class="flex flex-row gap-3">
            <p>{ticket.serie} - {ticket.number.toString().padStart(4, "0")}</p>
            {#if ticket.client.name}
              <p>{ticket.client.name}</p>
            {/if}
          </div>
          <div class="w-25 flex flex-col items-end">
            <p class="text-sm text-gray-500">{ticket.dateString.split(" ")[0]}</p>
            <p class="font-bold">S/. {totalSingleTicket(ticket)}</p>
          </div>
        </div>
      </div>
    {/each}
  {:else if invoices.length != 0}
    {#each invoices as invoice}
      <div class="flex flex-col">
        <div class="flex flex-row items-center justify-between my-1 border border-bacalao-primary rounded-md p-2">
          <div class="flex flex-row gap-3">
            <p>{invoice.serie} - {invoice.number.toString().padStart(4, "0")}</p>
            {#if invoice.client.name}
              <p>{invoice.client.name}</p>
            {/if}
          </div>
          <div class="w-25 flex flex-col items-end">
            <p class="text-sm text-gray-500">{invoice.dateString.split(" ")[0]}</p>
            <p class="font-bold">S/. {totalSingleInvoice(invoice)}</p>
          </div>
        </div>
      </div>
    {/each}

  {/if}

</div>
