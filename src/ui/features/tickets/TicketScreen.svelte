<script lang="ts">
    import type { Client } from "../../../types/models/client";
    import type { Product } from "../../../types/models/product";
    import type { Ticket } from "../../../types/models/ticket";
    import Button from "../../components/Button.svelte";
    import Modal from "../../components/Modal.svelte";
    import Title from "../../components/Title.svelte";
    import ClientForm from "../../components/form/client/ClientForm.svelte";
    import ProductForm from "../../components/form/product/ProductForm.svelte";
    import { multiplyPrice, sumPrices } from "../../util/cents";
    import { delay } from "../../util/delay";
    import { PaymentStatus } from "../../util/paymentStatus";
    import { obtainSendingText } from "../../util/sendingMessage";
    const today = new Date().toLocaleDateString();

    let clientSelected = $state<Client | null>(null);
    let productsSelected = $state<Array<Product & {quantity: number}>>([]);
    let total = $derived(sumPrices(...productsSelected.map(p => multiplyPrice(p.quantity, p.price))))
    let isActiveButton = $derived(!clientSelected !== null && productsSelected.length != 0);

    let ticketStatus = $state<PaymentStatus>(PaymentStatus.Blank);
    let showModal = $state(false);
    let urlPdf= $state("");

    async function onOpenPdf(){
      window.electronAPI.pdf.openPdf(urlPdf);
    }

    async function onSaveClick(){
      ticketStatus = PaymentStatus.Blank;
      if(!isActiveButton){
        console.log("No es activo")
        return;
      }
      const day = new Date().toISOString();
      const client = { ...clientSelected! };
      const ticket:Ticket = {
        serie: "jdlsjf",
        number: 3,
        dateString: day,
        client: {
          id: client.id,
          dni: client.dni,
          ruc: client.ruc,
          address: client.address,
          name: client.name
        },
        productsList: productsSelected.map(p => {
          const impPrice = multiplyPrice(p.price, p.quantity)
          return {
            description: p.description,
            unit: p.unit,
            quantity: p.quantity,
            unitPrice: p.price,
            importPrice: impPrice,
            ticketId: "jdlsjf"
          }
        })
      }
      try {
        showModal = true;
        ticketStatus = PaymentStatus.Validation;
        await delay(1500);
        ticketStatus = PaymentStatus.Sending;
        await delay(3000);
        const idTicket = await window.electronAPI.tickets.create(ticket)
        console.log("Se insertó con id " + idTicket);
        ticketStatus = PaymentStatus.GeneratingPDF;
        var {ok, data} = await window.electronAPI.pdf.generateTicket(true, ticket);
        urlPdf = data;
        if(ok){
          console.log("Se generó el PDF en " + data);
        } else {
          console.log("No se pudo generar el pdf")
        }
        ticketStatus = PaymentStatus.Success;
      } catch(err){
        ticketStatus = PaymentStatus.Error;
        console.log(err);
      }
      clientSelected = null;
      productsSelected = [];
    }

</script>


<div class="lg:w-5/6 lg:m-auto relative h-full">
  <div class="flex flex-row items-center justify-between mb-4">
    <Title>Boletas</Title>
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
        <p>{ urlPdf }</p>
      {/if}
    </div>
  </Modal>

</div>
