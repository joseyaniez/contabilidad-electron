<script>
    import Title from "../../components/Title.svelte";
    import ClientForm from "../../components/form/client/ClientForm.svelte";
    import ProductForm from "../../components/form/product/ProductForm.svelte";
    import ProductsTable from "../../components/table/products/ProductsTable.svelte";
    const today = new Date().toLocaleDateString();
</script>


<div class="lg:w-5/6 lg:m-auto">
  <div class="flex flex-row items-center justify-between mb-4">
    <Title>Boletas</Title>
    <div class="text-bacalao-primary font-bold text-xl">{today}</div>
  </div>
  <ClientForm/>
  <ProductForm/>
  <ProductsTable/>
</div>
