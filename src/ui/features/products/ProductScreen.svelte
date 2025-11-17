<script>
  import Modal from "../../components/Modal.svelte";
  import Table from "../../components/table/Table.svelte";
  import Title from "../../components/Title.svelte";
  import CreateProductForm from "./components/CreateProductForm.svelte";
  
  let showModal = $state(false);

  let product = $state({
    description: '',
    unit: '',
    price: +0,
    stock: false
  });
  
  let products = [
    {
      name: "Producto A",
      description: "Esta es la descripción del primer producto",
      precio: 19.5,
      stock: 13,
    },
    {
      name: "Producto B",
      description: "Esta es la descripción del segundo producto",
      precio: 3.4,
      stock: 6,
    },
    {
      name: "Producto C",
      description: "Esta es la descripción del tercer producto",
      precio: 1,
      stock: 100,
    },
  ]
</script>

<Title>Productos</Title>
<div>
  <p>{product.description}</p>
  <p>{product.price}</p>
  <p>{product.stock}</p>
  <p>{product.unit}</p>
</div>
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
<Table content={products}/>

<Modal bind:showModal>
  <Title>Crear nuevo producto</Title>
  <CreateProductForm bind:product/>
</Modal>
