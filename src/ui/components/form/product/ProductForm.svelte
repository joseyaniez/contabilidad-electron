<script lang="ts">
  import type { Product } from "../../../../types/models/product";
  import InputProduct from "./components/InputProduct.svelte";
  import ButtonAddProduct from "./components/ButtonAddProduct.svelte";
  import InputQuantityProduct from "./components/InputQuantityProduct.svelte";
  import ProductTable from "./components/ProductTable.svelte";

  let productsSelected = $state<Array<Product>>([]);

</script>

<div class="w-full mt-4">
  <div class="flex flex-row items-end gap-2">
    <InputProduct/>
    <InputQuantityProduct/>
    <ButtonAddProduct/>
  </div>
  <ProductTable bind:productsSelected/>
</div>
