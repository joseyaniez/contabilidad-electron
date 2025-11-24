<script lang="ts">
    import type { Client } from "../../../types/models/client";
    import type { Product } from "../../../types/models/product";
    import Button from "../../components/Button.svelte";
    import Title from "../../components/Title.svelte";
    import ClientForm from "../../components/form/client/ClientForm.svelte";
    import ProductForm from "../../components/form/product/ProductForm.svelte";
    import { multiplyPrice, sumPrices } from "../../util/cents";
    const today = new Date().toLocaleDateString();

    let clientSelected = $state<Client | null>(null);
    let productsSelected = $state<Array<Product & {quantity: number}>>([]);
    let total = $derived(sumPrices(...productsSelected.map(p => multiplyPrice(p.quantity, p.price))))

</script>


<div class="lg:w-5/6 lg:m-auto">
  <div class="flex flex-row items-center justify-between mb-4">
    <Title>Boletas</Title>
    <div class="text-bacalao-primary font-bold text-xl">{today}</div>
  </div>
  <ClientForm bind:clientSelected/>
  <ProductForm bind:productsSelected/>
  <Button padding={2} onclick={() => {}}>Pagar</Button>
</div>
