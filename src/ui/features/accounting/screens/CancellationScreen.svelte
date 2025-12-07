<script>
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

  let cancellationType = $state('B')
  let cancellationDate = $state('week')


  $effect(async () => {
    if(cancellationType == 'B'){
      window.electronAPI.tickets.get()
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
