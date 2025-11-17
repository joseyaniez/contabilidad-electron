<script lang="ts">
  import Navbar from "./components/navbar/Navbar.svelte";
  import Router from "svelte-spa-router";
  import TicketScreen from "./features/tickets/TicketScreen.svelte";
  import InvoiceScreen from "./features/invoices/InvoiceScreen.svelte";
  import UserScreen from "./features/users/UserScreen.svelte";
  import ProductScreen from "./features/products/ProductScreen.svelte";
  import CancellationScreen from "./features/accounting/screens/CancellationScreen.svelte";
  import IssuedScreen from "./features/accounting/screens/IssuedScreen.svelte";

  const routes = {
    '/': TicketScreen,
    '/tickets': TicketScreen,
    '/invoices': InvoiceScreen,
    '/cancellation': CancellationScreen,
    '/issued': IssuedScreen,
    '/products': ProductScreen,
    '/users': UserScreen,
    '/config': TicketScreen
  }
</script>

<div class="flex flex-col min-h-screen bg-bacalao-secondary">
  <Navbar/>
  <div class="w-full flex-1 px-2 pb-2 flex">
    <div class="w-full bg-white rounded-lg flex-1 p-4 xl:p-6 shadow-md">
      <Router {routes}/>
    </div>
  </div>
</div>
