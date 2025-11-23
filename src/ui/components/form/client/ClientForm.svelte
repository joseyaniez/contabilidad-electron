<script lang="ts">
  import type { Client } from "../../../../types/models/client";
  import ButtonClient from "./components/ButtonClient.svelte";
  import InputClient from "./components/InputClient.svelte";

  let clientSelected = $state<Client | null >(null);

</script>

<div class="w-full">
  <div class="flex flex-row items-end gap-2">
    <InputClient bind:clientSelected />
    <ButtonClient bind:clientSelected/>
  </div>

</div>
