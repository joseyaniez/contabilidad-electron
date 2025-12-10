<script lang="ts">
  import type { Client } from "../../../../types/models/client";
  import ButtonClient from "./components/ButtonClient.svelte";
  import InputClient from "./components/InputClient.svelte";

  let {clientSelected = $bindable(), filteredRuc = false}: {clientSelected: Client | null, filteredRuc: boolean} = $props();

</script>

<div class="w-full">
  <div class="flex flex-row items-end gap-2">
    <InputClient {filteredRuc} bind:clientSelected />
    <ButtonClient bind:clientSelected/>
  </div>

</div>
