<script lang="ts">
  import type { DateState } from "../../../../types/util";
  import type { Ticket } from "../../../../types/models/ticket";
  import type { Invoice } from "../../../../types/models/invoice";
  import InputSelect from "../../../components/form/InputSelect.svelte";
  import Title from "../../../components/Title.svelte";
  import CancellationTable from "../components/CancellationTable.svelte";

  let typeValues = [
    {value: 'B', name: "Boleta"},
    {value: 'F', name: "Factura"}
  ]

  let dateValues = [
    {value: 'day', name: "Hoy"},
    {value: 'yesterday', name: "Ayer"},
    {value: 'before-yesterday', name: "Anteayer"},
    {value: 'full', name: "Última semana"},
  ]

  let cancellationType = $state<'B' | 'F' | 'none'>('B');
  let cancellationDate = $state<DateState>('day');

  let tickets = $state<Array<Ticket>>([]);
  let invoices = $state<Array<Invoice>>([]);

  $effect(() => {
    if(cancellationDate !== "none"){
      (async () => {
        if(cancellationType == 'B'){
          const result = await window.electronAPI.tickets.getAll(cancellationDate)
          invoices = [];
          tickets = result;
        } else if (cancellationType == 'F'){
          const result = await window.electronAPI.invoices.getAll(cancellationDate);
          tickets = [];
          invoices = result;
        }
      })();
    }

  })

</script>

<div class="lg:w-5/6 lg:m-auto relative h-full">
  <Title>Bajas</Title>
  <div class="my-4 flex flex-row gap-8">
    <InputSelect title="Tipo" content={typeValues} bind:value={cancellationType}/>
    <InputSelect title="Fecha" content={dateValues} bind:value={cancellationDate}/>
  </div>
    <CancellationTable type={cancellationType} itemsB={tickets} itemsF={invoices}/>
</div>
