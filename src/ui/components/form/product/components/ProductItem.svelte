
<script lang="ts">
  import type { Product } from "../../../../../types/models/product";
    import { multiplyPrice } from "../../../../util/cents";
  let{ product, onClickDelete, onAddQuantity, onSubQuantity } = $props<{ product: Product & { quantity: number }, onClickDelete: () => void, onAddQuantity: () => void, onSubQuantity: () => void }>();
</script>

<div class="flex flex-row p-1 border-b-bacalao-secondary border-b-2">
  <div class="w-24 relative">
    <button onclick={onClickDelete} class="absolute -left-6 cursor-pointer top-1 bg-red-200 h-4 w-4 text-sm flex justify-center items-center rounded-full border border-red-500">
      x
    </button>
    <div class="flex flex-row">
      <button onclick={onSubQuantity} class="font-bold cursor-pointer hover:bg-bacalao-secondary rounded-full w-6 h-6 flex justify-center items-center text-bacalao-primary text-lg">-</button>
      <p class="w-9 text-center">{product.quantity}</p>
      <button onclick={onAddQuantity} class="font-bold cursor-pointer hover:bg-bacalao-secondary rounded-full w-6 h-6 flex justify-center items-center text-bacalao-primary text-lg">+</button>
    </div>
  </div>
  <div class="w-24">{product.unit}</div>
  <div class="flex-1 truncate pr-4">{ product.description }</div>
  <div class="w-30 flex flex-row justify-start items-center">
    <p>S./</p>
    <p class="w-10 text-right">{product.price.toString().split('.')[0]}</p>
    {#if product.price.toString().split('.').length > 1}
      <p class="w-5 text-left">.{product.price.toString().split('.')[1].padEnd(2, "0")}</p>
    {:else}
      <p class="w-5 text-left">.00</p>
    {/if}
  </div>
  <div class="w-30 flex flex-row justify-start items-center">
    <p>S/.</p>
    <p class="w-12 text-right">{multiplyPrice(product.price, product.quantity).toString().split('.')[0]}</p>
    {#if multiplyPrice(product.price, product.quantity).toString().split('.').length > 1}
      <p class="w-5 text-left">.{multiplyPrice(product.price, product.quantity).toString().split('.')[1].padEnd(2, "0")}</p>
    {:else}
      <p class="w-5 text-left">.00</p>
    {/if}
  </div>
</div>
