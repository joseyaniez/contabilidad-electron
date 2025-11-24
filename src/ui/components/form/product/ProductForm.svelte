<script lang="ts">
  import type { Product } from "../../../../types/models/product";
  import InputProduct from "./components/InputProduct.svelte";
  import ButtonAddProduct from "./components/ButtonAddProduct.svelte";
  import InputQuantityProduct from "./components/InputQuantityProduct.svelte";
  import ProductTable from "./components/ProductTable.svelte";

  let productSelected = $state<Product | null>(null);
  let { productsSelected = $bindable() } : {productsSelected: Array<Product & {quantity: number}>} = $props();
  let quantityProduct = $state<number>(1);

  function onAddClick(){
    if(productSelected){
      const existingProductIndex = productsSelected.findIndex(p => p.id === productSelected!.id);
      if(existingProductIndex !== -1){
        productsSelected[existingProductIndex].quantity += quantityProduct;
        productsSelected = [...productsSelected];
      } else {
        productsSelected = [...productsSelected, {...productSelected, quantity: quantityProduct}];
      }
      productSelected = null;
      quantityProduct = 1;
    }
  }

</script>

<div class="w-full mt-4">
  <div class="flex flex-row items-end gap-2">
    <InputProduct bind:productSelected/>
    <InputQuantityProduct bind:quantity={quantityProduct}/>
    <ButtonAddProduct onAddClick={onAddClick}/>
  </div>
  <ProductTable bind:productsSelected/>
</div>
