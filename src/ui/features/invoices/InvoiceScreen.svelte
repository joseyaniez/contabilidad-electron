<script lang="ts">
    import type { Client } from "../../../types/models/client";
    import type { Product } from "../../../types/models/product";
    import Modal from "../../components/Modal.svelte";
    import Title from "../../components/Title.svelte";
    import InputSelect from "../../components/form/InputSelect.svelte";
    import ClientForm from "../../components/form/client/ClientForm.svelte";
    import ProductForm from "../../components/form/product/ProductForm.svelte";
    import Table from "../../components/table/Table.svelte";
    import { multiplyPrice, sumPrices } from "../../util/cents";

    const today = new Date().toLocaleDateString();
    const actualSerieInvoice = "B001";

    let clientSelected = $state<Client | null>(null);
    let productsSelected = $state<Array<Product & {quantity: number}>>([]);
    let total = $derived(sumPrices(...productsSelected.map(p => multiplyPrice(p.quantity, p.price))))

    let invoiceNumber = $state(0);
    let invoiceSerie = $derived(actualSerieInvoice + "-" + ticketNumber.toString().padStart(4, "0"))

    const pagagementTypes = [
      {value: "contado", name: "Al contado"},
      {value: "credito", name: "Al crédito"},
    ]

    let selectedPagagementType = $state("");

</script>


<div class="lg:w-5/6 lg:m-auto relative h-full">
  <div class="flex flex-row items-center justify-between mb-4">
    <Title>
      <div class="flex flex-row gap-2">
        <p>Boleta </p>
        {#if invoiceNumber > 0}
          <p class="text-md">{invoiceSerie}</p>
        {/if}
      </div>
    </Title>
    <div class="text-bacalao-primary font-bold text-xl">{today}</div>
  </div>
  <ClientForm bind:clientSelected/>
  <ProductForm bind:productsSelected/>
  <div class="h-30"></div>
  <div class="absolute bottom-0 right-0 w-full z-50 flex flex-row justify-end px-10">
    <Button padding={2} onclick={onSaveClick}>Pagar</Button>
  </div>

  <Modal bind:showModal>
    <div class="flex flex-col justify-center">
      <div class="flex flex-row justify-end">
        <button 
          class="font-bold cursor-pointer"
          onclick={() => {
          ticketStatus = PaymentStatus.Blank;
          showModal = false;
          urlPdf = '';
        }}>
          X
        </button>
      </div>
      <p class="my-8 text-center font-bold text-bacalao-primary text-xl">{obtainSendingText(ticketStatus)}</p>
      {#if urlPdf.length > 0}
        <button onclick={onOpenPdf} class="my-4 cursor-pointer text-center bg-bacalao-primary text-white rounded text-lg">Abrir comprobante</button>
      {/if}
    </div>
  </Modal>

</div>
