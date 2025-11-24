
<script lang="ts">
  import type { Product } from "../../../../../types/models/product";
  let{ product } = $props<{ product: Product & { quantity: number } }>();
</script>

<div class="flex flex-row p-1 border-b-bacalao-secondary border-b-2">
  <div class="w-30">{product.quantity}</div>
  <div class="flex-1 truncate pr-4">{ product.description }</div>
  <div class="w-40">{product.price}</div>
  <div class="w-30">{product.price * product.quantity}</div>
</div>
