<script lang="ts">
  import type { Product } from "../../../../../types/models/product";
  import { debounceAsync } from "../../../../util/debounceAsync";

  const updateDebounced = debounceAsync(updateProductsList, 600);

  let { productSelected = $bindable() } = $props();

  let productText = $state("");
  let productList = $state<Array<Product>>([]);
  let isSelected = $derived(productSelected != null);

  $effect(() => {
    if(productText.length > 3){
      updateDebounced();
    } else {
      productList = [];
    }
  });

  $effect(() => {
    if(productSelected){
      productText = productSelected.id + " - " + productSelected.description;
    }
  });

  async function updateProductsList(){
    try {
      const result = await window.electronAPI.products.find(productText);
      const data = result.data || [];
      if(result.success){
        productList = data;
      } else {
        console.error("Failed to fetch clients:", result.error);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }

  function onClickProductListed(product: Product){
    productSelected = product;
    productList = [];
  }

  function resetSelection(){
    productSelected = null;
    productText = "";
  }


</script>

<div class="flex flex-col relative flex-1">
  <label class="font-bold pb-1" for="client-input">Productos</label>
  <input 
    bind:value={productText} 
    class={`${isSelected ? 'bg-green-100' : 'bg-white'} px-1 border-2 z-20 rounded-sm border-bacalao-secondary border-solid rounded"  type="text" id="client-input`}
  />
  <button 
    class={`${isSelected ? 'block' : 'hidden'} w-5 h-5 absolute text-sm top-8.5 right-2 z-30 text-green-600 font-bold cursor-pointer`}
    onclick={resetSelection}
  >
    X
  </button>
  <div class={`absolute w-full ${productList.length > 0 && !isSelected ? 'block' : 'hidden'} top-13 bg-white shadow-lg rounded-sm z-10`}>
    <div class="p-2 border-x border-b rounded-b-sm border-bacalao-secondary flex flex-col">
      {#each productList as product}
        <button onclick={() => onClickProductListed(product)} class="px-2 py-1 text-left rounded-md hover:bg-indigo-50">{product.id} - {product.description}</button>
      {/each}
    </div>
  </div>
</div>
