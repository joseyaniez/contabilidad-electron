<script lang="ts">
  import type { Invoice } from "../../../../types/models/invoice";
  import type { Ticket } from "../../../../types/models/ticket";
  import InputSelect from "../../../components/form/InputSelect.svelte";
  import Title from "../../../components/Title.svelte";
  import IssuedTable from "../components/IssuedTable.svelte";

  let typeValues = [
    {value: 'B', name: "Boleta"},
    {value: 'F', name: "Factura"}
  ]

  const beforeDay = new Date()
  const today = new Date()
  beforeDay.setDate(today.getDay() - 7);

  let cancellationType = $state<'B' | 'F' | 'none'>('B');
  let initialDate = $state(beforeDay.toISOString().split(("T"))[0]);
  let finalDate = $state(today.toISOString().split("T")[0]);

  let tickets = $state<Array<Ticket>>([]);
  let invoices = $state<Array<Invoice>>([]);

  $effect(() => {
    if(initialDate != '' && finalDate != '' && cancellationType != 'none'){
      console.log("aqui")
      getData();
    }
  })

  async function getData(){
    if(cancellationType == 'B'){
      let iDate = new Date(initialDate);
      let iDateSending = iDate.toISOString().replace('T', ' ').replace('Z', '')
      let fDate = new Date(finalDate);
      let fDateSending = fDate.toISOString().replace('T', ' ').replace('Z', '')
      const {success, data} = await window.electronAPI.tickets.getBetween(iDateSending, fDateSending);
      if(success){
        tickets = data!;
        invoices = [];
      }
    } else {
      const {success, data} = await window.electronAPI.invoices.getBetween(initialDate, finalDate);
      if(success){
        invoices = data!;
        tickets = [];
      }
    }
  }

</script>
<div class="lg:w-5/6 lg:m-auto relative h-full">
  <Title>Emitidos</Title>
  <div>
    <div class="my-4 flex flex-row gap-8">
      <InputSelect title="Tipo" content={typeValues} bind:value={cancellationType}/>
      <div class="flex flex-row gap-3 items-center">
        <label class="font-bold" for="inDate">Inicio</label>
        <input bind:value={initialDate} class="border-2 border-bacalao-primary p-2 rounded-md" id="inDate" type="date">
      </div>
      <div class="flex flex-row gap-3 items-center">
        <label class="font-bold" for="inDate">Fin</label>
        <input bind:value={finalDate} class="border-2 border-bacalao-primary p-2 rounded-md" id="inDate" type="date">
      </div>
    </div>
    <IssuedTable {tickets} {invoices}/>
  </div>
</div>
