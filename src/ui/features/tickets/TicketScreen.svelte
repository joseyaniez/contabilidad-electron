<script lang="ts">
    import type { Client } from "../../../types/models/client";
    import type { Product } from "../../../types/models/product";
    import type { Ticket } from "../../../types/models/ticket";
    import Button from "../../components/Button.svelte";
    import Title from "../../components/Title.svelte";
    import ClientForm from "../../components/form/client/ClientForm.svelte";
    import ProductForm from "../../components/form/product/ProductForm.svelte";
    import { multiplyPrice, sumPrices } from "../../util/cents";
    const today = new Date().toLocaleDateString();

    let clientSelected = $state<Client | null>(null);
    let productsSelected = $state<Array<Product & {quantity: number}>>([]);
    let total = $derived(sumPrices(...productsSelected.map(p => multiplyPrice(p.quantity, p.price))))

    async function onSaveClick(){
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
        const idTicket = await window.electronAPI.tickets.create(ticket)
        console.log("Se insertó con id " + idTicket);
      } catch(err){
        console.log(err);
      }
    }

</script>


<div class="lg:w-5/6 lg:m-auto">
  <div class="flex flex-row items-center justify-between mb-4">
    <Title>Boletas</Title>
    <div class="text-bacalao-primary font-bold text-xl">{today}</div>
  </div>
  <ClientForm bind:clientSelected/>
  <ProductForm bind:productsSelected/>
  <Button padding={2} onclick={onSaveClick}>Pagar</Button>
</div>
