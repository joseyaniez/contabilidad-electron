<script lang="ts">
  import Modal from "../../components/Modal.svelte";
  import ProductsTable from "./components/ProductsTable.svelte";
  import Title from "../../components/Title.svelte";
  import CreateProductForm from "./components/CreateProductForm.svelte";
  
  let showModal = $state(false);
  
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
<ProductsTable/>

<Modal bind:showModal>
  <Title>Crear nuevo producto</Title>
  <CreateProductForm addOnClick={() => showModal = false}/>
</Modal>
