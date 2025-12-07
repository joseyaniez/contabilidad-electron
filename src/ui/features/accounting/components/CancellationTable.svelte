
<script lang="ts">
    import type { Invoice } from "../../../../types/models/invoice";
    import type { Ticket } from "../../../../types/models/ticket";

  interface Props {
    items: Array<Ticket>
  }
  let { items }: Props = $props();

</script>

<div class="bg-red-100">
  {#each items as item}
    <div class="border border-bacalao-secondary rounded">
      <p>{item.serie + item.number.toString().padStart(4, "0")}</p>
    </div>
  {/each}
</div>
