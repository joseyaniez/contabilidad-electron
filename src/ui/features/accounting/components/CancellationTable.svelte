
<script lang="ts">
    import type { Invoice } from "../../../../types/models/invoice";
    import type { Ticket } from "../../../../types/models/ticket";

  interface Props {
    type: 'B' | 'F' | 'none',
    itemsB: Array<Ticket>
    itemsF: Array<Invoice>
  }
  let { type, itemsB, itemsF }: Props = $props();

</script>

<div class="bg-red-100">
  {#if type == 'B'}
    {#each itemsB as item}
      <div class="border border-bacalao-secondary rounded">
        <p>{item.serie + item.number.toString().padStart(4, "0")}</p>
      </div>
    {/each}
  {:else}
    {#each itemsF as item}
      <div class="border border-bacalao-secondary rounded">
        <p>{item.serie + item.number.toString().padStart(4, "0")}</p>
      </div>
    {/each}
  {/if}
</div>
