<script>
    import Title from "../../components/Title.svelte";
    import InputSelect from "../../components/form/InputSelect.svelte";
    import ClientForm from "../../components/form/client/ClientForm.svelte";
    import ProductForm from "../../components/form/product/ProductForm.svelte";
    import ProductsTable from "../../components/table/products/ProductsTable.svelte";

    const today = new Date().toLocaleDateString();

    const pagagementTypes = [
      {value: "contado", name: "Al contado"},
      {value: "credito", name: "Al crédito"},
    ]
</script>

<div class="lg:w-5/6 lg:m-auto">
  <div class="flex flex-row items-center justify-between mb-4">
    <Title>Facturas</Title>
    <div class="text-bacalao-primary font-bold text-xl">{today}</div>
  </div>
  <ClientForm/>
  <ProductForm/>
  <ProductsTable/>
  <InputSelect title="Tipo de pago" content={pagagementTypes}/>
</div>
