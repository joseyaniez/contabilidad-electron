<script lang="ts">
  import type { Product } from "../../../../../types/models/product";
  import ProductItem from "./ProductItem.svelte";

  interface Props {
    productsSelected: Array<Product & { quantity: number }>;
  }

  let { productsSelected = $bindable() }: Props = $props();

</script>

<div class="my-4 w-full">

  <!-- Table Header -->
  <div class="flex flex-row bg-bacalao-secondary p-1">
    <div class="w-30">Cantidad</div>
    <div class="flex-1">Descripción</div>
    <div class="w-40">Precio unitario</div>
    <div class="w-30">Importe</div>
  </div>

  <!-- Table Content -->
  <div class="flex flex-col">
    {#each productsSelected as product}
      <ProductItem {product}/>
    {/each}
  </div>

  <!-- Table Totals -->
  <div class="flex flex-col">
    <div class="flex flex-row justify-end mt-2">
      <div class="w-50">Subtotal</div>
      <div class="w-30">10</div>
    </div>
    <div class="flex flex-row justify-end mt-2">
      <div class="w-50">Descuento</div>
      <div class="w-30">3</div>
    </div>
  </div>

</div>
