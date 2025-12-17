
<script>
import NavbarItem from "./NavbarItem.svelte";

const firstItems = [
  {
    title: 'Boleta',
    routeName: 'tickets'
  },
  {
    title: 'Factura',
    routeName: 'invoices'
  },
  {
    title: 'Bajas',
    routeName: 'cancellation'
  },
  {
    title: 'Productos',
    routeName: 'products'
  },
  {
    title: 'Emitidos',
    routeName: 'issued'
  },
  {
    title: 'Clientes',
    routeName: 'clients'
  },
];

const lastItems = [
  {
    title: 'Configurar',
    routeName: 'config'
  },
];
</script>

<div class="m-2 bg-bacalao-primary text-white font-medium rounded-lg">
  <ul class="flex justify-center items-center px-3">
    {#each firstItems as item}
      <NavbarItem {...item} />
    {/each}
  </ul>
</div>
