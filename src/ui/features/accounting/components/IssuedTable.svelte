
<script lang="ts">
  import type { Invoice } from "../../../../types/models/invoice";
  import type { Ticket } from "../../../../types/models/ticket";

  let { tickets = $bindable(), invoices = $bindable() }: {tickets: Array<Ticket>, invoices: Array<Invoice>} = $props()
</script>

<div class="flex flex-col">
  {#if tickets.length != 0}
    {#each tickets as ticket}
      <div class="flex flex-col">
        <div class="flex flex-row justify-between my-1 border border-bacalao-primary rounded-md p-2">
          <div class="flex flex-row gap-3">
            <p>{ticket.serie} - {ticket.number.toString().padStart(4, "0")}</p>
            {#if ticket.client.name}
              <p>{ticket.client.name}</p>
            {/if}
          </div>
          <p>{ticket.dateString.split(" ")[0]}</p>
        </div>
      </div>
    {/each}
  {:else if invoices.length != 0}
    {#each invoices as invoice}
      <div class="flex flex-col">
        <div class="flex flex-row justify-between my-1 border border-bacalao-primary rounded-md p-2">
          <div class="flex flex-row gap-3">
            <p>{invoice.serie} - {invoice.number.toString().padStart(4, "0")}</p>
            {#if invoice.client.name}
              <p>{invoice.client.name}</p>
            {/if}
          </div>
          <p>{invoice.dateString.split(" ")[0]}</p>
        </div>
      </div>
    {/each}

  {/if}

</div>
