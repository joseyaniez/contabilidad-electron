<script lang="ts">
  import { onMount } from "svelte";
  import type { DateState } from "../../../../types/util";
  import type { Ticket } from "../../../../types/models/ticket";
  import InputSelect from "../../../components/form/InputSelect.svelte";
  import Title from "../../../components/Title.svelte";
  import CancellationTable from "../components/CancellationTable.svelte";

  let typeValues = [
    {value: 'B', name: "Boleta"},
    {value: 'F', name: "Factura"}
  ]

  let dateValues = [
    {value: 'day', name: "Hoy"},
    {value: 'week', name: "Esta semana"},
    {value: 'month', name: "Este mes"},
    {value: 'year', name: "Este año"},
    {value: 'full', name: "Desde siempre"},
  ]

  let cancellationType = $state('B');
  let cancellationDate = $state<DateState>('week');

  let tickets = $state<Array<Ticket>>([]);
  let invoices = $state([]);


  onMount(async () => {
    if(cancellationType == 'B'){
      let result = await window.electronAPI.tickets.getAll(cancellationDate);
      tickets = result;
      console.log(result);
    }
  })

</script>

<div class="lg:w-5/6 lg:m-auto relative h-full">
  <Title>Bajas</Title>
  <div class="my-4 flex flex-row gap-8">
    <InputSelect title="Tipo" content={typeValues} bind:value={cancellationType}/>
    <InputSelect title="Fecha" content={dateValues} bind:value={cancellationDate}/>
  </div>
    <CancellationTable items={[]}/>
</div>
