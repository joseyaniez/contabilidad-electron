<script lang="ts">
    import Button from "../../../components/Button.svelte";
    import InputCheckbox from "../../../components/form/InputCheckbox.svelte";
    import InputNumber from "../../../components/form/InputNumber.svelte";
    import InputSelect from "../../../components/form/InputSelect.svelte";
    import InputTextArea from "../../../components/form/InputTextArea.svelte";

    let product = $state({
      description: "",
      unit: "unidad",
      price: 0,
      stock: false
    });

    function saveProduct(){
      let cleanProduct = {
        description: product.description,
        unit: product.unit,
        price: product.price,
        stock: product.stock
      }
      window.electronAPI.products.create(cleanProduct).then((resp) => {
        console.log(resp);
      })
    }

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
  <Button onclick={saveProduct}>Guardar</Button>
</form>
