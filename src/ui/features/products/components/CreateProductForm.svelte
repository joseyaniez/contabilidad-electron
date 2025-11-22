<script lang="ts">
    import Button from "../../../components/Button.svelte";
    import InputCheckbox from "../../../components/form/InputCheckbox.svelte";
    import InputNumber from "../../../components/form/InputNumber.svelte";
    import InputSelect from "../../../components/form/InputSelect.svelte";
    import InputTextArea from "../../../components/form/InputTextArea.svelte";

    let { addOnClick = () => {} } = $props();

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
        addOnClick?.({...cleanProduct, id: resp.data!.toString()});
        product = {description: "",unit: "unidad",price: 0,stock: false} // reset product
      }).catch((err) => {
        console.error(err);
        product = {description: "",unit: "unidad",price: 0,stock: false} // reset product
      });
    }

    const unidades = [
      { value: "kg", name: "Kg" },
      { value: "docena", name: "Docena" },
      { value: "unidad", name: "Unidad" },
      { value: "litro", name: "Litro" },
    ]


</script>

<form>
  <InputTextArea title="Descripción" bind:value={product.description}/>
  <div class="mt-4 mb-1 py-2 flex flex-row gap-6 items-center">
    <InputSelect bind:value={product.unit} title="Unidad" content={unidades}/>
    <InputCheckbox title="Stock" bind:checked={product.stock} />
  </div>
  <div class="flex gap-6">
    <InputNumber bind:value={product.price} title="Precio" step="0.50"/>
  </div>
  <div class="flex justify-end mt-2">
    <Button onclick={ saveProduct }>Guardar</Button>
  </div>
</form>
