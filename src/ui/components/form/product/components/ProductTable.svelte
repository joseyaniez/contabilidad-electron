<script lang="ts">
  import type { Product } from "../../../../../types/models/product";
  import { sumPrices, multiplyPrice } from "../../../../util/cents";
  import ProductItem from "./ProductItem.svelte";

  interface Props {
    productsSelected: Array<Product & { quantity: number }>;
  }

  let { productsSelected = $bindable() }: Props = $props();

  function onClickDeleteProduct(index: number) {
    productsSelected = productsSelected.filter((_, i) => i !== index);
  }

  function onClickChangeProductQuantity(index: number, delta: number) {
    productsSelected = productsSelected.map((product, i) => {
      if (i === index) {
        return { ...product, quantity: Math.max(1, product.quantity + delta) };
      }
      return product;
    });
  }

</script>

<div class="my-4 w-full">

  <!-- Table Header -->
  <div class="flex flex-row bg-bacalao-secondary p-1">
    <div class="w-24">Cantidad</div>
    <div class="w-24">Unidad</div>
    <div class="flex-1">Descripción</div>
    <div class="w-30">P. unitario</div>
    <div class="w-30">Importe</div>
  </div>

  <!-- Table Content -->
  <div class="flex flex-col">
    {#each productsSelected as product, i (product.id)}
      <ProductItem
        {product} 
        onClickDelete={() => onClickDeleteProduct(i)}
        onAddQuantity={() => onClickChangeProductQuantity(i, 1)}
        onSubQuantity={() => onClickChangeProductQuantity(i, -1)}
      />
    {/each}
  </div>

  <!-- Table Totals -->
  <div class="flex flex-col">
    <div class="flex flex-row justify-end mt-2">
      <div class="w-50 border-b-2 font-bold pb-1 border-bacalao-secondary">Total</div>
      <div class="w-30 border-b-2 font-bold pb-1 border-bacalao-secondary flex flex-row">
        <p>S/.</p>
        <p class="w-12 text-right">{sumPrices(...productsSelected.map(p => multiplyPrice(p.price, p.quantity))).toString().split('.')[0]}</p>
        {#if sumPrices(...productsSelected.map(p => multiplyPrice(p.price, p.quantity))).toString().split('.').length > 1}
          <p class="w-5 text-left">.{sumPrices(...productsSelected.map(p => multiplyPrice(p.price, p.quantity))).toString().split('.')[1].padEnd(2, "0")}</p>
        {:else}
          <p class="w-5 text-left">.00</p>
        {/if}
      </div>
    </div>
  </div>

</div>
