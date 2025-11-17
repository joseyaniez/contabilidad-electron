<script>
  import InputProduct from "./components/InputProduct.svelte";
  import ButtonAddProduct from "./components/ButtonAddProduct.svelte";
  import InputQuantityProduct from "./components/InputQuantityProduct.svelte";
</script>

<div class="w-full mt-4">
  <div class="flex flex-row items-end gap-2">
    <InputProduct/>
    <InputQuantityProduct/>
    <ButtonAddProduct/>
  </div>
</div>
