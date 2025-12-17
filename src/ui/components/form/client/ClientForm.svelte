<script lang="ts">
  import type { Client } from "../../../../types/models/client";
  import ButtonClient from "./components/ButtonClient.svelte";
  import InputClient from "./components/InputClient.svelte";

  let {clientSelected = $bindable(), filteredRuc = false, filteredDni = false, dniOnly = true}: {clientSelected: Client | null, filteredRuc: boolean, filteredDni: boolean, dniOnly: boolean} = $props();

</script>

<div class="w-full">
  <div class="flex flex-row items-end gap-2">
    <InputClient {filteredRuc} {filteredDni} bind:clientSelected />
    <ButtonClient bind:clientSelected {dniOnly}/>
  </div>

</div>
