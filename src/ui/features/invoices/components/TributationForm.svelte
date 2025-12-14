<script>
    import InputNumber from "../../../components/form/InputNumber.svelte";
    import InputSelect from "../../../components/form/InputSelect.svelte";

    let { tributeValue = $bindable(), months = $bindable() } = $props();

    $effect(() => {
      if(tributeValue == 'contado'){
        months = 1
      }
    })

    let tributeValues = [
      { value: "contado", name: "Al contado"},
      { value: "credito", name: "A crédito"}
    ]

</script>

<div class="flex flex-row gap-8 items-center">
  <InputSelect title="Tipo de operación" content={tributeValues} bind:value={tributeValue}/>
  {#if tributeValue == 'credito'}
    <InputNumber title="Meses" bind:value={months} isInline={true} />
  {/if}
</div>
