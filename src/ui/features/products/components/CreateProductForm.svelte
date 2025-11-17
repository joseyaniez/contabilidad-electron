<script lang="ts">
    import Button from "../../../components/Button.svelte";
    import InputCheckbox from "../../../components/form/InputCheckbox.svelte";
    import InputNumber from "../../../components/form/InputNumber.svelte";
    import InputSelect from "../../../components/form/InputSelect.svelte";
    import InputTextArea from "../../../components/form/InputTextArea.svelte";

    interface Props {
      product: {
        description: string,
        unit: string,
        price: number,
        stock: boolean
      }
    }

    let { product = $bindable() }: Props = $props();

    const unidades = [
      { value: "kg", name: "Kg" },
      { value: "docena", name: "Docena" },
      { value: "unidad", name: "Unidad" },
      { value: "litro", name: "Litro" },
    ]


</script>

<form>
  <div>gola</div>
  <div>{product.description}</div>
  <InputTextArea title="Description" bind:value={product.description}/>
  <div class="mt-4 mb-1">
    <InputSelect bind:value={product.unit} title="Unidad" content={unidades}/>
  </div>
  <div class="flex gap-6">
    <InputNumber bind:value={product.price} title="Precio" step="0.50"/>
    <InputCheckbox title="Stock" bind:checked={product.stock} />
  </div>
  <Button onclick={()=>{}}>Guardar</Button>
</form>
