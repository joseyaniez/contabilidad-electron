
<script lang="ts">
  import type { Product } from "../../../../../types/models/product";
  let{ product, onClickDelete } = $props<{ product: Product & { quantity: number }, onClickDelete: () => void }>();
</script>

<div class="flex flex-row p-1 border-b-bacalao-secondary border-b-2">
  <div class="w-30 relative">
    <button onclick={onClickDelete} class="absolute -left-6 cursor-pointer top-1 bg-red-200 h-4 w-4 text-sm flex justify-center items-center rounded-full border border-red-500">
      x
    </button>
    <p>{product.quantity}</p>
  </div>
  <div class="flex-1 truncate pr-4">{ product.description }</div>
  <div class="w-40">{product.price}</div>
  <div class="w-30">{product.price * product.quantity}</div>
</div>
