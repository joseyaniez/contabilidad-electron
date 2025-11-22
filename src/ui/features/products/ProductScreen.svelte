<script lang="ts">
  import { onMount } from "svelte";
  import type { Product } from "../../../types/models/product";
  import Modal from "../../components/Modal.svelte";
  import ProductsTable from "./components/ProductsTable.svelte";
  import Title from "../../components/Title.svelte";
  import CreateProductForm from "./components/CreateProductForm.svelte";
  
  let showModal = $state(false);
  let isUpdate = $state(false);
  let updateProductData: Product = $state({} as Product);
  
  let products: Array<Product> = $state([]);

  onMount(async () => {
    try {
      const resp = await window.electronAPI.products.getAll();
      if(resp.success){
        products = resp.data!;
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  });

  function addProduct(newProduct: Product) {
    showModal = false;
    products = products.filter(p => p.id !== newProduct.id);
    products.sort((a, b) => (a.id! > b.id! ? 1 : -1));
    products = [...products, newProduct];
  }

  function updateProducts(product: Product) {
    showModal = true;
    isUpdate = true;
    updateProductData = product;
    console.log("Update product:", product);
  }

</script>

<Title>Productos</Title>
<div class="flex items-center gap-2 my-4">
  <div class="flex-1">Buscador...</div>
  <div>
    <button 
      class="bg-bacalao-primary rounded-md px-2 py-1 text-white"
      onclick={() => showModal = true}
    >
      Nuevo producto
    </button>
  </div>
</div>
<ProductsTable onUpdate={updateProducts} bind:products/>

<Modal bind:showModal>
  <Title>Crear nuevo producto</Title>
  <CreateProductForm addOnClick={addProduct} {isUpdate} updateProd={updateProductData}/>
</Modal>
