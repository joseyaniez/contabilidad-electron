<script lang="ts">
    import type { Client } from "../../../types/models/client";
    import type { Product } from "../../../types/models/product";
    import Title from "../../components/Title.svelte";
    import InputSelect from "../../components/form/InputSelect.svelte";
    import ClientForm from "../../components/form/client/ClientForm.svelte";
    import ProductForm from "../../components/form/product/ProductForm.svelte";
    import Table from "../../components/table/Table.svelte";
    import { multiplyPrice, sumPrices } from "../../util/cents";

    const today = new Date().toLocaleDateString();

    let clientSelected = $state<Client | null>(null);
    let productsSelected = $state<Array<Product & {quantity: number}>>([]);
    let total = $derived(sumPrices(...productsSelected.map(p => multiplyPrice(p.quantity, p.price))))

    const pagagementTypes = [
      {value: "contado", name: "Al contado"},
      {value: "credito", name: "Al crédito"},
    ]

    let selectedPagagementType = $state("");

</script>

<div class="lg:w-5/6 lg:m-auto">
  <div class="flex flex-row items-center justify-between mb-4">
    <Title>Facturas</Title>
    <div class="text-bacalao-primary font-bold text-xl">{today}</div>
  </div>
  <ClientForm bind:clientSelected/>
  <ProductForm bind:productsSelected/>
  <Table/>
  <InputSelect title="Tipo de pago" content={pagagementTypes} bind:value={selectedPagagementType}/>
</div>
